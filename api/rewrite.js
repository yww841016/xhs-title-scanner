// api/rewrite.js - AI 改写代理 API（隐藏 API Key）
export default async function handler(req, res) {
  // 只接受 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title } = req.body;
    
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: '标题不能为空' });
    }

    // 从环境变量读取 API 配置
    const apiKey = process.env.AGNES_API_KEY;
    const apiBase = process.env.AGNES_API_BASE || 'https://apihub.agnes-ai.com/v1';
    
    if (!apiKey) {
      console.error('AGNES_API_KEY 环境变量未配置');
      return res.status(500).json({ error: '服务器配置错误' });
    }

    // 调用 Agnes API
    const response = await fetch(`${apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'agnes-2.0-flash',
        messages: [{
          role: 'user',
          content: `你是小红书爆款标题改写专家。

任务：将用户输入的标题改写成5条不同风格的小红书爆款标题。

改写规则：
1. 保持原标题的核心意思不变，只是换一种表达方式
2. 每条标题15-25个字
3. 使用小红书常见的爆款句式
4. 标题必须通顺自然，像一个正常人在说话
5. 不要生硬拼接词语

用户原始标题：${title}

请严格按以下JSON格式返回（不要有任何其他内容）：
[
  {"title": "改写后的标题", "type": "类型", "reason": "改写理由"}
]

示例（仅供参考格式，不要照抄）：
[
  {"title": "坚持打卡30天！这5个护肤小技巧真的绝了", "type": "数字型", "reason": "用具体数字增加可信度"},
  {"title": "熬夜脸救星😭亲测有效！我的私藏护肤秘籍", "type": "情绪型", "reason": "加入表情和情绪词"}
]`
        }],
        temperature: 0.8,
        max_tokens: 1000
      })
    });
    
    if (!response.ok) {
      console.error('Agnes API 错误:', response.status);
      return res.status(500).json({ error: 'AI 服务暂时不可用' });
    }
    
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      return res.status(500).json({ error: 'AI 响应为空' });
    }
    
    // 提取 JSON 数组
    const jsonMatch = content.match(/\[.*\]/s);
    if (jsonMatch) {
      const rewrites = JSON.parse(jsonMatch[0]);
      return res.status(200).json({ success: true, rewrites });
    }
    
    // 如果解析失败，返回原始内容
    return res.status(200).json({ 
      success: true, 
      rewrites: [{ text: content, badge: 'default', badgeText: 'AI 生成', reason: '' }] 
    });
  } catch (error) {
    console.error('改写请求失败:', error);
    return res.status(500).json({ error: '服务器内部错误' });
  }
}
