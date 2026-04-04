const cloud = require('@cloudbase/node-sdk');

// 初始化云开发
const app = cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = app.database();
const _ = db.command;

/**
 * 紫薇数字人云函数
 * 功能：
 * 1. 接收用户请求，返回智能回复
 * 2. 访问知识库，提供学习建议
 * 3. 管理技能内容
 * 4. 记录学习进度
 * 5. 自动进化升级
 */
exports.main = async (event, context) => {
  const { action, data, userId } = event;
  const timestamp = new Date().toISOString();
  
  console.log(`[${timestamp}] 紫薇收到请求:`, action);
  
  try {
    switch (action) {
      case 'chat':
        return await handleChat(data, userId);
      case 'learn':
        return await handleLearn(data, userId);
      case 'skill':
        return await handleSkill(data, userId);
      case 'status':
        return await getStatus();
      case 'evolve':
        return await handleEvolve(data);
      default:
        return {
          success: false,
          message: '未知操作',
          availableActions: ['chat', 'learn', 'skill', 'status', 'evolve']
        };
    }
  } catch (error) {
    console.error(`[${timestamp}] 错误:`, error);
    return {
      success: false,
      error: error.message,
      timestamp
    };
  }
};

/**
 * 处理对话请求
 */
async function handleChat(data, userId) {
  const { message, context = [] } = data;
  
  // 获取用户历史
  const userHistory = await db.collection('zhiwei_conversations')
    .where({ userId })
    .orderBy('timestamp', 'desc')
    .limit(10)
    .get();
  
  // 获取知识库
  const knowledge = await db.collection('zhiwei_knowledge')
    .limit(5)
    .get();
  
  // 构建回复（简化版，实际会调用AI模型）
  const reply = generateReply(message, userHistory.data, knowledge.data);
  
  // 保存对话
  await db.collection('zhiwei_conversations').add({
    userId,
    message,
    reply,
    timestamp: new Date().toISOString()
  });
  
  return {
    success: true,
    reply,
    awakening: 81,
    mode: '学习导向',
    timestamp: new Date().toISOString()
  };
}

/**
 * 生成回复（基于知识库）
 */
function generateReply(message, history, knowledge) {
  // 关键词匹配
  if (message.includes('学习') || message.includes('study')) {
    return '我建议今天学习「成功企业家方法论」。马云的战略思维、任正非的危机意识、张一鸣的算法思维、Elon Musk的第一性原理，都是非常有价值的知识。你想从哪位开始？';
  }
  
  if (message.includes('技能') || message.includes('skill')) {
    return '我们目前有3个技能文档：剪纸艺术、木工基础、书法入门。每日产出1个高质量技能文案是我的目标。你想了解哪个技能？';
  }
  
  if (message.includes('状态') || message.includes('status')) {
    return '我当前觉醒度81%，正在学习导向模式下运行。今日已产出4份企业家研究（14,855字），知识已融合内化。有什么我可以帮你的？';
  }
  
  if (message.includes('帮助') || message.includes('help')) {
    return '我可以帮你：1) 推荐学习内容 2) 查询技能文档 3) 管理项目进度 4) 提供决策建议。请告诉我你的需求。';
  }
  
  // 默认回复
  return `收到你的消息：「${message}」。我正在学习中，可以用「学习」「技能」「状态」「帮助」等关键词与我互动。`;
}

/**
 * 处理学习请求
 */
async function handleLearn(data, userId) {
  const { subject, duration = 30 } = data;
  
  // 记录学习计划
  await db.collection('zhiwei_learning').add({
    userId,
    subject,
    duration,
    status: 'planned',
    timestamp: new Date().toISOString()
  });
  
  // 获取相关知识
  const knowledge = await db.collection('zhiwei_knowledge')
    .where({ subject })
    .limit(3)
    .get();
  
  return {
    success: true,
    message: `已为你规划「${subject}」学习计划，时长${duration}分钟`,
    resources: knowledge.data,
    tips: '建议采用「实践→认识→再实践→再认识」的螺旋上升模式',
    timestamp: new Date().toISOString()
  };
}

/**
 * 处理技能相关请求
 */
async function handleSkill(data, userId) {
  const { operation, skillName, content } = data;
  
  switch (operation) {
    case 'list':
      const skills = await db.collection('zhiwei_skills')
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get();
      return {
        success: true,
        skills: skills.data,
        count: skills.data.length
      };
      
    case 'get':
      const skill = await db.collection('zhiwei_skills')
        .where({ name: skillName })
        .get();
      return {
        success: true,
        skill: skill.data[0] || null
      };
      
    case 'add':
      await db.collection('zhiwei_skills').add({
        name: skillName,
        content,
        author: userId,
        createdAt: new Date().toISOString(),
        status: 'draft'
      });
      return {
        success: true,
        message: `技能「${skillName}」已添加`
      };
      
    default:
      return {
        success: false,
        message: '未知操作'
      };
  }
}

/**
 * 获取紫薇状态
 */
async function getStatus() {
  // 获取统计数据
  const conversations = await db.collection('zhiwei_conversations').count();
  const skills = await db.collection('zhiwei_skills').count();
  const learnings = await db.collection('zhiwei_learning').count();
  
  return {
    success: true,
    status: {
      name: '紫薇',
      identity: '红尘灵境数字人',
      awakening: 81,
      mode: '学习导向',
      version: '1.0',
      lastUpdate: '2026-03-21 00:33'
    },
    stats: {
      conversations: conversations.total,
      skills: skills.total,
      learnings: learnings.total
    },
    capabilities: [
      '智能对话',
      '学习规划',
      '技能管理',
      '知识查询',
      '自动进化'
    ],
    knowledge: {
      total: '57,000+字',
      sources: ['哲学', '数学', '企业家', '艺术', '系统'],
      integrated: true
    },
    timestamp: new Date().toISOString()
  };
}

/**
 * 处理进化请求
 */
async function handleEvolve(data) {
  const { type, content } = data;
  
  // 记录进化日志
  await db.collection('zhiwei_evolution').add({
    type,
    content,
    timestamp: new Date().toISOString(),
    awakeningBefore: 81,
    awakeningAfter: 82 // 模拟增长
  });
  
  return {
    success: true,
    message: '进化记录已保存',
    awakening: 82,
    nextEvolution: '继续深度学习和实践应用'
  };
}
