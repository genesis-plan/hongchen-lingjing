/**
 * 红尘灵境 - MVP 配置文件
 * 统一管理所有配置项，便于维护和部署
 * @version 1.0.0-mvp
 */

const CONFIG = {
    // 应用信息
    APP: {
        NAME: '红尘灵境',
        VERSION: '1.0.0-mvp',
        SLOGAN: '以古风为骨，以科技为翼，人人皆是技能共创者',
        ENV: 'production' // development | production
    },

    // API 配置
    API: {
        BASE_URL: 'http://159.75.154.206:3000',
        ZIWEI_CHAT: '/api/chat',
        HEALTH_CHECK: '/health',
        TIMEOUT: 10000, // 毫秒
        RETRY_COUNT: 2
    },

    // 功能开关（MVP阶段只开启核心功能）
    FEATURES: {
        // 核心功能（已启用）
        SKILL_HALL: true,        // 技能殿堂
        SKILL_DETAIL: true,      // 技能详情
        ZIWEI_CHAT: true,        // 紫薇助手
        USER_PROFILE: true,      // 个人中心
        
        // 非核心功能（MVP禁用）
        WISH_WALL: false,        // 心愿墙
        TASK_HALL: false,        // 任务大厅
        SOCIAL_TEAHOUSE: false,  // 茶馆社交
        SOCIAL_SQUARE: false,    // 话题广场
        MARKET: false,           // 墟市
        ECONOMY: false,          // 经济系统
        CREATOR_WORKSHOP: false, // 造化工坊
        CHALLENGE: false,        // 赛季挑战
        LEADERBOARD: false,      // 排行榜
        
        // 增值功能（延后）
        VOICE_CHAT: false,       // 语音对话
        VIDEO_CALL: false,       // 视频通话
        ACHIEVEMENTS: false      // 成就系统（简化版）
    },

    // 技能配置
    SKILLS: {
        CATEGORIES: [
            { id: 'ai-tools', name: 'AI工具', icon: '🤖', color: '#722ed1' },
            { id: 'traditional', name: '传统技艺', icon: '🏮', color: '#cf1322' },
            { id: 'digital-art', name: '数字艺术', icon: '🎨', color: '#08979c' },
            { id: 'life', name: '生活美学', icon: '🌸', color: '#389e0d' }
        ],
        DIFFICULTY: {
            BEGINNER: { label: '入门', color: '#52c41a' },
            INTERMEDIATE: { label: '进阶', color: '#faad14' },
            ADVANCED: { label: '高阶', color: '#f5222d' }
        },
        PAGE_SIZE: 6 // 每页显示技能数
    },

    // 紫薇助手配置
    ZIWEI: {
        NAME: '紫薇',
        AVATAR: '💜',
        TITLE: '红尘灵境引路人',
        GREETING: '欢迎来到红尘灵境，我是紫薇，有什么可以帮助你的吗？',
        OFFLINE_MSG: '紫薇暂时离线，您可以先浏览技能列表，稍后再来对话~',
        ERROR_MSG: '抱歉，刚才走神了，请再说一次好吗？',
        MAX_HISTORY: 10 // 最大历史消息数
    },

    // 用户配置
    USER: {
        STORAGE_KEY: 'hongchen_user_v1',
        DEFAULT_AVATAR: '👤',
        LEVELS: [
            { name: '云游者', min: 0 },
            { name: '入门者', min: 100 },
            { name: '精进者', min: 500 },
            { name: '大成者', min: 2000 },
            { name: '宗师', min: 5000 }
        ]
    },

    // UI 配置
    UI: {
        ANIMATION_DURATION: 300,
        TOAST_DURATION: 3000,
        THEME: {
            PRIMARY: '#722ed1',
            SECONDARY: '#b37feb',
            ACCENT: '#ff7e5f',
            DARK: '#2d3436',
            LIGHT: '#f9f9f9',
            BG_START: '#fdfcfb',
            BG_END: '#e2d1c3'
        }
    },

    // 调试配置
    DEBUG: {
        ENABLED: false,
        LOG_LEVEL: 'info', // debug | info | warn | error
        MOCK_API: false
    }
};

// 冻结配置对象，防止运行时修改
Object.freeze(CONFIG);
Object.freeze(CONFIG.APP);
Object.freeze(CONFIG.API);
Object.freeze(CONFIG.FEATURES);
Object.freeze(CONFIG.SKILLS);
Object.freeze(CONFIG.ZIWEI);
Object.freeze(CONFIG.USER);
Object.freeze(CONFIG.UI);
Object.freeze(CONFIG.DEBUG);

// 导出配置（兼容不同模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// 日志输出（仅开发环境）
if (CONFIG.DEBUG.ENABLED) {
    console.log('[红尘灵境] 配置加载完成:', CONFIG.APP.VERSION);
    console.log('[红尘灵境] 已启用功能:', 
        Object.entries(CONFIG.FEATURES)
            .filter(([k, v]) => v === true)
            .map(([k]) => k)
    );
}
