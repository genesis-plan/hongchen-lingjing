// 神机枢阁页面逻辑
Page({
  data: {
    messages: [],
    inputText: '',
    loading: false,
    toView: '',
    currentSkill: '',
    userInfo: {}
  },

  onLoad(options) {
    const app = getApp()
    this.setData({
      userInfo: app.globalData.userInfo || {},
      currentSkill: options.skillName || ''
    })
  },

  // 输入框输入
  onInput(e) {
    this.setData({
      inputText: e.detail.value
    })
  },

  // 快速提问
  askQuestion(e) {
    const question = e.currentTarget.dataset.question
    this.setData({
      inputText: question
    })
    this.send()
  },

  // 发送消息
  send() {
    const { inputText, messages } = this.data

    if (!inputText.trim()) {
      return
    }

    // 添加用户消息
    const newMessages = [...messages, {
      type: 'user',
      content: inputText,
      time: new Date().getTime()
    }]

    this.setData({
      messages: newMessages,
      inputText: '',
      loading: true,
      toView: `msg-${newMessages.length - 1}`
    })

    // 调用AI云函数
    wx.cloud.callFunction({
      name: 'askAI',
      data: {
        question: inputText,
        context: this.buildContext()
      },
      success: (res) => {
        const aiResponse = res.result.data || {
          content: '抱歉，我暂时无法回答这个问题。'
        }
        this.addAIMessage(aiResponse.content)
      },
      fail: () => {
        this.addAIMessage('抱歉，网络连接失败，请稍后重试。')
      }
    })
  },

  // 构建上下文
  buildContext() {
    const { currentSkill, userInfo } = this.data
    return {
      skill: currentSkill,
      userLevel: userInfo.level || '入门',
      messageHistory: this.data.messages.slice(-5) // 最近5条消息
    }
  },

  // 添加AI回复
  addAIMessage(content) {
    const { messages } = this.data
    const newMessages = [...messages, {
      type: 'ai',
      content,
      time: new Date().getTime()
    }]

    this.setData({
      messages: newMessages,
      loading: false,
      toView: `msg-${newMessages.length - 1}`
    })
  },

  // 清空对话
  clearChat() {
    wx.showModal({
      title: '提示',
      content: '确定要清空对话记录吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            messages: []
          })
        }
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '神机枢阁 - AI智慧助手',
      path: '/pages/ai/ai'
    }
  }
})
