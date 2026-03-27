const cloud = require('wx-server-sdk')
cloud.init({ env: 'h4-6g0tfhaqc1bbcdb5' })
const db = cloud.database()

exports.main = async (event, context) => {
  const { action, data } = event
  
  if (action === 'create') {
    const { count = 1, type = 'beta' } = data || {}
    const codes = []
    for (let i = 0; i < count; i++) {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase()
      await db.collection('inviteCodes').add({
        data: { code, type, used: false, createdAt: new Date() }
      })
      codes.push(code)
    }
    return { success: true, codes }
  }
  
  if (action === 'validate') {
    const { code } = data
    const result = await db.collection('inviteCodes').where({ code, used: false }).get()
    if (result.data.length === 0) return { success: false, error: 'Invalid code' }
    return { success: true, valid: true }
  }
  
  if (action === 'use') {
    const { code, userId } = data
    const result = await db.collection('inviteCodes').where({ code, used: false }).get()
    if (result.data.length === 0) return { success: false, error: 'Invalid code' }
    await db.collection('inviteCodes').doc(result.data[0]._id).update({
      data: { used: true, usedBy: userId, usedAt: new Date() }
    })
    return { success: true }
  }
  
  if (action === 'list') {
    const { page = 1, pageSize = 20 } = data || {}
    const result = await db.collection('inviteCodes')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .get()
    return { success: true, data: result.data }
  }
  
  return { success: false, error: 'Unknown action' }
}
