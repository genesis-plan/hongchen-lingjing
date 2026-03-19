const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Skill = sequelize.define('Skill', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    difficulty: {
      type: DataTypes.ENUM('入门', '初级', '中级', '高级'),
      defaultValue: '入门'
    },
    duration: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL(2,1),
      defaultValue: 0.0
    },
    studentCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    icon: {
      type: DataTypes.STRING(10),
      defaultValue: '📚'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'skills',
    timestamps: true
  });

  return Skill;
};