// 技能详情页逻辑
Page({
  data: {
    skill: {},
    relatedSkills: []
  },

  onLoad(options) {
    console.log('技能详情页加载，技能ID:', options.id);
    this.loadSkillDetail(options.id);
  },

  // 加载技能详情
  loadSkillDetail(skillId) {
    const app = getApp();
    const allSkills = app.globalData.skills || this.getDefaultSkills();
    const skillIdNum = parseInt(skillId);
    
    const skill = allSkills.find(s => s.id === skillIdNum);
    if (skill) {
      // 获取相关技能（同类别的其他技能）
      const relatedSkills = allSkills
        .filter(s => s.category === skill.category && s.id !== skill.id)
        .slice(0, 3);
      
      this.setData({
        skill: skill,
        relatedSkills: relatedSkills
      });
    } else {
      wx.showToast({
        title: '技能不存在',
        icon: 'error'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  // 默认技能数据
  getDefaultSkills() {
    return [
      {
        id: 1,
        name: '基础种植',
        icon: '🌱',
        category: '农业',
        level: '入门',
        duration: '2小时',
        description: '学习种子培育、土壤管理、浇水施肥的基础种植技能',
        rating: 4.8,
        students: 1250
      },
      {
        id: 2,
        name: '简单木工',
        icon: '🔨',
        category: '工艺',
        level: '初级',
        duration: '5小时',
        description: '掌握基础锯切、刨削、组装的简单木工技艺',
        rating: 4.6,
        students: 890
      },
      {
        id: 3,
        name: '传统剪纸',
        icon: '✂️',
        category: '艺术',
        level: '入门',
        duration: '3小时',
        description: '学习传统剪纸的刀法技巧和艺术构图',
        rating: 4.9,
        students: 2100
      },
      {
        id: 4,
        name: '家常烹饪',
        icon: '🍳',
        category: '生活',
        level: '初级',
        duration: '4小时',
        description: '掌握基本烹饪技法，做出营养美味的家常菜',
        rating: 4.7,
        students: 3200
      },
      {
        id: 5,
        name: '基础书法',
        icon: '✍️',
        category: '文化',
        level: '入门',
        duration: '6小时',
        description: '学习毛笔字的基本笔画和结构布局',
        rating: 4.5,
        students: 1560
      }
    ];
  },

  // 开始学习
  startLearning() {
    wx.showModal({
      title: '开始学习',
      content: `确定要开始学习《${this.data.skill.name}》吗？`,
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '学习开始！',
            icon: 'success',
            duration: 2000
          });
          // 这里可以跳转到具体的学习页面
        }
      }
    });
  },

  // 添加到收藏
  addToFavorite() {
    wx.showToast({
      title: '已添加到收藏',
      icon: 'success',
      duration: 1500
    });
    // 这里可以实现收藏功能
  }
});