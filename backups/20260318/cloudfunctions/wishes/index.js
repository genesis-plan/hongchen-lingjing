// 心愿系统云函数
const cloud = require('wx-server-sdk')
cloud.init({ env: 'h4-6g0tfhaqc1bbcdb5' })
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { action, data } = event
  const wxContext = cloud.getWXContext()
  const userId = data?.userId || wxContext.OPENID || 'guest'

  // 发布心愿
  if (action === 'create') {
    const { content, tags = [], category = 'skill' } = data
    
    if (!content || content.trim().length < 10) {
      return { success: false, error: '心愿内容至少10个字' }
    }
    
    const result = await db.collection('wishes').add({
      data: {
        userId,
        content: content.trim(),
        tags,
        category,
        status: 'open',
        likes: 0,
        views: 0,
        createdAt: new Date()
      }
    })
    
    return { success: true, wishId: result._id }
  }

  // 获取心愿列表
  if (action === 'list') {
    const { category, status = 'open', page = 1, pageSize = 20 } = data || {}
    
    let query = db.collection('wishes').where({ status })
    if (category) query = query.where({ category })
    
    const result = await query
      .orderBy('createdAt', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    return { success: true, data: result.data }
  }

  // 点赞心愿
  if (action === 'like') {
    const { wishId } = data
    
    // 检查是否已点赞
    const liked = await db.collection('wishLikes').where({
      wishId,
      userId
    }).get()
    
    if (liked.data.length > 0) {
      return { success: false, error: '已点赞过' }
    }
    
    await db.collection('wishLikes').add({
      data: { wishId, userId, createdAt: new Date() }
    })
    
    await db.collection('wishes').doc(wishId).update({
      data: { likes: _.inc(1) }
    })
    
    return { success: true }
  }

  // 实现心愿（提交技能解决）
  if (action === 'fulfill') {
    const { wishId, skillId } = data
    
    await db.collection('wishes').doc(wishId).update({
      data: {
        status: 'fulfilled',
        fulfilledBy: userId,
        skillId,
        fulfilledAt: new Date()
      }
    })
    
    return { success: true }
  }

  // 获取我的心愿
  if (action === 'my') {
    const result = await db.collection('wishes')
      .where({ userId })
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get()
    
    return { success: true, data: result.data }
  }

  return { success: false, error: 'Unknown action' }
}
