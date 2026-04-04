// 芥子藏虚 - 个人主页逻辑
Page({
  data: {
    userInfo: null,
    learningDays: 7,
    completedSkills: 3,
    achievements: 5,
    skillProgress: 65,
    practiceProgress: 42,
    contributionProgress: 28,
    mySkills: [
      { id: 1, name: '基础种植', icon: '🌱', level: 3 },
      { id: 2, name: '简单木工', icon: '🔨', level: 2 },
      { id: 3, name: '剪纸艺术', icon: '✂️', level: 4 }
    ],
    recentAchievements: [
      { id: 1, name: '初学乍练', icon: '🥉', desc: '完成第一个技能学习' },
      { id: 2, name: '坚持不懈', icon: '🏅', desc: '连续学习7天' },
      { id: 3, name: '巧手匠心', icon: '🏆', desc: '完成5个实践项目' }
    ]
  },

  onLoad() {
    console.log('芥子藏虚页面加载');
    this.loadUserInfo();
  },

  // 加载用户信息
  loadUserInfo() {
    const app = getApp();
    if (app.globalData.userInfo) {
      this.setData({ userInfo: app.globalData.userInfo });
    }
    
    // 模拟从云数据库加载用户数据
    this.loadUserDataFromCloud();
  },

  // 从云端加载用户数据
  loadUserDataFromCloud() {
    wx.cloud.callFunction({
      name: 'user',
      data: { action: 'getProfile' },
      success: (res) => {
        if (res.result.code === 0) {
          this.setData(res.result.data);
        }
      },
      fail: (err) => {
        console.error('加载用户数据失败:', err);
      }
    });
  },

  // 继续学习
  goToLearning() {
    wx.navigateTo({
      url: '/pages/library/library'
    });
  },

  // 技能实训
  goToTraining() {
    wx.navigateTo({
      url: '/pages/training/training'
    });
  },

  // 编辑资料
  goToProfileEdit() {
    wx.navigateTo({
      url: '/pages/profile/edit/edit'
    });
  }
});