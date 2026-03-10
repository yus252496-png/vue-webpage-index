<template>
  <div class="cyber-register-page">
    <!-- 动态网格背景 -->
    <div class="grid-background">
      <div class="grid-lines"></div>
    </div>

    <!-- 扫描线效果 -->
    <div class="scan-line"></div>

    <div class="cyber-register-card">
      <!-- 装饰角标 -->
      <div class="corner-decoration tl"></div>
      <div class="corner-decoration tr"></div>
      <div class="corner-decoration bl"></div>
      <div class="corner-decoration br"></div>

      <div class="card-header">
        <div class="header-icon">◈</div>
        <h1>创建账户</h1>
        <div class="header-line"></div>
      </div>
      <p class="subtitle">NEW_USER_REGISTRATION_PROTOCOL</p>

      <form @submit.prevent="handleRegister" class="cyber-form">
        <div class="cyber-form-group">
          <label>
            <span class="label-icon">◉</span>
            用户名
          </label>
          <div class="input-wrapper">
            <input
              v-model="form.username"
              type="text"
              placeholder="请输入用户名"
              required
              class="cyber-input"
            />
            <div class="input-glow"></div>
          </div>
        </div>

        <div class="cyber-form-group">
          <label>
            <span class="label-icon">◊</span>
            密码
          </label>
          <div class="input-wrapper">
            <input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              required
              class="cyber-input"
            />
            <div class="input-glow"></div>
          </div>
          <div class="password-strength" v-if="form.password">
            <div class="strength-bar">
              <div class="strength-fill" :style="{ width: passwordStrength + '%', background: strengthColor }"></div>
            </div>
            <span class="strength-text" :style="{ color: strengthColor }">{{ strengthText }}</span>
          </div>
        </div>

        <div class="cyber-form-group">
          <label>
            <span class="label-icon">◊</span>
            再次输入密码
          </label>
          <div class="input-wrapper">
            <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              required
              class="cyber-input"
              :class="{ 'input-error': passwordMismatch }"
            />
            <div class="input-glow"></div>
          </div>
          <span v-if="passwordMismatch" class="error-msg">
            <span class="error-icon">⚠</span>
            两次输入的密码不一致
          </span>
        </div>

        <div class="cyber-form-group">
          <label>
            <span class="label-icon">◈</span>
            邮箱
          </label>
          <div class="input-wrapper">
            <input
              v-model="form.email"
              type="text"
              placeholder="请输入邮箱地址"
              @blur="validateEmail"
              class="cyber-input"
              :class="{ 'input-error': emailError }"
            />
            <div class="input-glow"></div>
          </div>
          <span v-if="emailError" class="error-msg">
            <span class="error-icon">⚠</span>
            {{ emailError }}
          </span>
        </div>

        <div class="button-group">
          <button type="button" class="cyber-btn btn-secondary" @click="goToLogin">
            <span class="btn-icon">◊</span>
            取消
          </button>
          <button type="submit" class="cyber-btn btn-primary" :disabled="!isFormValid">
            <span class="btn-icon">◈</span>
            注册
          </button>
        </div>
      </form>

      <div class="login-link">
        <span>已有账户?</span>
        <a @click="goToLogin">立即登录</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
      },
      emailError: ''
    }
  },
  computed: {
    passwordMismatch() {
      return this.form.confirmPassword !== '' && this.form.password !== this.form.confirmPassword
    },
    isFormValid() {
      return (
        this.form.username &&
        this.form.password &&
        this.form.confirmPassword &&
        this.form.password === this.form.confirmPassword &&
        this.form.email &&
        !this.emailError
      )
    },
    passwordStrength() {
      const pwd = this.form.password
      if (!pwd) return 0
      let strength = 0
      if (pwd.length >= 8) strength += 25
      if (/[a-z]/.test(pwd)) strength += 25
      if (/[A-Z]/.test(pwd)) strength += 25
      if (/[0-9!@#$%^&*]/.test(pwd)) strength += 25
      return strength
    },
    strengthText() {
      if (this.passwordStrength <= 25) return '弱'
      if (this.passwordStrength <= 50) return '中'
      if (this.passwordStrength <= 75) return '强'
      return '非常强'
    },
    strengthColor() {
      if (this.passwordStrength <= 25) return '#ff0055'
      if (this.passwordStrength <= 50) return '#ffea00'
      if (this.passwordStrength <= 75) return '#00f3ff'
      return '#00ff88'
    }
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.form.email) {
        this.emailError = '邮箱不能为空'
      } else if (!emailRegex.test(this.form.email)) {
        this.emailError = '邮箱格式不正确'
      } else {
        this.emailError = ''
      }
    },
    handleRegister() {
      this.validateEmail()
      if (!this.isFormValid) return

      console.log('注册信息：', this.form)
      this.$router.push('/login')
    },
    goToLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');

.cyber-register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #1a1a2e 100%);
  position: relative;
  overflow: hidden;
  font-family: 'Rajdhani', 'Microsoft YaHei', sans-serif;
}

/* 网格背景 */
.grid-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.grid-lines {
  position: absolute;
  inset: -50%;
  background-image:
    linear-gradient(rgba(0, 243, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 243, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

/* 扫描线 */
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00f3ff, transparent);
  animation: scan 3s linear infinite;
  opacity: 0.5;
}

@keyframes scan {
  0% { transform: translateY(-100vh); }
  100% { transform: translateY(100vh); }
}

/* 卡片 */
.cyber-register-card {
  background: rgba(18, 18, 26, 0.9);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 4px;
  padding: 48px;
  width: 100%;
  max-width: 440px;
  position: relative;
  backdrop-filter: blur(10px);
  animation: cardIn 0.5s ease;
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 装饰角标 */
.corner-decoration {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #00f3ff;
}

.corner-decoration.tl {
  top: -1px;
  left: -1px;
  border-right: none;
  border-bottom: none;
}

.corner-decoration.tr {
  top: -1px;
  right: -1px;
  border-left: none;
  border-bottom: none;
}

.corner-decoration.bl {
  bottom: -1px;
  left: -1px;
  border-right: none;
  border-top: none;
}

.corner-decoration.br {
  bottom: -1px;
  right: -1px;
  border-left: none;
  border-top: none;
}

/* 头部 */
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.header-icon {
  font-size: 24px;
  color: #00f3ff;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
}

h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 2px;
  margin: 0;
}

.header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 243, 255, 0.5), transparent);
}

.subtitle {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #00f3ff;
  letter-spacing: 3px;
  margin-bottom: 32px;
}

/* 表单 */
.cyber-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cyber-form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cyber-form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Orbitron', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #00f3ff;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.label-icon {
  font-size: 10px;
}

.input-wrapper {
  position: relative;
}

.cyber-input {
  width: 100%;
  padding: 14px 16px;
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 2px;
  color: #fff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.cyber-input:focus {
  border-color: #00f3ff;
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.2);
}

.cyber-input.input-error {
  border-color: #ff0055;
  background: rgba(255, 0, 85, 0.05);
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

.cyber-input:focus ~ .input-glow {
  width: 100%;
}

/* 密码强度 */
.password-strength {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}

.strength-bar {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
}

.strength-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 10px;
  letter-spacing: 1px;
  min-width: 60px;
  text-align: right;
}

/* 错误信息 */
.error-msg {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #ff0055;
  padding: 8px 12px;
  background: rgba(255, 0, 85, 0.1);
  border-left: 3px solid #ff0055;
}

.error-icon {
  font-size: 14px;
}

/* 按钮 */
.cyber-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
}

.cyber-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 14px;
}

.btn-primary {
  flex: 1;
  background: linear-gradient(135deg, rgba(0, 243, 255, 0.2) 0%, rgba(0, 243, 255, 0.1) 100%);
  border: 1px solid #00f3ff;
  color: #00f3ff;
}

.btn-primary:hover:not(:disabled) {
  background: rgba(0, 243, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
}

.btn-secondary {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #a0a0b0;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
}

/* 按钮组 */
.button-group {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

/* 登录链接 */
.login-link {
  text-align: center;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 243, 255, 0.1);
}

.login-link span {
  font-size: 13px;
  color: #a0a0b0;
}

.login-link a {
  margin-left: 8px;
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  color: #00f3ff;
  cursor: pointer;
  text-decoration: none;
  letter-spacing: 1px;
  transition: all 0.3s;
}

.login-link a:hover {
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
}
</style>
