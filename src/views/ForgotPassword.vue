<template>
  <div class="cyber-forgot-page">
    <!-- 动态网格背景 -->
    <div class="grid-background">
      <div class="grid-lines"></div>
    </div>

    <!-- 扫描线效果 -->
    <div class="scan-line"></div>

    <div class="cyber-forgot-card">
      <!-- 装饰角标 -->
      <div class="corner-decoration tl"></div>
      <div class="corner-decoration tr"></div>
      <div class="corner-decoration bl"></div>
      <div class="corner-decoration br"></div>

      <!-- Step 1: 验证身份 -->
      <template v-if="step === 1">
        <div class="card-header">
          <div class="header-icon">◊</div>
          <h1>找回密码</h1>
          <div class="header-line"></div>
        </div>
        <p class="subtitle">SECURITY_VERIFICATION_PROTOCOL</p>

        <div class="method-tabs">
          <button
            :class="['cyber-tab', method === 'phone' ? 'active' : '']"
            type="button"
            @click="switchMethod('phone')"
          >
            <span class="tab-icon">◉</span>
            手机号验证
          </button>
          <button
            :class="['cyber-tab', method === 'email' ? 'active' : '']"
            type="button"
            @click="switchMethod('email')"
          >
            <span class="tab-icon">◈</span>
            邮箱验证
          </button>
        </div>

        <form @submit.prevent="handleVerify" class="cyber-form">
          <!-- 手机号 -->
          <template v-if="method === 'phone'">
            <div class="cyber-form-group">
              <label>
                <span class="label-icon">◉</span>
                手机号
              </label>
              <div class="input-wrapper">
                <input
                  v-model="phone"
                  type="text"
                  placeholder="请输入手机号"
                  maxlength="11"
                  @blur="validatePhone"
                  class="cyber-input"
                />
                <div class="input-glow"></div>
              </div>
              <span v-if="phoneError" class="error-msg">
                <span class="error-icon">⚠</span>
                {{ phoneError }}
              </span>
            </div>
          </template>

          <!-- 邮箱 -->
          <template v-if="method === 'email'">
            <div class="cyber-form-group">
              <label>
                <span class="label-icon">◈</span>
                邮箱
              </label>
              <div class="input-wrapper">
                <input
                  v-model="email"
                  type="text"
                  placeholder="请输入邮箱地址"
                  @blur="validateEmail"
                  class="cyber-input"
                />
                <div class="input-glow"></div>
              </div>
              <span v-if="emailError" class="error-msg">
                <span class="error-icon">⚠</span>
                {{ emailError }}
              </span>
            </div>
          </template>

          <!-- 验证码 -->
          <div class="cyber-form-group">
            <label>
              <span class="label-icon">◊</span>
              验证码
            </label>
            <div class="code-row">
              <div class="input-wrapper code-input">
                <input
                  v-model="code"
                  type="text"
                  placeholder="请输入验证码"
                  maxlength="6"
                  class="cyber-input"
                />
                <div class="input-glow"></div>
              </div>
              <button
                type="button"
                class="cyber-btn btn-send"
                :disabled="cooldown > 0 || !canSendCode"
                @click="sendCode"
              >
                <span v-if="cooldown > 0">{{ cooldown }}s</span>
                <span v-else>发送验证码</span>
              </button>
            </div>
            <span v-if="codeSent" class="hint-msg">
              <span class="hint-icon">◈</span>
              验证码已发送: {{ mockCode }}
            </span>
            <span v-if="codeError" class="error-msg">
              <span class="error-icon">⚠</span>
              {{ codeError }}
            </span>
          </div>

          <div class="button-group">
            <button type="button" class="cyber-btn btn-secondary" @click="goToLogin">
              <span class="btn-icon">◊</span>
              返回登录
            </button>
            <button type="submit" class="cyber-btn btn-primary" :disabled="!code">
              <span class="btn-icon">◈</span>
              下一步
            </button>
          </div>
        </form>
      </template>

      <!-- Step 2: 重置密码 -->
      <template v-if="step === 2">
        <div class="card-header">
          <div class="header-icon">◊</div>
          <h1>重置密码</h1>
          <div class="header-line"></div>
        </div>
        <p class="subtitle">PASSWORD_RESET_PROTOCOL</p>

        <form @submit.prevent="handleReset" class="cyber-form">
          <div class="cyber-form-group">
            <label>
              <span class="label-icon">◈</span>
              新密码
            </label>
            <div class="input-wrapper">
              <input
                v-model="newPassword"
                type="password"
                placeholder="请输入新密码"
                required
                class="cyber-input"
              />
              <div class="input-glow"></div>
            </div>
          </div>

          <div class="cyber-form-group">
            <label>
              <span class="label-icon">◈</span>
              确认新密码
            </label>
            <div class="input-wrapper">
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="请再次输入新密码"
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

          <div class="button-group">
            <button type="button" class="cyber-btn btn-secondary" @click="step = 1">
              <span class="btn-icon">◊</span>
              上一步
            </button>
            <button type="submit" class="cyber-btn btn-primary" :disabled="!isResetValid">
              <span class="btn-icon">◈</span>
              确认重置
            </button>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      step: 1,
      method: 'phone',
      phone: '',
      email: '',
      phoneError: '',
      emailError: '',
      code: '',
      codeError: '',
      codeSent: false,
      mockCode: '',
      cooldown: 0,
      cooldownTimer: null,
      newPassword: '',
      confirmPassword: ''
    }
  },
  computed: {
    canSendCode() {
      if (this.method === 'phone') {
        return /^1[3-9]\d{9}$/.test(this.phone)
      }
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
    },
    passwordMismatch() {
      return this.confirmPassword !== '' && this.newPassword !== this.confirmPassword
    },
    isResetValid() {
      return this.newPassword && this.confirmPassword && this.newPassword === this.confirmPassword
    }
  },
  methods: {
    switchMethod(m) {
      this.method = m
      this.phone = ''
      this.email = ''
      this.phoneError = ''
      this.emailError = ''
      this.code = ''
      this.codeError = ''
      this.codeSent = false
    },
    validatePhone() {
      if (!this.phone) {
        this.phoneError = '手机号不能为空'
      } else if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        this.phoneError = '手机号格式不正确'
      } else {
        this.phoneError = ''
      }
    },
    validateEmail() {
      if (!this.email) {
        this.emailError = '邮箱不能为空'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.emailError = '邮箱格式不正确'
      } else {
        this.emailError = ''
      }
    },
    sendCode() {
      if (this.method === 'phone') this.validatePhone()
      else this.validateEmail()

      if (!this.canSendCode) return

      this.mockCode = String(Math.floor(100000 + Math.random() * 900000))
      this.codeSent = true
      this.codeError = ''

      this.cooldown = 60
      clearInterval(this.cooldownTimer)
      this.cooldownTimer = setInterval(() => {
        this.cooldown--
        if (this.cooldown <= 0) {
          clearInterval(this.cooldownTimer)
        }
      }, 1000)
    },
    handleVerify() {
      if (!this.codeSent) {
        this.codeError = '请先发送验证码'
        return
      }
      if (this.code !== this.mockCode) {
        this.codeError = '验证码不正确，请重新输入'
        return
      }
      this.codeError = ''
      this.step = 2
    },
    handleReset() {
      if (!this.isResetValid) return
      this.$router.push('/login')
    },
    goToLogin() {
      this.$router.push('/login')
    }
  },
  beforeUnmount() {
    clearInterval(this.cooldownTimer)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');

.cyber-forgot-page {
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
.cyber-forgot-card {
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
  color: #ff0055;
  text-shadow: 0 0 10px rgba(255, 0, 85, 0.5);
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
  background: linear-gradient(90deg, rgba(255, 0, 85, 0.5), transparent);
}

.subtitle {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #ff0055;
  letter-spacing: 3px;
  margin-bottom: 32px;
}

/* 标签页 */
.method-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
}

.cyber-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #a0a0b0;
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
}

.cyber-tab:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}

.cyber-tab.active {
  background: rgba(255, 0, 85, 0.1);
  border-color: #ff0055;
  color: #ff0055;
  box-shadow: 0 0 15px rgba(255, 0, 85, 0.2);
}

.tab-icon {
  font-size: 14px;
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
  color: #ff0055;
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
  border: 1px solid rgba(255, 0, 85, 0.3);
  border-radius: 2px;
  color: #fff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.cyber-input:focus {
  border-color: #ff0055;
  box-shadow: 0 0 15px rgba(255, 0, 85, 0.2);
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
  background: linear-gradient(90deg, #ff0055, #ff00ff);
  transition: width 0.3s ease;
}

.cyber-input:focus ~ .input-glow {
  width: 100%;
}

/* 验证码行 */
.code-row {
  display: flex;
  gap: 12px;
}

.code-input {
  flex: 1;
}

/* 按钮 */
.cyber-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
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
  background: linear-gradient(135deg, rgba(255, 0, 85, 0.2) 0%, rgba(255, 0, 85, 0.1) 100%);
  border: 1px solid #ff0055;
  color: #ff0055;
}

.btn-primary:hover:not(:disabled) {
  background: rgba(255, 0, 85, 0.3);
  box-shadow: 0 0 20px rgba(255, 0, 85, 0.3);
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

.btn-send {
  white-space: nowrap;
  background: rgba(0, 243, 255, 0.1);
  border: 1px solid rgba(0, 243, 255, 0.3);
  color: #00f3ff;
  padding: 12px 16px;
}

.btn-send:hover:not(:disabled) {
  background: rgba(0, 243, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.2);
}

/* 提示信息 */
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

.hint-msg {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #00f3ff;
  font-family: 'Courier New', monospace;
}

.hint-icon {
  color: #00f3ff;
}

/* 按钮组 */
.button-group {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}
</style>
