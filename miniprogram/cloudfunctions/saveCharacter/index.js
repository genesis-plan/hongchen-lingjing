// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

/**
 * 保存灵相（个人形象）
 */
exports.main = async (event, context) => {
  const { userId, character } = event

  try {
    // 检查是否已有灵相记�?
    const existingCharacter = await db.collection('characters')
      .where({
        userId
      })
      .get()

    let result
    if (existingCharacter.data.length > 0) {
      // 更新现有灵相
      result = await db.collection('characters')
        .doc(existingCharacter.data[0]._id)
        .update({
          data: {
            ...character,
            updateTime: db.serverDate()
          }
        })
    } else {
      // 创建新灵�?
      result = await db.collection('characters')
        .add({
          data: {
            userId,
            ...character,
            createTime: db.serverDate(),
            updateTime: db.serverDate()
          }
        })
    }

    return {
      success: true,
      message: '灵相保存成功',
      data: result
    }
  } catch (error) {
    console.error('保存灵相失败�?, error)
    return {
      success: false,
      message: '保存灵相失败',
      error: error.message
    }
  }
}
