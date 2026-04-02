/**
 * 红尘灵境 - 技能数据处理模块
 * @version 1.0.0-mvp
 */

// 全局技能数据
let allSkills = [];
let filteredSkills = [];
let currentCategory = 'all';
let currentPage = 1;
const PAGE_SIZE = CONFIG.SKILLS.PAGE_SIZE;

// 加载技能数据
async function loadSkillsData() {
    try {
        const response = await fetch('data/skills-data.json');
        const data = await response.json();
        allSkills = data.skills || [];
        filteredSkills = [...allSkills];
        console.log(`[技能] 已加载 ${allSkills.length} 个技能`);
    } catch (error) {
        console.error('[技能] 加载失败:', error);
        // 备用：使用内联数据
        allSkills = getFallbackSkills();
        filteredSkills = [...allSkills];
    }
}

// 备用技能数据（JSON加载失败时使用）
function getFallbackSkills() {
    return [
        {
            id: "chatgpt-101",
            title: "ChatGPT入门指南",
            category: "ai-tools",
            difficulty: "beginner",
            duration: "15分钟",
            points: 50,
            tags: ["AI", "效率工具"],
            icon: "💬",
            summary: "从零开始学会使用ChatGPT"
        },
        {
            id: "midjourney-101",
            title: "Midjourney绘画入门",
            category: "ai-tools",
            difficulty: "beginner",
            duration: "20分钟",
            points: 60,
            tags: ["AI绘画", "创意"],
            icon: "🎨",
            summary: "用AI生成精美图片"
        },
        {
            id: "prompt-101",
            title: "提示词工程基础",
            category: "ai-tools",
            difficulty: "intermediate",
            duration: "25分钟",
            points: 80,
            tags: ["AI", "进阶"],
            icon: "⚡",
            summary: "掌握提示词编写技巧"
        },
        {
            id: "mobile-photo-101",
            title: "手机摄影技巧",
            category: "life",
            difficulty: "beginner",
            duration: "20分钟",
            points: 40,
            tags: ["摄影", "生活"],
            icon: "📷",
            summary: "用手机拍出大片感"
        },
        {
            id: "hanfu-101",
            title: "汉服穿搭入门",
            category: "traditional",
            difficulty: "beginner",
            duration: "15分钟",
            points: 45,
            tags: ["汉服", "传统"],
            icon: "👘",
            summary: "穿出古韵优雅气质"
        },
        {
            id: "copywriting-101",
            title: "古风文案创作",
            category: "traditional",
            difficulty: "intermediate",
            duration: "30分钟",
            points: 70,
            tags: ["写作", "文案"],
            icon: "✍️",
            summary: "创作优美古风文案"
        }
    ];
}

// 初始化分类标签
function initCategoryTabs() {
    const tabsContainer = document.getElementById('categoryTabs');
    if (!tabsContainer) return;
    
    // 添加全部按钮（已有）
    
    // 从配置动态生成分类按钮
    const categories = CONFIG.SKILLS.CATEGORIES;
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'cat-tab';
        btn.dataset.category = cat.id;
        btn.innerHTML = `${cat.icon} ${cat.name}`;
        btn.onclick = () => filterCategory(cat.id);
        tabsContainer.appendChild(btn);
    });
}

// 筛选分类
function filterCategory(category) {
    currentCategory = category;
    currentPage = 1;
    
    // 更新标签状态
    document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });
    
    // 筛选数据
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
    
    currentPage = 1;
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
    
    // 分页
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageSkills = filteredSkills.slice(start, end);
    
    // 构建HTML
    grid.innerHTML = pageSkills.map(skill => {
        const difficulty = CONFIG.SKILLS.DIFFICULTY[skill.difficulty.toUpperCase()] || 
                          { label: skill.difficulty, color: '#999' };
        
        return `
            <div class="skill-card" onclick="showSkillDetail('${skill.id}')">
                <div class="skill-icon">${skill.icon || '📚'}</div>
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
    
    // 显示加载更多（如果有更多）
    const hasMore = end < filteredSkills.length;
    document.getElementById('loadingMore').style.display = hasMore ? 'block' : 'none';
}

// 加载更多技能
function loadMoreSkills() {
    currentPage++;
    renderSkills();
}

// 显示技能详情
function showSkillDetail(skillId) {
    const skill = allSkills.find(s => s.id === skillId);
    if (!skill) return;
    
    const modal = document.getElementById('skillModal');
    const content = document.getElementById('skillDetailContent');
    
    const difficulty = CONFIG.SKILLS.DIFFICULTY[skill.difficulty.toUpperCase()] || 
                      { label: skill.difficulty, color: '#999' };
    
    // 构建步骤HTML
    const stepsHtml = skill.steps ? skill.steps.map(step => `
        <div class="detail-step">
            <h4>第${step.step}步：${step.title}</h4>
            <p>${step.content.replace(/\n/g, '<br>')}</p>
            ${step.tip ? `<div class="step-tip">💡 ${step.tip}</div>` : ''}
        </div>
    `).join('') : '<p>暂无详细步骤</p>';
    
    content.innerHTML = `
        <div class="skill-detail-header">
            <div class="detail-icon">${skill.icon || '📚'}</div>
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
            <p>${skill.description || skill.summary}</p>
        </div>
        
        <div class="skill-steps">
            <h3>学习步骤</h3>
            ${stepsHtml}
        </div>
        
        <div class="skill-actions">
            <button class="btn btn-primary" onclick="startLearnSkill('${skill.id}')">
                🚀 开始学习
            </button>
            <button class="btn btn-secondary" onclick="askZiwei('关于${skill.title}，有什么建议吗？')">
                💜 问紫薇
            </button>
        </div>
    `;
    
    modal.style.display = 'flex';
}

// 关闭技能详情
function closeSkillModal() {
    document.getElementById('skillModal').style.display = 'none';
}

// 开始学习技能
function startLearnSkill(skillId) {
    const skill = allSkills.find(s => s.id === skillId);
    if (!skill) return;
    
    // 记录学习进度
    if (typeof updateUserProgress === 'function') {
        updateUserProgress(skill.points);
    }
    
    alert(`🚀 开始学习「${skill.title}」！\n\n学完记得回来完成测验，领取${skill.points}积分！`);
}

// 初始化技能页面
async function initSkills() {
    await loadSkillsData();
    initCategoryTabs();
    renderSkills();
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadSkillsData, renderSkills, filterCategory, showSkillDetail };
}