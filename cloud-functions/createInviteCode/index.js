const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  const { code, maxUses = 1, expiresAt } = event;
  const db = cloud.database();
  
  if (!code) {
    return {
      success: false,
      error: '邀请码不能为空'
    };
  }
  
  try {
    // 检查是否已存在
    const exists = await db.collection('inviteCodes').where({
      code: code
    }).get();
    
    if (exists.data.length > 0) {
      return {
        success: false,
        error: '邀请码已存在'
      };
    }
    
    // 创建邀请码
    const result = await db.collection('inviteCodes').add({
      data: {
        code: code,
        maxUses: maxUses,
        usedCount: 0,
        expiresAt: expiresAt || null,
        createdAt: db.serverDate(),
        usedBy: []
      }
    });
    
    return {
      success: true,
      id: result._id
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};
