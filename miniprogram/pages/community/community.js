// 群贤毕至堂页面逻辑
Page({
  data: {
    activeTab: 'posts',
    posts: [],
    activities: [],
    rules: [],
    agreements: [],
    showCreatePostModal: false,
    postForm: {
      title: '',
      category: '',
      content: '',
      image: ''
    },
    postCategories: ['学习心得', '技能分享', '经验交流', '问答求助'],
    hasMorePosts: true
  },

  onLoad() {
    this.loadData()
  },

  loadData() {
    this.loadPosts()
    this.loadActivities()
    this.loadRules()
  },

  // 加载帖子
  loadPosts() {
    wx.cloud.callFunction({
      name: 'getPosts',
      data: {
        page: 1,
        pageSize: 10
      },
      success: (res) => {
        this.setData({
          posts: res.result.data || []
        })
      }
    })
  },

  // 加载活动
  loadActivities() {
    wx.cloud.callFunction({
      name: 'getActivities',
      data: {},
      success: (res) => {
        this.setData({
          activities: res.result.data || []
        })
      }
    })
  },

  // 加载社区规则
  loadRules() {
    this.setData({
      rules: [
        {
          title: '尊重他人',
          content: '在社区中请尊重每一位成员，友善交流，避免人身攻击和恶意言论。'
        },
        {
          title: '内容规范',
          content: '发布内容请遵守法律法规，不得发布违法、虚假、低俗、涉政等不良信息。'
        },
        {
          title: '积极分享',
          content: '鼓励分享学习心得、技能经验，帮助社区共同进步。'
        },
        {
          title: '保护隐私',
          content: '请勿泄露他人隐私信息，尊重知识产权。'
        },
        {
          title: '拒绝广告',
          content: '禁止发布商业广告、推广信息等。'
        }
      ],
      agreements: [
        { text: '我已阅读并同意社区公约', checked: false },
        { text: '我将遵守社区规则，共建和谐社区', checked: false }
      ]
    })
  },

  // 切换标签页
  switchTab(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    })
  },

  // 查看帖子详情
  viewPost(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?id=${id}`
    })
  },

  // 加载更多帖子
  loadMorePosts() {
    wx.showLoading({ title: '加载中...' })
    // 模拟加载
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '已加载全部内容',
        icon: 'none'
      })
      this.setData({
        hasMorePosts: false
      })
    }, 1000)
  },

  // 参加活动
  joinActivity(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认报名',
      content: '确定要报名参加这个活动吗？',
      success: (res) => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'joinActivity',
            data: { activityId: id },
            success: () => {
              wx.showToast({
                title: '报名成功',
                icon: 'success'
              })
              this.loadActivities()
            }
          })
        }
      }
    })
  },

  // 显示发布帖子弹窗
  showCreatePostModal() {
    this.setData({
      showCreatePostModal: true
    })
  },

  // 隐藏发布帖子弹窗
  hideCreatePostModal() {
    this.setData({
      showCreatePostModal: false
    })
  },

  // 阻止事件冒泡
  stopPropagation() {},

  // 帖子表单输入
  onPostInput(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`postForm.${field}`]: e.detail.value
    })
  },

  // 分类选择
  onCategorySelect(e) {
    const index = e.detail.value
    this.setData({
      'postForm.category': this.data.postCategories[index]
    })
  },

  // 上传帖子图片
  uploadPostImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        wx.cloud.uploadFile({
          cloudPath: `post-${Date.now()}.jpg`,
          filePath: res.tempFilePaths[0],
          success: (uploadRes) => {
            this.setData({
              'postForm.image': uploadRes.fileID
            })
          }
        })
      }
    })
  },

  // 提交帖子
  submitPost() {
    const { postForm } = this.data

    if (!postForm.title) {
      wx.showToast({ title: '请输入标题', icon: 'none' })
      return
    }
    if (!postForm.category) {
      wx.showToast({ title: '请选择分类', icon: 'none' })
      return
    }
    if (!postForm.content) {
      wx.showToast({ title: '请输入内容', icon: 'none' })
      return
    }

    wx.showLoading({ title: '发布中...' })

    wx.cloud.callFunction({
      name: 'createPost',
      data: {
        post: {
          ...postForm,
          author: getApp().globalData.userInfo,
          likeCount: 0,
          commentCount: 0,
          createTime: new Date()
        }
      },
      success: () => {
        wx.hideLoading()
        wx.showToast({
          title: '发布成功',
          icon: 'success'
        })
        this.hideCreatePostModal()
        this.loadPosts()
      },
      fail: () => {
        wx.hideLoading()
      }
    })
  },

  // 切换协议勾选
  toggleAgreement(e) {
    const { index } = e.currentTarget.dataset
    const agreements = [...this.data.agreements]
    agreements[index].checked = !agreements[index].checked
    this.setData({ agreements })
  },

  // 同意社区公约
  agreeRules() {
    const allChecked = this.data.agreements.every(item => item.checked)
    if (!allChecked) {
      wx.showToast({
        title: '请先勾选所有选项',
        icon: 'none'
      })
      return
    }

    wx.showToast({
      title: '已同意社区公约',
      icon: 'success'
    })
  },

  onShareAppMessage() {
    return {
      title: '群贤毕至堂 - 技能传承社区',
      path: '/pages/community/community'
    }
  }
})
