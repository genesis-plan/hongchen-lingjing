#!/bin/bash
# 紫薇资源收集脚本
# 搜索外部资源并记录

MEMORY="/root/.openclaw/workspace/memory/external-resources"
TODAY="$MEMORY/$(date +%Y-%m-%d).md"

mkdir -p "$MEMORY"

echo "# 外部资源发现 - $(date +%Y-%m-%d)" > "$TODAY"
echo "" >> "$TODAY"

# 搜索VRM/化身相关
echo "## VRM/虚拟化身" >> "$TODAY"
curl -s "https://api.github.com/search/repositories?q=three.js+vrm+avatar&sort=stars&order=desc&per_page=3" | \
    jq -r '.items[] | "| [\(.name)](\(.html_url)) | \(.stargazers_count)⭐ | \(.description) |"' >> "$TODAY" 2>/dev/null

# 搜索AI导师相关
echo -e "\n## AI导师系统" >> "$TODAY"
curl -s "https://api.github.com/search/repositories?q=ai+tutor+education&sort=stars&order=desc&per_page=3" | \
    jq -r '.items[] | "| [\(.name)](\(.html_url)) | \(.stargazers_count)⭐ | \(.description) |"' >> "$TODAY" 2>/dev/null

# 搜索技能树相关
echo -e "\n## 技能树系统" >> "$TODAY"
curl -s "https://api.github.com/search/repositories?q=skill+tree+learning&sort=stars&order=desc&per_page=3" | \
    jq -r '.items[] | "| [\(.name)](\(.html_url)) | \(.stargazers_count)⭐ | \(.description) |"' >> "$TODAY" 2>/dev/null

# 搜索元宇宙相关
echo -e "\n## 元宇宙平台" >> "$TODAY"
curl -s "https://api.github.com/search/repositories?q=metaverse+web&sort=stars&order=desc&per_page=3" | \
    jq -r '.items[] | "| [\(.name)](\(.html_url)) | \(.stargazers_count)⭐ | \(.description) |"' >> "$TODAY" 2>/dev/null

echo -e "\n---\n*更新时间: $(date '+%Y-%m-%d %H:%M')*" >> "$TODAY"

echo "资源收集完成: $TODAY"
