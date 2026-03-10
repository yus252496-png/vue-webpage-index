<template>
  <div class="login-page">
    <!-- 背景效果 -->
    <div class="cyber-bg">
      <div class="grid-overlay"></div>
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="glow-orb orb-3"></div>
    </div>
    
    <div class="login-card">
      <!-- 装饰角标 -->
      <div class="corner corner-tl"></div>
      <div class="corner corner-tr"></div>
      <div class="corner corner-bl"></div>
      <div class="corner corner-br"></div>
      
      <div class="card-header">
        <div class="system-id">SYSTEM_ACCESS // v2.0.77</div>
        <h1 class="cyber-glitch" data-text="NEURAL_LINK">NEURAL_LINK</h1>
        <p class="subtitle">
          <span class="blink">[</span> 身份验证协议 <span class="blink">]</span>
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">
            <span class="label-icon">◈</span>
            用户标识
          </label>
          <div class="input-wrapper">
            <input
              id="username"
              v-model="username"
              type="text"
              placeholder="输入用户标识..."
              required
              class="cyber-input-field"
            />
            <div class="input-glow"></div>
          </div>
        </div>

        <div class="form-group">
          <label for="password">
            <span class="label-icon">◈</span>
            访问密钥
          </label>
          <div class="input-wrapper">
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="输入访问密钥..."
              required
              class="cyber-input-field"
            />
            <div class="input-glow"></div>
          </div>
        </div>

        <div class="form-group captcha-group">
          <label for="captcha">
            <span class="label-icon">◈</span>
            安全验证
          </label>
          <div class="captcha-wrapper">
            <div class="input-wrapper captcha-input">
              <input
                id="captcha"
                v-model="captcha"
                type="text"
                placeholder="输入验证码..."
                required
                class="cyber-input-field"
              />
              <div class="input-glow"></div>
            </div>
            <canvas 
              ref="captchaCanvas" 
              class="captcha-canvas"
              @click="generateCaptcha"
              width="120" 
              height="45"
            ></canvas>
          </div>
        </div>

        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" />
            <span class="checkmark"></span>
            <span class="remember-text">记住身份</span>
          </label>
          <router-link to="/forgot-password" class="forgot-link">
            密钥丢失?
          </router-link>
        </div>

        <button type="submit" class="cyber-login-btn">
          <span class="btn-text">建立连接</span>
          <span class="btn-glitch"></span>
          <div class="btn-particles">
            <span></span><span></span><span></span><span></span>
          </div>
        </button>

        <div class="signup-section">
          <div class="cyber-line"></div>
          <p class="signup-text">
            未注册节点? <router-link to="/register" class="cyber-link">创建新身份</router-link>
          </p>
          <div class="cyber-line"></div>
        </div>
      </form>
      
      <!-- 底部装饰 -->
      <div class="card-footer">
        <div class="footer-text">ENCRYPTED_CONNECTION // SSL_ACTIVE</div>
        <div class="footer-decoration">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      captcha: '',
      captchaCode: '',
      rememberMe: false
    }
  },
  mounted() {
    this.generateCaptcha()
  },
  methods: {
    generateCaptcha() {
      const canvas = this.$refs.captchaCanvas
      const ctx = canvas.getContext('2d')
      
      // 生成随机验证码
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let code = ''
      for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      this.captchaCode = code
      
      // 清除画布
      ctx.fillStyle = '#0a0a0f'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // 绘制网格背景
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.1)'
      ctx.lineWidth = 1
      for (let i = 0; i < canvas.width; i += 10) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }
      for (let i = 0; i < canvas.height; i += 10) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }
      
      // 绘制干扰线
      for (let i = 0; i < 3; i++) {
        ctx.beginPath()
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
        ctx.strokeStyle = `rgba(255, 0, 255, ${Math.random() * 0.5 + 0.2})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      
      // 绘制验证码文本 - 赛博朋克风格
      ctx.font = 'bold 22px "Courier New", monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      for (let i = 0; i < code.length; i++) {
        const x = (canvas.width / code.length) * i + canvas.width / (code.length * 2)
        const y = canvas.height / 2 + (Math.random() - 0.5) * 5
        
        // 霓虹发光效果
        ctx.shadowColor = i % 2 === 0 ? '#00f3ff' : '#ff00ff'
        ctx.shadowBlur = 10
        ctx.fillStyle = i % 2 === 0 ? '#00f3ff' : '#ff00ff'
        
        ctx.fillText(code[i], x, y)
        
        // 重置阴影
        ctx.shadowBlur = 0
      }
      
      // 添加扫描线效果
      ctx.fillStyle = 'rgba(0, 243, 255, 0.1)'
      ctx.fillRect(0, canvas.height / 2 - 1, canvas.width, 2)
    },
    handleLogin() {
      if (this.username && this.password && this.captcha) {
        // 验证验证码
        if (this.captcha.toLowerCase() !== this.captchaCode.toLowerCase()) {
          alert('安全验证失败 - 验证码错误')
          this.generateCaptcha()
          return
        }
        
        // 模拟后台返回的用户信息
        const mockResponse = {
          token: 'mock-token-' + Date.now(),
          user: {
            id: 1,
            username: this.username,
            email: this.username + '@neural.net',
            avatar: '',
            role: 'user'
          }
        }
        this.$store.dispatch('login', mockResponse)
        this.$router.push('/dashboard')
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');

.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0a0a0f;
  position: relative;
  overflow: hidden;
  font-family: 'Rajdhani', 'Microsoft YaHei', sans-serif;
}

/* 背景效果 */
.cyber-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 243, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 243, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  perspective: 500px;
  transform-style: preserve-3d;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { transform: translateY(0); }
  100% { transform: translateY(50px); }
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: orbFloat 10s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: #00f3ff;
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: #ff00ff;
  bottom: -50px;
  left: -50px;
  animation-delay: -3s;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: #ffea00;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -6s;
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

/* 登录卡片 */
.login-card {
  position: relative;
  z-index: 1;
  background: rgba(18, 18, 26, 0.9);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 4px;
  padding: 48px;
  width: 100%;
  max-width: 420px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 40px rgba(0, 243, 255, 0.1),
    inset 0 0 40px rgba(0, 243, 255, 0.02);
}

/* 装饰角标 */
.corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #00f3ff;
}

.corner-tl {
  top: -1px;
  left: -1px;
  border-right: none;
  border-bottom: none;
}

.corner-tr {
  top: -1px;
  right: -1px;
  border-left: none;
  border-bottom: none;
}

.corner-bl {
  bottom: -1px;
  left: -1px;
  border-right: none;
  border-top: none;
}

.corner-br {
  bottom: -1px;
  right: -1px;
  border-left: none;
  border-top: none;
}

/* 卡片头部 */
.card-header {
  text-align: center;
  margin-bottom: 40px;
}

.system-id {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #00f3ff;
  letter-spacing: 3px;
  margin-bottom: 16px;
  opacity: 0.7;
}

h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #00f3ff;
  letter-spacing: 4px;
  margin: 0 0 12px 0;
  text-shadow: 
    0 0 10px rgba(0, 243, 255, 0.8),
    0 0 20px rgba(0, 243, 255, 0.4),
    0 0 40px rgba(0, 243, 255, 0.2);
  position: relative;
}

/* 故障效果 */
.cyber-glitch::before,
.cyber-glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.cyber-glitch::before {
  animation: glitch-1 2s infinite linear alternate-reverse;
  color: #ff00ff;
  z-index: -1;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
}

.cyber-glitch::after {
  animation: glitch-2 3s infinite linear alternate-reverse;
  color: #ffea00;
  z-index: -2;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
}

@keyframes glitch-1 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-2px, 0); }
  80% { transform: translate(2px, 2px); }
}

@keyframes glitch-2 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(2px, -2px); }
  40% { transform: translate(-2px, 2px); }
  60% { transform: translate(2px, 0); }
  80% { transform: translate(-2px, -2px); }
}

.subtitle {
  font-size: 14px;
  color: #a0a0b0;
  letter-spacing: 2px;
  margin: 0;
}

.blink {
  animation: blink 1s step-end infinite;
  color: #00f3ff;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* 表单样式 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 13px;
  font-weight: 600;
  color: #00f3ff;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
}

.label-icon {
  color: #ff00ff;
  font-size: 10px;
}

.input-wrapper {
  position: relative;
}

.cyber-input-field {
  width: 100%;
  padding: 14px 16px;
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 2px;
  color: #fff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 15px;
  letter-spacing: 1px;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.cyber-input-field:focus {
  border-color: #00f3ff;
  box-shadow: 
    0 0 10px rgba(0, 243, 255, 0.3),
    inset 0 0 10px rgba(0, 243, 255, 0.05);
}

.cyber-input-field::placeholder {
  color: #505060;
}

.input-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #00f3ff, #ff00ff);
  transition: width 0.3s ease;
}

.cyber-input-field:focus ~ .input-glow {
  width: 100%;
}

/* 验证码 */
.captcha-wrapper {
  display: flex;
  gap: 12px;
  align-items: stretch;
}

.captcha-input {
  flex: 1;
}

.captcha-canvas {
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #0a0a0f;
}

.captcha-canvas:hover {
  border-color: #00f3ff;
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
}

/* 选项区域 */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.remember-me input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 1px solid rgba(0, 243, 255, 0.5);
  background: rgba(10, 10, 15, 0.8);
  position: relative;
  transition: all 0.3s ease;
}

.remember-me input:checked + .checkmark {
  background: #00f3ff;
  border-color: #00f3ff;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
}

.remember-me input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #0a0a0f;
  font-size: 12px;
  font-weight: bold;
}

.remember-text {
  font-size: 13px;
  color: #a0a0b0;
  letter-spacing: 1px;
}

.forgot-link {
  font-size: 13px;
  color: #ff00ff;
  text-decoration: none;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
}

.forgot-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: #ff00ff;
  transition: width 0.3s ease;
}

.forgot-link:hover {
  text-shadow: 0 0 10px rgba(255, 0, 255, 0.8);
}

.forgot-link:hover::after {
  width: 100%;
}

/* 登录按钮 */
.cyber-login-btn {
  position: relative;
  width: 100%;
  padding: 16px;
  margin-top: 16px;
  background: transparent;
  border: 2px solid #00f3ff;
  color: #00f3ff;
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
}

.cyber-login-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.4), transparent);
  transition: left 0.5s ease;
}

.cyber-login-btn:hover {
  background: rgba(0, 243, 255, 0.1);
  box-shadow: 
    0 0 20px rgba(0, 243, 255, 0.4),
    inset 0 0 20px rgba(0, 243, 255, 0.1);
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.8);
}

.cyber-login-btn:hover::before {
  left: 100%;
}

.btn-text {
  position: relative;
  z-index: 1;
}

/* 注册区域 */
.signup-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
}

.cyber-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.5), transparent);
}

.signup-text {
  font-size: 13px;
  color: #a0a0b0;
  white-space: nowrap;
  letter-spacing: 1px;
}

.cyber-link {
  color: #ffea00;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cyber-link:hover {
  text-shadow: 0 0 10px rgba(255, 234, 0, 0.8);
}

/* 卡片底部 */
.card-footer {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 243, 255, 0.1);
  text-align: center;
}

.footer-text {
  font-family: 'Courier New', monospace;
  font-size: 10px;
  color: #00f3ff;
  letter-spacing: 2px;
  opacity: 0.5;
  margin-bottom: 12px;
}

.footer-decoration {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.footer-decoration span {
  width: 30px;
  height: 3px;
  background: rgba(0, 243, 255, 0.3);
  animation: pulse 1.5s ease-in-out infinite;
}

.footer-decoration span:nth-child(2) {
  animation-delay: 0.2s;
  background: rgba(255, 0, 255, 0.3);
}

.footer-decoration span:nth-child(3) {
  animation-delay: 0.4s;
  background: rgba(255, 234, 0, 0.3);
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scaleX(1); }
  50% { opacity: 1; transform: scaleX(1.2); }
}
</style>
