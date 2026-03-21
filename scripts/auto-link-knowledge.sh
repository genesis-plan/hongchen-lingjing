#!/bin/bash
# 知识图谱自动关联脚本
# 目标：将孤立节点连接成网络

MEMORY_FILE="/root/.openclaw/workspace/MemoryMesh/dist/data/memory.json"
LOG_FILE="/root/.openclaw/workspace/memory/automation-logs/knowledge-link-$(date +%Y%m%d).log"

mkdir -p $(dirname $LOG_FILE)

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 开始知识图谱自动关联..." >> $LOG_FILE

# 使用Node.js进行关联
node << 'NODE_SCRIPT'
const fs = require('fs');

const memoryFile = '/root/.openclaw/workspace/MemoryMesh/dist/data/memory.json';
const logFile = `/root/.openclaw/workspace/memory/automation-logs/knowledge-link-${new Date().toISOString().slice(0,10).replace(/-/g,'')}.log`;

function log(msg) {
  console.log(msg);
  fs.appendFileSync(logFile, `[${new Date().toISOString()}] ${msg}\n`);
}

// 读取知识图谱
const data = JSON.parse(fs.readFileSync(memoryFile, 'utf8'));
const nodes = data.nodes || [];
let links = data.links || [];

const initialLinkCount = links.length;
log(`当前节点数: ${nodes.length}`);
log(`当前边数: ${initialLinkCount}`);

// 关联规则1：基于类型关联
const typeGroups = {};
nodes.forEach((node, idx) => {
  const type = node.nodeType || 'unknown';
  if (!typeGroups[type]) typeGroups[type] = [];
  typeGroups[type].push({...node, index: idx});
});

// 同类型节点之间建立关联
Object.keys(typeGroups).forEach(type => {
  const group = typeGroups[type];
  if (group.length > 1) {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const source = group[i].index;
        const target = group[j].index;
        
        // 检查是否已存在连接
        const exists = links.some(l => 
          (l.source === source && l.target === target) ||
          (l.source === target && l.target === source)
        );
        
        if (!exists) {
          links.push({
            source: source,
            target: target,
            relation: 'same_type',
            type: type,
            created: new Date().toISOString()
          });
        }
      }
    }
    log(`类型 '${type}' 建立了 ${group.length * (group.length - 1) / 2} 条关联`);
  }
});

// 关联规则2：基于名称相似度
function similarity(str1, str2) {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;
  return 0;
}

for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const name1 = nodes[i].name || '';
    const name2 = nodes[j].name || '';
    
    if (similarity(name1, name2) > 0.7) {
      const exists = links.some(l => 
        (l.source === i && l.target === j) ||
        (l.source === j && l.target === i)
      );
      
      if (!exists) {
        links.push({
          source: i,
          target: j,
          relation: 'similar_name',
          similarity: similarity(name1, name2),
          created: new Date().toISOString()
        });
      }
    }
  }
}

// 关联规则3：基于时间关联（同一天创建的节点）
const dateGroups = {};
nodes.forEach((node, idx) => {
  const date = node.created ? node.created.slice(0, 10) : 'unknown';
  if (!dateGroups[date]) dateGroups[date] = [];
  dateGroups[date].push(idx);
});

Object.keys(dateGroups).forEach(date => {
  const group = dateGroups[date];
  if (group.length > 1 && group.length <= 10) { // 避免某一天节点太多导致边爆炸
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const source = group[i];
        const target = group[j];
        
        const exists = links.some(l => 
          (l.source === source && l.target === target) ||
          (l.source === target && l.target === source)
        );
        
        if (!exists) {
          links.push({
            source: source,
            target: target,
            relation: 'created_same_day',
            date: date,
            created: new Date().toISOString()
          });
        }
      }
    }
  }
});

// 保存结果
data.links = links;
fs.writeFileSync(memoryFile, JSON.stringify(data, null, 2));

const newLinkCount = links.length;
const addedLinks = newLinkCount - initialLinkCount;

log(`关联完成！`);
log(`新增边数: ${addedLinks}`);
log(`总边数: ${newLinkCount}`);
log(`网络密度: ${(2 * newLinkCount / (nodes.length * (nodes.length - 1))).toFixed(4)}`);

NODE_SCRIPT

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 知识图谱关联完成" >> $LOG_FILE
