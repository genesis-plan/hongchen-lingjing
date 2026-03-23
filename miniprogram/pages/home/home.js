// pages/home/home.js
const app = getApp()

Page({
  data: {
    userInfo: null,
    buildings: [
      { id: 1, icon: '🚪', name: '灵槎津渡', desc: '初入灵境', path: '/pages/landing/landing' },
      { id: 2, icon: '📜', name: '琅嬛福地', desc: '技能图书馆', path: '/pages/library/library' },
      { id: 3, icon: '📋', name: '考工实训庐', desc: '技能实操', path: '/pages/practice/practice' },
      { id: 4, icon: '⚖️', name: '百炼鉴心台', desc: '考核认证', path: '/pages/exam/exam' },
      { id: 5, icon: '🛠️', name: '天工开物坊', desc: '创造本源', path: '/pages/create/create' },
      { id: 6, icon: '🧠', name: '神机枢阁', desc: '智慧中枢', path: '/pages/shenji/shenji' },
      { id: 7, icon: '👥', name: '群贤毕至堂', desc: '社区共治', path: '/pages/govern/govern' },
      { id: 8, icon: '🏆', name: '荣光麟阁', desc: '荣誉殿堂', path: '/pages/honor/honor' },
      { id: 9, icon: '🕊️', name: '青鸟星驿', desc: '时空交互', path: '/pages/post/post' },
      { id: 10, icon: '☯️', name: '两仪墟市', desc: '社交休闲', path: '/pages/market/market' },
      { id: 11, icon: '🌐', name: '万象璇玑阁', desc: '资源中枢', path: '/pages/resource/resource' },
      { id: 12, icon: '💰', name: '泉府通衢', desc: '经济市场', path: '/pages/economy/economy' },
      { id: 13, icon: '🪷', name: '芥子藏虚', desc: '个人空间', path: '/pages/space/space' },
      { id: 14, icon: '🌟', name: '星枢问道台', desc: '活动挑战', path: '/pages/challenge/challenge' }
    ],
    stats: {
      skillsLearned: 0,
      practiceCount: 0,
      honorCount: 0
    }
  },

  onLoad() {
    this.loadUserInfo()
    this.loadStats()
  },

  onShow() {
    // 每次显示页面时刷新统计
    this.loadStats()
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({ userInfo })
    } else {
      // 未登录，跳转到登岸页面
      wx.redirectTo({
        url: '/pages/landing/landing'
      })
    }
  },

  // 加载统计数据
  loadStats() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo && userInfo.userId) {
      // 从数据库获取用户统计
      wx.cloud.callFunction({
        name: 'getUserStats',
        data: {
          userId: userInfo.userId
        },
        success: (res) => {
          if (res.result.success) {
            this.setData({
              stats: res.result.stats
            })
          }
        },
        fail: (err) => {
          console.error('获取统计失败', err)
        }
      })
    }
  },

  // 跳转到建筑页面
  goToBuilding(e) {
    const index = e.currentTarget.dataset.index
    const building = this.data.buildings[index]

    if (building.id === 1) {
      // 灵槎津渡使用普通跳转
      wx.redirectTo({
        url: building.path
      })
    } else if (building.id === 2 || building.id === 3 || building.id === 8 || building.id === 13) {
      // tab页使用switchTab
      const tabMap = {
        2: '/pages/library/library',
        3: '/pages/practice/practice',
        8: '/pages/honor/honor',
        13: '/pages/space/space'
      }
      wx.switchTab({
        url: tabMap[building.id]
      })
    } else {
      // 其他页面使用navigateTo
      wx.navigateTo({
        url: building.path
      })
    }
  }
})
