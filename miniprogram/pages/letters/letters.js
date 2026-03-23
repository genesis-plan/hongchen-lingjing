// 青鸟星驿页面逻辑
Page({
  data: {
    activeTab: 'receive',
    receivedLetters: [],
    sentLetters: [],
    draftLetters: [],
    showWriteModal: false,
    showReadModal: false,
    editingDraft: false,
    currentDraftId: '',
    currentLetter: {},
    letterForm: {
      receiver: '',
      title: '',
      content: '',
      sendTime: 'now',
      sendTimeText: '立即发送',
      cardType: 'normal'
    },
    timeOptions: [
      { id: 'now', name: '立即发送' },
      { id: '1h', name: '1小时后' },
      { id: '24h', name: '24小时后' },
      { id: '3d', name: '3天后' }
    ]
  },

  onLoad() {
    this.loadLetters()
  },

  onShow() {
    // 每次显示页面都刷新数据
    this.loadLetters()
  },

  // 加载信件
  loadLetters() {
    this.loadReceivedLetters()
    this.loadSentLetters()
    this.loadDraftLetters()
  },

  // 加载收到的信件
  loadReceivedLetters() {
    wx.cloud.callFunction({
      name: 'getLetters',
      data: {
        type: 'receive'
      },
      success: (res) => {
        this.setData({
          receivedLetters: res.result.data || []
        })
      }
    })
  },

  // 加载已发送的信件
  loadSentLetters() {
    wx.cloud.callFunction({
      name: 'getLetters',
      data: {
        type: 'sent'
      },
      success: (res) => {
        this.setData({
          sentLetters: res.result.data || []
        })
      }
    })
  },

  // 加载草稿
  loadDraftLetters() {
    const drafts = wx.getStorageSync('letterDrafts') || []
    this.setData({
      draftLetters: drafts
    })
  },

  // 切换标签页
  switchTab(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    })
  },

  // 读信
  readLetter(e) {
    const letter = e.currentTarget.dataset.letter
    this.setData({
      currentLetter: letter,
      showReadModal: true
    })

    // 标记为已读
    if (!letter.read) {
      wx.cloud.callFunction({
        name: 'markLetterRead',
        data: { letterId: letter.id }
      })
    }
  },

  // 关闭读信弹窗
  closeReadModal() {
    this.setData({
      showReadModal: false
    })
  },

  // 回复信件
  replyLetter() {
    const { currentLetter } = this.data
    this.closeReadModal()

    this.setData({
      showWriteModal: true,
      letterForm: {
        ...this.data.letterForm,
        receiver: currentLetter.senderName,
        title: 'Re: ' + currentLetter.title
      }
    })
  },

  // 显示写信弹窗
  showWriteModal() {
    this.setData({
      showWriteModal: true,
      editingDraft: false,
      letterForm: {
        receiver: '',
        title: '',
        content: '',
        sendTime: 'now',
        sendTimeText: '立即发送',
        cardType: 'normal'
      }
    })
  },

  // 隐藏写信弹窗
  hideWriteModal() {
    this.setData({
      showWriteModal: false
    })
  },

  // 阻止事件冒泡
  stopPropagation() {},

  // 表单输入
  onInput(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`letterForm.${field}`]: e.detail.value
    })
  },

  // 选择发送时间
  onTimeSelect(e) {
    const index = e.detail.value
    this.setData({
      'letterForm.sendTime': this.data.timeOptions[index].id,
      'letterForm.sendTimeText': this.data.timeOptions[index].name
    })
  },

  // 选择信件卡片
  selectCard(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      'letterForm.cardType': type
    })
  },

  // 保存草稿
  saveDraft() {
    const { letterForm, currentDraftId } = this.data

    if (!letterForm.title && !letterForm.content) {
      wx.showToast({
        title: '请输入标题或内容',
        icon: 'none'
      })
      return
    }

    const drafts = wx.getStorageSync('letterDrafts') || []
    const draft = {
      id: currentDraftId || 'draft-' + Date.now(),
      title: letterForm.title,
      content: letterForm.content,
      receiver: letterForm.receiver,
      cardType: letterForm.cardType,
      time: new Date().toLocaleString()
    }

    if (currentDraftId) {
      // 更新草稿
      const index = drafts.findIndex(d => d.id === currentDraftId)
      if (index !== -1) {
        drafts[index] = draft
      }
    } else {
      // 新增草稿
      drafts.unshift(draft)
    }

    wx.setStorageSync('letterDrafts', drafts)

    wx.showToast({
      title: '草稿已保存',
      icon: 'success'
    })

    this.hideWriteModal()
    this.loadDraftLetters()
  },

  // 编辑草稿
  editDraft(e) {
    const draft = e.currentTarget.dataset.draft
    this.setData({
      showWriteModal: true,
      editingDraft: true,
      currentDraftId: draft.id,
      letterForm: {
        receiver: draft.receiver || '',
        title: draft.title || '',
        content: draft.content || '',
        sendTime: 'now',
        sendTimeText: '立即发送',
        cardType: draft.cardType || 'normal'
      }
    })
  },

  // 删除草稿
  deleteDraft(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个草稿吗？',
      success: (res) => {
        if (res.confirm) {
          const drafts = wx.getStorageSync('letterDrafts') || []
          const newDrafts = drafts.filter(d => d.id !== id)
          wx.setStorageSync('letterDrafts', newDrafts)
          this.loadDraftLetters()
          wx.showToast({
            title: '已删除',
            icon: 'success'
          })
        }
      }
    })
  },

  // 发送信件
  sendLetter() {
    const { letterForm } = this.data

    if (!letterForm.receiver) {
      wx.showToast({
        title: '请输入收信人',
        icon: 'none'
      })
      return
    }
    if (!letterForm.title) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      })
      return
    }
    if (!letterForm.content) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }

    wx.showLoading({ title: '发送中...' })

    wx.cloud.callFunction({
      name: 'sendLetter',
      data: {
        letter: {
          ...letterForm,
          senderId: getApp().globalData.userInfo.userId,
          senderName: getApp().globalData.userInfo.nickName || '匿名用户',
          createTime: new Date()
        }
      },
      success: () => {
        wx.hideLoading()
        wx.showToast({
          title: '发送成功',
          icon: 'success'
        })

        // 如果是编辑草稿，删除草稿
        if (this.data.editingDraft) {
          const drafts = wx.getStorageSync('letterDrafts') || []
          const newDrafts = drafts.filter(d => d.id !== this.data.currentDraftId)
          wx.setStorageSync('letterDrafts', newDrafts)
        }

        this.hideWriteModal()
        this.loadLetters()
      },
      fail: () => {
        wx.hideLoading()
        wx.showToast({
          title: '发送失败',
          icon: 'none'
        })
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '青鸟星驿 - 时空信笺',
      path: '/pages/letters/letters'
    }
  }
})
