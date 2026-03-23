// 泉府通衢页面逻辑
Page({
  data: {
    activeTab: 'market',
    lingstone: 1000,
    jade: 50,
    marketItems: [
      { id: 1, name: '稀有技能书', seller: '大师兄', price: 500, image: '/images/skill-book-rare.png' },
      { id: 2, name: '限定服饰', seller: '小师妹', price: 300, image: '/images/clothing.png' },
      { id: 3, name: '学习加速器', seller: '张三', price: 200, image: '/images/accelerator.png' }
    ]
  },

  onLoad() {
    this.loadAssets()
    this.loadMarketItems()
  },

  loadAssets() {
    // 加载用户资产
  },

  loadMarketItems() {
    // 加载市场物品
  },

  switchTab(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.tab
    })
  },

  buyItem(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确认购买',
      content: '确定要购买这个物品吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '购买成功',
            icon: 'success'
          })
        }
      }
    })
  },

  showSellModal() {
    wx.showToast({
      title: '上架功能开发中',
      icon: 'none'
    })
  }
})
