/**
 * 红尘灵境 - 智能助手集成模块
 * 用于集成腾讯云智能体平台到网页版
 * 版本: 1.0.0
 * 时间: 2026年3月12日
 */

class SmartAssistant {
    constructor(options = {}) {
        // 默认配置
        this.config = {
            apiEndpoint: 'https://lke.tencentcloudapi.com',
            appId: '', // 需要在智能体平台获取
            apiKey: '', // 需要在智能体平台获取
            assistantType: 'skill', // skill | creative | community
            enableVoice: false,
            enableHistory: true,
            maxHistory: 50
        };
        
        // 合并用户配置
        Object.assign(this.config, options);
        
        // 初始化状态
        this.isInitialized = false;
        this.conversationHistory = [];
        this.currentAssistant = null;
        
        // 助手配置映射
        this.assistants = {
            skill: {
                name: '技能学习助手',
                description: '帮助您选择和学习最适合的技能',
                greeting: '您好！我是您的技能学习助手。我可以帮您：\n1. 推荐适合您的技能\n2. 规划学习路径\n3. 跟踪学习进度\n4. 解答技能相关问题\n\n请问您想了解什么？'
            },
            creative: {
                name: 'AI创作导师',
                description: '指导您进行AI创作和创意表达',
                greeting: '您好！我是您的AI创作导师。我可以帮您：\n1. 提供创作灵感\n2. 指导创作技巧\n3. 评估作品质量\n4. 推荐创作工具\n\n您想创作什么类型的作品？'
            },
            community: {
                name: '社区智能助手',
                description: '引导社区交流和话题讨论',
                greeting: '您好！我是您的社区智能助手。我可以帮您：\n1. 推荐讨论话题\n2. 引导健康交流\n3. 解答社区规则\n4. 推荐优质内容\n\n有什么想和大家交流的吗？'
            }
        };
    }
    
    /**
     * 初始化智能助手
     */
    async initialize(assistantType = 'skill') {
        try {
            this.currentAssistant = this.assistants[assistantType];
            if (!this.currentAssistant) {
                throw new Error(`不支持的助手类型: ${assistantType}`);
            }
            
            console.log(`初始化${this.currentAssistant.name}...`);
            
            // 检查必要配置
            if (!this.config.appId || !this.config.apiKey) {
                console.warn('未配置AppId或API Key，将使用模拟模式');
                this.isInitialized = true;
                return this.simulateInitialization();
            }
            
            // TODO: 实际API调用验证
            // const isValid = await this.validateCredentials();
            // if (!isValid) {
            //     throw new Error('API凭证验证失败');
            // }
            
            this.isInitialized = true;
            console.log(`${this.currentAssistant.name} 初始化成功`);
            
            return {
                success: true,
                assistant: this.currentAssistant.name,
                greeting: this.currentAssistant.greeting
            };
            
        } catch (error) {
            console.error('初始化失败:', error);
            return {
                success: false,
                error: error.message,
                assistant: '模拟助手',
                greeting: this.getSimulatedGreeting(assistantType)
            };
        }
    }
    
    /**
     * 发送消息到智能助手
     */
    async sendMessage(message) {
        if (!this.isInitialized) {
            await this.initialize(this.config.assistantType);
        }
        
        // 记录用户消息
        const userMessage = {
            role: 'user',
            content: message,
            timestamp: new Date().toISOString()
        };
        
        this.conversationHistory.push(userMessage);
        
        try {
            let response;
            
            if (this.config.appId && this.config.apiKey) {
                // 实际API调用
                response = await this.callAssistantAPI(message);
            } else {
                // 模拟响应
                response = await this.simulateResponse(message);
            }
            
            // 记录助手响应
            const assistantMessage = {
                role: 'assistant',
                content: response.content,
                timestamp: new Date().toISOString(),
                references: response.references || []
            };
            
            this.conversationHistory.push(assistantMessage);
            
            // 保持历史记录长度
            if (this.conversationHistory.length > this.config.maxHistory * 2) {
                this.conversationHistory = this.conversationHistory.slice(-this.config.maxHistory * 2);
            }
            
            return assistantMessage;
            
        } catch (error) {
            console.error('发送消息失败:', error);
            
            // 返回错误响应
            const errorMessage = {
                role: 'assistant',
                content: `抱歉，我遇到了一个问题：${error.message}\n\n请检查网络连接或稍后再试。`,
                timestamp: new Date().toISOString(),
                error: true
            };
            
            this.conversationHistory.push(errorMessage);
            return errorMessage;
        }
    }
    
    /**
     * 调用智能助手API（模拟实现）
     */
    async callAssistantAPI(message) {
        // TODO: 实现实际的腾讯云智能体平台API调用
        // 这里提供模拟实现
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const responses = {
                    skill: [
                        `根据您的查询"${message}"，我为您推荐以下学习路径：\n\n1. **基础入门**（1-2周）\n   - 掌握核心概念\n   - 完成基础练习\n\n2. **实战提升**（2-4周）\n   - 参与实际项目\n   - 解决实际问题\n\n3. **精通深化**（1-2个月）\n   - 深入高级特性\n   - 贡献开源项目`,
                        `关于"${message}"，我为您整理了以下学习资源：\n\n📚 **推荐书籍**：\n- 《XXX入门指南》\n- 《XXX实战教程》\n\n🎥 **视频课程**：\n- B站：XXX系列教程\n- 慕课网：XXX从入门到精通\n\n💻 **实践项目**：\n- GitHub上的XXX项目\n- 在线编程练习平台`,
                        `学习"${message}"需要掌握以下核心技能：\n\n✅ **基础知识**：\n   - 概念理解\n   - 基础语法\n   - 常用工具\n\n✅ **进阶技能**：\n   - 架构设计\n   - 性能优化\n   - 安全防护\n\n✅ **实战能力**：\n   - 项目开发\n   - 问题排查\n   - 团队协作`
                    ],
                    creative: [
                        `关于"${message}"的创作，我建议：\n\n🎨 **创意方向**：\n- 结合当前热门元素\n- 融入个人独特风格\n- 注重情感表达\n\n🛠️ **创作工具**：\n- AI绘画工具：Midjourney\n- 文案助手：ChatGPT\n- 视频编辑：剪映\n\n📝 **创作步骤**：\n1. 明确主题\n2. 收集素材\n3. 初稿创作\n4. 优化调整\n5. 发布分享`,
                        `您的创作想法"${message}"很有潜力！\n\n✨ **优化建议**：\n- 增加情感共鸣点\n- 强化视觉冲击力\n- 优化叙事节奏\n\n🌟 **灵感来源**：\n- 参考优秀作品：XXX\n- 关注行业趋势\n- 结合用户反馈\n\n🏆 **成功要素**：\n- 独特性\n- 专业性\n- 传播性`
                    ],
                    community: [
                        `关于"${message}"的话题，社区讨论建议：\n\n🗣️ **讨论角度**：\n- 技术实现\n- 应用场景\n- 未来展望\n\n👥 **参与方式**：\n- 发起话题讨论\n- 参与现有讨论\n- 分享经验心得\n\n📊 **讨论规范**：\n- 尊重不同观点\n- 保持礼貌交流\n- 提供有价值内容`,
                        `这个话题"${message}"很适合社区讨论！\n\n🔍 **讨论价值**：\n- 帮助新手入门\n- 分享实践经验\n- 探讨前沿技术\n\n🤝 **社区支持**：\n- 版主会引导讨论\n- 专家会提供指导\n- 成员会互助学习\n\n🎯 **讨论目标**：\n- 达成共识\n- 解决问题\n- 促进成长`
                    ]
                };
                
                const type = this.config.assistantType || 'skill';
                const typeResponses = responses[type] || responses.skill;
                const randomResponse = typeResponses[Math.floor(Math.random() * typeResponses.length)];
                
                resolve({
                    content: randomResponse,
                    references: [
                        { title: '相关知识库', url: '#' },
                        { title: '推荐学习资源', url: '#' }
                    ]
                });
            }, 1000); // 模拟网络延迟
        });
    }
    
    /**
     * 模拟响应（用于无API配置时）
     */
    async simulateResponse(message) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const greetings = [
                    `您好！我是${this.currentAssistant.name}。`,
                    `很高兴为您服务！`,
                    `有什么可以帮您的吗？`
                ];
                
                const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
                
                resolve({
                    content: `${randomGreeting}\n\n您说："${message}"\n\n这是一个模拟响应。要获得真实智能响应，请配置智能体平台的AppId和API Key。`,
                    references: []
                });
            }, 500);
        });
    }
    
    /**
     * 获取模拟问候语
     */
    getSimulatedGreeting(type) {
        const greetings = {
            skill: '您好！我是您的技能学习助手（模拟模式）。请配置智能体平台API以获得完整功能。',
            creative: '您好！我是您的AI创作导师（模拟模式）。请配置智能体平台API以获得完整功能。',
            community: '您好！我是您的社区智能助手（模拟模式）。请配置智能体平台API以获得完整功能。'
        };
        
        return greetings[type] || greetings.skill;
    }
    
    /**
     * 模拟初始化
     */
    simulateInitialization() {
        return {
            success: true,
            assistant: `${this.currentAssistant.name}（模拟模式）`,
            greeting: this.getSimulatedGreeting(this.config.assistantType)
        };
    }
    
    /**
     * 切换助手类型
     */
    async switchAssistant(type) {
        if (!this.assistants[type]) {
            throw new Error(`不支持的助手类型: ${type}`);
        }
        
        this.config.assistantType = type;
        this.currentAssistant = this.assistants[type];
        
        // 清空历史记录（可选）
        // this.conversationHistory = [];
        
        console.log(`已切换到${this.currentAssistant.name}`);
        
        return {
            success: true,
            assistant: this.currentAssistant.name,
            greeting: this.currentAssistant.greeting
        };
    }
    
    /**
     * 获取对话历史
     */
    getConversationHistory() {
        return [...this.conversationHistory];
    }
    
    /**
     * 清空对话历史
     */
    clearConversationHistory() {
        this.conversationHistory = [];
        console.log('对话历史已清空');
        return { success: true };
    }
    
    /**
     * 获取助手信息
     */
    getAssistantInfo() {
        return {
            name: this.currentAssistant?.name || '未初始化',
            description: this.currentAssistant?.description || '',
            type: this.config.assistantType,
            isInitialized: this.isInitialized,
            hasApiConfig: !!(this.config.appId && this.config.apiKey),
            historyCount: this.conversationHistory.length / 2
        };
    }
}

/**
 * UI界面集成助手
 */
class SmartAssistantUI {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`容器 ${containerId} 不存在`);
            return;
        }
        
        this.assistant = new SmartAssistant(options);
        this.isOpen = false;
        
        this.initUI();
    }
    
    /**
     * 初始化UI界面
     */
    initUI() {
        // 创建浮动按钮
        this.createFloatingButton();
        
        // 创建聊天窗口
        this.createChatWindow();
        
        // 初始化助手
        this.assistant.initialize().then((result) => {
            if (result.success) {
                this.addMessage('assistant', result.greeting);
            }
        });
    }
    
    /**
     * 创建浮动按钮
     */
    createFloatingButton() {
        this.floatingButton = document.createElement('button');
        this.floatingButton.id = 'smart-assistant-button';
        this.floatingButton.innerHTML = '🤖';
        this.floatingButton.title = '智能助手';
        this.floatingButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        this.floatingButton.addEventListener('mouseenter', () => {
            this.floatingButton.style.transform = 'scale(1.1)';
        });
        
        this.floatingButton.addEventListener('mouseleave', () => {
            this.floatingButton.style.transform = 'scale(1)';
        });
        
        this.floatingButton.addEventListener('click', () => {
            this.toggleChatWindow();
        });
        
        document.body.appendChild(this.floatingButton);
    }
    
    /**
     * 创建聊天窗口
     */
    createChatWindow() {
        this.chatWindow = document.createElement('div');
        this.chatWindow.id = 'smart-assistant-chat';
        this.chatWindow.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            display: none;
            flex-direction: column;
            z-index: 999;
            overflow: hidden;
            transition: all 0.3s ease;
        `;
        
        // 聊天窗口头部
        const header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        const title = document.createElement('div');
        title.innerHTML = '<strong>智能助手</strong>';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        closeBtn.addEventListener('click', () => {
            this.toggleChatWindow();
        });
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        
        // 消息容器
        this.messageContainer = document.createElement('div');
        this.messageContainer.id = 'chat-messages';
        this.messageContainer.style.cssText = `
            flex: 1;
            padding: 15px;
            overflow-y: auto;
            background: #f8f9fa;
        `;
        
        // 输入区域
        const inputArea = document.createElement('div');
        inputArea.style.cssText = `
            border-top: 1px solid #eee;
            padding: 10px;
            background: white;
        `;
        
        const inputGroup = document.createElement('div');
        inputGroup.style.cssText = `
            display: flex;
            gap: 8px;
        `;
        
        this.messageInput = document.createElement('input');
        this.messageInput.type = 'text';
        this.messageInput.placeholder = '输入您的问题...';
        this.messageInput.style.cssText = `
            flex: 1;
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 20px;
            outline: none;
            font-size: 14px;
        `;
        
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        const sendBtn = document.createElement('button');
        sendBtn.innerHTML = '发送';
        sendBtn.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 20px;
            padding: 10px 20px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
        `;
        
        sendBtn.addEventListener('click', () => {
            this.sendMessage();
        });
        
        inputGroup.appendChild(this.messageInput);
        inputGroup.appendChild(sendBtn);
        inputArea.appendChild(inputGroup);
        
        // 助手选择器
        const selectorArea = document.createElement('div');
        selectorArea.style.cssText = `
            padding: 10px;
            background: #f8f9fa;
            border-top: 1px solid #eee;
            display: flex;
            gap: 8px;
            justify-content: center;
        `;
        
        ['skill', 'creative', 'community'].forEach((type) => {
            const btn = document.createElement('button');
            btn.innerHTML = this.assistant.assistants[type].name;
            btn.style.cssText = `
                padding: 5px 10px;
                border: 1px solid #ddd;
                border-radius: 15px;
                background: white;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
            `;
            
            btn.addEventListener('click', () => {
                this.switchAssistant(type);
            });
            
            selectorArea.appendChild(btn);
        });
        
        // 组装聊天窗口
        this.chatWindow.appendChild(header);
        this.chatWindow.appendChild(this.messageContainer);
        this.chatWindow.appendChild(selectorArea);
        this.chatWindow.appendChild(inputArea);
        
        document.body.appendChild(this.chatWindow);
    }
    
    /**
     * 切换聊天窗口显示/隐藏
     */
    toggleChatWindow() {
        this.isOpen = !this.isOpen;
        this.chatWindow.style.display = this.isOpen ? 'flex' : 'none';
        this.floatingButton.innerHTML = this.isOpen ? '✕' : '🤖';
        
        if (this.isOpen) {
            this.messageInput.focus();
        }
    }
    
    /**
     * 添加消息到聊天窗口
     */
    addMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        messageDiv.style.cssText = `
            margin-bottom: 15px;
            max-width: 80%;
            ${role === 'user' ? 'margin-left: auto;' : ''}
        `;
        
        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.style.cssText = `
            padding: 10px 15px;
            border-radius: 18px;
            background: ${role === 'user' ? '#667eea' : 'white'};
            color: ${role === 'user' ? 'white' : '#333'};
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            word-wrap: break-word;
            line-height: 1.5;
        `;
        
        // 处理换行和基本Markdown
        let formattedContent = content;
        formattedContent = formattedContent.replace(/\n/g, '<br>');
        formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
        formattedContent = formattedContent.replace(/`(.*?)`/g, '<code>$1</code>');
        
        bubble.innerHTML = formattedContent;
        
        messageDiv.appendChild(bubble);
        this.messageContainer.appendChild(messageDiv);
        
        // 滚动到底部
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }
    
    /**
     * 发送消息
     */
    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;
        
        // 添加用户消息到UI
        this.addMessage('user', message);
        this.messageInput.value = '';
        
        // 显示加载中
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message assistant';
        loadingDiv.innerHTML = `
            <div class="message-bubble">
                <div class="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        this.messageContainer.appendChild(loadingDiv);
        
        // 发送到助手
        try {
            const response = await this.assistant.sendMessage(message);
            
            // 移除加载中
            this.messageContainer.removeChild(loadingDiv);
            
            // 添加助手响应
            this.addMessage('assistant', response.content);
            
        } catch (error) {
            // 移除加载中
            this.messageContainer.removeChild(loadingDiv);
            
            // 添加错误消息
            this.addMessage('assistant', `发送消息失败：${error.message}`);
        }
    }
    
    /**
     * 切换助手类型
     */
    async switchAssistant(type) {
        try {
            const result = await this.assistant.switchAssistant(type);
            if (result.success) {
                // 清空当前聊天记录
                this.messageContainer.innerHTML = '';
                // 添加新的问候语
                this.addMessage('assistant', result.greeting);
            }
        } catch (error) {
            console.error('切换助手失败:', error);
        }
    }
}

/**
 * 导出全局对象
 */
if (typeof window !== 'undefined') {
    window.SmartAssistant = SmartAssistant;
    window.SmartAssistantUI = SmartAssistantUI;
}

console.log('红尘灵境智能助手集成模块加载完成');