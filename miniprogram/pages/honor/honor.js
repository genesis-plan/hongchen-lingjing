// pages/honor/honor.js
Page({
  data: {
    userInfo: null,
    honorList: [],
    lockedHonors: [],
    skillCount: 0,
    practiceCount: 0
  },

  onLoad() {
    this.loadUserInfo()
    this.loadHonors()
    this.loadStats()
  },

  onShow() {
    this.loadHonors()
    this.loadStats()
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({ userInfo })
    }
  },

  // 加载荣誉
  loadHonors() {
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) return

    const allHonors = [
      { id: 1, name: '太极入门者', icon: '☯️', desc: '完成太极无极式学习与考核', condition: '完成太极无极式学习' },
      { id: 2, name: '汉服达人', icon: '👘', desc: '完成汉服系带学习与考核', condition: '完成汉服系带学习' },
      { id: 3, name: '茶道学徒', icon: '🍵', desc: '完成茶道入门学习与考核', condition: '完成茶道入门学习' },
      { id: 4, name: '初学者', icon: '🎓', desc: '完成第一个技能学习', condition: '完成任意一个技能' },
      { id: 5, name: '勤奋者', icon: '💪', desc: '完成5次练习', condition: '完成5次练习' },
      { id: 6, name: '博学者', icon: '📚', desc: '完成10个技能学习', condition: '完成10个技能' }
    ]

    const unlockedHonors = []
    const lockedHonors = []

    allHonors.forEach(honor => {
      const honorKey = `honor_${honor.id}`
      const unlocked = wx.getStorageSync(honorKey)

      if (unlocked) {
        unlockedHonors.push({
          ...honor,
          date: unlocked.date || new Date().toLocaleDateString()
        })
      } else {
        lockedHonors.push(honor)
      }
    })

    this.setData({
      honorList: unlockedHonors,
      lockedHonors: lockedHonors
    })
  },

  // 加载统计
  loadStats() {
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) return

    let skillCount = 0
    let practiceCount = 0

    // 检查技能完成情况
    const exams = ['taichi', 'hanfu', 'tea']
    exams.forEach(examId => {
      const examKey = `exam_${examId}`
      if (wx.getStorageSync(examKey)) {
        skillCount++
      }

      const practiceKey = `practice_${examId}`
      if (wx.getStorageSync(practiceKey)) {
        practiceCount++
      }
    })

    this.setData({
      skillCount: skillCount,
      practiceCount: practiceCount
    })
  }
})
