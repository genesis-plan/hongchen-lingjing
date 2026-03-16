// 星枢问道台页面逻辑
Page({
  data: {
    challenges: [
      {
        id: 1,
        name: '技能大师赛',
        description: '展示你的技能，赢取大师称号',
        difficulty: 3,
        difficultyText: '困难',
        participants: 1234,
        rewards: '1000灵石+大师徽章',
        image: '/images/challenge1.png'
      },
      {
        id: 2,
        name: '新手训练营',
        description: '适合新手的入门挑战',
        difficulty: 1,
        difficultyText: '简单',
        participants: 5678,
        rewards: '200灵石',
        image: '/images/challenge2.png'
      },
      {
        id: 3,
        name: '技能传承赛',
        description: '传承技能，弘扬文化',
        difficulty: 2,
        difficultyText: '中等',
        participants: 3456,
        rewards: '500灵石+传承证书',
        image: '/images/challenge3.png'
      }
    ],
    rankings: [
      { rank: 1, name: '技能大师', avatar: '/images/avatar1.png', score: 9999 },
      { rank: 2, name: '传承者', avatar: '/images/avatar2.png', score: 8888 },
      { rank: 3, name: '学习者', avatar: '/images/avatar3.png', score: 7777 },
      { rank: 4, name: '新手', avatar: '/images/avatar4.png', score: 6666 },
      { rank: 5, name: '探索者', avatar: '/images/avatar5.png', score: 5555 }
    ]
  },

  onLoad() {
    this.loadChallenges()
    this.loadRankings()
  },

  loadChallenges() {
    // 加载挑战列表
  },

  loadRankings() {
    // 加载排行榜
  },

  startDailyChallenge() {
    wx.showToast({
      title: '每日挑战即将开始',
      icon: 'none'
    })
  },

  joinChallenge(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({
      title: '已报名参与',
      icon: 'success'
    })
  }
})
