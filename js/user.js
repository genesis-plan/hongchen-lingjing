/**
 * 红尘灵境 - 用户状态管理模块
 * @version 1.0.0-mvp
 */

let userData = {
    points: 0,
    level: '云游者',
    learnedSkills: [],
    totalPoints: 0,
    consecutiveDays: 0,
    lastVisitDate: ''
};

// 初始化用户数据
function initUser() {
    const saved = localStorage.getItem(CONFIG.USER.STORAGE_KEY);
    if (saved) {
        try {
            userData = JSON.parse(saved);
            console.log('[用户] 已加载用户数据');
        } catch (e) {
            console.log('[用户] 数据解析失败，使用默认');
        }
    }
    
    // 检查连续学习天数
    checkConsecutiveDays();
    updateUserDisplay();
}

// 检查连续学习天数
function checkConsecutiveDays() {
    const today = new Date().toDateString();
    const lastVisit = userData.lastVisitDate;
    
    if (lastVisit) {
        const lastDate = new Date(lastVisit);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            // 昨天来过，今天继续
            userData.consecutiveDays++;
        } else if (diffDays > 1) {
            // 中断了
            userData.consecutiveDays = 1;
        }
        // diffDays === 0 表示今天已记录
    } else {
        userData.consecutiveDays = 1;
    }
    
    userData.lastVisitDate = today;
    saveUserData();
}

// 保存用户数据
function saveUserData() {
    localStorage.setItem(CONFIG.USER.STORAGE_KEY, JSON.stringify(userData));
}

// 更新用户界面显示
function updateUserDisplay() {
    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
        userInfo.innerHTML = `
            <span class="user-level">${userData.level}</span>
            <span class="user-points">${userData.totalPoints} 积分</span>
        `;
    }
    
    // 更新个人中心数据
    updateProfileDisplay();
}

// 更新个人中心显示
function updateProfileDisplay() {
    // 技能数
    const skillCountEl = document.querySelector('.stat-item:nth-child(1) .stat-value');
    if (skillCountEl) {
        skillCountEl.textContent = userData.learnedSkills.length;
    }
    
    // 积分
    const pointsEl = document.querySelector('.stat-item:nth-child(2) .stat-value');
    if (pointsEl) {
        pointsEl.textContent = userData.totalPoints;
    }
    
    // 连续学习
    const daysEl = document.querySelector('.stat-item:nth-child(3) .stat-value');
    if (daysEl) {
        daysEl.textContent = userData.consecutiveDays;
    }
    
    // 等级进度
    const nextLevel = getNextLevel();
    if (nextLevel) {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill && progressText) {
            const currentMin = getLevelMin(userData.level);
            const nextMin = nextLevel.min;
            const currentPoints = userData.totalPoints;
            
            const progress = Math.min(100, Math.max(0, ((currentPoints - currentMin) / (nextMin - currentMin)) * 100));
            progressFill.style.width = progress + '%';
            progressText.textContent = `距离「${nextLevel.name}」还需 ${nextMin - currentPoints} 积分`;
        }
    }
}

// 获取当前等级的最低积分
function getLevelMin(levelName) {
    const levels = CONFIG.USER.LEVELS;
    for (let i = 0; i < levels.length; i++) {
        if (levels[i].name === levelName) {
            return levels[i].min;
        }
    }
    return 0;
}

// 获取下一等级信息
function getNextLevel() {
    const levels = CONFIG.USER.LEVELS;
    const currentIndex = levels.findIndex(l => l.name === userData.level);
    
    if (currentIndex < levels.length - 1) {
        return levels[currentIndex + 1];
    }
    return null;
}

// 更新用户学习进度
function updateUserProgress(points) {
    // 增加积分
    userData.totalPoints += points;
    
    // 检查是否升级
    checkLevelUp();
    
    // 保存并更新显示
    saveUserData();
    updateUserDisplay();
    
    console.log(`[用户] 获得 ${points} 积分，总积分: ${userData.totalPoints}`);
}

// 检查是否升级
function checkLevelUp() {
    const levels = CONFIG.USER.LEVELS;
    let newLevel = userData.level;
    
    for (let i = levels.length - 1; i >= 0; i--) {
        if (userData.totalPoints >= levels[i].min) {
            newLevel = levels[i].name;
            break;
        }
    }
    
    if (newLevel !== userData.level) {
        userData.level = newLevel;
        alert(`🎉 恭喜升级为「${newLevel}」！`);
    }
}

// 记录已学技能
function markSkillLearned(skillId) {
    if (!userData.learnedSkills.includes(skillId)) {
        userData.learnedSkills.push(skillId);
        saveUserData();
    }
}

// 显示个人中心弹窗
function showProfile() {
    updateProfileDisplay();
    document.getElementById('profileModal').style.display = 'flex';
}

// 关闭个人中心弹窗
function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
}

// 切换底部导航
function switchNav(nav) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    const targetItem = Array.from(navItems).find(item => 
        item.innerHTML.includes(nav === 'skills' ? '技能殿堂' : '我的')
    );
    
    if (targetItem) {
        targetItem.classList.add('active');
    }
    
    if (nav === 'profile') {
        showProfile();
    }
}

// 初始化应用
function initApp() {
    console.log('[红尘灵境] MVP v' + CONFIG.APP.VERSION + ' 启动中...');
    
    // 初始化各模块
    initUser();
    initZiwei();
    initSkills();
    
    console.log('[红尘灵境] 初始化完成！');
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initUser, updateUserProgress, markSkillLearned };
}