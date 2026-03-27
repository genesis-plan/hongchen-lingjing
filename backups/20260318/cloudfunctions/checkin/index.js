// 签到系统云函数
const cloud = require('wx-server-sdk')
cloud.init({ env: 'h4-6g0tfhaqc1bbcdb5' })
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { action, data } = event
  const wxContext = cloud.getWXContext()
  const userId = data?.userId || wxContext.OPENID || 'guest'

  // 签到
  if (action === 'checkin') {
    const today = new Date().toISOString().split('T')[0]
    
    // 检查今天是否已签到
    const existing = await db.collection('checkins').where({
      userId,
      date: today
    }).get()
    
    if (existing.data.length > 0) {
      return { success: false, error: '今日已签到', alreadyCheckedIn: true }
    }
    
    // 获取连续签到天数
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    const lastCheckin = await db.collection('checkins').where({
      userId,
      date: yesterday
    }).get()
    
    let streak = 1
    if (lastCheckin.data.length > 0) {
      streak = (lastCheckin.data[0].streak || 0) + 1
    }
    
    // 计算积分奖励
    let points = 10
    if (streak >= 7) points = 50
    else if (streak >= 3) points = 20
    
    // 保存签到记录
    await db.collection('checkins').add({
      data: {
        userId,
        date: today,
        streak,
        points,
        createdAt: new Date()
      }
    })
    
    // 更新用户积分
    await db.collection('users').where({ _openid: userId }).update({
      data: { points: _.inc(points) }
    })
    
    return { 
      success: true, 
      streak, 
      points,
      message: streak >= 7 ? '连续7天签到，奖励50积分！' : 
               streak >= 3 ? '连续3天签到，奖励20积分！' : 
               '签到成功，获得10积分'
    }
  }

  // 获取签到状态
  if (action === 'status') {
    const today = new Date().toISOString().split('T')[0]
    const checkin = await db.collection('checkins').where({
      userId,
      date: today
    }).get()
    
    const lastCheckin = await db.collection('checkins')
      .where({ userId })
      .orderBy('date', 'desc')
      .limit(1)
      .get()
    
    return {
      success: true,
      todayCheckedIn: checkin.data.length > 0,
      streak: lastCheckin.data[0]?.streak || 0,
      lastDate: lastCheckin.data[0]?.date || null
    }
  }

  // 获取签到历史
  if (action === 'history') {
    const { month } = data || {}
    const yearMonth = month || new Date().toISOString().slice(0, 7)
    
    const history = await db.collection('checkins')
      .where({
        userId,
        date: db.RegExp({ regexp: `^${yearMonth}` })
      })
      .orderBy('date', 'asc')
      .get()
    
    return { success: true, dates: history.data.map(h => h.date) }
  }

  return { success: false, error: 'Unknown action' }
}
