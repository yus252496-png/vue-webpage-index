<template>
  <div class="dashboard">
    <MainLayout title="仪表盘">
      <div class="cyber-dashboard">
        <!-- 欢迎区域 -->
        <div class="welcome-section">
          <div class="welcome-glow"></div>
          <div class="welcome-content">
            <div class="welcome-header">
              <span class="system-tag">SYSTEM_STATUS</span>
              <span class="status-indicator online">ONLINE</span>
            </div>
            <h2 class="welcome-title">
              欢迎回来, <span class="highlight-name">{{ username }}</span>
            </h2>
            <p class="welcome-subtitle">
              <span class="blink">[</span> 神经连接已建立 // 系统运行正常 <span class="blink">]</span>
            </p>
            <div class="welcome-stats">
              <div class="mini-stat">
                <span class="stat-label">SESSION</span>
                <span class="stat-value">ACTIVE</span>
              </div>
              <div class="mini-stat">
                <span class="stat-label">SECURITY</span>
                <span class="stat-value">LEVEL_5</span>
              </div>
              <div class="mini-stat">
                <span class="stat-label">NODE</span>
                <span class="stat-value">ASIA-EAST-1</span>
              </div>
            </div>
          </div>
          <div class="corner-decoration tl"></div>
          <div class="corner-decoration tr"></div>
          <div class="corner-decoration bl"></div>
          <div class="corner-decoration br"></div>
        </div>

        <!-- 统计卡片 -->
        <div class="stats-grid">
          <div class="cyber-stat-card" v-for="(stat, index) in stats" :key="index">
            <div class="card-glitch"></div>
            <div class="stat-icon-wrapper">
              <span class="stat-icon">{{ stat.icon }}</span>
              <div class="icon-hexagon"></div>
            </div>
            <div class="stat-info">
              <div class="stat-value-large">{{ stat.value }}</div>
              <div class="stat-label-large">{{ stat.label }}</div>
              <div class="stat-trend" :class="stat.trend">
                <span>{{ stat.change }}</span>
              </div>
            </div>
            <div class="card-scan"></div>
          </div>
        </div>

        <!-- 快速操作和数据可视化 -->
        <div class="dashboard-grid">
          <!-- 快速操作 -->
          <div class="cyber-panel quick-actions">
            <div class="panel-header">
              <div class="header-icon">◈</div>
              <h3>快速操作</h3>
              <div class="header-line"></div>
            </div>
            <div class="action-grid">
              <button 
                class="cyber-action-btn" 
                v-for="action in quickActions" 
                :key="action.id"
                @click="action.handler"
              >
                <div class="btn-bg"></div>
                <span class="action-icon">{{ action.icon }}</span>
                <span class="action-name">{{ action.name }}</span>
                <div class="btn-glow"></div>
              </button>
            </div>
          </div>

          <!-- 系统状态 -->
          <div class="cyber-panel system-status">
            <div class="panel-header">
              <div class="header-icon">◉</div>
              <h3>系统状态</h3>
              <div class="header-line"></div>
            </div>
            <div class="status-list">
              <div class="status-item" v-for="(item, index) in systemStatus" :key="index">
                <div class="status-icon" :class="item.status">
                  <span></span>
                </div>
                <div class="status-info">
                  <span class="status-name">{{ item.name }}</span>
                  <div class="status-bar">
                    <div class="status-fill" :style="{ width: item.percentage + '%' }"></div>
                  </div>
                </div>
                <span class="status-percent">{{ item.percentage }}%</span>
              </div>
            </div>
          </div>

          <!-- 实时数据流 -->
          <div class="cyber-panel data-stream">
            <div class="panel-header">
              <div class="header-icon">◆</div>
              <h3>实时数据流</h3>
              <div class="header-line"></div>
            </div>
            <div class="stream-container">
              <div class="stream-line" v-for="n in 5" :key="n">
                <div class="stream-bar" :style="{ animationDelay: (n * 0.2) + 's' }"></div>
              </div>
            </div>
            <div class="stream-stats">
              <div class="stream-stat">
                <span class="label">IN</span>
                <span class="value">2.4 TB/s</span>
              </div>
              <div class="stream-stat">
                <span class="label">OUT</span>
                <span class="value">1.8 TB/s</span>
              </div>
            </div>
          </div>

          <!-- 最近活动 -->
          <div class="cyber-panel recent-activity">
            <div class="panel-header">
              <div class="header-icon">◊</div>
              <h3>最近活动</h3>
              <div class="header-line"></div>
            </div>
            <div class="activity-list">
              <div class="activity-item" v-for="(activity, index) in recentActivities" :key="index">
                <div class="activity-time">{{ activity.time }}</div>
                <div class="activity-dot"></div>
                <div class="activity-content">
                  <span class="activity-text">{{ activity.text }}</span>
                  <span class="activity-type" :class="activity.type">{{ activity.typeLabel }}</span>
                </div>
              </div>
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
  name: 'Dashboard',
  components: {
    MainLayout
  },
  data() {
    return {
      stats: [
        { icon: '◈', value: '1,234', label: '总项目数', change: '+12%', trend: 'up' },
        { icon: '◉', value: '567', label: '活跃用户', change: '+8%', trend: 'up' },
        { icon: '◆', value: '89%', label: '系统效率', change: '+5%', trend: 'up' },
        { icon: '◊', value: '¥12.3K', label: '今日收入', change: '-3%', trend: 'down' }
      ],
      quickActions: [
        { id: 'articles', name: '文章管理', icon: '◊', handler: () => this.goToContent('articles') },
        { id: 'categories', name: '分类管理', icon: '◊', handler: () => this.goToContent('categories') },
        { id: 'tags', name: '标签管理', icon: '◊', handler: () => this.goToContent('tags') },
        { id: 'users', name: '用户管理', icon: '◊', handler: () => this.goToContent('users') }
      ],
      systemStatus: [
        { name: 'CPU 使用率', percentage: 45, status: 'normal' },
        { name: '内存占用', percentage: 62, status: 'warning' },
        { name: '存储空间', percentage: 78, status: 'normal' },
        { name: '网络带宽', percentage: 34, status: 'normal' }
      ],
      recentActivities: [
        { time: '14:32', text: '系统安全扫描完成', type: 'security', typeLabel: '安全' },
        { time: '14:15', text: '新用户注册: user_8842', type: 'user', typeLabel: '用户' },
        { time: '13:58', text: '数据备份完成', type: 'system', typeLabel: '系统' },
        { time: '13:42', text: '文章发布: 技术白皮书', type: 'content', typeLabel: '内容' },
        { time: '12:20', text: '系统更新: v2.0.77', type: 'system', typeLabel: '系统' }
      ]
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    },
    username() {
      return (this.currentUser && this.currentUser.username) || 'OPERATOR'
    }
  },
  methods: {
    goToContent(type) {
      this.$router.push(`/content/${type}`)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');

.cyber-dashboard {
  padding: 24px;
  font-family: 'Rajdhani', 'Microsoft YaHei', sans-serif;
}

/* 欢迎区域 */
.welcome-section {
  position: relative;
  background: linear-gradient(135deg, rgba(0, 243, 255, 0.1) 0%, rgba(255, 0, 255, 0.05) 100%);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 4px;
  padding: 32px;
  margin-bottom: 32px;
  overflow: hidden;
}

.welcome-glow {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(0, 243, 255, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.welcome-content {
  position: relative;
  z-index: 1;
}

.welcome-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.system-tag {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #00f3ff;
  letter-spacing: 3px;
  padding: 4px 12px;
  border: 1px solid rgba(0, 243, 255, 0.3);
  background: rgba(0, 243, 255, 0.05);
}

.status-indicator {
  font-family: 'Courier New', monospace;
  font-size: 10px;
  letter-spacing: 2px;
  padding: 4px 10px;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
}

.status-indicator.online {
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
  border: 1px solid rgba(0, 255, 136, 0.5);
}

.welcome-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px 0;
  letter-spacing: 2px;
}

.highlight-name {
  color: #00f3ff;
  text-shadow: 0 0 20px rgba(0, 243, 255, 0.8);
}

.welcome-subtitle {
  font-size: 14px;
  color: #a0a0b0;
  letter-spacing: 2px;
  margin: 0 0 24px 0;
}

.blink {
  animation: blink 1s step-end infinite;
  color: #00f3ff;
}

@keyframes blink {
  50% { opacity: 0; }
}

.welcome-stats {
  display: flex;
  gap: 32px;
}

.mini-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mini-stat .stat-label {
  font-family: 'Courier New', monospace;
  font-size: 10px;
  color: #505060;
  letter-spacing: 2px;
}

.mini-stat .stat-value {
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  color: #00f3ff;
  letter-spacing: 1px;
}

/* 角标装饰 */
.corner-decoration {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #00f3ff;
}

.corner-decoration.tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
.corner-decoration.tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
.corner-decoration.bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
.corner-decoration.br { bottom: -1px; right: -1px; border-left: none; border-top: none; }

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.cyber-stat-card {
  position: relative;
  background: rgba(18, 18, 26, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.2);
  border-radius: 4px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.cyber-stat-card:hover {
  border-color: rgba(0, 243, 255, 0.5);
  box-shadow: 0 0 30px rgba(0, 243, 255, 0.1);
  transform: translateY(-4px);
}

.card-glitch {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #00f3ff, #ff00ff);
  opacity: 0.5;
}

.stat-icon-wrapper {
  position: relative;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon {
  font-size: 24px;
  color: #00f3ff;
  z-index: 1;
}

.icon-hexagon {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(0, 243, 255, 0.3);
  transform: rotate(45deg);
  transition: all 0.3s ease;
}

.cyber-stat-card:hover .icon-hexagon {
  border-color: #00f3ff;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
  animation: rotateHex 4s linear infinite;
}

@keyframes rotateHex {
  from { transform: rotate(45deg); }
  to { transform: rotate(405deg); }
}

.stat-info {
  flex: 1;
}

.stat-value-large {
  font-family: 'Orbitron', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.stat-label-large {
  font-size: 12px;
  color: #a0a0b0;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.stat-trend {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  letter-spacing: 1px;
}

.stat-trend.up {
  color: #00ff88;
}

.stat-trend.down {
  color: #ff0055;
}

.card-scan {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00f3ff, transparent);
  animation: cardScan 3s linear infinite;
  opacity: 0;
}

.cyber-stat-card:hover .card-scan {
  opacity: 1;
}

@keyframes cardScan {
  0% { transform: translateY(0); }
  100% { transform: translateY(120px); }
}

/* 仪表板网格 */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.cyber-panel {
  background: rgba(18, 18, 26, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.2);
  border-radius: 4px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.cyber-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #00f3ff, transparent);
}

.panel-header {
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

.panel-header h3 {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 2px;
  margin: 0;
}

.header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 243, 255, 0.3), transparent);
}

/* 快速操作 */
.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.cyber-action-btn {
  position: relative;
  padding: 20px;
  background: rgba(0, 243, 255, 0.05);
  border: 1px solid rgba(0, 243, 255, 0.2);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.cyber-action-btn:hover {
  background: rgba(0, 243, 255, 0.1);
  border-color: rgba(0, 243, 255, 0.5);
  transform: translateY(-2px);
}

.btn-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 243, 255, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-action-btn:hover .btn-bg {
  opacity: 1;
}

.action-icon {
  font-size: 24px;
  color: #00f3ff;
  z-index: 1;
}

.action-name {
  font-size: 13px;
  color: #a0a0b0;
  letter-spacing: 1px;
  z-index: 1;
  transition: color 0.3s ease;
}

.cyber-action-btn:hover .action-name {
  color: #fff;
}

.btn-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00f3ff, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-action-btn:hover .btn-glow {
  opacity: 1;
}

/* 系统状态 */
.status-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-icon {
  width: 12px;
  height: 12px;
  position: relative;
}

.status-icon span {
  display: block;
  width: 100%;
  height: 100%;
  transform: rotate(45deg);
}

.status-icon.normal span {
  background: #00ff88;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.8);
}

.status-icon.warning span {
  background: #ffea00;
  box-shadow: 0 0 10px rgba(255, 234, 0, 0.8);
}

.status-info {
  flex: 1;
}

.status-name {
  display: block;
  font-size: 12px;
  color: #a0a0b0;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.status-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.status-fill {
  height: 100%;
  background: linear-gradient(90deg, #00f3ff, #ff00ff);
  transition: width 0.5s ease;
}

.status-percent {
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  color: #00f3ff;
  letter-spacing: 1px;
  min-width: 40px;
  text-align: right;
}

/* 数据流 */
.stream-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.stream-line {
  height: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  overflow: hidden;
}

.stream-bar {
  height: 100%;
  width: 30%;
  background: linear-gradient(90deg, #00f3ff, #ff00ff);
  border-radius: 4px;
  animation: streamFlow 2s ease-in-out infinite;
}

@keyframes streamFlow {
  0%, 100% { width: 20%; opacity: 0.5; }
  50% { width: 80%; opacity: 1; }
}

.stream-stats {
  display: flex;
  justify-content: space-around;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 243, 255, 0.1);
}

.stream-stat {
  text-align: center;
}

.stream-stat .label {
  display: block;
  font-family: 'Courier New', monospace;
  font-size: 10px;
  color: #505060;
  letter-spacing: 2px;
  margin-bottom: 4px;
}

.stream-stat .value {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  color: #00f3ff;
  letter-spacing: 1px;
}

/* 最近活动 */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.activity-time {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #505060;
  letter-spacing: 1px;
  min-width: 50px;
}

.activity-dot {
  width: 8px;
  height: 8px;
  background: #00f3ff;
  border-radius: 50%;
  margin-top: 4px;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.8);
}

.activity-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.activity-text {
  font-size: 13px;
  color: #fff;
  letter-spacing: 0.5px;
}

.activity-type {
  font-family: 'Courier New', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  padding: 2px 8px;
  align-self: flex-start;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
}

.activity-type.security {
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
}

.activity-type.user {
  background: rgba(0, 243, 255, 0.2);
  color: #00f3ff;
}

.activity-type.system {
  background: rgba(255, 234, 0, 0.2);
  color: #ffea00;
}

.activity-type.content {
  background: rgba(255, 0, 255, 0.2);
  color: #ff00ff;
}

/* 响应式 */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .welcome-stats {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
