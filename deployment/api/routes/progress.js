const express = require('express');
const router = express.Router();
const { Progress, Skill, User } = require('../models');

// 获取用户进度
router.get('/:userId', async (req, res) => {
  try {
    const progress = await Progress.findAll({
      where: { userId: req.params.userId },
      include: [{ model: Skill, attributes: ['name', 'category', 'icon'] }]
    });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: '获取进度失败' });
  }
});

// 更新学习进度
router.put('/:userId/:skillId', async (req, res) => {
  try {
    const { status, progress, studyTime } = req.body;
    const { userId, skillId } = req.params;
    
    const [userProgress, created] = await Progress.findOrCreate({
      where: { userId, skillId },
      defaults: { status: 'not_started', progress: 0, studyTime: 0 }
    });
    
    await userProgress.update({ status, progress, studyTime });
    res.json(userProgress);
  } catch (error) {
    res.status(500).json({ error: '更新进度失败' });
  }
});

module.exports = router;