// 云函数入口文�?
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

/**
 * 获取社区帖子列表
 */
exports.main = async (event, context) => {
  const { page, pageSize } = event

  try {
    const result = await db.collection('posts')
      .orderBy('createTime', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()

    // 格式化数�?
    const posts = result.data.map(post => ({
      id: post._id,
      title: post.title,
      content: post.content,
      category: post.category,
      image: post.image,
      likeCount: post.likeCount || 0,
      commentCount: post.commentCount || 0,
      author: post.author,
      time: formatTime(post.createTime)
    }))

    return {
      success: true,
      data: posts
    }
  } catch (error) {
    console.error('获取帖子列表失败�?, error)
    return {
      success: false,
      data: []
    }
  }
}

function formatTime(date) {
  if (!date) return ''
  const d = new Date(date)
  const now = new Date()
  const diff = now - d

  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return Math.floor(diff / 60000) + '分钟�?
  if (diff < 86400000) return Math.floor(diff / 3600000) + '小时�?
  return Math.floor(diff / 86400000) + '天前'
}
