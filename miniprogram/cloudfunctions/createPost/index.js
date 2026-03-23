// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

/**
 * 创建帖子
 */
exports.main = async (event, context) => {
  const { post } = event

  try {
    const result = await db.collection('posts')
      .add({
        data: post
      })

    return {
      success: true,
      data: result
    }
  } catch (error) {
    console.error('创建帖子失败�?, error)
    return {
      success: false,
      message: '创建帖子失败'
    }
  }
}
