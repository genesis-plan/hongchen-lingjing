// app.js
App({
  onLaunch() {
    // 初始化云开发环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cloud1-6g38qqfz90d5e5d1', // 云开发环境ID
        traceUser: true
      })
    }

    // 检查用户登录状态
    this.checkLogin()
  },

  // 检查登录状态
  checkLogin() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
      this.globalData.isLoggedIn = true
    }
  },

  globalData: {
    userInfo: null,
    isLoggedIn: false,
    currentBuilding: 0, // 当前所在建筑索引
    skills: [], // 技能列表
    userProgress: {}, // 用户学习进度
    userId: '' // 用户唯一ID
  }
})
