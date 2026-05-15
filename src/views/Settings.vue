<template>
  <div class="settings">
    <MainLayout title="系统配置">
      <div class="cyber-settings">
        <!-- 页面标题 -->
        <div class="page-header">
          <div class="header-icon">◈</div>
          <div class="header-content">
            <h2>SYSTEM_CONFIGURATION</h2>
            <span class="header-subtitle">系统参数与全局设置管理</span>
          </div>
          <div class="header-line"></div>
        </div>

        <!-- 配置网格 -->
        <div class="settings-grid">
          <!-- 基本设置 -->
          <div class="cyber-setting-card">
            <div class="card-header">
              <div class="header-icon">◉</div>
              <span class="header-text">基本设置</span>
              <div class="header-line"></div>
            </div>

            <div class="setting-form">
              <div class="cyber-form-group">
                <label>
                  <span class="label-icon">◈</span>
                  系统名称
                </label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    v-model="settings.systemName"
                    placeholder="请输入系统名称"
                    class="cyber-input"
                  />
                  <div class="input-glow"></div>
                </div>
              </div>

              <div class="cyber-form-group">
                <label>
                  <span class="label-icon">◈</span>
                  系统描述
                </label>
                <div class="input-wrapper">
                  <textarea
                    v-model="settings.systemDesc"
                    placeholder="请输入系统描述"
                    class="cyber-textarea"
                    rows="3"
                  ></textarea>
                  <div class="input-glow"></div>
                </div>
              </div>

              <div class="cyber-form-group">
                <label>
                  <span class="label-icon">◈</span>
                  系统Logo
                </label>
                <div class="file-upload">
                  <div class="upload-area">
                    <span class="upload-icon">◊</span>
                    <span class="upload-text">点击或拖拽上传Logo</span>
                  </div>
                  <input type="file" class="file-input" />
                </div>
              </div>
            </div>
          </div>

          <!-- 邮件设置 -->
          <div class="cyber-setting-card">
            <div class="card-header">
              <div class="header-icon">◊</div>
              <span class="header-text">邮件设置</span>
              <div class="header-line"></div>
            </div>

            <div class="setting-form">
              <div class="cyber-form-group">
                <label>
                  <span class="label-icon">◉</span>
                  SMTP服务器
                </label>
                <div class="input-wrapper">
                  <input
                    type="text"
                    v-model="settings.smtpServer"
                    placeholder="smtp.example.com"
                    class="cyber-input"
                  />
                  <div class="input-glow"></div>
                </div>
              </div>

              <div class="cyber-form-group">
                <label>
                  <span class="label-icon">◉</span>
                  SMTP端口
                </label>
                <div class="input-wrapper">
                  <input
                    type="number"
                    v-model="settings.smtpPort"
                    placeholder="587"
                    class="cyber-input"
                  />
                  <div class="input-glow"></div>
                </div>
              </div>

              <div class="cyber-form-group">
                <label>
                  <span class="label-icon">◉</span>
                  发件人邮箱
                </label>
                <div class="input-wrapper">
                  <input
                    type="email"
                    v-model="settings.senderEmail"
                    placeholder="noreply@example.com"
                    class="cyber-input"
                  />
                  <div class="input-glow"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- 安全设置 -->
          <div class="cyber-setting-card">
            <div class="card-header">
              <div class="header-icon">◊</div>
              <span class="header-text">安全设置</span>
              <div class="header-line"></div>
            </div>

            <div class="setting-form">
              <div class="cyber-form-group">
                <label>
                  <span class="label-icon">◉</span>
                  登录失败锁定次数
                </label>
                <div class="input-wrapper">
                  <input
                    type="number"
                    v-model="settings.loginAttempts"
                    placeholder="5"
                    class="cyber-input"
                  />
                  <div class="input-glow"></div>
                </div>
              </div>

              <div class="cyber-form-group">
                <label>
                  <span class="label-icon">◉</span>
                  会话超时时间(分钟)
                </label>
                <div class="input-wrapper">
                  <input
                    type="number"
                    v-model="settings.sessionTimeout"
                    placeholder="30"
                    class="cyber-input"
                  />
                  <div class="input-glow"></div>
                </div>
              </div>

              <div class="cyber-form-group toggle-group">
                <label class="toggle-label">
                  <span class="label-icon">◉</span>
                  启用双因素认证
                </label>
                <label class="cyber-toggle">
                  <input type="checkbox" v-model="settings.enable2FA" />
                  <span class="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          <!-- 系统状态 -->
          <div class="cyber-setting-card status-card">
            <div class="card-header">
              <div class="header-icon">◈</div>
              <span class="header-text">系统状态</span>
              <div class="header-line"></div>
            </div>

            <div class="status-list">
              <div class="status-item">
                <div class="status-indicator online"></div>
                <span class="status-name">数据库连接</span>
                <span class="status-value">正常</span>
              </div>
              <div class="status-item">
                <div class="status-indicator online"></div>
                <span class="status-name">邮件服务</span>
                <span class="status-value">正常</span>
              </div>
              <div class="status-item">
                <div class="status-indicator warning"></div>
                <span class="status-name">缓存服务</span>
                <span class="status-value">警告</span>
              </div>
              <div class="status-item">
                <div class="status-indicator online"></div>
                <span class="status-name">文件存储</span>
                <span class="status-value">正常</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-bar">
          <button class="cyber-btn btn-secondary" @click="resetSettings">
            <span class="btn-icon">◊</span>
            <span>重置</span>
          </button>
          <button class="cyber-btn btn-primary" @click="saveSettings">
            <span class="btn-icon">◈</span>
            <span>保存设置</span>
          </button>
        </div>
      </div>
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from '../components/MainLayout.vue'

export default {
  name: 'Settings',
  components: {
    MainLayout
  },
  data() {
    return {
      settings: {
        systemName: 'NEURAL_OS',
        systemDesc: '下一代智能管理系统',
        smtpServer: '',
        smtpPort: 587,
        senderEmail: '',
        loginAttempts: 5,
        sessionTimeout: 30,
        enable2FA: false
      }
    }
  },
  methods: {
    saveSettings() {
      console.log('保存设置:', this.settings)
      alert('设置已保存！')
    },
    resetSettings() {
      this.settings = {
        systemName: 'NEURAL_OS',
        systemDesc: '下一代智能管理系统',
        smtpServer: '',
        smtpPort: 587,
        senderEmail: '',
        loginAttempts: 5,
        sessionTimeout: 30,
        enable2FA: false
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');

.cyber-settings {
  padding: 24px;
  font-family: 'Rajdhani', 'Microsoft YaHei', sans-serif;
}

/* 页面标题 */
.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.2);
}

.page-header .header-icon {
  font-size: 32px;
  color: #00f3ff;
  text-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.page-header h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 2px;
  margin: 0;
}

.header-subtitle {
  font-size: 13px;
  color: #a0a0b0;
}

.page-header .header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 243, 255, 0.3), transparent);
}

/* 配置网格 */
.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

/* 配置卡片 */
.cyber-setting-card {
  background: rgba(18, 18, 26, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.2);
  border-radius: 4px;
  padding: 24px;
  position: relative;
}

.cyber-setting-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #00f3ff, transparent);
}

.cyber-setting-card.status-card::before {
  background: linear-gradient(90deg, #00ff88, transparent);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.1);
}

.card-header .header-icon {
  font-size: 16px;
  color: #00f3ff;
}

.status-card .card-header .header-icon {
  color: #00ff88;
}

.card-header .header-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 2px;
}

.card-header .header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 243, 255, 0.3), transparent);
}

/* 表单 */
.setting-form {
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
  letter-spacing: 1px;
  text-transform: uppercase;
}

.label-icon {
  font-size: 10px;
}

.input-wrapper {
  position: relative;
}

.cyber-input,
.cyber-textarea {
  width: 100%;
  padding: 12px 16px;
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

.cyber-textarea {
  resize: vertical;
  min-height: 80px;
}

.cyber-input:focus,
.cyber-textarea:focus {
  border-color: #00f3ff;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
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

.cyber-input:focus ~ .input-glow,
.cyber-textarea:focus ~ .input-glow {
  width: 100%;
}

/* 文件上传 */
.file-upload {
  position: relative;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px;
  background: rgba(10, 10, 15, 0.5);
  border: 2px dashed rgba(0, 243, 255, 0.3);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: #00f3ff;
  background: rgba(0, 243, 255, 0.05);
}

.upload-icon {
  font-size: 32px;
  color: #00f3ff;
}

.upload-text {
  font-size: 13px;
  color: #a0a0b0;
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

/* 开关 */
.toggle-group {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.cyber-toggle {
  position: relative;
  width: 50px;
  height: 26px;
}

.cyber-toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  inset: 0;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.toggle-slider::before {
  content: '';
  position: absolute;
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background: #a0a0b0;
  transition: all 0.3s ease;
}

.cyber-toggle input:checked + .toggle-slider {
  background: rgba(0, 255, 136, 0.2);
  border-color: #00ff88;
}

.cyber-toggle input:checked + .toggle-slider::before {
  transform: translateX(24px);
  background: #00ff88;
  box-shadow: 0 0 10px #00ff88;
}

/* 状态列表 */
.status-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(0, 243, 255, 0.03);
  border-left: 3px solid rgba(0, 243, 255, 0.3);
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-indicator.online {
  background: #00ff88;
  box-shadow: 0 0 10px #00ff88;
}

.status-indicator.warning {
  background: #ffea00;
  box-shadow: 0 0 10px #ffea00;
}

.status-indicator.offline {
  background: #ff0055;
  box-shadow: 0 0 10px #ff0055;
}

.status-name {
  flex: 1;
  font-size: 13px;
  color: #a0a0b0;
}

.status-value {
  font-family: 'Orbitron', sans-serif;
  font-size: 11px;
  letter-spacing: 1px;
}

.status-value:has(+ .online) {
  color: #00ff88;
}

/* 操作栏 */
.action-bar {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 243, 255, 0.1);
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

.cyber-btn .btn-icon {
  font-size: 14px;
}

.btn-primary {
  background: linear-gradient(135deg, rgba(0, 243, 255, 0.2) 0%, rgba(0, 243, 255, 0.1) 100%);
  border: 1px solid #00f3ff;
  color: #00f3ff;
}

.btn-primary:hover {
  background: rgba(0, 243, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
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

/* 响应式 */
@media (max-width: 1024px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }
}
</style>
