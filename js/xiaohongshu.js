/**
 * 琅环比福地 - 小红书内容自动生成系统
 * @version 1.0.0
 * 功能：自动生成小红书笔记草稿，供手动发布
 */

const XiaohongshuPoster = (function() {
    
    // 技能数据
    const SKILLS = [
        {
            id: 'doubao-101',
            title: '国产AI助手入门',
            tags: ['#AI工具', '#副业', '#豆包', '#效率提升'],
            painPoints: ['想用AI但不知道用哪个', '嫌麻烦学不会', '想搞钱但没技能'],
            benefits: ['5分钟上手', '马上能用', '月入3000+']
        },
        {
            id: 'jianying-101',
            title: '短视频剪辑',
            tags: ['#视频剪辑', '#剪映', '#副业', '#抖音'],
            painPoints: ['想学剪辑但太难', '想接单但没作品', '想发抖音但不会剪'],
            benefits: ['7天学会', '快速接单', '月入5000+']
        },
            {
            id: 'photo-101',
            title: '手机摄影',
            tags: ['#手机摄影', '#拍照技巧', '#朋友圈', '#小红书'],
            painPoints: ['拍照总是不好看', '朋友圈没人点赞', '想约拍但不会'],
            benefits: ['瞬间提升', '朋友圈获赞', '接单赚钱']
        }
    ];

    // 爆款标题模板库
    const TITLE_TEMPLATES = {
        // 数字+痛点+解决方案
        typeA: [
            '3分钟学会{skill}，我副业月入{money}',
            '{time}学会{skill}，改变我的{money}',
            '{num}个{skill}技巧，让我月入{money}',
            '每天{time}学{skill}，{result}'
        ],
        // 身份+方法+收益
        typeB: [
            '{identity}用{skill}{result}，{money}',
            '作为{midentity}，我这样学{skill}',
            '{identity}必学{skill}，{result}',
            '不会{skill}的{midentity}，都后悔了'
        ],
        // 对比+反差
        typeC: [
            '学{skill}前vs学{skill}后，完全两个人',
            '{skill}难不难？{time}从{levelA}到{levelB}',
            '为什么你学{skill}没用？{reason}',
            '{skill}真的有用吗？亲身实测告诉你'
        ],
        // 疑问+解答
        typeD: [
            '{question}？{answer}',
            '{skill}到底怎么学？{method}',
            '为什么{skill}能{money}？因为{reason}',
            '{skill}适合谁？{target}'
        ]
    };

    // 正文模板
    const CONTENT_TEMPLATES = {
        // 干货教程型
        tutorial: `姐妹们！发现了一个超简单的{method}！

之前我也不会，后来跟{skill}学习{speed}
现在{money_result}

今天分享我的学习方法👇

1️⃣ {step1}
2️⃣ {step2}
3️⃣ {step3}

我已经用这个{money_success}
想学的一起！

{source} #副业 #技能提升`,

        // 变现案例型
        case: `之前完全不会{skill}
学了{time}后
现在每个月{money_result}

分享一下我的学习路径👇

▫️ 第1天：{day1}
▫️ 第3天：{day3}
▫️ 第7天：{day7}

{skill}真的不难，关键是要{suggest}

#副业 #技能变现 #学习方法`,

        // 对比测评型
        compare: `经常有人问我：{question}

今天对比测评一下👇

【{optionA}】
✅ {proA}
❌ {conA}

【{optionB}】
✅ {proB}
❌ {conB}

我的选择：{choice}

原因是{reason}

#AI工具 #对比测评`,

        // 互动话题型
        interactive: `{question}

我先说：{myAnswer}

你们呢？评论区聊聊~

#互动 #话题讨论`
    };

    // ========== 核心功能 ==========

    /**
     * 生成今日推荐笔记
     */
    function generateDailyPost() {
        const skill = getRandomSkill();
        const type = getRandomType();
        
        return generatePost(skill, type);
    }

    /**
     * 为指定技能生成笔记
     */
    function generatePost(skill, type = null) {
        type = type || getRandomType();
        
        const title = generateTitle(skill, type);
        const content = generateContent(skill, type);
        const tags = skill.tags.join(' ');
        
        return {
            title,
            content,
            tags,
            skill: skill.title,
            generatedAt: new Date().toISOString()
        };
    }

    /**
     * 生成标题
     */
    function generateTitle(skill, type) {
        const templates = TITLE_TEMPLATES[type];
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        const replacements = {
            skill: skill.title,
            time: getRandomTime(),
            num: getRandomNum(),
            money: getRandomMoney(),
            result: getRandomResult(),
            identity: getRandomIdentity(),
            midentity: getModifiableIdentity(),
            levelA: getRandomLevel('low'),
            levelB: getRandomLevel('high'),
            reason: getRandomReason(),
            question: getRandomQuestion(skill),
            answer: getRandomAnswer(skill),
            method: getRandomMethod(),
            target: getRandomTarget()
        };
        
        let title = template;
        for (const [key, value] of Object.entries(replacements)) {
            title = title.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
        }
        
        return title;
    }

    /**
     * 生成正文
     */
    function generateContent(skill, type) {
        // 根据技能类型选择模板
        const templateType = skill.id.includes('doubao') ? 'tutorial' :
                            skill.id.includes('jianying') ? 'case' : 'tutorial';
        
        const template = CONTENT_TEMPLATES[templateType];
        
        const replacements = {
            skill: skill.title,
            method: getMethodBySkill(skill),
            speed: getSpeedBySkill(skill),
            money_result: getMoneyResult(),
            step1: getStep1(skill),
            step2: getStep2(skill),
            step3: getStep3(skill),
            money_success: getMoneySuccess(),
            time: getTimeForSkill(skill),
            day1: getDay1(skill),
            day3: getDay3(skill),
            day7: getDay7(skill),
            suggest: getSuggest(),
            question: getQuestionBySkill(skill),
            optionA: getOptionA(skill),
            optionB: getOptionB(skill),
            proA: getProA(), proB: getProB(),
            conA: getConA(), conB: getConB(),
            choice: getChoice(skill),
            reason: getReason(),
            myAnswer: getMyAnswer(skill)
        };
        
        let content = template;
        for (const [key, value] of Object.entries(replacements)) {
            content = content.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
        }
        
        return content;
    }

    // ========== 辅助函数 ==========

    function getRandomSkill() {
        return SKILLS[Math.floor(Math.random() * SKILLS.length)];
    }

    function getRandomType() {
        const types = Object.keys(TITLE_TEMPLATES);
        return types[Math.floor(Math.random() * types.length)];
    }

    function getRandomTime() { return ['3分钟', '5分钟', '10分钟', '20分钟'][Math.floor(Math.random() * 4)]; }
    function getRandomNum() { return ['3个', '5个', '7个', '10个'][Math.floor(Math.random() * 4)]; }
    function getRandomMoney() { return ['3000', '5000', '8000', '1万+'][Math.floor(Math.random() * 4)]; }
    function getRandomResult() { return ['收入翻倍', '效率提升10倍', '老板对我刮目相看', '同事都来问我'][Math.floor(Math.random() * 4)]; }
    function getRandomIdentity() { return ['上班族', '大学生', '宝爸', '自媒体小白', '打工人'][Math.floor(Math.random() * 5)]; }
    function getModifiableIdentity() { return ['上班族', '大学生', '小白', '女生', '男生'][Math.floor(Math.random() * 5)]; }
    function getRandomLevel(type) { return type === 'low' ? ['小白', '新手', '外行', '零基础'][Math.floor(Math.random() * 4)] : ['大神', '精通', '接单', '赚钱'][Math.floor(Math.random() * 4)]; }
    function getRandomReason() { return ['更简单', '更实用', '变现快', '适合新手'][Math.floor(Math.random() * 4)]; }
    function getRandomQuestion(skill) { return ['豆包和ChatGPT哪个好？', '剪映好学吗？', 'AI真的能赚钱吗？', '新手学哪个技能最好？'][Math.floor(Math.random() * 4)]; }
    function getRandomAnswer(skill) { return ['我用豆包月入3000', '7天就能学会', '当然能！', '推荐学AI'][Math.floor(Math.random() * 4)]; }
    function getRandomMethod() { return ['跟着教程一步步来', '多练习', '先模仿再创新', '坚持每天学'][Math.floor(Math.random() * 4)]; }
    function getRandomTarget() { return ['想提升效率的人', '想赚副业钱的人', '想学新技能的人', '想变现的人'][Math.floor(Math.random() * 4)]; }

    function getMethodBySkill(s) {
        const map = { 'doubao': '用国产AI工具', 'jianying': '学剪映', 'photo': '用手机拍照' };
        return map[s.id.split('-')[0]] || '学习';
    }
    function getSpeedBySkill(s) { return s.id.includes('doubao') ? '几分钟就上手' : s.id.includes('jianying') ? '7天就学会' : '马上能用'; }
    function getMoneyResult() { return ['每月多赚3000-5000元', '副业月入5000+', '一单赚50-200元', '每天多收入100+'][Math.floor(Math.random() * 4)]; }
    function getStep1(s) { return s.id.includes('doubao') ? '下载豆包App' : s.id.includes('jianying') ? '下载剪映并熟悉界面' : '打开相机网格线'; }
    function getStep2(s) { return s.id.includes('doubao') ? '学会基本提问技巧' : s.id.includes('jianying') ? '练习基础剪辑操作' : '掌握3个构图法则'; }
    function getStep3(s) { return s.id.includes('doubao') ? '尝试接单变现' : s.id.includes('jianying') ? '开始制作自己的作品' : '学会简单后期调色'; }
    function getMoneySuccess() { return ['每月多赚3000元', '兼职收入5000+', '一单赚了200元', '实现了副业自由'][Math.floor(Math.random() * 4)]; }
    function getTimeForSkill(s) { return s.id.includes('doubao') ? '7天' : s.id.includes('jianying') ? '7天' : '3天'; }
    function getDay1(s) { return '了解基本概念和工具'; }
    function getDay3(s) { return '完成第一个简单作品'; }
    function getDay7(s) { return '可以独立制作完整作品'; }
    function getSuggest() { return ['找对方法+坚持练习', '多看优秀作品+模仿', '先完成再完美', '边学边做'][Math.floor(Math.random() * 4)]; }
    function getQuestionBySkill(s) { return '豆包和通义千问哪个更好用？'; }
    function getOptionA(s) { return '豆包'; }
    function getOptionB(s) { return '通义千问'; }
    function getProA() { return '操作简单，新手友好'; }
    function getProB() { return '代码能力强，程序员首选'; }
    function getConA() { return '功能相对基础'; }
    function getConB() { return '上手门槛稍高'; }
    function getChoice(s) { return '豆包'; }
    function getReason() { return '对新手更友好，生态更强'; }
    function getMyAnswer(s) { return s.id.includes('doubao') ? '我用的是豆包，5分钟就上手了！' : s.id.includes('jianying') ? '剪映真的不难，7天就能接单！' : '手机拍照 тоже 能拍出大片！'; }

    // ========== 导出功能 ==========

    /**
     * 批量生成一周内容
     */
    function generateWeekContent() {
        const posts = [];
        const types = ['typeA', 'typeB', 'typeC', 'typeD'];
        
        for (let i = 0; i < 7; i++) {
            const skill = SKILLS[i % SKILLS.length];
            const type = types[i % types.length];
            posts.push(generatePost(skill, type));
        }
        
        return posts;
    }

    /**
     * 导出为可复制格式
     */
    function exportAsText(post) {
        return `【标题】
${post.title}

【正文】
${post.content}

【话题】
${post.tags}`;
    }

    /**
     * 导出为Markdown
     */
    function exportAsMarkdown(posts) {
        let md = '# 琅环比福地 小红书内容\n\n';
        posts.forEach((post, i) => {
            md += `## 第${i+1}篇\n\n`;
            md += `**标题：** ${post.title}\n\n`;
            md += `**正文：**\n${post.content}\n\n`;
            md += `**话题：** ${post.tags}\n\n`;
            md += `---\n\n`;
        });
        return md;
    }

    // ========== 自动生成器 ==========

    /**
     * 生成今日内容（供复制使用）
     */
    function getTodayPost() {
        const post = generateDailyPost();
        return {
            ...post,
            formatted: exportAsText(post)
        };
    }

    // 初始化时打印今日内容
    console.log('[小红书] 今日推荐笔记:');
    const todayPost = getTodayPost();
    console.log(todayPost.formatted);
    console.log('---');

    // 暴露接口
    return {
        getTodayPost,
        generatePost,
        generateWeekContent,
        exportAsText,
        exportAsMarkdown,
        SKILLS
    };
})();

// 全局访问
window.XiaohongshuPoster = XiaohongshuPoster;