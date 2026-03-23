// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

/**
 * 获取信件列表
 */
exports.main = async (event, context) => {
  const { type } = event
  const wxContext = cloud.getWXContext()
  const userId = wxContext.OPENID

  try {
    let result

    if (type === 'receive') {
      // 获取收到的信�?
      result = await db.collection('letters')
        .where({
          receiverId: userId
        })
        .orderBy('createTime', 'desc')
        .limit(50)
        .get()
    } else if (type === 'sent') {
      // 获取发送的信件
      result = await db.collection('letters')
        .where({
          senderId: userId
        })
        .orderBy('createTime', 'desc')
        .limit(50)
        .get()
    }

    // 格式化数�?
    const letters = (result?.data || []).map(letter => ({
      id: letter._id,
      title: letter.title,
      content: letter.content,
      preview: letter.content.substring(0, 50) + (letter.content.length > 50 ? '...' : ''),
      senderName: letter.senderName,
      receiverName: letter.receiverName,
      read: letter.read || false,
      cardType: letter.cardType,
      time: formatTime(letter.createTime),
      date: formatDate(letter.createTime)
    }))

    return {
      success: true,
      data: letters
    }
  } catch (error) {
    console.error('获取信件失败�?, error)
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

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return `${d.getFullYear()}�?{d.getMonth() + 1}�?{d.getDate()}�?${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
}
