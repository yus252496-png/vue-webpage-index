<template>
  <div class="user-info">
    <MainLayout title="用户中心">
      <div class="cyber-user-info">
        <!-- 用户信息卡片 -->
        <div class="cyber-user-card">
          <div class="card-header">
            <div class="header-icon">◈</div>
            <span class="header-text">USER_PROFILE</span>
            <div class="header-line"></div>
          </div>

          <div class="user-profile">
            <div class="avatar-section">
              <div class="avatar-wrapper">
                <div class="avatar-glow"></div>
                <div class="avatar">
                  <span>{{ userInfo.username.charAt(0).toUpperCase() }}</span>
                </div>
              </div>
              <div class="user-status">
                <span class="status-dot online"></span>
                <span class="status-text">ONLINE</span>
              </div>
            </div>

            <div class="user-details">
              <div class="detail-row">
                <span class="detail-label">USERNAME</span>
                <span class="detail-value highlight">{{ userInfo.username }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">EMAIL</span>
                <span class="detail-value">{{ userInfo.email }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">ROLE</span>
                <span class="detail-value role-badge">{{ userInfo.role }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">JOIN_DATE</span>
                <span class="detail-value">{{ userInfo.joinDate }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">LAST_LOGIN</span>
                <span class="detail-value">{{ userInfo.lastLogin }}</span>
              </div>
            </div>
          </div>

          <div class="card-actions">
            <button class="cyber-btn btn-primary" @click="showEditProfile = true">
              <span class="btn-icon">◈</span>
              <span>编辑资料</span>
            </button>
            <button class="cyber-btn btn-secondary" @click="showPasswordModal = true">
              <span class="btn-icon">◊</span>
              <span>修改密码</span>
            </button>
          </div>
        </div>

        <!-- 账户统计 -->
        <div class="cyber-stats-grid">
          <div class="cyber-stat-card">
            <div class="stat-icon">◉</div>
            <div class="stat-content">
              <span class="stat-label">SESSIONS</span>
              <span class="stat-value">127</span>
            </div>
            <div class="stat-bar">
              <div class="bar-fill" style="width: 75%"></div>
            </div>
          </div>

          <div class="cyber-stat-card">
            <div class="stat-icon">◈</div>
            <div class="stat-content">
              <span class="stat-label">ACTIONS</span>
              <span class="stat-value">892</span>
            </div>
            <div class="stat-bar">
              <div class="bar-fill accent" style="width: 60%"></div>
            </div>
          </div>

          <div class="cyber-stat-card">
            <div class="stat-icon">◊</div>
            <div class="stat-content">
              <span class="stat-label">PROJECTS</span>
              <span class="stat-value">34</span>
            </div>
            <div class="stat-bar">
              <div class="bar-fill success" style="width: 85%"></div>
            </div>
          </div>
        </div>

        <!-- 最近活动 -->
        <div class="cyber-activity-section">
          <div class="section-header">
            <div class="header-icon">◈</div>
            <span class="header-text">RECENT_ACTIVITY</span>
            <div class="header-line"></div>
          </div>

          <div class="activity-list">
            <div class="activity-item" v-for="(activity, index) in recentActivities" :key="index">
              <div class="activity-time">{{ activity.time }}</div>
              <div class="activity-icon" :class="activity.type">
                <span>{{ activity.icon }}</span>
              </div>
              <div class="activity-content">
                <span class="activity-action">{{ activity.action }}</span>
                <span class="activity-detail">{{ activity.detail }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>

    <!-- 编辑资料弹窗 -->
    <div v-if="showEditProfile" class="cyber-modal-overlay" @click.self="showEditProfile = false">
      <div class="cyber-modal">
        <div class="modal-header">
          <div class="header-icon">◈</div>
          <span class="header-text">EDIT_PROFILE</span>
          <button class="close-btn" @click="showEditProfile = false">×</button>
        </div>
        <div class="modal-body">
          <div class="cyber-form-group">
            <label>用户名</label>
            <input v-model="editForm.username" type="text" class="cyber-input" />
          </div>
          <div class="cyber-form-group">
            <label>邮箱</label>
            <input v-model="editForm.email" type="email" class="cyber-input" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="cyber-btn btn-secondary" @click="showEditProfile = false">取消</button>
          <button class="cyber-btn btn-primary" @click="saveProfile">保存</button>
        </div>
      </div>
    </div>

    <!-- 修改密码弹窗 -->
    <PasswordModal
      v-if="showPasswordModal"
      @close="showPasswordModal = false"
      @success="handlePasswordSuccess"
    />
  </div>
</template>

<script>
import MainLayout from '../components/MainLayout.vue'
import PasswordModal from '../components/PasswordModal.vue'

export default {
  name: 'UserInfo',
  components: {
    MainLayout,
    PasswordModal
  },
  data() {
    return {
      userInfo: {
        username: 'Admin',
        email: 'admin@example.com',
        role: '超级管理员',
        joinDate: '2024-01-01',
        lastLogin: '2024-01-20 14:30'
      },
      showEditProfile: false,
      showPasswordModal: false,
      editForm: {
        username: '',
        email: ''
      },
      recentActivities: [
        { time: '14:30', action: '登录系统', detail: 'IP: 192.168.1.1', type: 'login', icon: '◉' },
        { time: '14:25', action: '修改密码', detail: '安全设置更新', type: 'security', icon: '◊' },
        { time: '13:45', action: '发布文章', detail: '《赛博朋克设计指南》', type: 'content', icon: '◈' },
        { time: '12:20', action: '更新配置', detail: '系统参数调整', type: 'settings', icon: '◉' },
        { time: '11:00', action: '导出数据', detail: '用户数据报表', type: 'data', icon: '◊' }
      ]
    }
  },
  created() {
    this.editForm = { ...this.userInfo }
  },
  methods: {
    saveProfile() {
      this.userInfo.username = this.editForm.username
      this.userInfo.email = this.editForm.email
      this.$store.commit('setUser', { username: this.userInfo.username })
      this.showEditProfile = false
      alert('资料更新成功！')
    },
    handlePasswordSuccess() {
      this.showPasswordModal = false
      alert('密码修改成功！')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');

.cyber-user-info {
  padding: 24px;
  font-family: 'Rajdhani', 'Microsoft YaHei', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 用户卡片 */
.cyber-user-card {
  background: rgba(18, 18, 26, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.2);
  border-radius: 4px;
  padding: 24px;
  position: relative;
}

.cyber-user-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #00f3ff, transparent);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.1);
}

.header-icon {
  font-size: 16px;
  color: #00f3ff;
}

.header-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 2px;
}

.header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 243, 255, 0.3), transparent);
}

.user-profile {
  display: flex;
  gap: 40px;
  margin-bottom: 24px;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.avatar-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
}

.avatar-glow {
  position: absolute;
  inset: -4px;
  background: linear-gradient(135deg, #00f3ff, #ff00ff);
  border-radius: 50%;
  opacity: 0.5;
  filter: blur(8px);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

.avatar {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a2e, #0a0a0f);
  border: 2px solid #00f3ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Orbitron', sans-serif;
  font-size: 48px;
  font-weight: 700;
  color: #00f3ff;
  text-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
}

.user-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 20px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
  box-shadow: 0 0 10px #00ff88;
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 11px;
  color: #00ff88;
  letter-spacing: 2px;
}

.user-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-row {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: rgba(0, 243, 255, 0.03);
  border-left: 3px solid #00f3ff;
}

.detail-label {
  width: 120px;
  font-family: 'Orbitron', sans-serif;
  font-size: 11px;
  color: #505060;
  letter-spacing: 2px;
}

.detail-value {
  flex: 1;
  font-size: 14px;
  color: #a0a0b0;
}

.detail-value.highlight {
  color: #00f3ff;
  font-weight: 600;
  font-size: 16px;
}

.role-badge {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255, 0, 255, 0.2);
  border: 1px solid #ff00ff;
  color: #ff00ff;
  font-size: 11px;
  letter-spacing: 1px;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
}

.card-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 243, 255, 0.1);
}

/* 按钮 */
.cyber-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
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

/* 统计网格 */
.cyber-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.cyber-stat-card {
  background: rgba(18, 18, 26, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.2);
  border-radius: 4px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.cyber-stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, #00f3ff, transparent);
}

.stat-icon {
  font-size: 24px;
  color: #00f3ff;
  margin-bottom: 12px;
}

.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
}

.stat-label {
  font-family: 'Orbitron', sans-serif;
  font-size: 11px;
  color: #505060;
  letter-spacing: 2px;
}

.stat-value {
  font-family: 'Orbitron', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
}

.stat-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #00f3ff, #0080ff);
  transition: width 1s ease;
}

.bar-fill.accent {
  background: linear-gradient(90deg, #ff00ff, #ff0055);
}

.bar-fill.success {
  background: linear-gradient(90deg, #00ff88, #00cc6a);
}

/* 活动区域 */
.cyber-activity-section {
  background: rgba(18, 18, 26, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.2);
  border-radius: 4px;
  padding: 24px;
  position: relative;
}

.cyber-activity-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #00f3ff, transparent);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.1);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: rgba(0, 243, 255, 0.03);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-time {
  width: 60px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #505060;
}

.activity-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 243, 255, 0.1);
  border: 1px solid rgba(0, 243, 255, 0.3);
  color: #00f3ff;
  font-size: 14px;
}

.activity-icon.security {
  background: rgba(255, 0, 85, 0.1);
  border-color: rgba(255, 0, 85, 0.3);
  color: #ff0055;
}

.activity-icon.content {
  background: rgba(0, 255, 136, 0.1);
  border-color: rgba(0, 255, 136, 0.3);
  color: #00ff88;
}

.activity-icon.settings {
  background: rgba(255, 234, 0, 0.1);
  border-color: rgba(255, 234, 0, 0.3);
  color: #ffea00;
}

.activity-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.activity-action {
  font-size: 14px;
  color: #fff;
  font-weight: 500;
}

.activity-detail {
  font-size: 12px;
  color: #505060;
}

/* 模态框 */
.cyber-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.cyber-modal {
  background: rgba(18, 18, 26, 0.95);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 4px;
  width: 100%;
  max-width: 500px;
  position: relative;
}

.cyber-modal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #00f3ff, #ff00ff);
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.1);
}

.close-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: #a0a0b0;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #ff0055;
}

.modal-body {
  padding: 24px;
}

.cyber-form-group {
  margin-bottom: 20px;
}

.cyber-form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #00f3ff;
  letter-spacing: 1px;
}

.cyber-input {
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
}

.cyber-input:focus {
  border-color: #00f3ff;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid rgba(0, 243, 255, 0.1);
}

/* 响应式 */
@media (max-width: 768px) {
  .user-profile {
    flex-direction: column;
    align-items: center;
  }
  
  .cyber-stats-grid {
    grid-template-columns: 1fr;
  }
  
  .detail-row {
    flex-direction: column;
    gap: 4px;
  }
  
  .detail-label {
    width: auto;
  }
}
</style>
