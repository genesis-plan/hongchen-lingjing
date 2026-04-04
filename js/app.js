/**
 * 琅环比福地 - 技能展示应用
 * MVP简化版 - 已修复：XSS漏洞、DOM缓存、错误处理
 */

// 全局变量 - 使用IIFE避免污染
const App = (function() {
    // DOM缓存
    let domCache = {};
    
    // 状态数据
    let allSkills = [];
    let filteredSkills = [];
    let currentCategory = 'all';

    // 配置
    const CONFIG = {
        APP: { NAME: '琅环比福地', VERSION: '1.0.1' },
        API: {
            BASE_URL: 'http://159.75.154.206:3000',
            ZIWEI_CHAT: '/api/chat'
        },
        SKILLS: {
            CATEGORIES: [
                { id: 'ai-tools', name: 'AI工具', icon: '🤖', color: '#722ed1' },
                { id: 'traditional', name: '传统技艺', icon: '🏮', color: '#cf1322' },
                { id: 'life', name: '生活美学', icon: '🌸', color: '#389e0d' }
            ],
            DIFFICULTY: {
                beginner: { label: '入门', color: '#52c41a' },
                intermediate: { label: '进阶', color: '#faad14' },
                advanced: { label: '高阶', color: '#f5222d' }
            }
        }
    };

    // ========== 工具函数 ==========
    
    /**
     * HTML转义 - 防止XSS攻击
     * @param {string} str - 要转义的字符串
     * @returns {string} 转义后的字符串
     */
    function escapeHtml(str) {
        if (typeof str !== 'string') return str;
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * 获取DOM元素并缓存
     * @param {string} id - 元素ID
     * @returns {HTMLElement|null}
     */
    function getEl(id) {
        if (!domCache[id]) {
            domCache[id] = document.getElementById(id);
        }
        return domCache[id];
    }

    /**
     * 显示错误提示
     * @param {string} message - 错误信息
     */
    function showError(message) {
        console.error('[错误]', message);
        // 可以扩展为显示Toast提示
    }

    /**
     * 显示加载状态
     */
    function showLoading() {
        const grid = getEl('skillsGrid');
        if (grid) {
            grid.innerHTML = '<div class="loading">加载中...</div>';
        }
    }

    // ========== 技能数据 ==========
    
    // MVP精选3个技能 - 基于国内用户偏好
    const SKILLS_DATA = [
        {
            id: "doubao-101",
            title: "国产AI助手入门（豆包/通义/文心）",
            category: "ai-tools",
            difficulty: "beginner",
            duration: "20分钟",
            points: 50,
            tags: ["AI", "豆包", "副业"],
            icon: "🧠",
            summary: "国内最火的AI工具用法，5分钟上手，接单变现",
            description: "国内用户最常用的是豆包、通义千问、文心一言等国产AI。本课程教你快速掌握这些国产AI工具，用AI提升工作效率，还能接单变现。",
            steps: [
                { step: 1, title: "选择你的AI助手", content: "国内三大AI助手对比：\n• 豆包（字节）- 最火！嵌入抖音，日常聊天、写作、翻译全搞定\n• 通义千问（阿里）- 代码能力强，适合程序员和电商\n• 文心一言（百度）- 中文理解强，搜索增强，信息准确\n\n建议：新手先下载豆包，体验最好" },
                { step: 2, title: "基础对话与功能探索", content: "打开豆包，试试这些指令：\n• '帮我写一段自我介绍'\n• '用Python写一个计算器'\n• '解释什么是AI'\n• '帮我制定本周工作计划'\n\n技巧：越具体的问题，得到答案越准确" },
                { step: 3, title: "AI变现实战案例", content: "学会这些，马上能变现：\n• 短视频文案：'帮我写3条防晒衣带货文案'\n• 朋友圈微商：'生成10条吸睛产品海报文案'\n• 写简历：'优化我的简历，突出运营经验'\n• 小红书笔记：'写一篇成都旅游攻略，800字'\n\n变现路径：闲鱼接单/小红书博主/私域变现" }
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
                { step: 1, title: "剪映界面与基础操作", content: "下载剪映（免费），认识界面：\n• 导入：点击'+'导入视频/图片\n• 剪辑：拖动时间轴剪辑片段\n• 添加：底部添加音乐/文字/特效\n• 导出：右上角导出720P/1080P\n\n新手先练这4个功能就够了" },
                { step: 2, title: "3个爆款剪辑技巧", content: "记住这3个技巧，视频点赞翻倍：\n\n1. 节奏剪辑：音乐卡点，每2-3秒切换画面\n2. 黄金3秒：开头必须抓眼球（冲突/疑问/惊艳）\n3. 添加字幕：识别字幕+花字，提高完播率\n\n实操：找一段音乐，跟随节奏剪15秒" },
                { step: 3, title: "变现接单实战", content: "学会剪映后，这些变现方式：\n• 短视频代剪：闲鱼/淘宝接单，50-200元/条\n• 中视频计划：播放量分成，1万播放约20元\n• 账号代运营：包月3000-5000元/月\n• 小红书博主：接广告200-1000元/条\n\n起手：先从闲鱼接单开始，一单50元" }
            ]
        },
        {
            id: "photo-101",
            title: "手机摄影技巧",
            category: "life",
            difficulty: "beginner",
            duration: "20分钟",
            points: 40,
            tags: ["摄影", "手机", "朋友圈", "小红书"],
            icon: "📷",
            summary: "用手机拍出高级感朋友圈，小红书涨粉利器",
            description: "不需要专业相机，一部手机就能拍出惊艳照片。本课程教你用手机拍出刷爆朋友圈的大片，学会后还能约拍变现。",
            steps: [
                { step: 1, title: "构图决定一切", content: "3个万能构图公式：\n\n1. 三分法：打开网格线，主体放在交叉点\n2. 留白：画面留40%空白，更有艺术感\n3. 引导线：道路/栏杆引导视线到主体\n\n打开手机设置→相机→网格线" },
                { step: 2, title: "光线是照片的灵魂", content: "4种光线场景应对：\n• 晴天：顺光拍，早晨/傍晚光线最柔\n• 阴天：直接拍，氛围感反而更好\n• 室内：靠窗坐，自然光最出片\n• 夜景：打开夜景模式，手持2秒\n\n用手指点击屏幕对焦，向上拉增加曝光" },
                { step: 3, title: "后期修图与变现", content: "推荐修图App（免费）：\n• 醒图 - 国人开发，功能全\n• Snapseed - 谷歌出品，专业\n• 美图秀秀 - 简单快捷\n\n修图万能公式：\n亮度+10 → 对比度+15 → 饱和度-5 → 色温-5\n\n变现方式：\n• 约拍：199-499元/组\n• 图库投稿：视觉中国/图虫\n• 摄影教学：小红书发教程" }
            ]
        }
    ];

    // ========== 初始化 ==========
    
    function init() {
        console.log('[琅环比福地] v' + CONFIG.APP.VERSION + ' 初始化中...');
        
        // 初始化DOM缓存
        initDomCache();
        
        // 加载技能数据
        try {
            allSkills = SKILLS_DATA;
            filteredSkills = [...allSkills];
            renderSkills();
            console.log('[琅环比福地] 已加载 ' + allSkills.length + ' 个技能');
        } catch (error) {
            showError('加载技能数据失败: ' + error.message);
            renderEmptyState('数据加载失败，请刷新页面');
        }
    }

    /**
     * 初始化DOM缓存
     */
    function initDomCache() {
        const ids = ['skillsGrid', 'searchInput', 'skillModal', 'skillDetailContent', 'categoryTabs'];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) domCache[id] = el;
        });
    }

    // ========== 渲染函数 ==========
    
    /**
     * 渲染技能列表
     */
    function renderSkills() {
        const grid = getEl('skillsGrid');
        if (!grid) return;

        try {
            if (filteredSkills.length === 0) {
                renderEmptyState('暂无匹配的技能');
                return;
            }

            // 使用DocumentFragment减少DOM操作
            const fragment = document.createDocumentFragment();
            
            filteredSkills.forEach(skill => {
                const card = createSkillCard(skill);
                fragment.appendChild(card);
            });
            
            grid.innerHTML = '';
            grid.appendChild(fragment);
        } catch (error) {
            showError('渲染技能列表失败: ' + error.message);
            renderEmptyState('渲染失败，请刷新页面');
        }
    }

    /**
     * 创建技能卡片DOM
     * @param {Object} skill - 技能数据
     * @returns {HTMLElement} 卡片元素
     */
    function createSkillCard(skill) {
        const difficulty = CONFIG.SKILLS.DIFFICULTY[skill.difficulty] || { label: skill.difficulty, color: '#999' };
        
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', '查看技能: ' + skill.title);
        
        // 使用安全的方式设置内容
        const icon = document.createElement('div');
        icon.className = 'skill-icon';
        icon.textContent = skill.icon || '📚';
        
        const info = document.createElement('div');
        info.className = 'skill-info';
        
        const title = document.createElement('h3');
        title.className = 'skill-title';
        title.textContent = skill.title;
        
        const summary = document.createElement('p');
        summary.className = 'skill-summary';
        summary.textContent = skill.summary;
        
        const meta = document.createElement('div');
        meta.className = 'skill-meta';
        meta.innerHTML = `<span>⏱️ ${escapeHtml(skill.duration)}</span><span class="skill-points">+${skill.points}分</span>`;
        
        const tags = document.createElement('div');
        tags.className = 'skill-tags';
        skill.tags.slice(0, 3).forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tag';
            tagSpan.textContent = tag;
            tags.appendChild(tagSpan);
        });
        
        const difficultyBadge = document.createElement('div');
        difficultyBadge.className = 'skill-difficulty';
        difficultyBadge.style.borderColor = difficulty.color;
        difficultyBadge.style.color = difficulty.color;
        difficultyBadge.textContent = difficulty.label;
        
        // 组装
        info.appendChild(title);
        info.appendChild(summary);
        info.appendChild(meta);
        info.appendChild(tags);
        
        card.appendChild(icon);
        card.appendChild(info);
        card.appendChild(difficultyBadge);
        
        // 绑定事件
        card.addEventListener('click', () => showSkillDetail(skill.id));
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') showSkillDetail(skill.id);
        });
        
        return card;
    }

    /**
     * 渲染空状态
     * @param {string} message - 提示信息
     */
    function renderEmptyState(message) {
        const grid = getEl('skillsGrid');
        if (!grid) return;
        
        grid.innerHTML = `
            <div class="empty-state">
                <span style="font-size:3em;">🔍</span>
                <p>${escapeHtml(message)}</p>
                <button class="btn btn-primary" onclick="App.filterCategory('all')">查看全部</button>
            </div>
        `;
    }

    // ========== 功能函数 ==========
    
    /**
     * 筛选分类
     * @param {string} category - 分类ID
     */
    function filterCategory(category) {
        currentCategory = category;
        
        // 更新标签状态
        const tabs = getEl('categoryTabs');
        if (tabs) {
            tabs.querySelectorAll('.cat-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.category === category) {
                    tab.classList.add('active');
                }
            });
        }
        
        // 筛选数据
        if (category === 'all') {
            filteredSkills = [...allSkills];
        } else {
            filteredSkills = allSkills.filter(s => s.category === category);
        }
        
        renderSkills();
    }

    /**
     * 搜索技能 - 带防抖
     */
    let searchTimer = null;
    function searchSkills() {
        // 防抖：300ms后执行
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            const keyword = getEl('searchInput')?.value?.toLowerCase() || '';
            
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
        }, 300);
    }

    /**
     * 显示技能详情
     * @param {string} skillId - 技能ID
     */
    function showSkillDetail(skillId) {
        try {
            const skill = allSkills.find(s => s.id === skillId);
            if (!skill) {
                showError('未找到技能: ' + skillId);
                return;
            }
            
            const modal = getEl('skillModal');
            const content = getEl('skillDetailContent');
            
            if (!modal || !content) {
                showError('DOM元素缺失');
                return;
            }
            
            const difficulty = CONFIG.SKILLS.DIFFICULTY[skill.difficulty] || { label: skill.difficulty, color: '#999' };
            
            // 安全构建HTML
            const stepsHtml = skill.steps ? skill.steps.map(step => `
                <div class="detail-step">
                    <h4>第${step.step}步：${escapeHtml(step.title)}</h4>
                    <p>${escapeHtml(step.content)}</p>
                </div>
            `).join('') : '<p>暂无详细步骤</p>';
            
            content.innerHTML = `
                <div class="skill-detail-header">
                    <div class="detail-icon">${skill.icon || '📚'}</div>
                    <div class="detail-title">
                        <h2>${escapeHtml(skill.title)}</h2>
                        <div class="detail-meta">
                            <span>⏱️ ${escapeHtml(skill.duration)}</span>
                            <span>+${skill.points}积分</span>
                            <span class="difficulty-badge" style="color:${difficulty.color}">${difficulty.label}</span>
                        </div>
                    </div>
                </div>
                
                <div class="skill-description">
                    <h3>技能简介</h3>
                    <p>${escapeHtml(skill.description || skill.summary)}</p>
                </div>
                
                <div class="skill-steps">
                    <h3>学习步骤</h3>
                    ${stepsHtml}
                </div>
                
                <div class="skill-actions">
                    <button class="btn btn-primary" onclick="App.startLearning('${skill.id}')">
                        🚀 开始学习
                    </button>
                </div>
            `;
            
            modal.style.display = 'flex';
        } catch (error) {
            showError('显示技能详情失败: ' + error.message);
        }
    }

    /**
     * 关闭技能详情
     */
    function closeSkillModal(event) {
        const modal = getEl('skillModal');
        if (!modal) return;
        
        if (event && event.target.classList.contains('modal')) {
            modal.style.display = 'none';
        } else if (!event) {
            modal.style.display = 'none';
        }
    }

    /**
     * 开始学习
     * @param {string} skillId - 技能ID
     */
    function startLearning(skillId) {
        const skill = allSkills.find(s => s.id === skillId);
        if (skill) {
            // 保存当前学习状态
            localStorage.setItem('currentLearningSkill', JSON.stringify({
                skillId: skill.id,
                skillTitle: skill.title,
                startTime: new Date().toISOString(),
                currentStep: 1
            }));
            // 跳转到学习页面
            window.location.href = 'learn.html?skill=' + skillId;
        }
    }

    // 暴露公开接口
    return {
        init,
        filterCategory,
        searchSkills,
        showSkillDetail,
        closeSkillModal,
        startLearning
    };
})();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', App.init);

// 兼容全局调用
window.App = App;