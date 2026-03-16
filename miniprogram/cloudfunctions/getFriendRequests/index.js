// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

/**
 * 获取好友请求
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const userId = wxContext.OPENID

  try {
    const result = await db.collection('friend_requests')
      .where({
        receiverId: userId,
        status: 'pending'
      })
      .orderBy('createTime', 'desc')
      .get()

    // 获取发送者信�?
    const requests = await Promise.all(
      result.data.map(async (request) => {
        const sender = await db.collection('users')
          .where({
            userId: request.senderId
          })
          .get()

        return {
          id: request._id,
          senderId: request.senderId,
          avatarUrl: sender.data[0]?.avatarUrl || '',
          nickName: sender.data[0]?.nickName || '未知用户',
          time: formatTime(request.createTime)
        }
      })
    )

    return {
      success: true,
      data: requests
    }
  } catch (error) {
    console.error('获取好友请求失败�?, error)
    return {
      success: false,
      data: []
    }
  }
}

function formatTime(date) {
  if (!date) return ''
  const d = new Date(date)
  const now = new Date()
  const diff = now - d

  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return Math.floor(diff / 60000) + '分钟�?
  if (diff < 86400000) return Math.floor(diff / 3600000) + '小时�?
  return Math.floor(diff / 86400000) + '天前'
}
