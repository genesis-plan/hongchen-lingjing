# -*- coding: utf-8 -*-
"""
红尘灵境小程序 - 腾讯云云开发自动部署脚本
"""
import os
import json
import requests

# 腾讯云云开发配置
CLOUDBASE_CONFIG = {
    "env_id": "cloud1-6g38qqfz90d5e5d1",
    "appid": "wx0917df92e740d32a"
}

# 云函数列表
CLOUD_FUNCTIONS = [
    "login",
    "getSkills",
    "submitWish",
    "saveProgress",
    "saveExamResult",
    "saveCharacter",
    "createSkill",
    "askAI",
    "getLetters",
    "sendLetter",
    "markLetterRead",
    "getPosts",
    "createPost",
    "getActivities",
    "joinActivity",
    "sendFriendRequest",
    "getFriendRequests",
    "acceptFriendRequest"
]

# 数据库集合列表
DATABASE_COLLECTIONS = [
    "users",
    "skills",
    "wishes",
    "honors",
    "examResults",
    "userCharacters",
    "letters",
    "posts",
    "activities",
    "friendRequests",
    "friends",
    "marketItems",
    "transactions",
    "challenges",
    "challengeRecords"
]

# 项目路径
PROJECT_PATH = r"C:\Users\Administrator\Desktop\红尘灵境小程序"
CLOUD_FUNCTIONS_PATH = os.path.join(PROJECT_PATH, "cloudfunctions")

def main():
    print("=" * 60)
    print("红尘灵境小程序 - 腾讯云云开发自动部署")
    print("=" * 60)
    print()
    
    print("配置信息:")
    print(f"  环境ID: {CLOUDBASE_CONFIG['env_id']}")
    print(f"  AppID: {CLOUDBASE_CONFIG['appid']}")
    print(f"  项目路径: {PROJECT_PATH}")
    print()
    
    print("待上传的云函数:")
    for i, func in enumerate(CLOUD_FUNCTIONS, 1):
        print(f"  {i}. {func}")
    print()
    
    print("待创建的数据库集合:")
    for i, coll in enumerate(DATABASE_COLLECTIONS, 1):
        print(f"  {i}. {coll}")
    print()
    
    print("=" * 60)
    print("重要说明:")
    print("=" * 60)
    print()
    print("本脚本需要:")
    print("  1. 腾讯云 SecretId 和 SecretKey")
    print("  2. 安装腾讯云 Python SDK: pip install tencentcloud-sdk-python")
    print("  3. 配置云开发环境")
    print()
    print("获取方式:")
    print("  1. 访问: https://console.cloud.tencent.com/cam/capi")
    print("  2. 创建访问密钥")
    print("  3. 复制 SecretId 和 SecretKey")
    print()
    print("安装SDK:")
    print("  pip install tencentcloud-sdk-python")
    print()
    print("=" * 60)
    print()
    
    # 检查云函数文件夹是否存在
    print("检查云函数文件夹...")
    if os.path.exists(CLOUD_FUNCTIONS_PATH):
        print(f"✓ 云函数文件夹存在: {CLOUD_FUNCTIONS_PATH}")
        
        # 检查每个云函数
        missing_functions = []
        for func in CLOUD_FUNCTIONS:
            func_path = os.path.join(CLOUD_FUNCTIONS_PATH, func)
            if not os.path.exists(func_path):
                missing_functions.append(func)
        
        if missing_functions:
            print(f"✗ 缺少的云函数: {', '.join(missing_functions)}")
        else:
            print("✓ 所有云函数文件夹都存在")
    else:
        print(f"✗ 云函数文件夹不存在: {CLOUD_FUNCTIONS_PATH}")
    
    print()
    print("=" * 60)
    print("下一步:")
    print("=" * 60)
    print()
    print("方案1: 使用微信开发者工具手动上传")
    print("  - 在微信开发者工具中")
    print("  - 右键每个云函数文件夹")
    print("  - 选择'上传并部署：云端安装依赖'")
    print()
    print("方案2: 使用腾讯云CLI工具")
    print("  - 安装: npm install -g @cloudbase/cli")
    print("  - 登录: tcb login")
    print("  - 部署: tcb fn deploy")
    print()
    print("方案3: 联系腾讯云技术支持")
    print("  - 电话: 400-910-0100 转1")
    print("  - 在线: https://console.cloud.tencent.com/workorder")
    print()
    print("=" * 60)
    print()

if __name__ == "__main__":
    main()
