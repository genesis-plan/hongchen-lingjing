// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-6g38qqfz90d5e5d1'
})

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { userId, wish } = event

  try {
    // 创建心愿记录
    await db.collection('wishes').add({
      data: {
        userId: userId,
        wish: wish,
        status: 'pending',
        createTime: new Date()
      }
    })

    return {
      success: true,
      message: '心愿发布成功'
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: err.message
    }
  }
}
