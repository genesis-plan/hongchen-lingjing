// pages/exam/exam.js
Page({
  data: {
    currentExam: null,
    currentQuestion: 0,
    selectedAnswer: null,
    examCompleted: false,
    examPassed: false,
    score: 0,
    userName: '',
    certDate: '',
    availableExams: [
      { id: 'taichi', icon: '☯️', name: '太极·无极式', desc: '太极入门考核', completed: false },
      { id: 'hanfu', icon: '👘', name: '汉服系带', desc: '汉服系带考核', completed: false },
      { id: 'tea', icon: '🍵', name: '茶道入门', desc: '茶道基础考核', completed: false }
    ],
    questions: []
  },

  onLoad(options) {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({ userName: userInfo.nickName || '匿名行者' })
    }

    if (options.skill) {
      const exam = this.data.availableExams.find(e => e.id === options.skill)
      if (exam) {
        this.startExam({ currentTarget: { dataset: { exam: exam } } })
      }
    }
  },

  // 开始考核
  startExam(e) {
    const exam = e.currentTarget.dataset.exam

    // 检查是否已完成练习
    const practiceKey = `practice_${exam.id}`
    const practiceCompleted = wx.getStorageSync(practiceKey)

    if (!practiceCompleted) {
      wx.showModal({
        title: '提示',
        content: '请先在考工实训庐完成练习',
        showCancel: false,
        success: () => {
          wx.switchTab({
            url: '/pages/practice/practice'
          })
        }
      })
      return
    }

    // 加载考核题目
    this.loadQuestions(exam.id)

    this.setData({
      currentExam: exam,
      currentQuestion: 0,
      selectedAnswer: null,
      examCompleted: false,
      examPassed: false,
      score: 0
    })
  },

  // 加载考核题目
  loadQuestions(examId) {
    let questions = []

    switch(examId) {
      case 'taichi':
        questions = [
          {
            question: '太极无极式的双脚姿势应该是？',
            options: ['双脚并拢', '双脚与肩同宽', '双脚分开大于肩宽', '单脚站立'],
            answer: 1
          },
          {
            question: '练习无极式时膝盖的状态是？',
            options: ['挺直', '微曲如轻坐', '弯曲90度', '用力下蹲'],
            answer: 1
          },
          {
            question: '无极式双手应该？',
            options: ['上举过头顶', '自然下垂', '双手叉腰', '抱在胸前'],
            answer: 1
          }
        ]
        break
      case 'hanfu':
        questions = [
          {
            question: '齐胸襦裙的系带应该固定在？',
            options: ['腰部', '胸部', '肩部', '臀部'],
            answer: 1
          },
          {
            question: '系带应该在哪个位置交叉？',
            options: ['在背部', '在正面', '在侧面', '不需要交叉'],
            answer: 1
          }
        ]
        break
      case 'tea':
        questions = [
          {
            question: '泡茶第一步需要做什么？',
            options: ['直接倒水', '温杯烫壶', '放茶叶', '倒茶给客人'],
            answer: 1
          },
          {
            question: '注水冲泡时应该？',
            options: ['快速倒入', '控制注水速度', '用冷水', '不要注满'],
            answer: 1
          }
        ]
        break
    }

    this.setData({ questions: questions })
  },

  // 选择答案
  selectOption(e) {
    const index = e.currentTarget.dataset.index
    this.setData({ selectedAnswer: index })
  },

  // 提交答案/下一题
  submitAnswer() {
    if (this.data.selectedAnswer === null) {
      wx.showToast({
        title: '请选择答案',
        icon: 'none'
      })
      return
    }

    // 检查答案是否正确
    const currentQ = this.data.questions[this.data.currentQuestion]
    const isCorrect = this.data.selectedAnswer === currentQ.answer

    if (isCorrect) {
      this.setData({
        score: this.data.score + 1
      })
    }

    // 下一题或提交
    if (this.data.currentQuestion < this.data.questions.length - 1) {
      this.setData({
        currentQuestion: this.data.currentQuestion + 1,
        selectedAnswer: null
      })
    } else {
      // 完成考核
      this.completeExam()
    }
  },

  // 完成考核
  completeExam() {
    const passed = this.data.score >= this.data.questions.length * 0.6

    this.setData({
      examCompleted: true,
      examPassed: passed,
      certDate: new Date().toLocaleDateString()
    })

    if (passed) {
      // 保存考核通过记录
      this.saveExamResult()
    }
  },

  // 保存考核结果
  saveExamResult() {
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) return

    const examKey = `exam_${this.data.currentExam.id}`
    wx.setStorageSync(examKey, true)

    // 保存到云数据库
    wx.cloud.callFunction({
      name: 'saveExamResult',
      data: {
        userId: userInfo.userId,
        examId: this.data.currentExam.id,
        examName: this.data.currentExam.name,
        score: this.data.score,
        totalScore: this.data.questions.length,
        passed: true
      },
      success: (res) => {
        console.log('考核结果保存成功', res)
      },
      fail: (err) => {
        console.error('考核结果保存失败', err)
      }
    })
  },

  // 上一题
  prevQuestion() {
    if (this.data.currentQuestion > 0) {
      this.setData({
        currentQuestion: this.data.currentQuestion - 1,
        selectedAnswer: null
      })
    }
  },

  // 重新考核
  retryExam() {
    this.setData({
      currentQuestion: 0,
      selectedAnswer: null,
      score: 0,
      examCompleted: false
    })
  },

  // 返回列表
  backToList() {
    this.setData({
      currentExam: null,
      currentQuestion: 0,
      selectedAnswer: null,
      examCompleted: false
    })
  },

  // 查看荣誉
  goToHonor() {
    wx.switchTab({
      url: '/pages/honor/honor'
    })
  }
})
