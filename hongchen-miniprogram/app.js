// 红尘灵境小程序入口文件
App({
  onLaunch() {
    console.log('红尘灵境小程序启动');
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
      currentBuilding: 'lingcha', // 当前建筑
      buildings: {
        lingcha: { id: 'lingcha', name: '灵槎津渡', icon: '🚢' },
        laozhang: { id: 'laozhang', name: '琅嬛福地', icon: '📚' },
        kaogong: { id: 'kaogong', name: '考工实训庐', icon: '🔨' },
        bianliang: { id: 'bianliang', name: '百炼鉴心台', icon: '⚔️' },
        tiangong: { id: 'tiangong', name: '天工开物坊', icon: '🛠️' },
        shenji: { id: 'shenji', name: '神机枢阁', icon: '🤖' },
        qunxian: { id: 'qunxian', name: '群贤毕至堂', icon: '🏛️' },
        rongguang: { id: 'rongguang', name: '荣光麟阁', icon: '🏆' },
        qingniao: { id: 'qingniao', name: '青鸟星驿', icon: '✉️' },
        liangyi: { id: 'liangyi', name: '两仪墟市', icon: '🏪' },
        wanxiang: { id: 'wanxiang', name: '万象璇玑阁', icon: '🌐' },
        quanfu: { id: 'quanfu', name: '泉府通衢', icon: '💰' },
        jiezhi: { id: 'jiezhi', name: '芥子藏虚', icon: '🏠' },
        xingshu: { id: 'xingshu', name: '星枢问道台', icon: '⭐' }
      }
    };
  }
});