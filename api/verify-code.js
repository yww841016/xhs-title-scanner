// api/verify-code.js - 激活码验证 API
// 优化：添加防暴力破解、IP 限流

// 简易内存限流器
const attemptLimit = new Map();
const ATTEMPT_WINDOW = 300000; // 5分钟窗口
const MAX_ATTEMPTS = 5; // 最多尝试5次

function checkAttemptLimit(ip) {
  const now = Date.now();
  const record = attemptLimit.get(ip);
  
  if (!record || now - record.start > ATTEMPT_WINDOW) {
    attemptLimit.set(ip, { start: now, count: 1 });
    return true;
  }
  
  if (record.count >= MAX_ATTEMPTS) {
    return false;
  }
  
  record.count++;
  return true;
}

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

    // 激活码格式校验
    if (code.length < 6 || code.length > 20) {
      return res.status(400).json({ error: '激活码格式不正确' });
    }

    // 获取客户端 IP（用于限流）
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() 
               || req.socket.remoteAddress 
               || 'unknown';
    
    // 防暴力破解限流
    if (!checkAttemptLimit(ip)) {
      return res.status(429).json({ error: '尝试次数过多，请5分钟后重试' });
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
