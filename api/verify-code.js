// api/verify-code.js - 激活码验证 API
export default async function handler(req, res) {
  // 只接受 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { code } = req.body;
    
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: '激活码不能为空' });
    }

    // 从环境变量读取有效的激活码列表
    const validCodes = process.env.VALID_ACTIVATION_CODES;
    if (!validCodes) {
      console.error('VALID_ACTIVATION_CODES 环境变量未配置');
      return res.status(500).json({ error: '服务器配置错误' });
    }

    // 解析激活码数组（逗号分隔）
    const codesArray = validCodes.split(',').map(c => c.trim().toUpperCase());
    const normalizedCode = code.trim().toUpperCase();

    // 验证激活码
    if (codesArray.includes(normalizedCode)) {
      // 激活成功，返回 30 天有效期
      const expires = new Date();
      expires.setDate(expires.getDate() + 30);
      
      return res.status(200).json({
        success: true,
        message: '激活成功！Pro 功能已解锁',
        expires: expires.toISOString()
      });
    } else {
      return res.status(400).json({
        success: false,
        message: '激活码无效，请核对后重试'
      });
    }
  } catch (error) {
    console.error('验证激活码失败:', error);
    return res.status(500).json({ error: '服务器内部错误' });
  }
}
