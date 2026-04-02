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
    
    const SKILLS_DATA = [
        {
            id: "chatgpt-101",
            title: "ChatGPT入门指南",
            category: "ai-tools",
            difficulty: "beginner",
            duration: "15分钟",
            points: 50,
            tags: ["AI", "效率工具", "写作"],
            icon: "💬",
            summary: "从零开始学会使用ChatGPT，提升写作和沟通效率",
            description: "ChatGPT是OpenAI开发的AI对话助手，能够回答问题、协助写作、提供创意灵感。",
            steps: [
                { step: 1, title: "认识ChatGPT", content: "ChatGPT是一个AI助手，你可以像和朋友聊天一样向它提问。" },
                { step: 2, title: "基础提问技巧", content: "好的提问能获得更好的回答：清晰具体、提供背景、指定格式。" },
                { step: 3, title: "实际应用场景", content: "日常工作中可以：邮件撰写、文案优化、学习辅导、头脑风暴。" }
            ]
        },
        {
            id: "midjourney-101",
            title: "Midjourney绘画入门",
            category: "ai-tools",
            difficulty: "beginner",
            duration: "20分钟",
            points: 60,
            tags: ["AI绘画", "创意", "设计"],
            icon: "🎨",
            summary: "用AI生成精美图片，让你的创意瞬间可视化",
            description: "Midjourney是一款强大的AI绘画工具，只需输入文字描述，就能生成高质量的艺术图片。",
            steps: [
                { step: 1, title: "了解Midjourney", content: "Midjourney通过文字描述生成图片，输入提示词即可获得图片。" },
                { step: 2, title: "提示词基础", content: "好的提示词结构：主体+风格+环境+光线。越具体描述，生成图片越符合预期。" },
                { step: 3, title: "进阶技巧", content: "添加参数如--ar 16:9，参考风格如'宫崎骏动画风格'，尝试不同版本。" }
            ]
        },
        {
            id: "prompt-101",
            title: "提示词工程基础",
            category: "ai-tools",
            difficulty: "intermediate",
            duration: "25分钟",
            points: 80,
            tags: ["AI", "提示词", "进阶"],
            icon: "⚡",
            summary: "掌握提示词编写技巧，让AI更懂你",
            description: "提示词工程是与AI高效沟通的核心技能，学会编写优质提示词，能让AI输出质量提升10倍。",
            steps: [
                { step: 1, title: "提示词核心原则", content: "编写高效提示词的原则：清晰具体、结构化、示例引导。" },
                { step: 2, title: "常用技巧", content: "提升提示词效果的技巧：角色设定、格式指定、步骤分解、约束条件。" },
                { step: 3, title: "实战模板", content: "常用场景模板：内容创作、分析总结、学习辅导等。" }
            ]
        },
        {
            id: "mobile-photo-101",
            title: "手机摄影技巧",
            category: "life",
            difficulty: "beginner",
            duration: "20分钟",
            points: 40,
            tags: ["摄影", "生活", "美学"],
            icon: "📷",
            summary: "用手机拍出大片感，记录生活中的美好瞬间",
            description: "不需要专业相机，掌握这些技巧，用手机也能拍出惊艳的照片。",
            steps: [
                { step: 1, title: "构图基础", content: "让照片更出彩的构图法则：三分法、引导线、对称美、留白。" },
                { step: 2, title: "光线运用", content: "摄影是用光的艺术：黄金时间、顺光、侧光、逆光的运用。" },
                { step: 3, title: "手机修图", content: "简单修图提升质感：调整曝光、增加对比度、适当饱和度、裁剪二次构图。" }
            ]
        },
        {
            id: "hanfu-101",
            title: "汉服穿搭入门",
            category: "traditional",
            difficulty: "beginner",
            duration: "15分钟",
            points: 45,
            tags: ["汉服", "传统文化", "穿搭"],
            icon: "👘",
            summary: "领略汉服之美，穿出古韵优雅气质",
            description: "汉服不仅是衣服，更是文化的载体。本技能带你了解汉服基本形制，学会日常穿搭。",
            steps: [
                { step: 1, title: "认识汉服形制", content: "常见汉服款式：齐胸襦裙、齐腰襦裙、明制袄裙、宋制。新手推荐从齐腰襦裙或宋制开始。" },
                { step: 2, title: "穿搭技巧", content: "汉服穿搭要点：层次分明、配色协调、发型搭配、鞋履选择。" },
                { step: 3, title: "场合选择", content: "不同场合的穿搭建议：日常出行、拍照活动、传统节日、工作场合。" }
            ]
        },
        {
            id: "copywriting-101",
            title: "古风文案创作",
            category: "traditional",
            difficulty: "intermediate",
            duration: "30分钟",
            points: 70,
            tags: ["写作", "文案", "创意"],
            icon: "✍️",
            summary: "用文字描绘意境，学会创作优美古风文案",
            description: "古风文案有独特的韵味和美感。本技能将教你掌握古风文案的创作方法和技巧。",
            steps: [
                { step: 1, title: "古风文案特点", content: "古风文案的独特魅力：意境营造、用词典雅、节奏韵律、文化底蕴。" },
                { step: 2, title: "创作技巧", content: "古风文案写作技巧：借鉴古诗词、运用意象、时空交错、留白艺术。" },
                { step: 3, title: "实战演练", content: "场景化练习：产品文案、社交媒体文案、节日祝福、情感表达。" }
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
            alert('🚀 开始学习「' + skill.title + '」！\n\n此功能正在完善中，敬请期待！');
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