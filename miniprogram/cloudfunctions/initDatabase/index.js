# -*- coding: utf-8 -*-
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

/**
 * 初始化数据库
 */
exports.main = async (event, context) => {
  const db = cloud.database()
  const _ = db.command
  
  try {
    const { action } = event
    
    if (action === 'initSkills') {
      // 初始化技能数据
      const skills = [
        {
          _id: 'skill_001',
          name: '太极二十四式',
          category: '武术',
          level: 1,
          description: '传统太极拳入门基础',
          steps: [
            '起势',
            '左右野马分鬃',
            '白鹤亮翅',
            '左右搂膝拗步',
            '手挥琵琶',
            '左右倒卷肱',
            '左揽雀尾',
            '右揽雀尾',
            '单鞭',
            '云手'
          ],
          questions: [
            {
              question: '太极拳的起势是什么？',
              options: ['两脚并立，两手自然下垂', '两脚开立，两手平举', '两脚前后开立'],
              answer: 0,
              explanation: '起势时两脚并立与肩同宽，两手自然下垂'
            },
            {
              question: '野马分鬃有几个动作？',
              options: ['左右各一次', '左右各两次', '左右各三次'],
              answer: 1,
              explanation: '野马分鬃包括左右野马分鬃各做两次'
            }
          ],
          createdAt: new Date().toISOString()
        },
        {
          _id: 'skill_002',
          name: '汉服文化',
          category: '传统文化',
          level: 1,
          description: '了解汉服的历史与礼仪',
          steps: [
            '了解汉服起源',
            '认识汉服款式',
            '学习汉服礼仪',
            '掌握搭配技巧'
          ],
          questions: [
            {
              question: '汉服的起源可以追溯到？',
              options: ['夏商周时期', '春秋战国时期', '秦汉时期'],
              answer: 0,
              explanation: '汉服起源于黄帝时期，定型于周代'
            },
            {
              question: '交领右衽是汉服的特征之一，"右衽"是指？',
              options: ['衣襟向右压', '衣襟向左压', '衣襟敞开'],
              answer: 0,
              explanation: '右衽是指衣襟向右压，是汉服的重要特征'
            }
          ],
          createdAt: new Date().toISOString()
        },
        {
          _id: 'skill_003',
          name: '茶道入门',
          category: '传统文化',
          level: 1,
          description: '学习中国传统茶道礼仪',
          steps: [
            '认识茶叶种类',
            '学习泡茶方法',
            '掌握茶道礼仪',
            '品鉴茶汤'
          ],
          questions: [
            {
              question: '绿茶的冲泡水温一般是？',
              options: ['80-85℃', '90-95℃', '100℃'],
              answer: 0,
              explanation: '绿茶较为娇嫩，适合80-85℃的水温冲泡'
            },
            {
              question: '茶道中"奉茶"时应该？',
              options: ['单手奉茶', '双手奉茶', '随意放置'],
              answer: 1,
              explanation: '奉茶时应该双手奉茶，表示尊重'
            }
          ],
          createdAt: new Date().toISOString()
        },
        {
          _id: 'skill_004',
          name: '古筝基础',
          category: '音乐',
          level: 1,
          description: '古筝基本指法与曲目',
          steps: [
            '认识古筝结构',
            '学习基本指法',
            '练习音阶',
            '弹奏简单曲目'
          ],
          questions: [
            {
              question: '古筝有几根弦？',
              options: ['18弦', '21弦', '25弦'],
              answer: 1,
              explanation: '现代古筝通常有21根弦'
            },
            {
              question: '"大拇指"在古筝中是指？',
              options: ['左手食指', '右手大拇指', '右手食指'],
              answer: 1,
              explanation: '古筝中大拇指指法用拇指向外拨弦'
            }
          ],
          createdAt: new Date().toISOString()
        },
        {
          _id: 'skill_005',
          name: '书法入门',
          category: '艺术',
          level: 1,
          description: '中国书法基础技法',
          steps: [
            '认识笔墨纸砚',
            '学习握笔姿势',
            '练习基本笔画',
            '临摹名家字帖'
          ],
          questions: [
            {
              question: '"永字八法"中的"侧"指？',
              options: ['侧点', '侧竖', '侧横'],
              answer: 0,
              explanation: '侧即侧点，是永字八法中的第一笔'
            },
            {
              question: '书法握笔时"指实掌虚"是指？',
              options: ['手指用力，手掌放松', '手指放松，手掌用力', '手指和手掌都用力'],
              answer: 0,
              explanation: '指实掌虚是指手指要握紧，手掌要放松灵活'
            }
          ],
          createdAt: new Date().toISOString()
        },
        {
          _id: 'skill_006',
          name: '围棋基础',
          category: '棋类',
          level: 1,
          description: '围棋基本规则与定式',
          steps: [
            '了解围棋规则',
            '认识棋盘棋子',
            '学习基本定式',
            '练习实战对局'
          ],
          questions: [
            {
              question: '围棋棋盘的标准尺寸是？',
              options: ['15x15', '19x19', '21x21'],
              answer: 1,
              explanation: '标准围棋棋盘为19x19，共361个交叉点'
            },
            {
              question: '围棋中"气"是指？',
              options: ['棋子的呼吸', '棋子周围的空点', '棋子的生命值'],
              answer: 1,
              explanation: '气是指棋子周围相邻的空交叉点'
            }
          ],
          createdAt: new Date().toISOString()
        }
      ]
      
      // 批量添加技能
      for (const skill of skills) {
        await db.collection('skills').doc(skill._id).set({
          data: skill
        })
      }
      
      return {
        success: true,
        message: '技能数据初始化完成',
        count: skills.length
      }
    }
    
    return {
      success: false,
      message: '未知的操作'
    }
    
  } catch (error) {
    console.error('数据库初始化错误:', error)
    return {
      success: false,
      message: error.message
    }
  }
}
