<template>
  <div class="cyber-modal-overlay" @click.self="closeModal">
    <div class="cyber-modal">
      <div class="modal-header">
        <div class="header-icon">◊</div>
        <span class="header-text">SECURITY_PROTOCOL</span>
        <button class="close-btn" @click="closeModal">×</button>
      </div>

      <div class="modal-body">
        <div class="security-info">
          <div class="security-icon">◊</div>
          <p>请输入当前密码以验证身份，然后设置新密码</p>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="cyber-form-group">
            <label>
              <span class="label-icon">◉</span>
              当前密码
            </label>
            <div class="input-wrapper">
              <input
                v-model="form.currentPassword"
                :type="showCurrentPassword ? 'text' : 'password'"
                class="cyber-input"
                placeholder="输入当前密码"
                required
              />
              <button
                type="button"
                class="toggle-btn"
                @click="showCurrentPassword = !showCurrentPassword"
              >
                <span>{{ showCurrentPassword ? '◉' : '◊' }}</span>
              </button>
              <div class="input-glow"></div>
            </div>
          </div>

          <div class="cyber-form-group">
            <label>
              <span class="label-icon">◈</span>
              新密码
            </label>
            <div class="input-wrapper">
              <input
                v-model="form.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                class="cyber-input"
                placeholder="输入新密码"
                required
              />
              <button
                type="button"
                class="toggle-btn"
                @click="showNewPassword = !showNewPassword"
              >
                <span>{{ showNewPassword ? '◉' : '◊' }}</span>
              </button>
              <div class="input-glow"></div>
            </div>
            <div class="password-strength" v-if="form.newPassword">
              <div class="strength-bar">
                <div class="strength-fill" :style="{ width: passwordStrength + '%', background: strengthColor }"></div>
              </div>
              <span class="strength-text" :style="{ color: strengthColor }">{{ strengthText }}</span>
            </div>
          </div>

          <div class="cyber-form-group">
            <label>
              <span class="label-icon">◈</span>
              确认新密码
            </label>
            <div class="input-wrapper">
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="cyber-input"
                :class="{ 'input-error': confirmError }"
                placeholder="再次输入新密码"
                required
              />
              <button
                type="button"
                class="toggle-btn"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <span>{{ showConfirmPassword ? '◉' : '◊' }}</span>
              </button>
              <div class="input-glow"></div>
            </div>
            <div v-if="confirmError" class="error-message">
              <span class="error-icon">⚠</span>
              {{ confirmError }}
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="cyber-btn btn-secondary" @click="closeModal">
              <span class="btn-icon">◊</span>
              <span>取消</span>
            </button>
            <button type="submit" class="cyber-btn btn-primary" :disabled="!!confirmError || !form.currentPassword || !form.newPassword || !form.confirmPassword">
              <span class="btn-icon">◈</span>
              <span>确认修改</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordModal',
  data() {
    return {
      form: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false
    }
  },
  computed: {
    confirmError() {
      if (this.form.confirmPassword && this.form.newPassword !== this.form.confirmPassword) {
        return '两次输入的密码不一致'
      }
      return ''
    },
    passwordStrength() {
      const pwd = this.form.newPassword
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
    closeModal() {
      this.$emit('close')
      this.resetForm()
    },
    resetForm() {
      this.form = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
      this.showCurrentPassword = false
      this.showNewPassword = false
      this.showConfirmPassword = false
    },
    handleSubmit() {
      if (this.confirmError) {
        return
      }
      console.log('修改密码:', this.form)
      this.$emit('success')
      this.closeModal()
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');

.cyber-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.cyber-modal {
  background: rgba(18, 18, 26, 0.95);
  border: 1px solid rgba(255, 0, 85, 0.3);
  border-radius: 4px;
  width: 100%;
  max-width: 480px;
  position: relative;
  animation: modalIn 0.3s ease;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.cyber-modal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #ff0055, #ff00ff);
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 0, 85, 0.1);
}

.header-icon {
  font-size: 18px;
  color: #ff0055;
}

.header-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 2px;
}

.close-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: #a0a0b0;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #ff0055;
}

.modal-body {
  padding: 24px;
}

.security-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 0, 85, 0.05);
  border: 1px solid rgba(255, 0, 85, 0.2);
  margin-bottom: 24px;
}

.security-icon {
  font-size: 24px;
  color: #ff0055;
}

.security-info p {
  font-size: 13px;
  color: #a0a0b0;
  margin: 0;
}

.cyber-form-group {
  margin-bottom: 20px;
}

.cyber-form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
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
  padding: 14px 44px 14px 16px;
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(255, 0, 85, 0.3);
  border-radius: 2px;
  color: #fff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
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

.toggle-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #ff0055;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.toggle-btn:hover {
  opacity: 1;
}

.password-strength {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
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

.error-message {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  padding: 8px 12px;
  background: rgba(255, 0, 85, 0.1);
  border-left: 3px solid #ff0055;
  font-size: 12px;
  color: #ff0055;
}

.error-icon {
  font-size: 14px;
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid rgba(255, 0, 85, 0.1);
}

.cyber-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
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

.cyber-btn .btn-icon {
  font-size: 14px;
}

.btn-primary {
  background: linear-gradient(135deg, rgba(255, 0, 85, 0.2) 0%, rgba(255, 0, 85, 0.1) 100%);
  border: 1px solid #ff0055;
  color: #ff0055;
}

.btn-primary:hover:not(:disabled) {
  background: rgba(255, 0, 85, 0.3);
  box-shadow: 0 0 20px rgba(255, 0, 85, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #a0a0b0;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
}
</style>
