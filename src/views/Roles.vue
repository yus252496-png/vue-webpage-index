<template>
  <div class="cyber-roles">
    <MainLayout title="角色权限">
      <div class="cyber-roles-content">
        <!-- 页面标题 -->
        <div class="page-header">
          <div class="header-icon">◈</div>
          <div class="header-content">
            <h2>ROLE_MANAGEMENT</h2>
            <span class="header-subtitle">角色权限配置与访问控制系统</span>
          </div>
          <div class="header-line"></div>
        </div>

        <!-- 统计卡片 -->
        <div class="stats-bar">
          <div class="stat-item">
            <div class="stat-value">04</div>
            <div class="stat-label">系统角色</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-value">32</div>
            <div class="stat-label">权限节点</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-value">156</div>
            <div class="stat-label">已分配用户</div>
          </div>
        </div>

        <!-- 角色卡片网格 -->
        <div class="roles-grid">
          <!-- 超级管理员 -->
          <div class="cyber-role-card admin">
            <div class="card-glow"></div>
            <div class="card-header">
              <div class="role-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div class="role-status active">ACTIVE</div>
            </div>
            <h3 class="role-name">超级管理员</h3>
            <p class="role-desc">拥有系统所有权限，可管理所有角色和用户</p>
            <div class="role-stats">
              <div class="stat">
                <span class="stat-icon">◉</span>
                <span>全部权限</span>
              </div>
              <div class="stat">
                <span class="stat-icon">◈</span>
                <span>3 位用户</span>
              </div>
            </div>
            <div class="role-actions">
              <button class="cyber-btn primary">
                <span class="btn-icon">◊</span>
                编辑权限
              </button>
              <button class="cyber-btn secondary">
                <span class="btn-icon">◈</span>
                查看用户
              </button>
            </div>
            <div class="card-decoration"></div>
          </div>

          <!-- 内容管理员 -->
          <div class="cyber-role-card content">
            <div class="card-glow"></div>
            <div class="card-header">
              <div class="role-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <div class="role-status active">ACTIVE</div>
            </div>
            <h3 class="role-name">内容管理员</h3>
            <p class="role-desc">管理内容相关功能，包括发布、编辑、删除内容</p>
            <div class="role-stats">
              <div class="stat">
                <span class="stat-icon">◉</span>
                <span>12 项权限</span>
              </div>
              <div class="stat">
                <span class="stat-icon">◈</span>
                <span>8 位用户</span>
              </div>
            </div>
            <div class="role-actions">
              <button class="cyber-btn primary">
                <span class="btn-icon">◊</span>
                编辑权限
              </button>
              <button class="cyber-btn secondary">
                <span class="btn-icon">◈</span>
                查看用户
              </button>
            </div>
            <div class="card-decoration"></div>
          </div>

          <!-- 普通用户 -->
          <div class="cyber-role-card user">
            <div class="card-glow"></div>
            <div class="card-header">
              <div class="role-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div class="role-status active">ACTIVE</div>
            </div>
            <h3 class="role-name">普通用户</h3>
            <p class="role-desc">基本使用权限，可查看内容和修改个人信息</p>
            <div class="role-stats">
              <div class="stat">
                <span class="stat-icon">◉</span>
                <span>6 项权限</span>
              </div>
              <div class="stat">
                <span class="stat-icon">◈</span>
                <span>145 位用户</span>
              </div>
            </div>
            <div class="role-actions">
              <button class="cyber-btn primary">
                <span class="btn-icon">◊</span>
                编辑权限
              </button>
              <button class="cyber-btn secondary">
                <span class="btn-icon">◈</span>
                查看用户
              </button>
            </div>
            <div class="card-decoration"></div>
          </div>

          <!-- 访客 -->
          <div class="cyber-role-card guest">
            <div class="card-glow"></div>
            <div class="card-header">
              <div class="role-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <div class="role-status inactive">INACTIVE</div>
            </div>
            <h3 class="role-name">访客</h3>
            <p class="role-desc">仅可查看公开内容，无编辑权限</p>
            <div class="role-stats">
              <div class="stat">
                <span class="stat-icon">◉</span>
                <span>2 项权限</span>
              </div>
              <div class="stat">
                <span class="stat-icon">◈</span>
                <span>0 位用户</span>
              </div>
            </div>
            <div class="role-actions">
              <button class="cyber-btn primary">
                <span class="btn-icon">◊</span>
                编辑权限
              </button>
              <button class="cyber-btn secondary">
                <span class="btn-icon">◈</span>
                查看用户
              </button>
            </div>
            <div class="card-decoration"></div>
          </div>

          <!-- 创建新角色 -->
          <div class="cyber-role-card add-role">
            <div class="add-content">
              <div class="add-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              </div>
              <h3>创建新角色</h3>
              <p>自定义角色权限配置</p>
              <button class="cyber-add-btn">
                <span class="btn-icon">◊</span>
                新建角色
              </button>
            </div>
            <div class="card-decoration"></div>
          </div>
        </div>

        <!-- 权限矩阵预览 -->
        <div class="permissions-preview">
          <div class="preview-header">
            <div class="header-icon">◉</div>
            <span class="header-text">权限矩阵概览</span>
            <div class="header-line"></div>
          </div>
          <div class="permissions-table">
            <div class="table-header">
              <div class="cell">权限节点</div>
              <div class="cell">超级管理员</div>
              <div class="cell">内容管理员</div>
              <div class="cell">普通用户</div>
              <div class="cell">访客</div>
            </div>
            <div class="table-row">
              <div class="cell permission-name">
                <span class="perm-icon">◊</span>
                用户管理
              </div>
              <div class="cell"><span class="check active">◉</span></div>
              <div class="cell"><span class="check">◌</span></div>
              <div class="cell"><span class="check">◌</span></div>
              <div class="cell"><span class="check">◌</span></div>
            </div>
            <div class="table-row">
              <div class="cell permission-name">
                <span class="perm-icon">◊</span>
                内容发布
              </div>
              <div class="cell"><span class="check active">◉</span></div>
              <div class="cell"><span class="check active">◉</span></div>
              <div class="cell"><span class="check">◌</span></div>
              <div class="cell"><span class="check">◌</span></div>
            </div>
            <div class="table-row">
              <div class="cell permission-name">
                <span class="perm-icon">◊</span>
                内容编辑
              </div>
              <div class="cell"><span class="check active">◉</span></div>
              <div class="cell"><span class="check active">◉</span></div>
              <div class="cell"><span class="check">◌</span></div>
              <div class="cell"><span class="check">◌</span></div>
            </div>
            <div class="table-row">
              <div class="cell permission-name">
                <span class="perm-icon">◊</span>
                内容查看
              </div>
              <div class="cell"><span class="check active">◉</span></div>
              <div class="cell"><span class="check active">◉</span></div>
              <div class="cell"><span class="check active">◉</span></div>
              <div class="cell"><span class="check active">◉</span></div>
            </div>
            <div class="table-row">
              <div class="cell permission-name">
                <span class="perm-icon">◊</span>
                系统配置
              </div>
              <div class="cell"><span class="check active">◉</span></div>
              <div class="cell"><span class="check">◌</span></div>
              <div class="cell"><span class="check">◌</span></div>
              <div class="cell"><span class="check">◌</span></div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  </div>
</template>

<script>
import MainLayout from '../components/MainLayout.vue'

export default {
  name: 'Roles',
  components: {
    MainLayout
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap');

.cyber-roles {
  min-height: 100%;
  background: linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0d0d12 100%);
  position: relative;
}

.cyber-roles::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
}

.cyber-roles-content {
  padding: 32px;
  position: relative;
  z-index: 1;
}

/* 页面标题 */
.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
}

.header-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #00ffff 0%, #0080ff 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #0a0a0f;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
}

.header-content h2 {
  font-family: 'Orbitron', monospace;
  font-size: 24px;
  font-weight: 600;
  color: #00ffff;
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  letter-spacing: 2px;
}

.header-subtitle {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  color: #a0a0b0;
  margin-top: 4px;
  display: block;
}

.header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 255, 255, 0.5), transparent);
}

/* 统计栏 */
.stats-bar {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 32px;
  padding: 20px 32px;
  background: rgba(0, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 12px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-family: 'Orbitron', monospace;
  font-size: 32px;
  font-weight: 700;
  color: #00ffff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.stat-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  color: #a0a0b0;
  margin-top: 4px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(0, 255, 255, 0.3);
}

/* 角色卡片网格 */
.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.cyber-role-card {
  background: rgba(20, 20, 30, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.cyber-role-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #00ffff, #0080ff, #00ffff);
  background-size: 200% 100%;
  animation: gradientMove 3s linear infinite;
}

.cyber-role-card.admin::before {
  background: linear-gradient(90deg, #ff0040, #ff4080, #ff0040);
  background-size: 200% 100%;
}

.cyber-role-card.content::before {
  background: linear-gradient(90deg, #00ff80, #00ffff, #00ff80);
  background-size: 200% 100%;
}

.cyber-role-card.user::before {
  background: linear-gradient(90deg, #ffff00, #ff8000, #ffff00);
  background-size: 200% 100%;
}

.cyber-role-card.guest::before {
  background: linear-gradient(90deg, #808080, #a0a0a0, #808080);
  background-size: 200% 100%;
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.cyber-role-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 255, 255, 0.5);
  box-shadow: 0 8px 32px rgba(0, 255, 255, 0.2);
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.cyber-role-card:hover .card-glow {
  opacity: 1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.role-icon {
  width: 48px;
  height: 48px;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ffff;
}

.role-icon svg {
  width: 24px;
  height: 24px;
}

.cyber-role-card.admin .role-icon {
  background: rgba(255, 0, 64, 0.1);
  border-color: rgba(255, 0, 64, 0.3);
  color: #ff0040;
}

.cyber-role-card.content .role-icon {
  background: rgba(0, 255, 128, 0.1);
  border-color: rgba(0, 255, 128, 0.3);
  color: #00ff80;
}

.cyber-role-card.user .role-icon {
  background: rgba(255, 255, 0, 0.1);
  border-color: rgba(255, 255, 0, 0.3);
  color: #ffff00;
}

.cyber-role-card.guest .role-icon {
  background: rgba(128, 128, 128, 0.1);
  border-color: rgba(128, 128, 128, 0.3);
  color: #808080;
}

.role-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-family: 'Orbitron', monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1px;
}

.role-status.active {
  background: rgba(0, 255, 128, 0.2);
  color: #00ff80;
  border: 1px solid rgba(0, 255, 128, 0.4);
}

.role-status.inactive {
  background: rgba(128, 128, 128, 0.2);
  color: #808080;
  border: 1px solid rgba(128, 128, 128, 0.4);
}

.role-name {
  font-family: 'Orbitron', monospace;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
}

.role-desc {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  color: #a0a0b0;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.role-stats {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  color: #808090;
}

.stat-icon {
  color: #00ffff;
}

.role-actions {
  display: flex;
  gap: 12px;
}

.cyber-btn {
  flex: 1;
  padding: 10px 16px;
  border-radius: 8px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
}

.cyber-btn.primary {
  background: linear-gradient(135deg, #00ffff 0%, #0080ff 100%);
  color: #0a0a0f;
}

.cyber-btn.primary:hover {
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  transform: translateY(-2px);
}

.cyber-btn.secondary {
  background: transparent;
  border: 1px solid rgba(0, 255, 255, 0.4);
  color: #00ffff;
}

.cyber-btn.secondary:hover {
  background: rgba(0, 255, 255, 0.1);
  border-color: #00ffff;
}

.btn-icon {
  font-size: 12px;
}

.card-decoration {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, transparent 50%, rgba(0, 255, 255, 0.1) 50%);
  border-bottom-right-radius: 16px;
}

/* 添加角色卡片 */
.add-role {
  border-style: dashed;
  border-color: rgba(0, 255, 255, 0.3);
  background: rgba(0, 255, 255, 0.02);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
}

.add-role::before {
  display: none;
}

.add-content {
  text-align: center;
}

.add-icon {
  width: 64px;
  height: 64px;
  background: rgba(0, 255, 255, 0.1);
  border: 2px dashed rgba(0, 255, 255, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: #00ffff;
  transition: all 0.3s ease;
}

.add-icon svg {
  width: 32px;
  height: 32px;
}

.add-role:hover .add-icon {
  background: rgba(0, 255, 255, 0.2);
  border-color: #00ffff;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
}

.add-content h3 {
  font-family: 'Orbitron', monospace;
  font-size: 18px;
  color: #00ffff;
  margin: 0 0 8px 0;
}

.add-content p {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  color: #808090;
  margin: 0 0 20px 0;
}

.cyber-add-btn {
  padding: 12px 24px;
  background: transparent;
  border: 1px solid rgba(0, 255, 255, 0.4);
  border-radius: 8px;
  color: #00ffff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
}

.cyber-add-btn:hover {
  background: rgba(0, 255, 255, 0.1);
  border-color: #00ffff;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
}

/* 权限矩阵预览 */
.permissions-preview {
  background: rgba(20, 20, 30, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.permissions-preview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #00ffff, #0080ff, #00ffff);
  background-size: 200% 100%;
  animation: gradientMove 3s linear infinite;
}

.preview-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
}

.preview-header .header-icon {
  width: 36px;
  height: 36px;
  font-size: 18px;
}

.preview-header .header-text {
  font-family: 'Orbitron', monospace;
  font-size: 16px;
  color: #00ffff;
}

.preview-header .header-line {
  flex: 1;
}

.permissions-table {
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: rgba(0, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 1px;
  background: rgba(0, 255, 255, 0.1);
}

.table-header {
  background: rgba(0, 255, 255, 0.15);
}

.table-header .cell {
  font-family: 'Orbitron', monospace;
  font-size: 12px;
  font-weight: 600;
  color: #00ffff;
  padding: 16px 12px;
  background: rgba(20, 20, 30, 0.95);
  text-align: center;
}

.table-row .cell {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  color: #a0a0b0;
  padding: 14px 12px;
  background: rgba(20, 20, 30, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-row .cell.permission-name {
  justify-content: flex-start;
  gap: 8px;
}

.perm-icon {
  color: #00ffff;
  font-size: 12px;
}

.check {
  font-size: 16px;
  color: #404050;
}

.check.active {
  color: #00ff80;
  text-shadow: 0 0 10px rgba(0, 255, 128, 0.5);
}

.table-row:hover .cell {
  background: rgba(0, 255, 255, 0.05);
}
</style>
