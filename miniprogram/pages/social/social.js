// 两仪墟市页面逻辑
Page({
  data: {
    activeTab: 'square',
    searchKeyword: '',
    recommendedUsers: [],
    onlineUsers: [],
    friendGroups: [],
    friendRequests: [],
    requestCount: 0,
    showUserModal: false,
    showChatModal: false,
    currentUser: {},
    chattingFriend: {},
    chatMessages: [],
    chatInput: '',
    chatToView: ''
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  // 加载数据
  loadData() {
    this.loadRecommendedUsers()
    this.loadOnlineUsers()
    this.loadFriends()
    this.loadFriendRequests()
  },

  // 加载推荐用户
  loadRecommendedUsers() {
    wx.cloud.callFunction({
      name: 'getRecommendedUsers',
      data: {},
      success: (res) => {
        this.setData({
          recommendedUsers: res.result.data || []
        })
      }
    })
  },

  // 加载在线用户
  loadOnlineUsers() {
    wx.cloud.callFunction({
      name: 'getOnlineUsers',
      data: {},
      success: (res) => {
        this.setData({
          onlineUsers: res.result.data || []
        })
      }
    })
  },

  // 加载好友列表
  loadFriends() {
    wx.cloud.callFunction({
      name: 'getFriends',
      data: {},
      success: (res) => {
        const friends = res.result.data || []
        this.setData({
          friendGroups: this.groupFriends(friends)
        })
      }
    })
  },

  // 好友分组
  groupFriends(friends) {
    const groups = [
      { name: '在线好友', users: friends.filter(f => f.online) },
      { name: '离线好友', users: friends.filter(f => !f.online) }
    ]
    return groups.filter(g => g.users.length > 0)
  },

  // 加载好友请求
  loadFriendRequests() {
    wx.cloud.callFunction({
      name: 'getFriendRequests',
      data: {},
      success: (res) => {
        this.setData({
          friendRequests: res.result.data || [],
          requestCount: (res.result.data || []).length
        })
      }
    })
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    })
  },

  // 搜索用户
  searchUser() {
    if (!this.data.searchKeyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      })
      return
    }

    wx.cloud.callFunction({
      name: 'searchUser',
      data: {
        keyword: this.data.searchKeyword
      },
      success: (res) => {
        this.setData({
          recommendedUsers: res.result.data || []
        })
      }
    })
  },

  // 切换标签页
  switchTab(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    })
  },

  // 查看用户
  viewUser(e) {
    const user = e.currentTarget.dataset.user
    this.setData({
      currentUser: user,
      showUserModal: true
    })
  },

  // 关闭用户弹窗
  closeUserModal() {
    this.setData({
      showUserModal: false
    })
  },

  // 阻止事件冒泡
  stopPropagation() {},

  // 添加好友
  addFriend(e) {
    const user = e.currentTarget.dataset.user
    if (user.isFriend) {
      return
    }

    wx.showModal({
      title: '添加好友',
      content: `确定要添加 ${user.nickName} 为好友吗？`,
      success: (res) => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'sendFriendRequest',
            data: {
              targetUserId: user.userId
            },
            success: () => {
              wx.showToast({
                title: '好友请求已发送',
                icon: 'success'
              })
            },
            fail: () => {
              wx.showToast({
                title: '发送失败',
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },

  // 同意好友请求
  acceptRequest(e) {
    const { id, user } = e.currentTarget.dataset

    wx.cloud.callFunction({
      name: 'acceptFriendRequest',
      data: { requestId: id },
      success: () => {
        wx.showToast({
          title: '已添加好友',
          icon: 'success'
        })
        this.loadFriendRequests()
        this.loadFriends()
      }
    })
  },

  // 拒绝好友请求
  rejectRequest(e) {
    const id = e.currentTarget.dataset.id

    wx.showModal({
      title: '确认',
      content: '确定要拒绝这个好友请求吗？',
      success: (res) => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'rejectFriendRequest',
            data: { requestId: id },
            success: () => {
              wx.showToast({
                title: '已拒绝',
                icon: 'success'
              })
              this.loadFriendRequests()
            }
          })
        }
      }
    })
  },

  // 打开聊天
  openChat(e) {
    const friend = e.currentTarget.dataset.friend
    this.setData({
      chattingFriend: friend,
      showChatModal: true,
      chatInput: ''
    })
    this.loadChatMessages(friend.userId)
  },

  // 加载聊天消息
  loadChatMessages(friendId) {
    wx.cloud.callFunction({
      name: 'getChatMessages',
      data: { friendId },
      success: (res) => {
        const messages = (res.result.data || []).map(msg => ({
          ...msg,
          type: msg.senderId === getApp().globalData.userInfo.userId ? 'me' : 'other'
        }))
        this.setData({
          chatMessages: messages,
          chatToView: `msg-${messages.length - 1}`
        })
      }
    })
  },

  // 关闭聊天
  closeChatModal() {
    this.setData({
      showChatModal: false
    })
  },

  // 聊天输入
  onChatInput(e) {
    this.setData({
      chatInput: e.detail.value
    })
  },

  // 发送聊天消息
  sendChatMessage() {
    const { chatInput, chattingFriend } = this.data

    if (!chatInput.trim()) {
      return
    }

    wx.cloud.callFunction({
      name: 'sendChatMessage',
      data: {
        receiverId: chattingFriend.userId,
        content: chatInput
      },
      success: () => {
        const newMessage = {
          type: 'me',
          content: chatInput,
          avatar: getApp().globalData.userInfo.avatarUrl || '/images/default-avatar.png'
        }
        this.setData({
          chatMessages: [...this.data.chatMessages, newMessage],
          chatInput: '',
          chatToView: `msg-${this.data.chatMessages.length}`
        })
      }
    })
  },

  // 发送消息
  sendMessage() {
    this.closeUserModal()
    this.openChat({ currentTarget: { dataset: { user: this.data.currentUser } } })
  },

  onShareAppMessage() {
    return {
      title: '两仪墟市 - 社交广场',
      path: '/pages/social/social'
    }
  }
})
