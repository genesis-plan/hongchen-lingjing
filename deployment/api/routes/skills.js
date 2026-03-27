const express = require('express');
const router = express.Router();
const { Skill } = require('../models');

// 获取技能列表
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const where = {};
    
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;
    
    const skills = await Skill.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });
    
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: '获取技能列表失败' });
  }
});

// 获取技能详情
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) {
      return res.status(404).json({ error: '技能不存在' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: '获取技能详情失败' });
  }
});

// 创建技能（管理员）
router.post('/', async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: '创建技能失败' });
  }
});

module.exports = router;