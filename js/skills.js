/**
 * 红尘灵境 - 技能数据处理模块 (MVP精简版 v2)
 * @version 1.2.0-mvp
 * 精选3个核心技能（基于国内用户偏好调整）
 */

// MVP精选3个技能 - 根据国内用户习惯调整
const MVP_SKILLS = [
    {
        id: "doubao-101",
        title: "国产AI助手入门（豆包/通义/文心）",
        category: "ai-tools",
        difficulty: "beginner",
        duration: "20分钟",
        points: 50,
        tags: ["AI", "豆包", "通义千问", "副业"],
        icon: "🧠",
        summary: "国内最火的AI工具用法，5分钟上手，接单变现",
        description: "国内用户最常用的是豆包、通义千问、文心一言等国产AI。本课程教你快速掌握这些国产AI工具，用AI提升工作效率，还能接单变现。",
        steps: [
            {
                step: 1,
                title: "选择你的AI助手",
                content: "国内三大AI助手对比：\n\n• 豆包（字节）- 最火！嵌入抖音，日常聊天、写作、翻译全搞定\n• 通义千问（阿里）- 代码能力强，适合程序员和电商\n• 文心一言（百度）- 中文理解强，搜索增强，信息准确\n\n💡 建议：新手先下载豆包，体验最好",
                tip: "豆包App store和各大应用商店都能下载"
            },
            {
                step: 2,
                title: "基础对话与功能探索",
                content: "打开豆包，试试这些指令：\n\n• '帮我写一段自我介绍'\n• '用Python写一个计算器'\n• '解释什么是AI'\n• '帮我制定本周工作计划'\n\n💡 技巧：越具体的问题，得到答案越准确",
                tip: "加上身份词效果更好，如'你是一位资深营养师'"
            },
            {
                step: 3,
                title: "AI变现实战案例",
                content: "学会这些，马上能变现：\n\n• 短视频文案：'帮我写3条防晒衣带货文案'\n• 朋友圈微商：'生成10条吸睛产品海报文案'\n• 写简历：'优化我的简历，突出运营经验'\n• 小红书笔记：'写一篇成都旅游攻略，800字'\n\n💡 变现路径：闲鱼接单/小红书博主/私域变现",
                tip: "先从简单文案做起，一单5-20元"
            }
        ]
    },
    {
        id: "jianying-101",
        title: "短视频剪辑（剪映）7天入门",
        category: "ai-tools",
        difficulty: "beginner",
        duration: "25分钟",
        points: 60,
        tags: ["短视频", "剪映", "抖音", "副业"],
        icon: "🎬",
        summary: "抖音小红书必备技能，7天学会接单赚钱",
        description: "剪映是抖音官方推出的免费剪辑工具，7天就能学会基础剪辑。本课程教你从0到剪出第一条爆款短视频，学会后可以接单赚钱。",
        steps: [
            {
                step: 1,
                title: "剪映界面与基础操作",
                content: "下载剪映（免费），认识界面：\n\n• 导入：点击'+'导入视频/图片\n• 剪辑：拖动时间轴剪辑片段\n• 添加：底部添加音乐/文字/特效\n• 导出：右上角导出720P/1080P\n\n💡 新手先练这4个功能就够了",
                tip: "剪映有官方免费教程，在'创作学院'里"
            },
            {
                step: 2,
                title: "3个爆款剪辑技巧",
                content: "记住这3个技巧，视频点赞翻倍：\n\n1. 节奏剪辑：音乐卡点，每2-3秒切换画面\n2. 黄金3秒：开头必须抓眼球（冲突/疑问/惊艳）\n3. 添加字幕：识别字幕+花字，提高完播率\n\n💡 实操：找一段音乐，跟随节奏剪15秒",
                tip: "多用热门音乐，流量更好"
            },
            {
                step: 3,
                title: "变现接单实战",
                content: "学会剪映后，这些变现方式：\n\n• 短视频代剪：闲鱼/淘宝接单，50-200元/条\n• 中视频计划：播放量分成，1万播放约20元\n• 账号代运营：包月3000-5000元/月\n• 小红书博主：接广告200-1000元/条\n\n💡 起手：先从闲鱼接单开始，一单50元",
                tip: "作品集做好了再谈更高价格"
            }
        ]
    },
    {
        id: "photo-101",
        title: "手机摄影技巧 - 朋友圈制胜法则",
        category: "life",
        difficulty: "beginner",
        duration: "20分钟",
        points: 40,
        tags: ["摄影", "手机", "朋友圈", "小红书"],
        icon: "📷",
        summary: "用手机拍出高级感朋友圈，小红书涨粉利器",
        description: "不需要专业相机，一部手机就能拍出高级感照片。本课程教你用手机拍出刷爆朋友圈的大片，学会后还能约拍变现。",
        steps: [
            {
                step: 1,
                title: "构图决定一切",
                content: "3个万能构图公式：\n\n1. 三分法：打开网格线，主体放在交叉点\n2. 留白：画面留40%空白，更有艺术感\n3. 引导线：道路/栏杆引导视线到主体\n\n💡 打开手机设置→相机→网格线",
                tip: "拍10张不如精拍1张，多尝试角度"
            },
            {
                step: 2,
                title: "光线是照片的灵魂",
                content: "4种光线场景应对：\n\n• 晴天：顺光拍，早晨/傍晚光线最柔\n• 阴天：直接拍，氛围感反而更好\n• 室内：靠窗坐，自然光最出片\n• 夜景：打开夜景模式，手持2秒\n\n💡 用手指点击屏幕对焦，向上拉增加曝光",
                tip: "正午光线最差，避免这个时段拍照"
            },
            {
                step: 3,
                title: "后期修图与变现",
                content: "推荐修图App（免费）：\n\n• 醒图 - 国人开发，功能全\n• Snapseed - 谷歌出品，专业\n• 美图秀秀 - 简单快捷\n\n修图万能公式：\n亮度+10 → 对比度+15 → 饱和度-5 → 色温-5\n\n变现方式：\n• 约拍：199-499元/组\n• 图库投稿：视觉中国/图虫\n• 摄影教学：小红书发教程",
                tip: "醒图一键美化很好用，新手够用"
            }
        ]
    }
];

// 全局状态
let allSkills = [];
let filteredSkills = [];
let currentCategory = 'all';

// 初始化技能数据
function initSkillsData() {
    allSkills = [...MVP_SKILLS];
    filteredSkills = [...allSkills];
    console.log('[技能] MVP v2：已加载', allSkills.length, '个精选技能（国产化）');
}

// 筛选分类
function filterCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });
    
    if (category === 'all') {
        filteredSkills = [...allSkills];
    } else {
        filteredSkills = allSkills.filter(s => s.category === category);
    }
    
    renderSkills();
}

// 搜索技能
function searchSkills() {
    const keyword = document.getElementById('searchInput')?.value?.toLowerCase() || '';
    
    if (!keyword) {
        filterCategory(currentCategory);
        return;
    }
    
    filteredSkills = allSkills.filter(skill => {
        return skill.title.toLowerCase().includes(keyword) ||
               skill.tags.some(tag => tag.toLowerCase().includes(keyword)) ||
               skill.summary.toLowerCase().includes(keyword);
    });
    
    renderSkills();
}

// 渲染技能列表
function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid) return;
    
    if (filteredSkills.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <span style="font-size:3em;">🔍</span>
                <p>暂无匹配的技能</p>
                <button class="btn" onclick="filterCategory('all')">查看全部</button>
            </div>
        `;
        return;
    }
    
    const difficultyMap = {
        'beginner': { label: '入门', color: '#52c41a' },
        'intermediate': { label: '进阶', color: '#faad14' },
        'advanced': { label: '高级', color: '#f5222d' }
    };
    
    grid.innerHTML = filteredSkills.map(skill => {
        const difficulty = difficultyMap[skill.difficulty] || { label: skill.difficulty, color: '#999' };
        
        return `
            <div class="skill-card" onclick="showSkillDetail('${skill.id}')">
                <div class="skill-icon">${skill.icon}</div>
                <div class="skill-info">
                    <h3 class="skill-title">${skill.title}</h3>
                    <p class="skill-summary">${skill.summary}</p>
                    <div class="skill-meta">
                        <span class="skill-duration">⏱️ ${skill.duration}</span>
                        <span class="skill-points">+${skill.points}分</span>
                    </div>
                    <div class="skill-tags">
                        ${skill.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div class="skill-difficulty" style="border-color:${difficulty.color};color:${difficulty.color}">
                    ${difficulty.label}
                </div>
            </div>
        `;
    }).join('');
}

// 显示技能详情
function showSkillDetail(skillId) {
    const skill = allSkills.find(s => s.id === skillId);
    if (!skill) return;
    
    const modal = document.getElementById('skillModal');
    const content = document.getElementById('skillDetailContent');
    
    const difficultyMap = {
        'beginner': { label: '入门', color: '#52c41a' },
        'intermediate': { label: '进阶', color: '#faad14' },
        'advanced': { label: '高级', color: '#f5222d' }
    };
    const difficulty = difficultyMap[skill.difficulty] || { label: skill.difficulty, color: '#999' };
    
    content.innerHTML = `
        <div class="skill-detail-header">
            <div class="detail-icon">${skill.icon}</div>
            <div class="detail-title">
                <h2>${skill.title}</h2>
                <div class="detail-meta">
                    <span>⏱️ ${skill.duration}</span>
                    <span>+${skill.points}积分</span>
                    <span class="difficulty-badge" style="color:${difficulty.color}">${difficulty.label}</span>
                </div>
            </div>
        </div>
        
        <div class="skill-description">
            <h3>技能简介</h3>
            <p>${skill.description}</p>
        </div>
        
        <div class="skill-steps-preview">
            <h3>学习步骤</h3>
            <div class="steps-list">
                ${skill.steps.map(step => `
                    <div class="step-item">
                        <span class="step-num">${step.step}</span>
                        <span class="step-title">${step.title}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="skill-actions">
            <button class="btn btn-primary btn-large" onclick="startLearning('${skill.id}')">
                🚀 开始学习
            </button>
        </div>
    `;
    
    modal.style.display = 'flex';
}

// 关闭技能详情
function closeSkillModal() {
    document.getElementById('skillModal').style.display = 'none';
}

// 开始学习 - 跳转到学习页面
function startLearning(skillId) {
    const skill = allSkills.find(s => s.id === skillId);
    if (!skill) return;
    
    localStorage.setItem('currentLearningSkill', JSON.stringify({
        skillId: skill.id,
        skillTitle: skill.title,
        startTime: new Date().toISOString(),
        currentStep: 1
    }));
    
    closeSkillModal();
    window.location.href = `learn.html?skill=${skillId}`;
}

// 初始化技能页面
function initSkills() {
    initSkillsData();
    renderSkills();
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initSkills, filterCategory, showSkillDetail };
}