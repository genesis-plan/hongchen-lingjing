#!/bin/bash
# ============================================================
# Markdown文档中文化脚本
# 将英文命名的MD文件重命名为中文
# ============================================================

WORKSPACE="/root/.openclaw/workspace"
cd $WORKSPACE

echo "=== Markdown文档中文化 ==="
echo ""

# 定义重命名映射
# 格式: "原文件名|中文名"
declare -a RENAME_MAP=(
    # 核心文档
    "AGENTS.md|智能体配置.md"
    "BOOTSTRAP.md|启动指南.md"
    "CHANGELOG.md|更新日志.md"
    "CODE_OF_CONDUCT.md|行为准则.md"
    "CONTRIBUTING.md|贡献指南.md"
    "COPYRIGHT.md|版权声明.md"
    "DOCUMENT_INDEX.md|文档索引.md"
    "GOOD_FIRST_ISSUES.md|新手入门任务.md"
    "HALL_OF_FAME.md|名人堂.md"
    "HEARTBEAT.md|心跳任务.md"
    "IDENTITY.md|身份定义.md"
    "MEMORY.md|长期记忆.md"
    "miniprogram-release-info.md|小程序发布信息.md"
    "mobile-app-development-plan.md|移动应用开发计划.md"
    "PROMISES.md|承诺追踪.md"
    "README.md|项目介绍.md"
    "SEA循环自我优化报告.md|SEA循环自我优化报告.md"
    "security-compliance-report.md|安全合规报告.md"
    "SECURITY.md|安全政策.md"
    "SKILL_SUBMIT_TEMPLATE.md|技能提交模板.md"
    "SOUL.md|核心人格.md"
    "TASKS.md|任务管理.md"
    "TECHNICAL_ROADMAP.md|技术路线图.md"
    "TOOLS.md|工具说明.md"
    "USER.md|用户信息.md"
    "VERIFICATION.md|验证规则.md"
    "wechat-dev-tool-guide.md|微信开发者工具指南.md"
    
    # 其他英文文档
    "behavior-update.md|行为更新.md"
    "buildings-final.md|14建筑最终版.md"
    "BUSINESS_STRATEGY.md|商业战略.md"
    "demo-showcase.md|演示展示.md"
)

# 执行重命名
echo "【执行重命名】"
for item in "${RENAME_MAP[@]}"; do
    IFS='|' read -r old_name new_name <<< "$item"
    
    if [ -f "$old_name" ]; then
        # 检查目标文件是否已存在
        if [ -f "$new_name" ]; then
            echo "  ⚠️ 跳过：$new_name 已存在"
        else
            mv "$old_name" "$new_name"
            echo "  ✅ $old_name → $new_name"
        fi
    else
        echo "  ⏭️ 跳过：$old_name 不存在"
    fi
done

echo ""
echo "【更新引用】"
# 更新DOCUMENT_INDEX.md中的链接
if [ -f "文档索引.md" ]; then
    sed -i 's/\[README.md\]/[项目介绍.md]/g' 文档索引.md
    sed -i 's/\[MEMORY.md\]/[长期记忆.md]/g' 文档索引.md
    sed -i 's/\[TASKS.md\]/[任务管理.md]/g' 文档索引.md
    sed -i 's/\[AGENTS.md\]/[智能体配置.md]/g' 文档索引.md
    sed -i 's/\[SOUL.md\]/[核心人格.md]/g' 文档索引.md
    sed -i 's/\[USER.md\]/[用户信息.md]/g' 文档索引.md
    sed -i 's/\[IDENTITY.md\]/[身份定义.md]/g' 文档索引.md
    sed -i 's/\[TOOLS.md\]/[工具说明.md]/g' 文档索引.md
    sed -i 's/\[HEARTBEAT.md\]/[心跳任务.md]/g' 文档索引.md
    sed -i 's/\[PROMISES.md\]/[承诺追踪.md]/g' 文档索引.md
    sed -i 's/\[BOOTSTRAP.md\]/[启动指南.md]/g' 文档索引.md
    sed -i 's/\[DOCUMENT_INDEX.md\]/[文档索引.md]/g' 文档索引.md
    echo "  ✅ 已更新文档索引中的链接"
fi

echo ""
echo "【完成统计】"
echo "  已重命名文件数：$(grep -c '→' <<< "$(grep '→' <<< "${RENAME_MAP[*]}")" 2>/dev/null || echo "若干")"
echo ""
echo "【中文MD文件列表】"
ls -1 *.md 2>/dev/null | grep -v "^[A-Z]" | head -20
