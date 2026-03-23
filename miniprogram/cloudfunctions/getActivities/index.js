// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

/**
 * 获取社区活动列表
 */
exports.main = async (event, context) => {
  try {
    const result = await db.collection('activities')
      .orderBy('createTime', 'desc')
      .limit(20)
      .get()

    // 格式化数�?
    const activities = result.data.map(activity => ({
      id: activity._id,
      title: activity.title,
      time: activity.time,
      location: activity.location,
      image: activity.image,
      participantCount: activity.participantCount || 0,
      maxParticipants: activity.maxParticipants,
      status: activity.status,
      statusText: activity.statusText,
      joined: activity.joined || false
    }))

    return {
      success: true,
      data: activities
    }
  } catch (error) {
    console.error('获取活动列表失败�?, error)
    return {
      success: false,
      data: []
    }
  }
}
