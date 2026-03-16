// 天工开物坊页面逻辑
Page({
  data: {
    formData: {
      name: '',
      category: '',
      description: '',
      icon: '',
      cover: '',
      duration: '',
      difficulty: '',
      steps: [],
      questionCount: 5,
      passScore: 60,
      questions: []
    },
    categories: [
      { id: 1, name: '传统工艺' },
      { id: 2, name: '民俗技艺' },
      { id: 3, name: '艺术表演' },
      { id: 4, name: '民间艺术' },
      { id: 5, name: '生活技能' }
    ],
    difficultyLevels: [
      { id: 1, name: '入门' },
      { id: 2, name: '进阶' },
      { id: 3, name: '精通' }
    ]
  },

  onLoad() {
    // 检查用户是否已登录
    const app = getApp()
    if (!app.globalData.userInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/home/home'
        })
      }, 1500)
    }
  },

  // 表单输入
  onInput(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  // 分类选择
  onCategoryChange(e) {
    const index = e.detail.value
    this.setData({
      'formData.category': this.data.categories[index].name
    })
  },

  // 难度选择
  onDifficultyChange(e) {
    const index = e.detail.value
    this.setData({
      'formData.difficulty': this.data.difficultyLevels[index].name
    })
  },

  // 上传图标
  uploadIcon() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const filePath = res.tempFilePaths[0]
        this.uploadToCloud(filePath, 'icon')
      }
    })
  },

  // 上传封面
  uploadCover() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const filePath = res.tempFilePaths[0]
        this.uploadToCloud(filePath, 'cover')
      }
    })
  },

  // 上传到云存储
  uploadToCloud(filePath, type) {
    wx.cloud.uploadFile({
      cloudPath: `skill-${type}-${Date.now()}.jpg`,
      filePath,
      success: (res) => {
        this.setData({
          [`formData.${type}`]: res.fileID
        })
        wx.showToast({
          title: '上传成功',
          icon: 'success'
        })
      },
      fail: (err) => {
        wx.showToast({
          title: '上传失败',
          icon: 'none'
        })
      }
    })
  },

  // 添加步骤
  addStep() {
    const steps = [...this.data.formData.steps, { title: '', content: '' }]
    this.setData({
      'formData.steps': steps
    })
  },

  // 删除步骤
  deleteStep(e) {
    const { index } = e.currentTarget.dataset
    const steps = this.data.formData.steps.filter((_, i) => i !== index)
    this.setData({
      'formData.steps': steps
    })
  },

  // 步骤内容修改
  onStepChange(e) {
    const { index, field } = e.currentTarget.dataset
    this.setData({
      [`formData.steps[${index}].${field}`]: e.detail.value
    })
  },

  // 添加题目
  addQuestion() {
    const questions = [...this.data.formData.questions, {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    }]
    this.setData({
      'formData.questions': questions
    })
  },

  // 删除题目
  deleteQuestion(e) {
    const { index } = e.currentTarget.dataset
    const questions = this.data.formData.questions.filter((_, i) => i !== index)
    this.setData({
      'formData.questions': questions
    })
  },

  // 题目内容修改
  onQuestionChange(e) {
    const { index, field } = e.currentTarget.dataset
    this.setData({
      [`formData.questions[${index}].${field}`]: e.detail.value
    })
  },

  // 选项内容修改
  onOptionChange(e) {
    const { index, optionIndex } = e.currentTarget.dataset
    this.setData({
      [`formData.questions[${index}].options[${optionIndex}]`]: e.detail.value
    })
  },

  // 正确答案选择
  onCorrectAnswerChange(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      [`formData.questions[${index}].correctAnswer`]: e.detail.value
    })
  },

  // 保存草稿
  saveDraft() {
    wx.setStorageSync('skillDraft', this.data.formData)
    wx.showToast({
      title: '草稿已保存',
      icon: 'success'
    })
  },

  // 提交技能
  submitSkill() {
    const { formData } = this.data

    // 表单验证
    if (!formData.name) {
      wx.showToast({ title: '请输入技能名称', icon: 'none' })
      return
    }
    if (!formData.category) {
      wx.showToast({ title: '请选择技能分类', icon: 'none' })
      return
    }
    if (!formData.description) {
      wx.showToast({ title: '请输入技能简介', icon: 'none' })
      return
    }
    if (formData.steps.length === 0) {
      wx.showToast({ title: '请至少添加一个学习步骤', icon: 'none' })
      return
    }
    if (formData.questions.length === 0) {
      wx.showToast({ title: '请至少添加一道考核题目', icon: 'none' })
      return
    }

    wx.showLoading({ title: '提交中...' })

    // 调用云函数保存技能
    wx.cloud.callFunction({
      name: 'createSkill',
      data: {
        skillData: {
          ...formData,
          creator: getApp().globalData.userInfo.userId,
          status: '待审核',
          createTime: new Date()
        }
      },
      success: (res) => {
        wx.hideLoading()
        wx.showToast({
          title: '提交成功，等待审核',
          icon: 'success'
        })
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/library/library'
          })
        }, 2000)
      },
      fail: (err) => {
        wx.hideLoading()
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        })
      }
    })
  }
})
