// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'cloud1-6g38qqfz90d5e5d1'
})

// 获取数据库引�?
const db = cloud.database()

exports.main = async (event, context) => {
  const { userInfo } = event
  const wxContext = cloud.getWXContext()

  try {
    // 生成唯一用户ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // 检查用户是否已存在
    const existingUser = await db.collection('users').where({
      openid: wxContext.OPENID
    }).get()

    let userIdToReturn

    if (existingUser.data.length > 0) {
      // 用户已存在，更新登录时间
      userIdToReturn = existingUser.data[0].userId
      await db.collection('users').doc(existingUser.data[0]._id).update({
        data: {
          lastLoginTime: new Date(),
          userInfo: userInfo
        }
      })
    } else {
      // 新用户，创建记录
      userIdToReturn = userId
      await db.collection('users').add({
        data: {
          userId: userId,
          openid: wxContext.OPENID,
          userInfo: userInfo,
          createTime: new Date(),
          lastLoginTime: new Date(),
          skills: [],
          progress: {},
          honor: []
        }
      })
    }

    return {
      success: true,
      userId: userIdToReturn,
      isNewUser: existingUser.data.length === 0
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      error: err.message
    }
  }
}
