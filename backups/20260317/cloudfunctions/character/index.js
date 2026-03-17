// 灵相系统云函数
const cloud = require('wx-server-sdk')
cloud.init({ env: 'h4-6g0tfhaqc1bbcdb5' })
const db = cloud.database()

exports.main = async (event, context) => {
  const { action, data } = event
  const wxContext = cloud.getWXContext()
  const userId = data?.userId || wxContext.OPENID || 'guest'

  // 创建/更新灵相
  if (action === 'create' || action === 'update') {
    const { 
      nickname, 
      avatar,
      hanfu = '', 
      accessory = '', 
      pattern = '',
      level = 1,
      experience = 0
    } = data
    
    const characterData = {
      userId,
      nickname: nickname || `灵境行者${userId.slice(-4)}`,
      avatar: avatar || '/assets/default-avatar.png',
      hanfu,
      accessory,
      pattern,
      level,
      experience,
      path: '',
      skills: [],
      achievements: [],
      updatedAt: new Date()
    }
    
    // 检查是否已存在
    const existing = await db.collection('characters').where({ userId }).get()
    
    if (existing.data.length > 0) {
      await db.collection('characters').doc(existing.data[0]._id).update({
        data: characterData
      })
      return { success: true, characterId: existing.data[0]._id, updated: true }
    } else {
      const result = await db.collection('characters').add({
        data: { ...characterData, createdAt: new Date() }
      })
      return { success: true, characterId: result._id }
    }
  }

  // 获取灵相
  if (action === 'get') {
    const result = await db.collection('characters').where({ userId }).get()
    
    if (result.data.length === 0) {
      // 自动创建默认灵相
      const defaultChar = await db.collection('characters').add({
        data: {
          userId,
          nickname: `灵境行者${userId.slice(-4)}`,
          avatar: '/assets/default-avatar.png',
          hanfu: '',
          accessory: '',
          pattern: '',
          level: 1,
          experience: 0,
          path: '',
          skills: [],
          achievements: [],
          createdAt: new Date()
        }
      })
      return { success: true, character: {
        _id: defaultChar._id,
        nickname: `灵境行者${userId.slice(-4)}`,
        level: 1
      }}
    }
    
    return { success: true, character: result.data[0] }
  }

  // 升级经验
  if (action === 'addExp') {
    const { exp } = data
    
    const char = await db.collection('characters').where({ userId }).get()
    if (char.data.length === 0) return { success: false, error: '灵相不存在' }
    
    const newExp = (char.data[0].experience || 0) + exp
    let newLevel = char.data[0].level || 1
    
    // 升级规则
    const expNeeded = newLevel * 100
    if (newExp >= expNeeded) {
      newLevel += Math.floor(newExp / expNeeded)
    }
    
    await db.collection('characters').doc(char.data[0]._id).update({
      data: { experience: newExp % expNeeded, level: newLevel }
    })
    
    return { success: true, level: newLevel, experience: newExp % expNeeded }
  }

  // 解锁成就
  if (action === 'unlockAchievement') {
    const { achievementId, title } = data
    
    const char = await db.collection('characters').where({ userId }).get()
    if (char.data.length === 0) return { success: false, error: '灵相不存在' }
    
    const achievements = char.data[0].achievements || []
    if (!achievements.includes(achievementId)) {
      achievements.push(achievementId)
      await db.collection('characters').doc(char.data[0]._id).update({
        data: { achievements }
      })
    }
    
    return { success: true, achievement: title }
  }

  return { success: false, error: 'Unknown action' }
}
