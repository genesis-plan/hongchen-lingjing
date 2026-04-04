#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
红尘灵境网页版 - 真实API部署
使用腾讯云API直接上传文件到静态网站托管
"""

import os
import sys
import json
import hashlib
import hmac
import time
import requests
from datetime import datetime
from pathlib import Path

# 配置
SECRET_ID = 'YOUR_SECRET_ID_HERE'
SECRET_KEY = 'f6JOHySkofIjxysa6PWQ7apqdCYfYDev'
ENV_ID = 'hclj-8g46g9fd06e2a760'
LOCAL_PATH = r'C:\Users\Administrator\Desktop\红尘灵境网页版'

# 云开发静态网站托管API
TCB_API_BASE = 'https://tcb.tencentcloudapi.com'
HOSTING_API = 'https://tcb-api.tencentcloudapi.com'

def get_signature_v3(secret_key, datestamp, credential_scope, string_to_sign):
    """生成Signature V3签名"""
    def sign(key, msg):
        return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()

    date_key = sign(('TC3' + secret_key).encode('utf-8'), datestamp)
    service_key = sign(date_key, credential_scope.split('/')[1])
    signing_key = sign(service_key, credential_scope.split('/')[2])
    return sign(signing_key, string_to_sign).hex()

def create_tcb_request(action, params):
    """创建腾讯云API请求"""
    service = 'tcb'
    version = '2018-06-08'
    host = 'tcb.tencentcloudapi.com'
    algorithm = 'TC3-HMAC-SHA256'
    timestamp = int(time.time())
    datestamp = datetime.utcfromtimestamp(timestamp).strftime('%Y-%m-%d')

    # 构建payload
    payload = json.dumps(params)
    hashed_payload = hashlib.sha256(payload.encode('utf-8')).hexdigest()

    # 构建canonical request
    http_request_method = 'POST'
    canonical_uri = '/'
    canonical_querystring = ''
    canonical_headers = f'content-type:application/json; charset=utf-8\nhost:{host}\nx-tc-action:{action.lower()}\n'
    signed_headers = 'content-type;host;x-tc-action'
    canonical_request = f'{http_request_method}\n{canonical_uri}\n{canonical_querystring}\n{canonical_headers}\n{signed_headers}\n{hashed_payload}'

    # 构建string to sign
    credential_scope = f'{datestamp}/{service}/tc3_request'
    hashed_canonical_request = hashlib.sha256(canonical_request.encode('utf-8')).hexdigest()
    string_to_sign = f'{algorithm}\n{timestamp}\n{credential_scope}\n{hashed_canonical_request}'

    # 计算签名
    signature = get_signature_v3(SECRET_KEY, datestamp, credential_scope, string_to_sign)

    # 构建authorization
    authorization = f'{algorithm} Credential={SECRET_ID}/{credential_scope}, SignedHeaders={signed_headers}, Signature={signature}'

    # 构建请求头
    headers = {
        'Authorization': authorization,
        'Content-Type': 'application/json; charset=utf-8',
        'Host': host,
        'X-TC-Action': action,
        'X-TC-Timestamp': str(timestamp),
        'X-TC-Version': version,
        'X-TC-Region': 'ap-guangzhou',
        'X-TC-Request': str(timestamp) + hashlib.md5().hexdigest()
    }

    # 发送请求
    url = f'https://{host}/'
    response = requests.post(url, headers=headers, data=payload)

    return response

def deploy_via_tcb_api():
    """通过腾讯云API部署"""
    print("=" * 70)
    print("         红尘灵境网页版 - API真实部署")
    print("=" * 70)
    print()

    # 步骤1: 获取上传URL
    print("[1/4] 准备部署环境...")
    print(f"  环境ID: {ENV_ID}")
    print()

    # 获取所有文件
    print("[2/4] 收集文件...")
    files = []
    for root, dirs, filenames in os.walk(LOCAL_PATH):
        for filename in filenames:
            filepath = os.path.join(root, filename)
            rel_path = os.path.relpath(filepath, LOCAL_PATH).replace('\\', '/')

            # 排除部署脚本本身
            if 'deploy-now.py' in rel_path or 'real-deploy.py' in rel_path:
                continue

            with open(filepath, 'rb') as f:
                file_hash = hashlib.md5(f.read()).hexdigest()

            files.append({
                'path': rel_path,
                'local_path': filepath,
                'hash': file_hash,
                'size': os.path.getsize(filepath)
            })

    print(f"  找到 {len(files)} 个文件")
    print()

    # 步骤2: 上传文件
    print("[3/4] 上传文件到云开发...")
    print()

    success_count = 0
    fail_count = 0

    for i, file_info in enumerate(files, 1):
        progress = f"[{i}/{len(files)}]"
        size_kb = file_info['size'] / 1024

        # 读取文件内容
        try:
            with open(file_info['local_path'], 'rb') as f:
                file_content = f.read()

            # 调用云开发API上传文件
            # 使用HostingUpload接口
            params = {
                'EnvId': ENV_ID,
                'Path': file_info['path'],
                'FileContent': file_content.hex(),  # 转为十六进制
                'Md5': file_info['hash']
            }

            try:
                response = create_tcb_request('HostingUpload', params)
                result = response.json()

                if response.status_code == 200 and 'Response' in result:
                    print(f"{progress} {file_info['path']:45s} ({size_kb:6.1f} KB) [OK]")
                    success_count += 1
                else:
                    print(f"{progress} {file_info['path']:45s} ({size_kb:6.1f} KB) [FAIL]")
                    fail_count += 1

            except Exception as e:
                print(f"{progress} {file_info['path']:45s} ({size_kb:6.1f} KB) [ERROR: {str(e)[:20]}]")
                fail_count += 1

        except Exception as e:
            print(f"{progress} {file_info['path']:45s} ({size_kb:6.1f} KB) [ERROR]")
            fail_count += 1

    print()

    # 结果
    print("[4/4] 部署结果")
    print()
    print("=" * 70)
    print(f"  成功: {success_count} 个文件")
    print(f"  失败: {fail_count} 个文件")
    print("=" * 70)
    print()

    print("访问地址：")
    print(f"https://{ENV_ID}.tcloudbaseapp.com")
    print()

    if success_count == len(files):
        print("部署完成！网站已上线！")
    else:
        print("部分文件上传失败，请检查")

    return success_count == len(files)

if __name__ == '__main__':
    try:
        deploy_via_tcb_api()
    except Exception as e:
        print(f"\n错误: {e}")
        print("\n如果API调用失败，建议使用以下方式部署：")
        print("1. 方式1（最简单）：在腾讯云控制台手动上传")
        print("2. 方式2（自动化）：安装Node.js后使用CLI工具")
        print("\n控制台地址：https://console.cloud.tencent.com/tcb")
    finally:
        input("\n按回车键退出...")
