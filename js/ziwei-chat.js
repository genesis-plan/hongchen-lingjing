/**
 * 红尘灵境 - 紫薇助手对话模块
 * @version 1.0.0-mvp
 */

let ziweiHistory = [];
const MAX_HISTORY = CONFIG.ZIWEI.MAX_HISTORY;

// 切换紫薇聊天窗口
function toggleZiweiChat() {
    const chatBox = document.getElementById('ziwei-chat');
    const btn = document.getElementById('ziwei-btn');
    
    if (chatBox.style.display === 'none') {
        chatBox.style.display = 'flex';
        btn.style.display = 'none';
        
        // 首次打开显示欢迎语
        if (ziweiHistory.length === 0) {
            addZiweiMessage(CONFIG.ZIWEI.GREETING, 'system');
        }
    } else {
        chatBox.style.display = 'none';
        btn.style.display = 'flex';
    }
}

// 处理键盘事件
function handleZiweiKey(event) {
    if (event.key === 'Enter') {
        sendToZiwei();
    }
}

// 发送消息到紫薇
async function sendToZiwei() {
    const input = document.getElementById('ziweiInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // 显示用户消息
    addZiweiMessage(message, 'user');
    input.value = '';
    
    // 显示加载中
    showZiweiLoading();
    
    try {
        // 调用紫薇API
        const response = await fetch(CONFIG.API.BASE_URL + CONFIG.API.ZIWEI_CHAT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: message,
                history: ziweiHistory.slice(-5) // 只传最近5条
            }),
            signal: AbortSignal.timeout(CONFIG.API.TIMEOUT)
        });
        
        removeZiweiLoading();
        
        if (response.ok) {
            const data = await response.json();
            const reply = data.reply || data.message || CONFIG.ZIWEI.GREETING;
            addZiweiMessage(reply, 'ai');
        } else {
            throw new Error('API响应错误');
        }
    } catch (error) {
        console.error('[紫薇] 请求失败:', error);
        removeZiweiLoading();
        
        // 显示离线消息
        addZiweiMessage(
            CONFIG.ZIWEI.OFFLINE_MSG + '\n\n您可以尝试：\n• 检查网络连接\n• 浏览技能列表学习新技能\n• 稍后再试',
            'ai',
            true
        );
    }
}

// 添加消息到聊天窗口
function addZiweiMessage(text, type, isError = false) {
    const container = document.getElementById('ziwei-messages');
    if (!container) return;
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}`;
    
    if (type === 'user') {
        msgDiv.innerHTML = `<span class="msg-content">${text}</span>`;
    } else {
        msgDiv.innerHTML = `
            <div class="msg-avatar">${CONFIG.ZIWEI.AVATAR}</div>
            <div class="msg-content ${isError ? 'error' : ''}">${text.replace(/\n/g, '<br>')}</div>
        `;
    }
    
    container.appendChild(msgDiv);
    
    // 保存到历史
    if (type !== 'system') {
        ziweiHistory.push({ type, content: text });
        if (ziweiHistory.length > MAX_HISTORY * 2) {
            ziweiHistory = ziweiHistory.slice(-MAX_HISTORY);
        }
    }
    
    // 滚动到底部
    container.scrollTop = container.scrollHeight;
}

// 显示加载状态
function showZiweiLoading() {
    const container = document.getElementById('ziwei-messages');
    if (!container) return;
    
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message ai loading';
    loadingDiv.id = 'ziwei-loading';
    loadingDiv.innerHTML = `
        <div class="msg-avatar">${CONFIG.ZIWEI.AVATAR}</div>
        <div class="msg-content">
            <span class="typing-indicator">
                <span>.</span><span>.</span><span>.</span>
            </span>
            紫薇正在思考...
        </div>
    `;
    
    container.appendChild(loadingDiv);
    container.scrollTop = container.scrollHeight;
}

// 移除加载状态
function removeZiweiLoading() {
    const loading = document.getElementById('ziwei-loading');
    if (loading) {
        loading.remove();
    }
}

// 向紫薇提问（从技能详情页调用）
function askZiwei(question) {
    // 确保聊天窗口打开
    const chatBox = document.getElementById('ziwei-chat');
    if (chatBox.style.display === 'none') {
        toggleZiweiChat();
    }
    
    // 设置输入框内容并发送
    const input = document.getElementById('ziweiInput');
    input.value = question;
    sendToZiwei();
}

// 初始化紫薇模块
function initZiwei() {
    console.log('[紫薇] 初始化完成，版本:', CONFIG.APP.VERSION);
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { sendToZiwei, askZiwei, initZiwei };
}