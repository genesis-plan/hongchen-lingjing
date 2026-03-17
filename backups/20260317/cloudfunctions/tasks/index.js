// 任务系统云函数
const cloud = require('wx-server-sdk')
cloud.init({ env: 'h4-6g0tfhaqc1bbcdb5' })
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  const { action, data } = event
  const wxContext = cloud.getWXContext()
  const userId = data?.userId || wxContext.OPENID || 'guest'

  // 创建任务
  if (action === 'create') {
    const { title, description, category, reward = 10, deadline } = data
    
    const result = await db.collection('tasks').add({
      data: {
        title,
        description,
        category,
        reward,
        deadline: deadline ? new Date(deadline) : null,
        status: 'open',
        createdBy: userId,
        claimedBy: null,
        createdAt: new Date()
      }
    })
    
    return { success: true, taskId: result._id }
  }

  // 认领任务
  if (action === 'claim') {
    const { taskId } = data
    
    const task = await db.collection('tasks').doc(taskId).get()
    if (!task.data || task.data.status !== 'open') {
      return { success: false, error: '任务不可认领' }
    }
    
    await db.collection('tasks').doc(taskId).update({
      data: {
        status: 'claimed',
        claimedBy: userId,
        claimedAt: new Date()
      }
    })
    
    return { success: true }
  }

  // 提交任务完成
  if (action === 'submit') {
    const { taskId, submission } = data
    
    await db.collection('tasks').doc(taskId).update({
      data: {
        status: 'submitted',
        submission,
        submittedAt: new Date()
      }
    })
    
    return { success: true }
  }

  // 审核任务
  if (action === 'review') {
    const { taskId, approved, feedback } = data
    
    const task = await db.collection('tasks').doc(taskId).get()
    
    if (approved) {
      await db.collection('tasks').doc(taskId).update({
        data: {
          status: 'completed',
          completedAt: new Date(),
          feedback
        }
      })
      
      // 发放奖励
      await db.collection('users').where({ _openid: task.data.claimedBy }).update({
        data: { points: _.inc(task.data.reward) }
      })
    } else {
      await db.collection('tasks').doc(taskId).update({
        data: {
          status: 'claimed',
          feedback
        }
      })
    }
    
    return { success: true }
  }

  // 获取任务列表
  if (action === 'list') {
    const { status, category, page = 1, pageSize = 20 } = data || {}
    
    let query = db.collection('tasks')
    if (status) query = query.where({ status })
    if (category) query = query.where({ category })
    
    const result = await query
      .orderBy('createdAt', 'desc')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    
    return { success: true, data: result.data }
  }

  // 获取我认领的任务
  if (action === 'myTasks') {
    const result = await db.collection('tasks')
      .where({ claimedBy: userId })
      .orderBy('claimedAt', 'desc')
      .get()
    
    return { success: true, data: result.data }
  }

  return { success: false, error: 'Unknown action' }
}
