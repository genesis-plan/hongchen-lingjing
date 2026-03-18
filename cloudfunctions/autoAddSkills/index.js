const cloud = require("wx-server-sdk")
cloud.init({ env: "h4-6g0tfhaqc1bbcdb5" })
const db = cloud.database()

const skillTemplates = [
  // 传统工艺类（基于真实需求调研）
  { name: "竹编技艺VR", category: "traditional", difficulty: "intermediate", description: "学习传统竹编技法，VR沉浸式体验" },
  { name: "苏绣针法VR", category: "traditional", difficulty: "advanced", description: "掌握苏绣精髓，VR精细操作训练" },
  { name: "景德镇陶艺VR", category: "traditional", difficulty: "beginner", description: "体验千年瓷都制陶工艺" },
  { name: "东阳木雕VR", category: "traditional", difficulty: "advanced", description: "学习精细木雕技艺" },
  { name: "湖笔制作VR", category: "traditional", difficulty: "intermediate", description: "体验文房四宝之首制作" },
  
  // 现代技能类
  { name: "Python数据分析", category: "tech", difficulty: "intermediate", description: "用Python进行数据处理和分析" },
  { name: "JavaScript全栈开发", category: "tech", difficulty: "advanced", description: "前后端一体化开发技能" },
  { name: "AI绘画入门", category: "tech", difficulty: "beginner", description: "使用Stable Diffusion创作艺术作品" },
  { name: "视频剪辑与特效", category: "creative", difficulty: "intermediate", description: "专业视频制作技能" },
  
  // 生活技能类
  { name: "中医养生按摩", category: "health", difficulty: "beginner", description: "传统中医保健按摩技法" },
  { name: "营养配餐设计", category: "health", difficulty: "intermediate", description: "科学膳食搭配与营养分析" },
  { name: "家庭园艺设计", category: "lifestyle", difficulty: "beginner", description: "打造美丽庭院与室内绿植" },
  
  // 职业技能类
  { name: "项目管理PMP", category: "professional", difficulty: "advanced", description: "国际项目管理专业认证" },
  { name: "数字营销策略", category: "business", difficulty: "intermediate", description: "数字化时代营销方法论" },
  { name: "跨境电商运营", category: "business", difficulty: "intermediate", description: "全球化电商运营技能" }
]

exports.main = async (event, context) => {
  try {
    const count = event.count || 3
    const selectedSkills = []
    const shuffled = [...skillTemplates].sort(() => Math.random() - 0.5)
    
    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
      const skill = {
        ...shuffled[i],
        author: "红尘灵境",
        status: "pending",
        likes: 0,
        createdAt: new Date().toISOString()
      }
      const result = await db.collection("skills").add({ data: skill })
      selectedSkills.push({ id: result._id, name: skill.name })
    }
    
    return { success: true, message: "自动添加技能", skills: selectedSkills }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
