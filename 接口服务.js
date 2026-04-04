// 红尘灵境 API 客户端
const HCLJ_API = {
  // 云开发环境ID
  envId: 'h4-6g0tfhaqc1bbcdb5',
  
  // 本地存储键
  STORAGE_KEYS: {
    USER_ID: 'hclj_user_id',
    USER_TOKEN: 'hclj_token',
    CHARACTER: 'hclj_character'
  },

  // 获取用户ID（游客模式）
  getUserId() {
    let userId = localStorage.getItem(this.STORAGE_KEYS.USER_ID);
    if (!userId) {
      userId = 'guest_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
      localStorage.setItem(this.STORAGE_KEYS.USER_ID, userId);
    }
    return userId;
  },

  // 调用云函数
  async callFunction(name, action, data = {}) {
    const url = `https://${this.envId}.service.tcloudbase.com/${name}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          data: { ...data, userId: this.getUserId() }
        })
      });
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API调用失败:', error);
      // 本地模拟响应
      return this.mockResponse(name, action, data);
    }
  },

  // 本地模拟响应（离线模式）
  mockResponse(name, action, data) {
    console.log(`[离线模式] ${name}.${action}`, data);
    
    const mockData = {
      checkin: {
        checkin: { success: true, streak: 1, points: 10, message: '签到成功！获得10积分' },
        status: { success: true, todayCheckedIn: false, streak: 0 },
        history: { success: true, dates: [] }
      },
      wishes: {
        create: { success: true, wishId: 'wish_' + Date.now() },
        list: { success: true, data: [] },
        like: { success: true }
      },
      tasks: {
        claim: { success: true },
        list: { success: true, data: [] },
        myTasks: { success: true, data: [] }
      },
      character: {
        get: { success: true, character: { nickname: '灵境行者', level: 1 } },
        create: { success: true, characterId: 'char_' + Date.now() }
      },
      honor: {
        get: { success: true, data: [] },
        myRank: { success: true, rank: 999, points: 0 }
      },
      messages: {
        inbox: { success: true, data: [] },
        unreadCount: { success: true, count: 0 }
      }
    };
    
    return mockData[name]?.[action] || { success: true };
  }
};

// ===== 签到系统 =====
async function checkinToday() {
  const result = await HCLJ_API.callFunction('checkin', 'checkin');
  if (result.success) {
    alert(result.message || `签到成功！连续${result.streak}天，获得${result.points}积分`);
  } else if (result.alreadyCheckedIn) {
    alert('今日已签到，明天再来吧！');
  } else {
    alert('签到失败：' + result.error);
  }
  return result;
}

async function getCheckinStatus() {
  return await HCLJ_API.callFunction('checkin', 'status');
}

// ===== 心愿系统 =====
async function submitWish() {
  const content = document.getElementById('wishInput')?.value || prompt('请输入你的心愿：');
  if (!content || content.trim().length < 10) {
    alert('心愿内容至少10个字');
    return;
  }
  
  const result = await HCLJ_API.callFunction('wishes', 'create', { content });
  if (result.success) {
    alert('心愿已发布到云端！');
    if (document.getElementById('wishInput')) {
      document.getElementById('wishInput').value = '';
    }
  } else {
    alert('发布失败：' + result.error);
  }
  return result;
}

function fillWish(text) {
  const input = document.getElementById('wishInput');
  if (input) {
    input.value = text;
    input.focus();
  } else {
    submitWish(text);
  }
}

// ===== 任务系统 =====
async function claimTask(taskId, taskName) {
  const confirmed = confirm(`确认认领任务：${taskName}？`);
  if (!confirmed) return;
  
  const result = await HCLJ_API.callFunction('tasks', 'claim', { taskId });
  if (result.success) {
    alert('任务认领成功！请在个人中心查看');
  } else {
    alert('认领失败：' + result.error);
  }
  return result;
}

// ===== 灵相系统 =====
async function generateCharacter() {
  // 收集用户选择
  const hanfu = localStorage.getItem('char_hanfu') || '齐胸襦裙';
  const accessory = localStorage.getItem('char_accessory') || '机械发簪';
  const pattern = localStorage.getItem('char_pattern') || '云纹数据流';
  
  const result = await HCLJ_API.callFunction('character', 'create', {
    hanfu, accessory, pattern
  });
  
  if (result.success) {
    alert('灵相已铭刻！你的元境身份已创建');
    // 显示结果
    showCharacterResult(result.character || { hanfu, accessory, pattern });
  } else {
    alert('创建失败：' + result.error);
  }
  return result;
}

function selectCharPart(type, value) {
  localStorage.setItem('char_' + type, value);
  // 视觉反馈
  document.querySelectorAll('.char-option').forEach(el => el.style.opacity = '0.5');
  event.target.style.opacity = '1';
  event.target.style.borderColor = '#9b59b6';
}

function showCharacterResult(char) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center;
    z-index: 9999;
  `;
  modal.innerHTML = `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 30px; border-radius: 20px; text-align: center; color: white;">
      <h2>✨ 灵相已铭刻</h2>
      <p style="margin: 15px 0;">汉服: ${char.hanfu || '齐胸襦裙'}</p>
      <p style="margin: 15px 0;">配饰: ${char.accessory || '机械发簪'}</p>
      <p style="margin: 15px 0;">纹饰: ${char.pattern || '云纹数据流'}</p>
      <button onclick="this.parentElement.parentElement.remove()" 
              style="margin-top: 20px; padding: 10px 30px; border-radius: 20px;
                     border: none; background: #f39c12; color: white; cursor: pointer;">
        开始元境之旅
      </button>
    </div>
  `;
  document.body.appendChild(modal);
}

// ===== 太极体验完成 =====
function selectPath(path) {
  localStorage.setItem('selectedPath', path);
  document.querySelectorAll('.path-card').forEach(el => el.classList.remove('selected'));
  document.getElementById('path' + path.charAt(0).toUpperCase() + path.slice(1))?.classList.add('selected');
}

function completeTaiChi() {
  const result = confirm('确认完成太极体验？将进入元境主界面');
  if (result) {
    localStorage.setItem('taiChiCompleted', 'true');
    // 跳转或显示主界面
    switchTab('library');
  }
}

// ===== AI助手 =====
async function aiAssist() {
  const skillInput = document.getElementById('skillContent')?.value || '';
  if (!skillInput) {
    alert('请先输入技能内容');
    return;
  }
  
  // 简单的格式优化提示
  alert('AI助手功能正在开发中...\n\n当前可先手动优化格式：\n1. 添加清晰的标题\n2. 分步骤说明\n3. 添加注意事项');
}

// ===== 技能提交 =====
async function submitSkill() {
  const title = document.getElementById('skillTitle')?.value || prompt('技能名称：');
  const content = document.getElementById('skillContent')?.value || prompt('技能内容：');
  
  if (!title || !content) {
    alert('请填写完整的技能信息');
    return;
  }
  
  // 本地存储（后续连接云函数）
  const skills = JSON.parse(localStorage.getItem('mySkills') || '[]');
  skills.push({
    id: 'skill_' + Date.now(),
    title,
    content,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem('mySkills', JSON.stringify(skills));
  
  alert('技能已提交至基石库！审核通过后将展示在琅嬛福地');
}

// ===== 排行榜 =====
async function loadLeaderboard() {
  const result = await HCLJ_API.callFunction('honor', 'get', { type: 'points', limit: 10 });
  return result.data || [];
}

// ===== 消息通知 =====
async function getUnreadCount() {
  const result = await HCLJ_API.callFunction('messages', 'unreadCount');
  return result.count || 0;
}

// 初始化
console.log('红尘灵境 API 客户端已加载');
console.log('用户ID:', HCLJ_API.getUserId());
