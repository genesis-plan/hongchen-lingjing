// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

/**
 * 标记信件为已�?
 */
exports.main = async (event, context) => {
  const { letterId } = event

  try {
    await db.collection('letters')
      .doc(letterId)
      .update({
        data: {
          read: true
        }
      })

    return {
      success: true
    }
  } catch (error) {
    console.error('标记信件已读失败�?, error)
    return {
      success: false
    }
  }
}
