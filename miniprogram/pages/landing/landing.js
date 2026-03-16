// pages/landing/landing.js
const app = getApp()

Page({
  data: {
    userId: '',
    loading: false
  },

  onLoad() {
    // 检查是否已登录
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo && userInfo.userId) {
      this.setData({
        userId: userInfo.userId
      })
    }
  },

  // 处理登录
  handleLogin() {
    if (this.data.loading) return

    this.setData({ loading: true })

    // 获取用户信息
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        console.log('用户信息获取成功', res.userInfo)

        // 调用登录云函数
        wx.cloud.callFunction({
          name: 'login',
          data: {
            userInfo: res.userInfo
          },
          success: (cloudRes) => {
            console.log('登录成功', cloudRes.result)

            if (cloudRes.result.success) {
              const userId = cloudRes.result.userId

              // 保存用户信息到本地
              wx.setStorageSync('userInfo', {
                userId: userId,
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl
              })

              // 更新全局数据
              app.globalData.userInfo = res.userInfo
              app.globalData.userId = userId
              app.globalData.isLoggedIn = true

              this.setData({
                userId: userId,
                loading: false
              })

              wx.showToast({
                title: '登岸成功',
                icon: 'success'
              })
            } else {
              wx.showToast({
                title: '登录失败',
                icon: 'none'
              })
              this.setData({ loading: false })
            }
          },
          fail: (err) => {
            console.error('登录失败', err)
            wx.showToast({
              title: '登录失败，请重试',
              icon: 'none'
            })
            this.setData({ loading: false })
          }
        })
      },
      fail: (err) => {
        console.error('获取用户信息失败', err)
        wx.showToast({
          title: '需要授权才能继续',
          icon: 'none'
        })
        this.setData({ loading: false })
      }
    })
  },

  // 进入首页
  goToHome() {
    wx.switchTab({
      url: '/pages/home/home'
    })
  }
})
