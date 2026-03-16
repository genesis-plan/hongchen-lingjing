// pages/space/space.js
Page({
  data: {
    userInfo: null,
    selectedParts: {
      hanfu: '',
      accessory: '',
      pattern: ''
    },
    footprintStory: '你的灵境之旅即将开始...'
  },

  onLoad() {
    this.loadUserInfo()
    this.loadCharacter()
    this.loadFootprint()
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({ userInfo })
    }
  },

  // 加载灵相配置
  loadCharacter() {
    const character = wx.getStorageSync('character')
    if (character) {
      this.setData({
        selectedParts: character
      })
    }
  },

  // 加载足迹故事
  loadFootprint() {
    const footprint = wx.getStorageSync('footprint')
    if (footprint) {
      this.setData({
        footprintStory: footprint
      })
    }
  },

  // 选择部件
  selectPart(e) {
    const type = e.currentTarget.dataset.type
    const value = e.currentTarget.dataset.value

    this.setData({
      [`selectedParts.${type}`]: value
    })
  },

  // 保存灵相
  saveCharacter() {
    const { hanfu, accessory, pattern } = this.data.selectedParts

    if (!hanfu && !accessory && !pattern) {
      wx.showToast({
        title: '请至少选择一项',
        icon: 'none'
      })
      return
    }

    // 保存到本地
    wx.setStorageSync('character', this.data.selectedParts)

    // 保存到云数据库
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      wx.cloud.callFunction({
        name: 'saveCharacter',
        data: {
          userId: userInfo.userId,
          character: this.data.selectedParts
        },
        success: (res) => {
          console.log('灵相保存成功', res)
        },
        fail: (err) => {
          console.error('灵相保存失败', err)
        }
      })
    }

    wx.showToast({
      title: '灵相保存成功',
      icon: 'success'
    })
  },

  // 生成足迹故事
  generateFootprint() {
    const userInfo = wx.getStorageSync('userInfo')
    const character = wx.getStorageSync('character') || {}

    let story = ''

    // 基础信息
    story += `灵境行者${userInfo?.nickName || '无名'}，`
    story += `于${new Date().toLocaleDateString()}初入红尘灵境。`

    // 灵相描述
    if (character.hanfu) {
      story += `身披${character.hanfu}，`
    }
    if (character.accessory) {
      story += `佩戴${character.accessory}，`
    }
    if (character.pattern) {
      story += `饰以${character.pattern}纹饰，`
    }

    // 技能足迹
    let skills = []
    if (wx.getStorageSync('exam_taichi')) skills.push('太极')
    if (wx.getStorageSync('exam_hanfu')) skills.push('汉服系带')
    if (wx.getStorageSync('exam_tea')) skills.push('茶道')

    if (skills.length > 0) {
      story += `已习得${skills.join('、')}等技能，`
    }

    story += `在灵境中留下独特印记，继续传承之路。`

    this.setData({
      footprintStory: story
    })

    // 保存足迹
    wx.setStorageSync('footprint', story)

    wx.showToast({
      title: '足迹故事已生成',
      icon: 'success'
    })
  }
})
