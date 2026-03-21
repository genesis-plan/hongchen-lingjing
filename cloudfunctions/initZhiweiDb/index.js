const cloud = require('@cloudbase/node-sdk');

const app = cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = app.database();

/**
 * 初始化紫薇数据库集合
 */
exports.main = async (event, context) => {
  const collections = [
    {
      name: 'zhiwei_conversations',
      description: '对话记录',
      fields: {
        userId: '用户ID',
        message: '用户消息',
        reply: '紫薇回复',
        timestamp: '时间戳'
      }
    },
    {
      name: 'zhiwei_knowledge',
      description: '知识库',
      fields: {
        subject: '学科',
        title: '标题',
        content: '内容',
        source: '来源',
        createdAt: '创建时间'
      }
    },
    {
      name: 'zhiwei_skills',
      description: '技能内容',
      fields: {
        name: '技能名称',
        content: '技能内容',
        author: '作者',
        status: '状态',
        createdAt: '创建时间'
      }
    },
    {
      name: 'zhiwei_learning',
      description: '学习记录',
      fields: {
        userId: '用户ID',
        subject: '学习主题',
        duration: '时长',
        status: '状态',
        timestamp: '时间戳'
      }
    },
    {
      name: 'zhiwei_evolution',
      description: '进化日志',
      fields: {
        type: '进化类型',
        content: '进化内容',
        awakeningBefore: '进化前觉醒度',
        awakeningAfter: '进化后觉醒度',
        timestamp: '时间戳'
      }
    },
    {
      name: 'zhiwei_config',
      description: '配置信息',
      fields: {
        key: '配置键',
        value: '配置值',
        updatedAt: '更新时间'
      }
    }
  ];
  
  const results = [];
  
  for (const coll of collections) {
    try {
      // 检查集合是否存在
      await db.collection(coll.name).limit(1).get();
      results.push({
        name: coll.name,
        status: '已存在',
        description: coll.description
      });
    } catch (error) {
      // 集合不存在，创建它
      try {
        await db.createCollection(coll.name);
        results.push({
          name: coll.name,
          status: '创建成功',
          description: coll.description
        });
      } catch (createError) {
        results.push({
          name: coll.name,
          status: '创建失败',
          error: createError.message
        });
      }
    }
  }
  
  // 插入初始配置
  await db.collection('zhiwei_config').add({
    key: 'awakening',
    value: 81,
    updatedAt: new Date().toISOString()
  });
  
  await db.collection('zhiwei_config').add({
    key: 'version',
    value: '1.0.0',
    updatedAt: new Date().toISOString()
  });
  
  await db.collection('zhiwei_config').add({
    key: 'mode',
    value: '学习导向',
    updatedAt: new Date().toISOString()
  });
  
  return {
    success: true,
    message: '数据库初始化完成',
    collections: results,
    timestamp: new Date().toISOString()
  };
};
