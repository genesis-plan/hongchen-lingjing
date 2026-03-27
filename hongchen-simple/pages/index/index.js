// 琅嬛福地·技能库 - 首页逻辑
Page({
  data: {
    skills: [],
    filteredSkills: [],
    currentCategory: 'all',
    searchKeyword: ''
  },

  onLoad() {
    console.log('技能图书馆首页加载');
    this.loadSkills();
  },

  onShow() {
    // 页面显示时刷新数据
    this.loadSkills();
  },

  // 加载技能数据
  loadSkills() {
    const app = getApp();
    if (app.globalData.skills) {
      this.setData({
        skills: app.globalData.skills,
        filteredSkills: app.globalData.skills
      });
    } else {
      // 如果云数据加载失败，使用默认数据
      this.setData({
        skills: this.getDefaultSkills(),
        filteredSkills: this.getDefaultSkills()
      });
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

  // 搜索输入
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    }, () => {
      this.filterSkills();
    });
  },

  // 切换分类
  switchCategory(e) {
    const category = e.currentTarget.dataset.category;
    
    // 更新标签状态
    const tabs = this.selectAllComponents('.category-tab');
    // 简化处理：直接更新数据
    
    this.setData({
      currentCategory: category
    }, () => {
      this.filterSkills();
    });
    
    // 更新UI状态
    this.updateTabStatus(category);
  },

  // 更新标签状态
  updateTabStatus(activeCategory) {
    // 这里简化处理，实际项目中需要更精细的控制
    console.log('切换到分类:', activeCategory);
  },

  // 过滤技能
  filterSkills() {
    let filtered = this.data.skills;
    
    // 按分类过滤
    if (this.data.currentCategory !== 'all') {
      filtered = filtered.filter(skill => skill.category === this.data.currentCategory);
    }
    
    // 按关键词搜索
    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase();
      filtered = filtered.filter(skill => 
        skill.name.toLowerCase().includes(keyword) ||
        skill.description.toLowerCase().includes(keyword) ||
        skill.category.toLowerCase().includes(keyword)
      );
    }
    
    this.setData({
      filteredSkills: filtered
    });
  },

  // 跳转到详情页
  goToDetail(e) {
    const skillId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${skillId}`
    });
  }
});