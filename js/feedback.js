/**
 * 琅环比福地 - 用户反馈系统
 * @version 1.0.0
 */

const FeedbackSystem = (function() {
    // 配置
    const CONFIG = {
        // 反馈API端点（暂时使用localStorage存储）
        STORAGE_KEY: 'hongchen_feedback',
        // 触发完成反馈的时机
        FEEDBACK_TRIGGER: {
            afterStep: true,      // 每完成一步
            afterComplete: true,  // 完成学习后
            manual: true          // 手动反馈按钮
        }
    };

    // 当前反馈数据
    let currentFeedback = {
        skillId: null,
        stepRatings: [],
        overallRating: 0,
        suggestions: '',
        wantMoreSkills: [],
        contact: '',
        timestamp: null
    };

    // ========== 初始化 ==========
    
    function init() {
        console.log('[反馈系统] 初始化完成');
        createFeedbackButton();
    }

    // ========== UI组件 ==========

    /**
     * 创建浮动反馈按钮
     */
    function createFeedbackButton() {
        const btn = document.createElement('button');
        btn.id = 'feedbackFloatBtn';
        btn.innerHTML = '💬 反馈';
        btn.style.cssText = `
            position: fixed;
            right: 20px;
            bottom: 100px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            z-index: 9999;
            transition: all 0.3s;
        `;
        
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.1)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        });
        btn.addEventListener('click', () => showFeedbackModal());
        
        document.body.appendChild(btn);
    }

    /**
     * 显示反馈弹窗
     */
    function showFeedbackModal(skillId = null, step = null) {
        currentFeedback.skillId = skillId;
        
        const modal = document.createElement('div');
        modal.id = 'feedbackModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                border-radius: 20px;
                padding: 30px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideUp 0.3s;
            ">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
                    <h2 style="margin:0;color:#333;">💡 你的反馈对我们很重要</h2>
                    <button onclick="FeedbackSystem.closeModal()" style="
                        background:none;border:none;font-size:24px;cursor:pointer;color:#999;
                    ">×</button>
                </div>
                
                ${step ? `<p style="color:#667eea;margin-bottom:20px;">你刚完成了第 ${step} 步</p>` : ''}
                
                <!-- 评分 -->
                <div style="margin-bottom:25px;">
                    <p style="margin-bottom:10px;font-weight:500;">1. 你对这个技能满意吗？</p>
                    <div id="starRating" style="font-size:30px;cursor:pointer;">
                        ${[1,2,3,4,5].map(i => `<span class="star" data-rating="${i}" style="color:#ddd;">★</span>`).join('')}
                    </div>
                </div>
                
                <!-- 实用性评价 -->
                <div style="margin-bottom:25px;">
                    <p style="margin-bottom:10px;font-weight:500;">2. 这个技能实用吗？</p>
                    <div style="display:flex;gap:10px;flex-wrap:wrap;">
                        <label style="cursor:pointer;">
                            <input type="radio" name="useful" value="very" style="margin-right:5px;">
                            非常实用
                        </label>
                        <label style="cursor:pointer;">
                            <input type="radio" name="useful" value="ok" style="margin-right:5px;">
                            还可以
                        </label>
                        <label style="cursor:pointer;">
                            <input type="radio" name="useful" value="not" style="margin-right:5px;">
                            不太实用
                        </label>
                    </div>
                </div>
                
                <!-- 建议 -->
                <div style="margin-bottom:25px;">
                    <p style="margin-bottom:10px;font-weight:500;">3. 有什么建议？（选填）</p>
                    <textarea id="suggestionText" placeholder="告诉我们哪里可以做得更好..." style="
                        width:100%;
                        min-height:80px;
                        padding:12px;
                        border:1px solid #ddd;
                        border-radius:10px;
                        resize:vertical;
                        font-family:inherit;
                    "></textarea>
                </div>
                
                <!-- 想学的新技能 -->
                <div style="margin-bottom:25px;">
                    <p style="margin-bottom:10px;font-weight:500;">4. 你还想学什么技能？</p>
                    <div style="display:flex;flex-wrap:wrap;gap:8px;">
                        ${['AI绘图', '写作技巧', '副业赚钱', '英语口语', 'Excel', 'Python'].map(skill => `
                            <label class="skill-tag" style="
                                padding:8px 16px;
                                background:#f5f5f5;
                                border-radius:20px;
                                cursor:pointer;
                                transition:all 0.3s;
                            ">
                                <input type="checkbox" value="${skill}" style="display:none;">
                                ${skill}
                            </label>
                        `).join('')}
                    </div>
                </div>
                
                <!-- 联系方式 -->
                <div style="margin-bottom:25px;">
                    <p style="margin-bottom:10px;font-weight:500;">5. 你的微信（选填，方便回访）</p>
                    <input type="text" id="contactWechat" placeholder="微信号" style="
                        width:100%;
                        padding:12px;
                        border:1px solid #ddd;
                        border-radius:10px;
                    ">
                </div>
                
                <!-- 隐私声明确认 -->
                <div style="margin-bottom:20px;padding:15px;background:#f8f5fa;border-radius:10px;">
                    <label style="cursor:pointer;display:flex;align-items:flex-start;gap:10px;">
                        <input type="checkbox" id="privacyConsent" style="margin-top:3px;">
                        <span style="font-size:12px;color:#666;">
                            我已阅读并同意 <a href="privacy.html" target="_blank" style="color:#667eea;">隐私政策</a>，允许收集和使用我的反馈信息
                        </span>
                    </label>
                </div>
                
                <!-- 提交按钮 -->
                <button onclick="FeedbackSystem.submitFeedback()" style="
                    width:100%;
                    padding:15px;
                    background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color:white;
                    border:none;
                    border-radius:25px;
                    font-size:16px;
                    font-weight:500;
                    cursor:pointer;
                    transition:all 0.3s;
                ">提交反馈</button>
                
                <p style="text-align:center;margin-top:15px;color:#999;font-size:12px;">
                    已收集 ${getFeedbackCount()} 条反馈
                </p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 绑定星级点击事件
        bindStarRating();
        bindSkillTags();
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    /**
     * 绑定星级评分
     */
    function bindStarRating() {
        const stars = document.querySelectorAll('#starRating .star');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.dataset.rating);
                currentFeedback.overallRating = rating;
                updateStarDisplay(rating);
            });
            
            star.addEventListener('mouseenter', () => {
                const rating = parseInt(star.dataset.rating);
                updateStarDisplay(rating, true);
            });
        });
        
        document.getElementById('starRating').addEventListener('mouseleave', () => {
            updateStarDisplay(currentFeedback.overallRating);
        });
    }

    /**
     * 更新星级显示
     */
    function updateStarDisplay(rating, isHover = false) {
        const stars = document.querySelectorAll('#starRating .star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#FFD700';
            } else {
                star.style.color = '#ddd';
            }
        });
    }

    /**
     * 绑定技能标签选择
     */
    function bindSkillTags() {
        const tags = document.querySelectorAll('.skill-tag');
        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                const checkbox = tag.querySelector('input');
                checkbox.checked = !checkbox.checked;
                tag.style.background = checkbox.checked ? '#667eea' : '#f5f5f5';
                tag.style.color = checkbox.checked ? 'white' : 'inherit';
            });
        });
    }

    /**
     * 关闭弹窗
     */
    function closeModal() {
        const modal = document.getElementById('feedbackModal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s';
            setTimeout(() => modal.remove(), 300);
        }
    }

    /**
     * 提交反馈
     */
    function submitFeedback() {
        // 收集数据
        const usefulRadio = document.querySelector('input[name="useful"]:checked');
        const suggestion = document.getElementById('suggestionText').value;
        const contact = document.getElementById('contactWechat').value;
        const wantSkills = Array.from(document.querySelectorAll('.skill-tag input:checked')).map(cb => cb.value);
        
        // 验证
        if (currentFeedback.overallRating === 0) {
            alert('请先评分⭐');
            return;
        }
        
        // 隐私政策确认
        const privacyConsent = document.getElementById('privacyConsent');
        if (privacyConsent && !privacyConsent.checked) {
            alert('请先阅读并同意隐私政策');
            return;
        }
        
        // 组装数据
        const feedbackData = {
            ...currentFeedback,
            useful: usefulRadio ? usefulRadio.value : null,
            suggestions: suggestion,
            wantMoreSkills: wantSkills,
            contact: contact,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        // 保存到localStorage
        saveFeedback(feedbackData);
        
        // 显示成功
        showSuccessMessage();
        
        // 关闭弹窗
        closeModal();
        
        console.log('[反馈系统] 提交成功:', feedbackData);
    }

    /**
     * 保存反馈
     */
    function saveFeedback(data) {
        const allFeedback = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || '[]');
        allFeedback.push(data);
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(allFeedback));
    }

    /**
     * 获取反馈数量
     */
    function getFeedbackCount() {
        const allFeedback = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || '[]');
        return allFeedback.length;
    }

    /**
     * 显示成功消息
     */
    function showSuccessMessage() {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #52c41a;
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            font-size: 16px;
            z-index: 10001;
            animation: fadeIn 0.3s;
        `;
        toast.textContent = '✓ 感谢你的反馈！';
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    /**
     * 在学习页面触发反馈
     */
    function triggerStepFeedback(skillId, step) {
        // 延迟显示，让用户先消化内容
        setTimeout(() => {
            if (confirm('完成第 ' + step + ' 步！方便给个反馈吗？')) {
                showFeedbackModal(skillId, step);
            }
        }, 1000);
    }

    /**
     * 在学习完成时触发反馈
     */
    function triggerCompleteFeedback(skillId) {
        setTimeout(() => {
            showFeedbackModal(skillId, '全部');
        }, 500);
    }

    /**
     * 导出所有反馈（用于分析）
     */
    function exportFeedback() {
        const allFeedback = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || '[]');
        const dataStr = JSON.stringify(allFeedback, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `hongchen-feedback-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        
        console.log('[反馈系统] 导出 ' + allFeedback.length + ' 条反馈');
        return allFeedback;
    }

    // ========== CSS动画 ==========
    
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // 初始化
    document.addEventListener('DOMContentLoaded', () => {
        injectStyles();
        init();
    });

    // 暴露接口
    return {
        showFeedbackModal,
        closeModal,
        submitFeedback,
        triggerStepFeedback,
        triggerCompleteFeedback,
        exportFeedback,
        getFeedbackCount
    };
})();

// 全局访问
window.FeedbackSystem = FeedbackSystem;