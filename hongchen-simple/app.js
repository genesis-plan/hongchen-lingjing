// 红尘灵境·技能库 - 简化版
App({
  onLaunch() {
    console.log('红尘灵境·技能库 启动');
    // 初始化云开发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'h2-5gr149lm91736a6e', // h2云开发环境
        traceUser: true,
      });
    }
    
    // 全局数据
    this.globalData = {
      userInfo: null,
      skills: [
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
      ]
    };
  }
});