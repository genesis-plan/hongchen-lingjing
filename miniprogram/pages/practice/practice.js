// pages/practice/practice.js
Page({
  data: {
    currentSkill: null,
    currentStep: 0,
    showComplete: false,
    availableSkills: [
      { id: 'taichi', icon: '☯️', name: '太极·无极式', desc: '太极入门第一式' },
      { id: 'hanfu', icon: '👘', name: '汉服系带', desc: '传统服饰系带技巧' },
      { id: 'tea', icon: '🍵', name: '茶道入门', desc: '传统茶艺基础' }
    ],
    steps: []
  },

  onLoad(options) {
    if (options.skill) {
      this.selectSkill({ currentTarget: { dataset: { skill: this.data.availableSkills.find(s => s.id === options.skill) } } })
    }
  },

  // 选择技能
  selectSkill(e) {
    const skill = e.currentTarget.dataset.skill
    this.setData({ currentSkill: skill })

    // 加载技能步骤
    this.loadSkillSteps(skill.id)
  },

  // 加载技能步骤
  loadSkillSteps(skillId) {
    let steps = []

    switch(skillId) {
      case 'taichi':
        steps = [
          { title: '准备姿势', desc: '双脚与肩同宽，自然站立，重心均匀分布', image: '' },
          { title: '膝盖微屈', desc: '膝盖微曲，如轻坐椅子，保持上身正直', image: '' },
          { title: '腰部放松', desc: '腰背挺直，但不过度紧张，保持自然放松', image: '' },
          { title: '双手自然', desc: '双手自然下垂，掌心向内，手指微曲', image: '' },
          { title: '静立调息', desc: '保持姿势，调整呼吸，静立1-3分钟', image: '' }
        ]
        break
      case 'hanfu':
        steps = [
          { title: '整理衣裙', desc: '先将齐胸襦裙的裙腰固定在胸部适当位置', image: '' },
          { title: '穿过系带', desc: '将系带从后腰绕过，在正面交叉', image: '' },
          { title: '打结固定', desc: '将系带在正面或侧面打结，确保牢固', image: '' },
          { title: '调整垂坠', desc: '调整裙摆和系带的垂坠度，使其自然美观', image: '' }
        ]
        break
      case 'tea':
        steps = [
          { title: '温杯烫壶', desc: '用热水冲洗茶具，预热茶具', image: '' },
          { title: '投茶入壶', desc: '将适量茶叶放入茶壶或茶杯中', image: '' },
          { title: '注水冲泡', desc: '用适宜温度的水冲泡，控制注水速度', image: '' },
          { title: '出汤奉茶', desc: '将泡好的茶汤倒入茶杯，奉茶给客人', image: '' }
        ]
        break
    }

    this.setData({
      steps: steps,
      currentStep: 0
    })
  },

  // 上一步
  prevStep() {
    if (this.data.currentStep > 0) {
      this.setData({
        currentStep: this.data.currentStep - 1
      })
    }
  },

  // 下一步
  nextStep() {
    if (this.data.currentStep < this.data.steps.length - 1) {
      this.setData({
        currentStep: this.data.currentStep + 1
      })
    }
  },

  // 完成练习
  completePractice() {
    // 记录练习完成状态
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo && userInfo.userId) {
      const practiceKey = `practice_${this.data.currentSkill.id}`
      wx.setStorageSync(practiceKey, true)

      // 保存到云数据库
      this.saveProgress()
    }

    this.setData({ showComplete: true })
  },

  // 保存进度
  saveProgress() {
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) return

    wx.cloud.callFunction({
      name: 'saveProgress',
      data: {
        userId: userInfo.userId,
        skillId: this.data.currentSkill.id,
        progress: 'completed'
      },
      success: (res) => {
        console.log('进度保存成功', res)
      },
      fail: (err) => {
        console.error('进度保存失败', err)
      }
    })
  },

  // 关闭完成弹窗
  closeComplete() {
    this.setData({ showComplete: false })
  },

  // 前往考核
  goToExam() {
    this.setData({ showComplete: false })
    wx.navigateTo({
      url: '/pages/exam/exam?skill=' + this.data.currentSkill.id
    })
  }
})
