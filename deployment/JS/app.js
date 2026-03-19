
/* ========== 【核心配置区】请确保函数配置正确 ==========
 * 在阿里云函数计算控制台，检查 `meta-post-wish` 函数：
 * 1. 【配置】页签中，环境变量 `OSS_BUCKET_NAME` 已设置为 `datongyuzhou-static`
 * 2. 【OSS控制台】中，`datongyuzhou-static` Bucket 的 `data/` 目录下已创建空文件 `wishes.json` (内容为 [])
 */
const API_URL_POST_WISH = 'https://meta-post-wish-xoinuppars.cn-hongkong.fcapp.run';
// =========================================================

let userPath = null;
let userCharacter = { hanfu: '', accessory: '', pattern: '' };
let claimedTask = { id: null, title: '【请先到“任务星阁”认领一个任务】' };

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.getElementById(tabName).classList.add('active');
    if (tabName === 'wish') loadWishes();
}

function selectPath(path) {
    userPath = path;
    document.getElementById('pathTaiChi').classList.remove('selected');
    document.getElementById('pathCharacter').classList.remove('selected');
    document.getElementById('taiChiGuide').classList.add('hidden');
    document.getElementById('characterCreator').classList.add('hidden');

    event.currentTarget.closest('.path-card').classList.add('selected');
    document.getElementById(path + 'Guide').classList.remove('hidden');
}

function completeTaiChi() {
    alert('太极体验完成！你已获得「身心平衡」状态。正在进入元境...');
    localStorage.setItem('userPath', 'tai-chi');
    switchTab('wish');
}

function selectCharPart(category, value) {
    const el = event.currentTarget;
    const wasSelected = el.classList.contains('selected');
    document.querySelectorAll('.char-option').forEach(opt => {
        if (opt.getAttribute('data-cat') === category) opt.classList.remove('selected');
    });
    if (!wasSelected) {
        el.classList.add('selected');
        el.setAttribute('data-cat', category);
        userCharacter[category] = value;
    } else {
        userCharacter[category] = '';
    }
    updateCharacterPreview();
}

function updateCharacterPreview() {
    const parts = [];
    if (userCharacter.hanfu) parts.push(userCharacter.hanfu);
    if (userCharacter.accessory) parts.push(`配${userCharacter.accessory}`);
    if (userCharacter.pattern) parts.push(`饰${userCharacter.pattern}`);
    const preview = parts.length > 0 ? parts.join(' · ') : '灵相未显，待君造化...';
    document.getElementById('characterPreview').innerText = preview;
}

function generateCharacter() {
    if (!userCharacter.hanfu) { alert('请至少选择一项汉服形制，此为灵相之基。'); return; }
    localStorage.setItem('userCharacter', JSON.stringify(userCharacter));
    localStorage.setItem('userPath', 'character');
    alert(`灵相【${document.getElementById('characterPreview').innerText}】已铭刻！此乃你在元境之道标。`);
    switchTab('wish');
}

function skipCharacter() {
    if (confirm('直接入境将使用默认云游行者身份，是否继续？')) {
        localStorage.setItem('userPath', 'skipped');
        switchTab('wish');
    }
}

// 心愿墙功能
function fillWish(text) {
    document.getElementById('newWish').value = text;
}

async function submitWish() {
    const content = document.getElementById('newWish').value.trim();
    if (!content) { alert('心愿内容不可为空。'); return; }

    const submitBtn = event.currentTarget;
    submitBtn.disabled = true;
    submitBtn.textContent = '发布中...';

    try {
        const response = await fetch(API_URL_POST_WISH, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: content,
                author: localStorage.getItem('userCharacter') ? '灵相行者' : '云游行者'
            })
        });

        const result = await response.json();
        if (response.ok && result.success) {
            alert('✨ 心愿已成功发布至「元境」！它已转化为任务，等待其他行者实现。');
            document.getElementById('newWish').value = '';
            // 此处未来可调用 getWishes 刷新列表
        } else {
            alert(`发布失败：${result.message || '未知错误'}`);
        }
    } catch (error) {
        console.error('发布心愿出错:', error);
        alert('网络波动，连接元境失败，请稍后重试。');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '✨ 发布心愿至云端';
    }
}

function loadWishes() {
    // 此处预留：未来接入 `meta-get-wishes` 函数后，可动态加载列表
    document.getElementById('wishList').innerHTML = `
                <div class="list-item">
                    <p><strong>【示例心愿】</strong> 想学3分钟汉服齐胸襦裙系带的正确方法（无工具，文字版）</p>
                    <p style="color: #888; margin-top: 8px;">发布者：系统 | 状态：<span class="status-badge status-pending">待实现</span></p>
                </div>
                <div class="list-item">
                    <p><strong>【用户心愿】</strong> <span id="latestWish">等待你的第一个真实心愿...</span></p>
                    <p style="color: #888; margin-top: 8px;">发布者：你 | 状态：<span class="status-badge status-pending">已发布</span></p>
                </div>
            `;
}

function claimTask(id, title) {
    claimedTask = { id, title };
    document.getElementById('currentTaskTitle').innerText = `【${title}】`;
    alert(`✅ 已成功认领任务「${title}」！请前往「造化工坊」将其转化为技能。`);
    switchTab('create');
}

function submitSkill() {
    const title = document.getElementById('skillTitle').value.trim();
    const steps = document.getElementById('skillSteps').value.trim();
    if (!title || !steps) { alert('请填写技能标题和具体步骤。'); return; }
    if (claimedTask.id === null) { alert('请先认领一个任务。'); return; }

    document.getElementById('creationResult').innerHTML = `
                <div class="list-item" style="background: #e8f7f0; border-left-color: #2ecc71;">
                    <h4>✅ 技能提交成功！</h4>
                    <p>技能《${title}》已提交至基石库，等待审核。感谢你的智慧贡献！</p>
                    <p>认领的任务【${claimedTask.title}】状态已更新。</p>
                </div>
            `;
    // 此处预留：未来接入 `meta-submit-skill` 函数
    setTimeout(() => {
        document.getElementById('skillTitle').value = '';
        document.getElementById('skillSteps').value = '';
        document.getElementById('skillNotes').value = '';
        document.getElementById('creationResult').innerHTML = '';
    }, 5000);
}

function aiAssist() {
    const steps = document.getElementById('skillSteps').value;
    if (!steps) {
        alert('🤖 AI助手：请先输入一些步骤描述，我来帮你优化结构。');
        return;
    }
    alert('🤖 AI助手：已收到你的文本。此功能待接入大模型服务后，可自动优化格式、补充要点。');
}

// 初始化
window.onload = function () {
    const savedPath = localStorage.getItem('userPath');
    if (savedPath && savedPath !== 'skipped') {
        switchTab('wish');
    }
    // 加载示例数据
    loadWishes();
};
