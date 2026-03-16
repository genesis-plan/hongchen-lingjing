// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

/**
 * 保存考核结果
 */
exports.main = async (event, context) => {
  const { userId, skillId, score, correctCount, totalCount, questions, answers } = event

  try {
    // 生成证书编号
    const certificateId = 'HCLJ' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase()

    // 判断是否通过（及格分�?0分）
    const passed = score >= 60

    // 保存考核结果
    const result = await db.collection('exam_results')
      .add({
        data: {
          userId,
          skillId,
          score,
          correctCount,
          totalCount,
          certificateId,
          passed,
          questions,
          answers,
          createTime: db.serverDate()
        }
      })

    // 如果通过考核，自动授予荣�?
    if (passed) {
      const skill = await db.collection('skills')
        .doc(skillId)
        .get()

      if (skill.data) {
        // 检查是否已获得该荣�?
        const existingHonor = await db.collection('honors')
          .where({
            userId,
            skillId
          })
          .get()

        if (existingHonor.data.length === 0) {
          await db.collection('honors')
            .add({
              data: {
                userId,
                skillId,
                skillName: skill.data.name,
                honorLevel: '认证传承�?,
                certificateId,
                obtainTime: db.serverDate()
              }
            })
        }
      }
    }

    return {
      success: true,
      message: passed ? '考核通过�? : '考核未通过，请继续努力',
      data: {
        result,
        certificateId,
        passed,
        score
      }
    }
  } catch (error) {
    console.error('保存考核结果失败�?, error)
    return {
      success: false,
      message: '保存考核结果失败',
      error: error.message
    }
  }
}
