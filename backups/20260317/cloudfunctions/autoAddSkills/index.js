const cloud = require("wx-server-sdk")
cloud.init({ env: "h4-6g0tfhaqc1bbcdb5" })
const db = cloud.database()

const skillTemplates = [
  { name: "Python编程", category: "tech", difficulty: "beginner", description: "学习Python基础" },
  { name: "JavaScript入门", category: "tech", difficulty: "beginner", description: "学习JavaScript基础" },
  { name: "中医推拿", category: "health", difficulty: "intermediate", description: "学习推拿技法" },
  { name: "太极拳", category: "health", difficulty: "beginner", description: "学习太极拳基础" },
  { name: "古筝入门", category: "traditional", difficulty: "intermediate", description: "学习古筝指法" },
  { name: "围棋基础", category: "traditional", difficulty: "beginner", description: "学习围棋规则" },
  { name: "中国象棋", category: "traditional", difficulty: "beginner", description: "学习象棋策略" },
  { name: "刺绣艺术", category: "traditional", difficulty: "intermediate", description: "学习刺绣技艺" },
  { name: "陶艺制作", category: "craft", difficulty: "beginner", description: "学习陶艺制作" },
  { name: "编织手工", category: "craft", difficulty: "beginner", description: "学习编织技巧" }
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
