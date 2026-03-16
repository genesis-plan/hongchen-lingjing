// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

/**
 * 参加活动
 */
exports.main = async (event, context) => {
  const { activityId } = event
  const wxContext = cloud.getWXContext()
  const userId = wxContext.OPENID

  try {
    // 检查活动是否存�?
    const activity = await db.collection('activities')
      .doc(activityId)
      .get()

    if (!activity.data) {
      return {
        success: false,
        message: '活动不存�?
      }
    }

    // 检查是否已报名
    if (activity.data.participants && activity.data.participants.includes(userId)) {
      return {
        success: false,
        message: '您已报名该活�?
      }
    }

    // 检查是否已满员
    if (activity.data.participantCount >= activity.data.maxParticipants) {
      return {
        success: false,
        message: '活动已满�?
      }
    }

    // 更新活动参与�?
    await db.collection('activities')
      .doc(activityId)
      .update({
        data: {
          participantCount: db.command.inc(1),
          participants: db.command.push([userId])
        }
      })

    return {
      success: true,
      message: '报名成功'
    }
  } catch (error) {
    console.error('参加活动失败�?, error)
    return {
      success: false,
      message: '报名失败'
    }
  }
}
