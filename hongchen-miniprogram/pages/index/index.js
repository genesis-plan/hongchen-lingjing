// 灵槎津渡页面逻辑
Page({
  data: {
    buildings: [
      { id: 'laozhang', name: '琅嬛福地', icon: '📚' },
      { id: 'kaogong', name: '考工实训庐', icon: '🔨' },
      { id: 'jiezhi', name: '芥子藏虚', icon: '🏠' },
      { id: 'tiangong', name: '天工开物坊', icon: '🛠️' },
      { id: 'bianliang', name: '百炼鉴心台', icon: '⚔️' },
      { id: 'shenji', name: '神机枢阁', icon: '🤖' },
      { id: 'qunxian', name: '群贤毕至堂', icon: '🏛️' },
      { id: 'rongguang', name: '荣光麟阁', icon: '🏆' },
      { id: 'qingniao', name: '青鸟星驿', icon: '✉️' },
      { id: 'liangyi', name: '两仪墟市', icon: '🏪' },
      { id: 'wanxiang', name: '万象璇玑阁', icon: '🌐' },
      { id: 'quanfu', name: '泉府通衢', icon: '💰' },
      { id: 'xingshu', name: '星枢问道台', icon: '⭐' }
    ]
  },

  onLoad() {
    console.log('灵槎津渡页面加载完成');
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus() {
    const app = getApp();
    if (app.globalData.userInfo) {
      this.setData({ userInfo: app.globalData.userInfo });
    } else {
      // 尝试获取用户信息
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: (res) => {
                app.globalData.userInfo = res.userInfo;
                this.setData({ userInfo: res.userInfo });
              }
            });
          }
        }
      });
    }
  },

  // 进入建筑
  enterBuilding(e) {
    const buildingId = e.currentTarget.dataset.building;
    const app = getApp();
    app.globalData.currentBuilding = buildingId;
    
    console.log('进入建筑:', buildingId);
    
    // 根据建筑ID跳转到对应页面
    const pageMap = {
      'laozhang': '/pages/library/library',
      'kaogong': '/pages/training/training',
      'profile': '/pages/profile/profile',
      'library': '/pages/library/library'
    };
    
    if (pageMap[buildingId]) {
      wx.navigateTo({
        url: pageMap[buildingId]
      });
    } else {
      wx.showToast({
        title: `即将开放：${buildingId}`,
        icon: 'info'
      });
    }
  },

  // 开始修行之旅
  startJourney() {
    wx.showModal({
      title: '开启修行之旅',
      content: '是否从基础技能开始学习？',
      success: (res) => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/library/library'
          });
        }
      }
    });
  },

  // 了解更多
  learnMore() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  }
});