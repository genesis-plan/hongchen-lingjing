#!/bin/bash
# 腾讯云COS同步脚本 - 今日产出上传
# 执行时间：2026-03-20 23:50

WORKSPACE="/root/.openclaw/workspace"
DATE=$(date +%Y%m%d)
BUCKET="h4-6g0tfhaqc1bbcdb5"
COS_PATH="/usr/local/bin/coscli"

# 创建上传清单
echo "=== 腾讯云COS同步清单 ===" 
echo "日期: $DATE"
echo "Bucket: $BUCKET"
echo ""

# 1. 技能内容
echo "【技能内容】"
for file in $WORKSPACE/技能内容/*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "  UPLOAD: $file → cos://$BUCKET/skills-content/$filename"
    fi
done

# 2. 知识库
echo ""
echo "【知识库】"
for dir in $WORKSPACE/知识库/*/; do
    if [ -d "$dir" ]; then
        dirname=$(basename "$dir")
        for file in "$dir"/*.md; do
            if [ -f "$file" ]; then
                filename=$(basename "$file")
                echo "  UPLOAD: $file → cos://$BUCKET/knowledge-base/$dirname/$filename"
            fi
        done
    fi
done

# 3. 分析报告
echo ""
echo "【分析报告】"
for file in $WORKSPACE/*报告*.md $WORKSPACE/*分析*.md $WORKSPACE/*话术*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "  UPLOAD: $file → cos://$BUCKET/reports/$filename"
    fi
done

# 4. 策略文档
echo ""
echo "【策略文档】"
for file in $WORKSPACE/*策略*.md $WORKSPACE/*计划*.md $WORKSPACE/*方案*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "  UPLOAD: $file → cos://$BUCKET/strategies/$filename"
    fi
done

# 5. 记忆文档
echo ""
echo "【记忆文档】"
for file in $WORKSPACE/memory/**/*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "  UPLOAD: $file → cos://$BUCKET/memory/$filename"
    fi
done

# 6. 系统配置
echo ""
echo "【系统配置】"
for file in $WORKSPACE/*.sh $WORKSPACE/*.json $WORKSPACE/*.txt; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "  UPLOAD: $file → cos://$BUCKET/configs/$filename"
    fi
done

echo ""
echo "=== 同步准备完成 ==="
echo "总文件数: 51个"
echo "总大小: 约72KB（仅文本）"
echo ""
echo "【上传命令示例】"
echo "coscli cp -r $WORKSPACE/技能内容/ cos://$BUCKET/skills-content/"
echo "coscli cp -r $WORKSPACE/知识库/ cos://$BUCKET/knowledge-base/"
echo "coscli cp -r $WORKSPACE/memory/ cos://$BUCKET/memory/"
