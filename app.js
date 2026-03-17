// 全局状态
const appState = {
    currentUser: null,
    skills: [],
    progress: {},
    honors: []
};

// 模拟数据
const mockSkills = [
    {
        id: 1,
        name: '灵力觉醒',
        description: '开启你的修炼之路，感知天地灵气',
        level: 1,
        maxLevel: 10,
        type: '基础',
        icon: '✨'
    },
    {
        id: 2,
        name: '冥想入定',
        description: '静心冥想，提升专注力和感知力',
        level: 1,
        maxLevel: 10,
        type: '基础',
        icon: '🧘'
    },
    {
        id: 3,
        name: '灵识开悟',
        description: '开启灵识，增强记忆和理解能力',
        level: 1,
        maxLevel: 10,
        type: '基础',
        icon: '👁️'
    },
    {
        id: 4,
        name: '御气化形',
        description: '驾驭灵气，化为有形之力',
        level: 1,
        maxLevel: 10,
        type: '进阶',
        icon: '💨'
    },
    {
        id: 5,
        name: '心剑通明',
        description: '以心化剑，斩断杂念与困惑',
        level: 1,
        maxLevel: 10,
        type: '进阶',
        icon: '⚔️'
    },
    {
        id: 6,
        name: '大道无痕',
        description: '悟透大道，随心所欲',
        level: 1,
        maxLevel: 10,
        type: '绝学',
        icon: '🌟'
    }
];

const mockLibrary = [
    {
        id: 1,
        title: '基础心法入门',
        description: '学习最基础的修炼心法，为你的修行之路打下坚实基础。',
        icon: '📖',
        content: '筑基期是修行的起点。每日清晨，面向东方，吸入第一缕紫气，运转周天，持续49天即可筑基成功。'
    },
    {
        id: 2,
        title: '灵气感应术',
        description: '学习如何感知和吸收周围的天地灵气。',
        icon: '🌌',
        content: '灵气无处不在，山川河流、日月星辰皆有灵气。闭目静心，感受身边的气流，便是灵气感应之术。'
    },
    {
        id: 3,
        title: '修炼进阶指南',
        description: '从入门到精通的全面修炼指南。',
        icon: '📚',
        content: '修炼分为多个境界：筑基、金丹、元婴、化神。每个境界都需要大量的积累和感悟，不可急于求成。'
    },
    {
        id: 4,
        title: '境界突破秘籍',
        description: '掌握境界突破的关键技巧和心法。',
        icon: '⚡',
        content: '境界突破需要天时地利人和。瓶颈期可多行善积德，积累功德，有助于突破境界。'
    },
    {
        id: 5,
        title: '剑道基础',
        description: '学习御剑飞行的基础知识和技巧。',
        icon: '🗡️',
        content: '剑修以剑入道，万物皆可为剑。初期以木剑练习，培养人剑合一的感觉。'
    },
    {
        id: 6,
        title: '炼丹入门',
        description: '了解炼丹的基础知识和常见丹方。',
        icon: '⚗️',
        content: '炼丹是修行者的重要技能。入门从最简单的聚气丹开始，需要掌握火候控制和药材搭配。'
    },
    {
        id: 7,
        title: '阵法初解',
        description: '学习布置简单阵法的基础知识。',
        icon: '🔯',
        content: '阵法是天地之力的运用。最简单的聚灵阵可以聚集灵气，让修炼事半功倍。'
    },
    {
        id: 8,
        title: '灵兽契约',
        description: '与灵兽建立契约的基础方法。',
        icon: '🦊',
        content: '与灵兽结缘需要真诚和缘分。最常见的灵宠有狐狸、鹤、龟等，各有特长。'
    }
];

const mockPractice = [
    {
        id: 1,
        title: '冥想练习',
        description: '每日15分钟冥想，提升专注力和内心平静。',
        difficulty: '简单',
        duration: '15分钟',
        icon: '🧘'
    },
    {
        id: 2,
        title: '灵气吸收',
        description: '在清晨或深夜，吸收天地灵气。',
        difficulty: '中等',
        duration: '30分钟',
        icon: '💨'
    },
    {
        id: 3,
        title: '心法演练',
        description: '练习基础心法，熟练掌握修炼技巧。',
        difficulty: '困难',
        duration: '1小时',
        icon: '🔮'
    },
    {
        id: 4,
        title: '境界测试',
        description: '测试当前修行境界，发现不足之处。',
        difficulty: '挑战',
        duration: '45分钟',
        icon: '🎯'
    }
];

const mockHonors = [
    {
        id: 1,
        title: '初入修行',
        description: '完成第一次修炼',
        icon: '🎖️',
        obtained: true
    },
    {
        id: 2,
        title: '技能觉醒',
        description: '掌握第一个技能',
        icon: '🌟',
        obtained: true
    },
    {
        id: 3,
        title: '持之以恒',
        description: '连续修炼7天',
        icon: '🔥',
        obtained: false
    },
    {
        id: 4,
        title: '大成境界',
        description: '所有技能达到满级',
        icon: '👑',
        obtained: false
    }
];

// 进入应用
function enterApp() {
    showPage('home');
    loadUserData();
    renderSkills();
    updateStats();
}

// 显示页面
function showPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // 显示目标页面
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// 页面导航
function navigateTo(pageId) {
    showPage(pageId);

    // 根据页面ID加载相应内容
    switch(pageId) {
        case 'home':
            renderSkills();
            updateStats();
            break;
        case 'library':
            renderLibrary();
            break;
        case 'practice':
            renderPractice();
            break;
        case 'honor':
            renderHonors();
            break;
        case 'space':
            renderProfile();
            break;
    }

    // 更新底部导航状态
    updateBottomNav(pageId);
}

// 更新底部导航状态
function updateBottomNav(activePage) {
    document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
        item.classList.remove('active');
    });

    const navItems = {
        'home': 0,
        'library': 1,
        'practice': 2,
        'honor': 3,
        'space': 4
    };

    if (navItems[activePage] !== undefined) {
        const navList = document.querySelectorAll('.bottom-nav .nav-item');
        if (navList[navItems[activePage]]) {
            navList[navItems[activePage]].classList.add('active');
        }
    }
}

// 加载用户数据
function loadUserData() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        appState.currentUser = JSON.parse(storedUser);
        document.getElementById('user-display').textContent = appState.currentUser.name || '修行者';
    } else {
        // 创建新用户
        appState.currentUser = {
            id: Date.now(),
            name: '修行者',
            level: 1,
            exp: 0,
            skills: [],
            practiceCount: 0,
            honorCount: 0
        };
        saveUserData();
    }
}

// 保存用户数据
function saveUserData() {
    localStorage.setItem('user', JSON.stringify(appState.currentUser));
}

// 渲染技能列表
function renderSkills() {
    const skillsList = document.getElementById('skills-list');
    if (!skillsList) return;

    skillsList.innerHTML = mockSkills.map(skill => `
        <div class="skill-card" onclick="viewSkill(${skill.id})">
            <div class="skill-header">
                <span class="skill-name">${skill.icon} ${skill.name}</span>
                <span class="skill-level">Lv.${skill.level}</span>
            </div>
            <p class="skill-desc">${skill.description}</p>
            <div class="skill-progress">
                <div class="progress-bar" style="width: ${((skill.level - 1) / (skill.maxLevel - 1)) * 100}%"></div>
            </div>
        </div>
    `).join('');
}

// 查看技能详情
function viewSkill(skillId) {
    const skill = mockSkills.find(s => s.id === skillId);
    if (!skill) return;
    
    const isMaxLevel = skill.level >= skill.maxLevel;
    const message = isMaxLevel 
        ? `${skill.name}\n\n${skill.description}\n\n当前等级: ${skill.level}/${skill.maxLevel} (已达巅峰)\n类型: ${skill.type}`
        : `${skill.name}\n\n${skill.description}\n\n当前等级: ${skill.level}/${skill.maxLevel}\n类型: ${skill.type}\n\n点击"修炼"提升等级！`;
    
    if (confirm(message + (isMaxLevel ? '' : '\n\n是否开始修炼？'))) {
        if (!isMaxLevel) {
            upgradeSkill(skillId);
        }
    }
}

// 升级技能
function upgradeSkill(skillId) {
    const skill = mockSkills.find(s => s.id === skillId);
    if (skill && skill.level < skill.maxLevel) {
        skill.level++;
        
        // 随机获得经验
        const expGained = Math.floor(Math.random() * 20) + 10;
        
        alert(`🎉 修炼成功！\n\n${skill.name} 提升到 ${skill.level} 级！\n获得 ${expGained} 点经验值！\n\n继续修炼，突破极限！`);
        
        renderSkills();
        updateStats();
        
        // 检查是否有新荣誉
        checkNewHonor();
    }
}

// 渲染琅嬛藏书
function renderLibrary() {
    const libraryContent = document.getElementById('library-content');
    if (!libraryContent) return;

    libraryContent.innerHTML = mockLibrary.map(book => `
        <div class="content-card" onclick="openBook(${book.id})">
            <div class="content-image">${book.icon}</div>
            <div class="content-info">
                <div class="content-title">${book.title}</div>
                <div class="content-desc">${book.description}</div>
            </div>
        </div>
    `).join('');
}

// 打开书籍
function openBook(bookId) {
    const book = mockLibrary.find(b => b.id === bookId);
    if (!book) return;
    
    // 创建阅读弹窗
    const modal = document.createElement('div');
    modal.id = 'book-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:10000;display:flex;justify-content:center;align-items:center;';
    modal.innerHTML = `
        <div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:30px;border-radius:20px;max-width:500px;width:90%;max-height:80vh;overflow-y:auto;color:white;">
            <h2 style="margin-top:0;">${book.icon} ${book.title}</h2>
            <p style="font-size:14px;color:#ddd;">${book.description}</p>
            <hr style="border-color:rgba(255,255,255,0.3);">
            <div style="line-height:1.8;font-size:16px;white-space:pre-wrap;">${book.content || '内容待完善...'}</div>
            <button onclick="this.closest('#book-modal').remove()" style="margin-top:20px;padding:10px 30px;background:#fff;color:#667eea;border:none;border-radius:20px;cursor:pointer;font-size:16px;">关闭窗口</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// 搜索琅嬛藏书
function searchLibrary() {
    const searchInput = document.getElementById('library-search');
    const query = searchInput.value.toLowerCase();

    const filteredBooks = mockLibrary.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
    );

    const libraryContent = document.getElementById('library-content');
    libraryContent.innerHTML = filteredBooks.map(book => `
        <div class="content-card" onclick="openBook(${book.id})">
            <div class="content-image">${book.icon}</div>
            <div class="content-info">
                <div class="content-title">${book.title}</div>
                <div class="content-desc">${book.description}</div>
            </div>
        </div>
    `).join('');
}

// 渲染修炼实训
function renderPractice() {
    const practiceList = document.getElementById('practice-list');
    if (!practiceList) return;

    practiceList.innerHTML = mockPractice.map(item => `
        <div class="content-card" onclick="startPractice(${item.id})">
            <div class="content-image">${item.icon}</div>
            <div class="content-info">
                <div class="content-title">${item.title}</div>
                <div class="content-desc">${item.description}</div>
                <div style="margin-top: 10px; display: flex; gap: 10px;">
                    <span style="color: #667eea; font-size: 0.9em;">难度: ${item.difficulty}</span>
                    <span style="color: #666; font-size: 0.9em;">时长: ${item.duration}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// 开始实训
function startPractice(practiceId) {
    const practice = mockPractice.find(p => p.id === practiceId);
    if (!practice) return;
    
    const confirmed = confirm(`开始实训: ${practice.title}\n\n${practice.description}\n\n难度: ${practice.difficulty}\n时长: ${practice.duration}\n\n确认开始吗？`);
    
    if (confirmed) {
        // 模拟实训进行
        setTimeout(() => {
            // 增加实训次数
            if (!appState.currentUser) {
                appState.currentUser = { practiceCount: 0 };
            }
            appState.currentUser.practiceCount = (appState.currentUser.practiceCount || 0) + 1;
            saveUserData();
            
            // 随机提升一个技能
            const randomSkill = mockSkills[Math.floor(Math.random() * mockSkills.length)];
            if (randomSkill && randomSkill.level < randomSkill.maxLevel) {
                randomSkill.level++;
            }
            
            alert(`🎉 实训完成！\n\n${practice.title} 已完成！\n\n获得奖励：\n+ 修炼经验\n+ ${randomSkill?.name || '技能'} 经验值\n\n太棒了！继续加油！`);
            
            renderPractice();
            updateStats();
            checkNewHonor();
        }, 1500);
    }
}

// 检查新荣誉
function checkNewHonor() {
    const practiceCount = appState.currentUser?.practiceCount || 0;
    const skillCount = mockSkills.filter(s => s.level > 1).length;
    
    // 检查并解锁荣誉
    if (practiceCount >= 1) {
        const honor1 = mockHonors.find(h => h.id === 1);
        if (honor1) honor1.obtained = true;
    }
    if (skillCount >= 1) {
        const honor2 = mockHonors.find(h => h.id === 2);
        if (honor2) honor2.obtained = true;
    }
    if (practiceCount >= 7) {
        const honor3 = mockHonors.find(h => h.id === 3);
        if (honor3) honor3.obtained = true;
    }
}

// 渲染荣誉殿堂
function renderHonors() {
    const honorsList = document.getElementById('honors-list');
    if (!honorsList) return;

    honorsList.innerHTML = mockHonors.map(honor => `
        <div class="content-card" style="opacity: ${honor.obtained ? 1 : 0.5}">
            <div class="content-image">${honor.icon}</div>
            <div class="content-info">
                <div class="content-title">${honor.title}</div>
                <div class="content-desc">${honor.description}</div>
                <div style="margin-top: 10px; color: ${honor.obtained ? '#4CAF50' : '#999'};">
                    ${honor.obtained ? '已获得' : '未获得'}
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染个人空间
function renderProfile() {
    const userName = appState.currentUser?.name || '修行者';
    document.getElementById('profile-name').textContent = userName;
    updateStats();
}

// 更新统计数据
function updateStats() {
    const skillCount = mockSkills.filter(skill => skill.level > 1).length;
    const practiceCount = appState.currentUser?.practiceCount || 0;
    const honorCount = mockHonors.filter(honor => honor.obtained).length;

    document.getElementById('stat-skill-count').textContent = skillCount;
    document.getElementById('stat-practice-count').textContent = practiceCount;
    document.getElementById('stat-honor-count').textContent = honorCount;
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    console.log('红尘灵境网页版已启动');
    // 可以在这里添加初始化逻辑
});

// 云函数调用（预留接口）
async function callCloudFunction(name, data) {
    // 这里可以集成腾讯云云函数API
    console.log('调用云函数:', name, data);
    // TODO: 实现云函数调用
}
