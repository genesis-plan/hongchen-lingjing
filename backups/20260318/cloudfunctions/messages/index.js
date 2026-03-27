// 消息系统云函数
const cloud = require('wx-server-sdk')
cloud.init({ env: 'h4-6g0tfhaqc1bbcdb5' })
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { action, data } = event
  const wxContext = cloud.getWXContext()
  const userId = data?.userId || wxContext.OPENID || 'guest'

  // 发送消息
  if (action === 'send') {
    const { toUserId, content, type = 'text', relatedId = '' } = data
    
    const result = await db.collection('messages').add({
      data: {
        fromUserId: userId,
        toUserId,
        content,
        type,
        relatedId,
        read: false,
        createdAt: new Date()
      }
    })
    
    return { success: true, messageId: result._id }
  }

  // 获取收件箱
  if (action === 'inbox') {
    const { page = 1, pageSize = 20 } = data || {}
    
    const result = await db.collection('messages')
      .where({ toUserId: userId })
      .orderBy('createdAt', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    return { success: true, data: result.data }
  }

  // 获取发件箱
  if (action === 'sent') {
    const { page = 1, pageSize = 20 } = data || {}
    
    const result = await db.collection('messages')
      .where({ fromUserId: userId })
      .orderBy('createdAt', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    return { success: true, data: result.data }
  }

  // 标记已读
  if (action === 'read') {
    const { messageId } = data
    
    await db.collection('messages').doc(messageId).update({
      data: { read: true, readAt: new Date() }
    })
    
    return { success: true }
  }

  // 获取未读消息数
  if (action === 'unreadCount') {
    const result = await db.collection('messages')
      .where({ toUserId: userId, read: false })
      .count()
    
    return { success: true, count: result.total }
  }

  // 删除消息
  if (action === 'delete') {
    const { messageId } = data
    
    await db.collection('messages').doc(messageId).remove()
    
    return { success: true }
  }

  // 发送系统通知
  if (action === 'system') {
    const { toUserId, title, content, type = 'notification' } = data
    
    const result = await db.collection('notifications').add({
      data: {
        userId: toUserId,
        title,
        content,
        type,
        read: false,
        createdAt: new Date()
      }
    })
    
    return { success: true, notificationId: result._id }
  }

  // 获取通知
  if (action === 'notifications') {
    const result = await db.collection('notifications')
      .where({ userId })
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get()
    
    return { success: true, data: result.data }
  }

  return { success: false, error: 'Unknown action' }
}
