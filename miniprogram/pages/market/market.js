// 万象璇玑阁页面逻辑
Page({
  data: {
    resources: [
      { id: 1, name: '学习加速卡', icon: '/images/speed-up.png', count: 5 },
      { id: 2, name: '双倍积分卡', icon: '/images/double-xp.png', count: 3 },
      { id: 3, name: '复活卡', icon: '/images/revive.png', count: 2 },
      { id: 4, name: '技能书', icon: '/images/skill-book.png', count: 10 }
    ],
    exchanges: [
      { id: 1, name: '高级技能书', description: '提升学习效率', price: 100 },
      { id: 2, name: '荣誉徽章', description: '展示成就', price: 200 },
      { id: 3, name: '限定服饰', description: '个性化灵相', price: 150 }
    ]
  },

  onLoad() {
    this.loadUserData()
  },

  loadUserData() {
    // 加载用户资源数据
  },

  useResource(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({
      title: '使用成功',
      icon: 'success'
    })
  },

  exchange(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认兑换',
      content: '确定要兑换这个道具吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '兑换成功',
            icon: 'success'
          })
        }
      }
    })
  }
})
