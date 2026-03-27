const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'hongchen_secret_key';

// 中间件
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hongchen_lingjing',
  port: process.env.DB_PORT || 3306
};

// 用户注册接口
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 这里应该插入数据库
    res.status(201).json({ 
      message: '用户注册成功',
      userId: Date.now()
    });
  } catch (error) {
    res.status(500).json({ error: '注册失败' });
  }
});

// 用户登录接口
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 这里应该从数据库验证用户
    const mockUser = { id: 1, username: 'test', role: 'user' };
    const token = jwt.sign(mockUser, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({ 
      message: '登录成功',
      token,
      user: mockUser
    });
  } catch (error) {
    res.status(500).json({ error: '登录失败' });
  }
});

// 技能列表接口
app.get('/api/skills', (req, res) => {
  const skills = [
    { id: 1, name: '基础种植', category: '农业', difficulty: '入门' },
    { id: 2, name: '简单木工', category: '工艺', difficulty: '初级' },
    { id: 3, name: '传统剪纸', category: '艺术', difficulty: '入门' }
  ];
  res.json(skills);
});

// 技能详情接口
app.get('/api/skills/:id', (req, res) => {
  const skillId = req.params.id;
  const skill = {
    id: skillId,
    name: '基础种植',
    description: '学习种子培育、土壤管理、浇水施肥的基础种植技能',
    duration: '2小时',
    rating: 4.8
  };
  res.json(skill);
});

// 用户进度接口
app.get('/api/progress/:userId', (req, res) => {
  const progress = {
    completedSkills: 3,
    totalStudyTime: 25,
    achievements: ['初学乍练', '坚持不懈']
  };
  res.json(progress);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器内部错误' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`红尘灵境后端服务启动于端口 ${PORT}`);
});

module.exports = app;