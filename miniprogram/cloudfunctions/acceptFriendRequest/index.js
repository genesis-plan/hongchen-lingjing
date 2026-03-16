// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

/**
 * 接受好友请求
 */
exports.main = async (event, context) => {
  const { requestId } = event
  const wxContext = cloud.getWXContext()
  const userId = wxContext.OPENID

  try {
    // 获取请求信息
    const request = await db.collection('friend_requests')
      .doc(requestId)
      .get()

    if (!request.data) {
      return {
        success: false,
        message: '请求不存�?
      }
    }

    const senderId = request.data.senderId
    const receiverId = request.data.receiverId

    // 添加好友关系（双向）
    await db.collection('friends').add({
      data: {
        userId: senderId,
        friendId: receiverId,
        createTime: db.serverDate()
      }
    })

    await db.collection('friends').add({
      data: {
        userId: receiverId,
        friendId: senderId,
        createTime: db.serverDate()
      }
    })

    // 更新请求状�?
    await db.collection('friend_requests')
      .doc(requestId)
      .update({
        data: {
          status: 'accepted'
        }
      })

    return {
      success: true,
      message: '已添加好�?
    }
  } catch (error) {
    console.error('接受好友请求失败�?, error)
    return {
      success: false,
      message: '操作失败'
    }
  }
}
