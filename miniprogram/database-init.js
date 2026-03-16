// 数据库初始化脚本
// 在云开发控制台的云函数中运行此脚本，或在本地运行后手动导入数据

const skills = [
  {
    name: '太极·无极式',
    icon: '☯️',
    desc: '太极入门第一式，站桩基础，调和身心',
    category: '传统武术',
    difficulty: '入门',
    learners: 1200,
    steps: [
      {
        title: '准备姿势',
        desc: '双脚与肩同宽，自然站立，重心均匀分布',
        image: ''
      },
      {
        title: '膝盖微屈',
        desc: '膝盖微曲，如轻坐椅子，保持上身正直',
        image: ''
      },
      {
        title: '腰部放松',
        desc: '腰背挺直，但不过度紧张，保持自然放松',
        image: ''
      },
      {
        title: '双手自然',
        desc: '双手自然下垂，掌心向内，手指微曲',
        image: ''
      },
      {
        title: '静立调息',
        desc: '保持姿势，调整呼吸，静立1-3分钟',
        image: ''
      }
    ],
    questions: [
      {
        question: '太极无极式的双脚姿势应该是？',
        options: ['双脚并拢', '双脚与肩同宽', '双脚分开大于肩宽', '单脚站立'],
        answer: 1
      },
      {
        question: '练习无极式时膝盖的状态是？',
        options: ['挺直', '微曲如轻坐', '弯曲90度', '用力下蹲'],
        answer: 1
      },
      {
        question: '无极式双手应该？',
        options: ['上举过头顶', '自然下垂', '双手叉腰', '抱在胸前'],
        answer: 1
      }
    ]
  },
  {
    name: '汉服系带',
    icon: '👘',
    desc: '传统服饰齐胸襦裙系带技巧',
    category: '传统服饰',
    difficulty: '入门',
    learners: 850,
    steps: [
      {
        title: '整理衣裙',
        desc: '先将齐胸襦裙的裙腰固定在胸部适当位置',
        image: ''
      },
      {
        title: '穿过系带',
        desc: '将系带从后腰绕过，在正面交叉',
        image: ''
      },
      {
        title: '打结固定',
        desc: '将系带在正面或侧面打结，确保牢固',
        image: ''
      },
      {
        title: '调整垂坠',
        desc: '调整裙摆和系带的垂坠度，使其自然美观',
        image: ''
      }
    ],
    questions: [
      {
        question: '齐胸襦裙的系带应该固定在？',
        options: ['腰部', '胸部', '肩部', '臀部'],
        answer: 1
      },
      {
        question: '系带应该在哪个位置交叉？',
        options: ['在背部', '在正面', '在侧面', '不需要交叉'],
        answer: 1
      }
    ]
  },
  {
    name: '茶道入门',
    icon: '🍵',
    desc: '传统茶艺泡茶流程与礼仪',
    category: '传统技艺',
    difficulty: '进阶',
    learners: 1200,
    steps: [
      {
        title: '温杯烫壶',
        desc: '用热水冲洗茶具，预热茶具',
        image: ''
      },
      {
        title: '投茶入壶',
        desc: '将适量茶叶放入茶壶或茶杯中',
        image: ''
      },
      {
        title: '注水冲泡',
        desc: '用适宜温度的水冲泡，控制注水速度',
        image: ''
      },
      {
        title: '出汤奉茶',
        desc: '将泡好的茶汤倒入茶杯，奉茶给客人',
        image: ''
      }
    ],
    questions: [
      {
        question: '泡茶第一步需要做什么？',
        options: ['直接倒水', '温杯烫壶', '放茶叶', '倒茶给客人'],
        answer: 1
      },
      {
        question: '注水冲泡时应该？',
        options: ['快速倒入', '控制注水速度', '用冷水', '不要注满'],
        answer: 1
      }
    ]
  },
  {
    name: '剪纸艺术',
    icon: '✂️',
    desc: '传统民间剪纸技法入门',
    category: '传统工艺',
    difficulty: '入门',
    learners: 680,
    steps: [
      {
        title: '准备材料',
        desc: '准备剪刀、纸张、铅笔等工具',
        image: ''
      },
      {
        title: '绘制图案',
        desc: '在纸上绘制简单的图案轮廓',
        image: ''
      },
      {
        title: '剪纸技巧',
        desc: '按照轮廓线小心剪纸，注意转弯处',
        image: ''
      },
      {
        title: '完成作品',
        desc: '展开剪纸，调整细节，完成作品',
        image: ''
      }
    ],
    questions: [
      {
        question: '剪纸的主要工具是什么？',
        options: ['刀', '剪刀', '镊子', '锯子'],
        answer: 1
      }
    ]
  },
  {
    name: '京剧脸谱',
    icon: '🎭',
    desc: '京剧脸谱绘制与色彩寓意',
    category: '传统艺术',
    difficulty: '中级',
    learners: 420,
    steps: [
      {
        title: '了解脸谱',
        desc: '学习不同角色和色彩的脸谱含义',
        image: ''
      },
      {
        title: '勾勒轮廓',
        desc: '用铅笔在脸谱模板上勾勒图案',
        image: ''
      },
      {
        title: '上色绘制',
        desc: '按照传统色彩规则填充颜色',
        image: ''
      },
      {
        title: '细节修饰',
        desc: '添加细节装饰，完善脸谱',
        image: ''
      }
    ],
    questions: [
      {
        question: '京剧脸谱中红色通常代表什么？',
        options: ['忠勇', '奸诈', '正直', '神秘'],
        answer: 0
      }
    ]
  },
  {
    name: '书法入门',
    icon: '🖌️',
    desc: '毛笔书法基础笔画练习',
    category: '传统工艺',
    difficulty: '入门',
    learners: 1500,
    steps: [
      {
        title: '准备工具',
        desc: '准备毛笔、墨汁、宣纸、砚台',
        image: ''
      },
      {
        title: '握笔姿势',
        desc: '学习正确的握笔姿势',
        image: ''
      },
      {
        title: '基本笔画',
        desc: '练习横、竖、撇、捺等基本笔画',
        image: ''
      },
      {
        title: '临摹练习',
        desc: '选择简单字帖进行临摹',
        image: ''
      }
    ],
    questions: [
      {
        question: '毛笔书法中"永"字包含了多少种基本笔画？',
        options: ['5种', '6种', '7种', '8种'],
        answer: 3
      }
    ]
  },
  {
    name: '古筝入门',
    icon: '🎸',
    desc: '古筝基本指法与简单曲目',
    category: '传统音乐',
    difficulty: '入门',
    learners: 380,
    steps: [
      {
        title: '认识古筝',
        desc: '了解古筝的结构和音位',
        image: ''
      },
      {
        title: '基本指法',
        desc: '学习勾、抹、托、劈等基本指法',
        image: ''
      },
      {
        title: '简单曲目',
        desc: '练习简单的曲目如《茉莉花》',
        image: ''
      }
    ],
    questions: [
      {
        question: '古筝有多少根弦？',
        options: ['18根', '21根', '24根', '25根'],
        answer: 1
      }
    ]
  }
]

// 在微信云开发控制台的数据库中导入这些数据
// 或创建一个云函数运行此脚本批量插入
