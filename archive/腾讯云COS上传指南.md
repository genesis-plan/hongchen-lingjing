# 腾讯云COS上传指南
**生成时间：2026-03-20 23:50**
**备份包：backup-2026-03-20.tar.gz（86KB）**

---

## 📦 备份内容

### 1. 技能内容（/skills-content/）
| 文件名 | 大小 | 说明 |
|--------|------|------|
| 剪纸艺术-入门介绍.md | 3.6KB | 原始版本 |
| 剪纸艺术-入门介绍-优化版.md | 3.5KB | 基于用户反馈优化 |
| 木工基础-入门介绍.md | 4.4KB | 30天路线图 |
| 书法入门-30天速成.md | 7.8KB | 完整学习路径 |
| **小计** | **19.3KB** | **4个技能文档** |

### 2. 知识库（/knowledge-base/）

#### 哲学/（3.7KB）
- 实践论深度研读.md（3,651字）

#### 数学/（4.3KB）
- 数学思维工具箱.md（4,306字）

#### 艺术/（5.5KB）
- 赛博国风美学研究.md（5,484字）

#### 物理/（3.9KB）
- 系统论应用.md（3,875字）

#### 商业/（3.9KB）
- 商业模式设计.md（3,875字）

| **小计** | **21.3KB** | **5个知识库文档** |

### 3. 记忆文档（/memory/）
- episodic/ - 情景记忆
- semantic/ - 语义记忆  
- procedural/ - 程序记忆
- heartbeat-reports/ - 执行报告

| **小计** | **约30KB** | **学习记录+执行报告** |

### 4. 根目录文档（/root-docs/）
- 用户视角验证-剪纸学习模拟.md
- 知识图谱智能分析报告.md
- 手艺人合作话术-3套方案.md
- SEA循环自我优化报告.md
- Pro套餐进化策略.md
- 今日计划分析.md
- 24小时自主进化计划-v2.0.md
- 跨学科学习复盘报告.md

| **小计** | **约15KB** | **8份分析报告+策略** |

---

## 📤 上传方式

### 方式1：腾讯云控制台网页上传

**步骤**：
1. 登录 https://console.cloud.tencent.com/cos
2. 选择存储桶：`h4-6g0tfhaqc1bbcdb5`
3. 点击"上传文件"
4. 选择 `backup-2026-03-20.tar.gz`
5. 等待上传完成

### 方式2：COSBrowser客户端

**下载**：https://console.cloud.tencent.com/cos/cosbrowser

**步骤**：
1. 安装COSBrowser
2. 扫码登录腾讯云账号
3. 选择存储桶
4. 拖拽上传备份包

### 方式3：COSCLI命令行（推荐）

**安装**：
```bash
# Linux/Mac
curl -LO https://github.com/tencentyun/coscli/releases/download/v0.13.0/coscli-linux
chmod +x coscli-linux
mv coscli-linux /usr/local/bin/coscli

# 配置密钥
coscli config add -b h4-6g0tfhaqc1bbcdb5 -r ap-guangzhou \
  -a $SECRET_ID -s $SECRET_KEY
```

**上传**：
```bash
# 上传备份包
coscli cp backup-2026-03-20.tar.gz cos://h4-6g0tfhaqc1bbcdb5/backup/2026-03-20/

# 解压后上传（推荐，便于单个文件访问）
coscli cp -r 技能内容/ cos://h4-6g0tfhaqc1bbcdb5/skills-content/
coscli cp -r 知识库/ cos://h4-6g0tfhaqc1bbcdb5/knowledge-base/
coscli cp -r memory/ cos://h4-6g0tfhaqc1bbcdb5/memory/
```

---

## 📂 推荐目录结构

```
cos://h4-6g0tfhaqc1bbcdb5/
├── backup/
│   └── 2026-03-20/
│       └── backup-2026-03-20.tar.gz    # 完整备份
├── skills-content/                      # 技能内容
│   ├── 剪纸艺术-入门介绍.md
│   ├── 剪纸艺术-入门介绍-优化版.md
│   ├── 木工基础-入门介绍.md
│   └── 书法入门-30天速成.md
├── knowledge-base/                      # 知识库
│   ├── 哲学/
│   │   └── 实践论深度研读.md
│   ├── 数学/
│   │   └── 数学思维工具箱.md
│   ├── 艺术/
│   │   └── 赛博国风美学研究.md
│   ├── 物理/
│   │   └── 系统论应用.md
│   └── 商业/
│       └── 商业模式设计.md
├── reports/                             # 分析报告
│   ├── 用户视角验证-剪纸学习模拟.md
│   ├── 知识图谱智能分析报告.md
│   └── 手艺人合作话术-3套方案.md
├── strategies/                          # 策略文档
│   ├── Pro套餐进化策略.md
│   ├── 24小时自主进化计划-v2.0.md
│   └── SEA循环自我优化报告.md
└── memory/                              # 记忆文档
    ├── episodic/
    ├── semantic/
    ├── procedural/
    └── heartbeat-reports/
```

---

## 🔐 访问权限设置

**建议权限**：
- 技能内容：公有读（便于分享）
- 知识库：私有（内部使用）
- 分析报告：私有（内部使用）
- 记忆文档：私有（敏感信息）

**设置方法**：
1. 腾讯云控制台 → 存储桶 → 权限管理
2. 设置bucket策略
3. 或在上传时指定ACL

---

## 📊 同步状态

| 类别 | 本地文件 | 云端状态 | 大小 |
|------|---------|---------|------|
| 技能内容 | 4个MD | ⏳ 待上传 | 19KB |
| 知识库 | 5个MD | ⏳ 待上传 | 21KB |
| 记忆文档 | 12个MD | ⏳ 待上传 | 30KB |
| 分析报告 | 8个MD | ⏳ 待上传 | 15KB |
| 系统配置 | 3个文件 | ⏳ 待上传 | 1KB |
| **总计** | **51个文件** | **⏳ 待上传** | **86KB** |

---

## ✅ 上传检查清单

上传完成后，请检查：
- [ ] 所有文件已上传到正确目录
- [ ] 文件大小与本地一致
- [ ] 权限设置正确（公有/私有）
- [ ] 可以通过URL访问（公有文件）
- [ ] 备份包已上传到backup/2026-03-20/

---

## 💡 后续同步建议

**自动化同步脚本**：
```bash
# 添加到crontab，每天自动同步
0 2 * * * /root/.openclaw/workspace/scripts/sync-to-cos.sh
```

**增量同步**：
- 只同步新增和修改的文件
- 使用coscli的--include和--exclude参数

**版本管理**：
- 保留历史备份（按日期命名）
- 保留最近7天的每日备份
- 保留每月1号的月度备份

---

**生成时间：2026-03-20 23:50**  
**备份包路径：/root/.openclaw/workspace/backup-2026-03-20.tar.gz**  
**备份包大小：86KB**  
**总文件数：51个**  
**状态：⏳ 等待上传到腾讯云COS** 💜
