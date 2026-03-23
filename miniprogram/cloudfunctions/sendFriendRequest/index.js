// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

/**
 * 发送好友请�?
 */
exports.main = async (event, context) => {
  const { targetUserId } = event
  const wxContext = cloud.getWXContext()
  const senderId = wxContext.OPENID

  try {
    // 检查是否已经是好友
    const existingFriend = await db.collection('friends')
      .where({
        userId: senderId,
        friendId: targetUserId
      })
      .get()

    if (existingFriend.data.length > 0) {
      return {
        success: false,
        message: '已经是好友了'
      }
    }

    // 检查是否已发送请�?
    const existingRequest = await db.collection('friend_requests')
      .where({
        senderId,
        receiverId: targetUserId
      })
      .get()

    if (existingRequest.data.length > 0) {
      return {
        success: false,
        message: '已发送过好友请求'
      }
    }

    // 创建好友请求
    await db.collection('friend_requests')
      .add({
        data: {
          senderId,
          receiverId: targetUserId,
          status: 'pending',
          createTime: db.serverDate()
        }
      })

    return {
      success: true,
      message: '好友请求已发�?
    }
  } catch (error) {
    console.error('发送好友请求失败：', error)
    return {
      success: false,
      message: '发送失�?
    }
  }
}
