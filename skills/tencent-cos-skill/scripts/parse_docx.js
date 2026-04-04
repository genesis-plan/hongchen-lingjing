const mammoth = require('mammoth');
const fs = require('fs');

mammoth.extractRawText({ path: '/tmp/人工智能教育-20251229.docx' })
  .then(function(result) {
    const text = result.value;
    const messages = result.messages;
    
    // 保存到文件
    fs.writeFileSync('/tmp/人工智能教育-原文.txt', text);
    
    // 输出前5000个字符预览
    console.log('=== 小说原文预览 (前5000字) ===\n');
    console.log(text.substring(0, 5000));
    
    console.log('\n\n=== 统计 ===');
    console.log('总字数:', text.length);
    console.log('总行数:', text.split('\n').length);
    
    if (messages.length > 0) {
      console.log('\n警告:', messages);
    }
  })
  .catch(function(err) {
    console.error('Error:', err);
  });
