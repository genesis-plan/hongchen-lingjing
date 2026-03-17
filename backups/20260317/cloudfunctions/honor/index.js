// 排行榜/荣誉系统云函数
const cloud = require('wx-server-sdk')
cloud.init({ env: 'h4-6g0tfhaqc1bbcdb5' })
const db = cloud.database()

exports.main = async (event, context) => {
  const { action, data } = event

  // 获取排行榜
  if (action === 'get') {
    const { type = 'points', period = 'all', limit = 100 } = data || {}
    
    let orderBy = 'points'
    if (type === 'skills') orderBy = 'skillCount'
    else if (type === 'checkin') orderBy = 'checkinStreak'
    else if (type === 'contribution') orderBy = 'contribution'
    
    const result = await db.collection('users')
      .orderBy(orderBy, 'desc')
      .limit(limit)
      .get()
    
    const ranked = result.data.map((u, i) => ({
      rank: i + 1,
      nickname: u.nickname || `行者${u._openid?.slice(-4) || '0000'}`,
      points: u.points || 0,
      level: u.level || 1,
      avatar: u.avatar || '/assets/default-avatar.png'
    }))
    
    return { success: true, type, data: ranked }
  }

  // 获取个人排名
  if (action === 'myRank') {
    const wxContext = cloud.getWXContext()
    const userId = data?.userId || wxContext.OPENID || 'guest'
    
    // 获取所有用户并排序
    const allUsers = await db.collection('users').orderBy('points', 'desc').get()
    
    const rank = allUsers.data.findIndex(u => u._openid === userId) + 1
    const user = allUsers.data.find(u => u._openid === userId)
    
    return { success: true, rank: rank || '未上榜', points: user?.points || 0 }
  }

  // 获取成就列表
  if (action === 'achievements') {
    const achievements = [
      { id: 'first_checkin', title: '初识灵境', desc: '完成首次签到', icon: '🌟' },
      { id: 'week_checkin', title: '坚持不懈', desc: '连续签到7天', icon: '🔥' },
      { id: 'month_checkin', title: '月月相伴', desc: '连续签到30天', icon: '💎' },
      { id: 'first_skill', title: '初为人师', desc: '发布第一个技能', icon: '📚' },
      { id: 'skill_master', title: '技能大师', desc: '发布10个技能', icon: '🎓' },
      { id: 'first_task', title: '初入江湖', desc: '完成第一个任务', icon: '⚔️' },
      { id: 'task_master', title: '任务达人', desc: '完成20个任务', icon: '🏆' },
      { id: 'wish_granted', title: '心愿达成', desc: '心愿被实现', icon: '✨' },
      { id: 'helper', title: '助人为乐', desc: '帮助他人实现5个心愿', icon: '🙏' },
      { id: 'popular', title: '万人迷', desc: '获得100个赞', icon: '❤️' }
    ]
    
    return { success: true, achievements }
  }

  // 获取公告/活动
  if (action === 'announcements') {
    const announcements = [
      {
        id: '1',
        title: '红尘灵境v0.1.0-alpha发布',
        content: '元宇宙技能传承平台正式上线测试',
        date: '2026-03-17',
        type: 'important'
      },
      {
        id: '2',
        title: '签到活动开启',
        content: '连续签到7天可获得50积分奖励',
        date: '2026-03-17',
        type: 'activity'
      }
    ]
    
    return { success: true, announcements }
  }

  return { success: false, error: 'Unknown action' }
}
