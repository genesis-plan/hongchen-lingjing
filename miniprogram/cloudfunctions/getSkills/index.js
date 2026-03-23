// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-6g38qqfz90d5e5d1'
})

const db = cloud.database()

exports.main = async (event, context) => {
  try {
    // 获取技能列�?
    const skills = await db.collection('skills').get()

    return {
      success: true,
      skills: skills.data
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: err.message
    }
  }
}
