// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

/**
 * 创建技�?
 */
exports.main = async (event, context) => {
  const { skillData } = event

  try {
    // 生成技能ID
    const skillId = 'SKILL' + Date.now()

    // 保存技能到数据�?
    const result = await db.collection('skills')
      .add({
        data: {
          ...skillData,
          skillId,
          learnCount: 0,
          examCount: 0,
          passCount: 0,
          createTime: db.serverDate(),
          updateTime: db.serverDate()
        }
      })

    return {
      success: true,
      message: '技能创建成�?,
      data: {
        skillId,
        result
      }
    }
  } catch (error) {
    console.error('创建技能失败：', error)
    return {
      success: false,
      message: '创建技能失�?,
      error: error.message
    }
  }
}
