// pages/library/library.js
const app = getApp()

Page({
  data: {
    searchKey: '',
    activeCategory: '全部',
    categories: ['全部', '传统服饰', '传统技艺', '传统艺术', '传统工艺', '传统音乐', '传统武术'],
    skills: [],
    filteredSkills: [],
    wish: '',
    seedTags: ['汉服系带', '传统礼仪', '古风涂鸦', '剪纸艺术', '书法入门', '茶道']
  },

  onLoad() {
    this.loadSkills()
  },

  // 加载技能列表
  loadSkills() {
    wx.showLoading({
      title: '加载中...'
    })

    wx.cloud.callFunction({
      name: 'getSkills',
      success: (res) => {
        console.log('技能列表', res.result)

        if (res.result.success) {
          this.setData({
            skills: res.result.skills,
            filteredSkills: res.result.skills
          })
        } else {
          wx.showToast({
            title: '加载失败',
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        console.error('加载技能失败', err)

        // 使用本地默认数据
        this.loadDefaultSkills()
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  // 加载默认技能数据
  loadDefaultSkills() {
    const defaultSkills = [
      { id: 1, icon: '👘', name: '汉服系带', desc: '传统服饰齐胸襦裙系带技巧', category: '传统服饰', difficulty: '入门', learners: 850 },
      { id: 2, icon: '🍵', name: '中国茶道', desc: '传统茶艺泡茶流程与礼仪', category: '传统技艺', difficulty: '进阶', learners: 1200 },
      { id: 3, icon: '✂️', name: '剪纸艺术', desc: '传统民间剪纸技法入门', category: '传统工艺', difficulty: '入门', learners: 680 },
      { id: 4, icon: '🎭', name: '京剧脸谱', desc: '京剧脸谱绘制与色彩寓意', category: '传统艺术', difficulty: '中级', learners: 420 },
      { id: 5, icon: '🖌️', name: '书法入门', desc: '毛笔书法基础笔画练习', category: '传统工艺', difficulty: '入门', learners: 1500 },
      { id: 6, icon: '🎸', name: '古筝入门', desc: '古筝基本指法与简单曲目', category: '传统音乐', difficulty: '入门', learners: 380 },
      { id: 7, icon: '☯️', name: '太极基础', desc: '太极拳站桩与基本功', category: '传统武术', difficulty: '入门', learners: 1200 }
    ]

    this.setData({
      skills: defaultSkills,
      filteredSkills: defaultSkills
    })
  },

  // 搜索输入
  onSearchInput(e) {
    const key = e.detail.value
    this.setData({
      searchKey: key
    })
    this.filterSkills()
  },

  // 分类切换
  onCategoryChange(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      activeCategory: category
    })
    this.filterSkills()
  },

  // 过滤技能
  filterSkills() {
    let filtered = this.data.skills

    // 按分类过滤
    if (this.data.activeCategory !== '全部') {
      filtered = filtered.filter(item => item.category === this.data.activeCategory)
    }

    // 按搜索关键词过滤
    if (this.data.searchKey) {
      const key = this.data.searchKey.toLowerCase()
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(key) ||
        item.desc.toLowerCase().includes(key)
      )
    }

    this.setData({ filteredSkills: filtered })
  },

  // 心愿输入
  onWishInput(e) {
    this.setData({
      wish: e.detail.value
    })
  },

  // 填充心愿
  fillWish(e) {
    const tag = e.currentTarget.dataset.wish
    const wish = `想学习${tag}的相关技能`
    this.setData({
      wish: wish
    })
  },

  // 提交心愿
  submitWish() {
    const wish = this.data.wish.trim()
    if (!wish) {
      wx.showToast({
        title: '请输入心愿内容',
        icon: 'none'
      })
      return
    }

    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo || !userInfo.userId) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '发布中...'
    })

    wx.cloud.callFunction({
      name: 'submitWish',
      data: {
        userId: userInfo.userId,
        wish: wish
      },
      success: (res) => {
        if (res.result.success) {
          wx.showToast({
            title: '心愿发布成功',
            icon: 'success'
          })
          this.setData({ wish: '' })
        } else {
          wx.showToast({
            title: '发布失败',
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        console.error('发布心愿失败', err)
        wx.showToast({
          title: '发布失败',
          icon: 'none'
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },

  // 学习技能
  learnSkill(e) {
    const skill = e.currentTarget.dataset.skill
    wx.navigateTo({
      url: '/pages/practice/practice?skill=' + skill
    })
  }
})
