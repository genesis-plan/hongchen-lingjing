// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({ env: 'cloud1-6g38qqfz90d5e5d1' })
const db = cloud.database()
const _ = db.command

/**
 * 保存学习进度
 */
exports.main = async (event, context) => {
  const { userId, skillId, progress, completedSteps, lastStep } = event

  try {
    // 检查是否已有记�?
    const existingRecord = await db.collection('practice_records')
      .where({
        userId,
        skillId
      })
      .get()

    let result
    if (existingRecord.data.length > 0) {
      // 更新现有记录
      result = await db.collection('practice_records')
        .doc(existingRecord.data[0]._id)
        .update({
          data: {
            progress,
            completedSteps,
            lastStep,
            updateTime: db.serverDate()
          }
        })
    } else {
      // 创建新记�?
      result = await db.collection('practice_records')
        .add({
          data: {
            userId,
            skillId,
            progress,
            completedSteps,
            lastStep,
            createTime: db.serverDate(),
            updateTime: db.serverDate()
          }
        })
    }

    return {
      success: true,
      message: '进度保存成功',
      data: result
    }
  } catch (error) {
    console.error('保存进度失败�?, error)
    return {
      success: false,
      message: '保存进度失败',
      error: error.message
    }
  }
}
