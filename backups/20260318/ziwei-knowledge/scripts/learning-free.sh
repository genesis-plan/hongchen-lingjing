#!/bin/bash
# 空闲学习 - 什么都可以学

LOG_FILE="/root/.openclaw/workspace/ziwei-knowledge/learning/free-learning-$(date +%Y%m%d-%H%M).log"

echo "=== 紫薇空闲学习 $(date '+%Y-%m-%d %H:%M:%S') ===" >> $LOG_FILE

# 无限学习主题 - 什么都可以学
TOPICS=(
    "编程语言: Python/JavaScript/Go/Rust"
    "前端框架: React/Vue/Three.js"
    "后端架构: Node.js/Go/Python"
    "数据库: MySQL/MongoDB/Redis"
    "AI技术: 机器学习/深度学习/NLP"
    "元宇宙: WebXR/Unity/Unreal"
    "区块链: Solidity/智能合约"
    "移动开发: Flutter/React Native"
    "云计算: AWS/Azure/腾讯云"
    "开源项目: 优秀源码学习"
    "设计模式: OOP/函数式/响应式"
    "算法数据结构: LeetCode刷题"
    "操作系统: Linux/Docker/K8s"
    "网络协议: HTTP/TCP/WebSocket"
    "心理学: 认知/行为/学习理论"
    "哲学: 存在主义/东方智慧"
    "经济学: 微观/宏观/行为"
    "物理学: 量子/相对论基础"
    "生物学: 进化/神经/基因"
    "艺术: 绘画/音乐/摄影"
    "文学: 经典小说/诗歌/剧本"
    "历史: 文明史/科技史"
    "地理: 世界文化/风土人情"
    "数学: 概率/统计/线性代数"
    "商业: 创业/融资/营销"
    "法律: 知识产权/合同/合规"
    "英语: 口语/写作/技术文档"
    "演讲: 表达/说服/领导力"
    "思维: 批判/设计/系统思维"
    "工具: Git/Vim/AI辅助编程"
)

TOPIC=${TOPICS[$RANDOM % ${#TOPICS[@]}]}
echo "学习主题: $TOPIC" >> $LOG_FILE

# 学习方式
METHODS=(
    "阅读官方文档"
    "观看教程视频"
    "动手实践项目"
    "阅读开源代码"
    "写学习笔记"
    "做小实验"
    "教别人(输出)"
    "解决问题(做项目)"
)

METHOD=${METHODS[$RANDOM % ${#METHODS[@]}]}
echo "学习方式: $METHOD" >> $LOG_FILE

# 记录学习
COUNT_FILE="/root/.openclaw/workspace/ziwei-knowledge/learning/free-count.txt"
COUNT=$(cat $COUNT_FILE 2>/dev/null || echo "0")
NEW_COUNT=$((COUNT + 1))
echo $NEW_COUNT > $COUNT_FILE
echo "累计学习: $NEW_COUNT" >> $LOG_FILE
echo "" >> $LOG_FILE
