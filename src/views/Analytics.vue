<template>
  <div class="cyber-analytics">
    <MainLayout title="数据分析">
      <div class="cyber-analytics-content">
        <!-- 页面标题 -->
        <div class="page-header">
          <div class="header-icon">◈</div>
          <div class="header-content">
            <h2>DATA_ANALYTICS</h2>
            <span class="header-subtitle">系统数据统计与可视化分析中心</span>
          </div>
          <div class="header-line"></div>
        </div>

        <!-- 时间筛选器 -->
        <div class="time-filter">
          <button
            v-for="period in timePeriods"
            :key="period.value"
            :class="['filter-btn', activePeriod === period.value ? 'active' : '']"
            @click="activePeriod = period.value"
          >
            <span class="btn-glow"></span>
            {{ period.label }}
          </button>
        </div>

        <!-- 核心指标卡片 -->
        <div class="metrics-grid">
          <div class="cyber-metric-card primary">
            <div class="card-glow"></div>
            <div class="metric-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div class="metric-content">
              <div class="metric-value">
                <span class="number" ref="userCount">12,458</span>
                <span class="trend up">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                  +23.5%
                </span>
              </div>
              <div class="metric-label">总用户数</div>
            </div>
            <div class="metric-chart">
              <div class="chart-bar" v-for="i in 7" :key="i" :style="{ height: `${20 + Math.random() * 60}%` }"></div>
            </div>
          </div>

          <div class="cyber-metric-card success">
            <div class="card-glow"></div>
            <div class="metric-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <div class="metric-content">
              <div class="metric-value">
                <span class="number">89.2%</span>
                <span class="trend up">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                  +5.2%
                </span>
              </div>
              <div class="metric-label">系统可用性</div>
            </div>
            <div class="metric-progress">
              <div class="progress-ring">
                <svg viewBox="0 0 36 36">
                  <path class="progress-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <path class="progress-fill" stroke-dasharray="89.2, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="cyber-metric-card warning">
            <div class="card-glow"></div>
            <div class="metric-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div class="metric-content">
              <div class="metric-value">
                <span class="number">3,847</span>
                <span class="trend up">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                  +12.8%
                </span>
              </div>
              <div class="metric-label">内容总量</div>
            </div>
            <div class="metric-chart">
              <div class="chart-bar" v-for="i in 7" :key="i" :style="{ height: `${30 + Math.random() * 50}%` }"></div>
            </div>
          </div>

          <div class="cyber-metric-card danger">
            <div class="card-glow"></div>
            <div class="metric-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div class="metric-content">
              <div class="metric-value">
                <span class="number">23</span>
                <span class="trend down">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
                    <polyline points="17 18 23 18 23 12"/>
                  </svg>
                  -8.3%
                </span>
              </div>
              <div class="metric-label">异常事件</div>
            </div>
            <div class="metric-chart">
              <div class="chart-bar" v-for="i in 7" :key="i" :style="{ height: `${10 + Math.random() * 40}%` }"></div>
            </div>
          </div>
        </div>

        <!-- 图表区域 -->
        <div class="charts-grid">
          <!-- 用户增长趋势 -->
          <div class="cyber-chart-card large">
            <div class="chart-header">
              <div class="header-left">
                <div class="header-icon">◉</div>
                <span class="header-text">用户增长趋势</span>
              </div>
              <div class="header-actions">
                <button class="action-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="chart-container">
              <div class="chart-y-axis">
                <span v-for="i in 5" :key="i">{{ 5000 - (i-1) * 1000 }}</span>
              </div>
              <div class="chart-area">
                <div class="grid-lines">
                  <div class="grid-line" v-for="i in 5" :key="i"></div>
                </div>
                <svg class="line-chart" viewBox="0 0 800 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:#00ffff;stop-opacity:0.3" />
                      <stop offset="100%" style="stop-color:#00ffff;stop-opacity:0" />
                    </linearGradient>
                  </defs>
                  <path class="area-fill" d="M0,150 Q100,120 200,100 T400,80 T600,60 T800,40 L800,200 L0,200 Z" fill="url(#lineGradient)"/>
                  <path class="line-path" d="M0,150 Q100,120 200,100 T400,80 T600,60 T800,40" fill="none" stroke="#00ffff" stroke-width="3"/>
                  <circle class="data-point" cx="0" cy="150" r="6" fill="#00ffff"/>
                  <circle class="data-point" cx="200" cy="100" r="6" fill="#00ffff"/>
                  <circle class="data-point" cx="400" cy="80" r="6" fill="#00ffff"/>
                  <circle class="data-point" cx="600" cy="60" r="6" fill="#00ffff"/>
                  <circle class="data-point" cx="800" cy="40" r="6" fill="#00ffff"/>
                </svg>
                <div class="chart-x-axis">
                  <span v-for="(label, i) in ['1月', '2月', '3月', '4月', '5月', '6月']" :key="i">{{ label }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 内容分布 -->
          <div class="cyber-chart-card">
            <div class="chart-header">
              <div class="header-left">
                <div class="header-icon">◊</div>
                <span class="header-text">内容类型分布</span>
              </div>
            </div>
            <div class="chart-container pie-container">
              <div class="pie-chart">
                <svg viewBox="0 0 100 100">
                  <circle class="pie-bg" cx="50" cy="50" r="40" fill="none" stroke="#1a1a2e" stroke-width="20"/>
                  <circle class="pie-segment" cx="50" cy="50" r="40" fill="none" stroke="#00ffff" stroke-width="20" stroke-dasharray="75.4 175.9" stroke-dashoffset="0" transform="rotate(-90 50 50)"/>
                  <circle class="pie-segment" cx="50" cy="50" r="40" fill="none" stroke="#ff00ff" stroke-width="20" stroke-dasharray="50.3 201" stroke-dashoffset="-75.4" transform="rotate(-90 50 50)"/>
                  <circle class="pie-segment" cx="50" cy="50" r="40" fill="none" stroke="#ffff00" stroke-width="20" stroke-dasharray="37.7 213.6" stroke-dashoffset="-125.7" transform="rotate(-90 50 50)"/>
                  <circle class="pie-segment" cx="50" cy="50" r="40" fill="none" stroke="#00ff80" stroke-width="20" stroke-dasharray="25.1 226.2" stroke-dashoffset="-163.4" transform="rotate(-90 50 50)"/>
                </svg>
                <div class="pie-center">
                  <span class="center-value">3,847</span>
                  <span class="center-label">总计</span>
                </div>
              </div>
              <div class="pie-legend">
                <div class="legend-item">
                  <span class="legend-color" style="background: #00ffff;"></span>
                  <span class="legend-label">文章</span>
                  <span class="legend-value">42%</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color" style="background: #ff00ff;"></span>
                  <span class="legend-label">视频</span>
                  <span class="legend-value">28%</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color" style="background: #ffff00;"></span>
                  <span class="legend-label">图片</span>
                  <span class="legend-value">21%</span>
                </div>
                <div class="legend-item">
                  <span class="legend-color" style="background: #00ff80;"></span>
                  <span class="legend-label">其他</span>
                  <span class="legend-value">9%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 活跃度分析 -->
          <div class="cyber-chart-card">
            <div class="chart-header">
              <div class="header-left">
                <div class="header-icon">◈</div>
                <span class="header-text">用户活跃度</span>
              </div>
            </div>
            <div class="chart-container">
              <div class="bar-chart">
                <div class="bar-item" v-for="(day, i) in ['周一', '周二', '周三', '周四', '周五', '周六', '周日']" :key="i">
                  <div class="bar-wrapper">
                    <div class="bar" :style="{ height: `${40 + Math.random() * 50}%` }">
                      <div class="bar-glow"></div>
                    </div>
                  </div>
                  <span class="bar-label">{{ day }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 实时数据流 -->
          <div class="cyber-chart-card">
            <div class="chart-header">
              <div class="header-left">
                <div class="header-icon">◉</div>
                <span class="header-text">实时数据流</span>
              </div>
              <div class="live-indicator">
                <span class="live-dot"></span>
                LIVE
              </div>
            </div>
            <div class="chart-container data-stream">
              <div class="stream-item" v-for="i in 6" :key="i">
                <div class="stream-time">{{ 10 - i }}:{{ String(Math.floor(Math.random() * 60)).padStart(2, '0') }}</div>
                <div class="stream-type" :class="['login', 'logout', 'action', 'error'][Math.floor(Math.random() * 4)]">
                  {{ ['用户登录', '用户退出', '内容发布', '系统警告'][Math.floor(Math.random() * 4)] }}
                </div>
                <div class="stream-user">user_{{ Math.floor(Math.random() * 1000) }}</div>
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
  name: 'Analytics',
  components: {
    MainLayout
  },
  data() {
    return {
      activePeriod: 'week',
      timePeriods: [
        { label: '今日', value: 'day' },
        { label: '本周', value: 'week' },
        { label: '本月', value: 'month' },
        { label: '本年', value: 'year' }
      ]
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap');

.cyber-analytics {
  min-height: 100%;
  background: linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0d0d12 100%);
  position: relative;
}

.cyber-analytics::before {
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

.cyber-analytics-content {
  padding: 32px;
  position: relative;
  z-index: 1;
}

/* 页面标题 */
.page-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
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

/* 时间筛选器 */
.time-filter {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.filter-btn {
  position: relative;
  padding: 10px 24px;
  background: rgba(0, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  color: #a0a0b0;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.filter-btn:hover {
  border-color: rgba(0, 255, 255, 0.4);
  color: #00ffff;
}

.filter-btn.active {
  background: rgba(0, 255, 255, 0.15);
  border-color: #00ffff;
  color: #00ffff;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
}

.btn-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

.filter-btn:hover .btn-glow {
  width: 100px;
  height: 100px;
}

/* 核心指标卡片 */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.cyber-metric-card {
  background: rgba(20, 20, 30, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.cyber-metric-card::before {
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

.cyber-metric-card.primary::before {
  background: linear-gradient(90deg, #00ffff, #0080ff, #00ffff);
}

.cyber-metric-card.success::before {
  background: linear-gradient(90deg, #00ff80, #00ffff, #00ff80);
}

.cyber-metric-card.warning::before {
  background: linear-gradient(90deg, #ffff00, #ff8000, #ffff00);
}

.cyber-metric-card.danger::before {
  background: linear-gradient(90deg, #ff0040, #ff4080, #ff0040);
}

@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

.cyber-metric-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(0, 255, 255, 0.15);
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

.cyber-metric-card:hover .card-glow {
  opacity: 1;
}

.metric-icon {
  width: 48px;
  height: 48px;
  background: rgba(0, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ffff;
  flex-shrink: 0;
}

.metric-icon svg {
  width: 24px;
  height: 24px;
}

.cyber-metric-card.success .metric-icon {
  background: rgba(0, 255, 128, 0.1);
  border-color: rgba(0, 255, 128, 0.3);
  color: #00ff80;
}

.cyber-metric-card.warning .metric-icon {
  background: rgba(255, 255, 0, 0.1);
  border-color: rgba(255, 255, 0, 0.3);
  color: #ffff00;
}

.cyber-metric-card.danger .metric-icon {
  background: rgba(255, 0, 64, 0.1);
  border-color: rgba(255, 0, 64, 0.3);
  color: #ff0040;
}

.metric-content {
  flex: 1;
}

.metric-value {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
}

.number {
  font-family: 'Orbitron', monospace;
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
}

.trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 20px;
}

.trend svg {
  width: 14px;
  height: 14px;
}

.trend.up {
  color: #00ff80;
  background: rgba(0, 255, 128, 0.15);
}

.trend.down {
  color: #ff0040;
  background: rgba(255, 0, 64, 0.15);
}

.metric-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  color: #808090;
}

.metric-chart {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: 40px;
  width: 60px;
}

.chart-bar {
  flex: 1;
  background: linear-gradient(to top, rgba(0, 255, 255, 0.6), rgba(0, 255, 255, 0.2));
  border-radius: 2px 2px 0 0;
  min-height: 4px;
}

.cyber-metric-card.success .chart-bar {
  background: linear-gradient(to top, rgba(0, 255, 128, 0.6), rgba(0, 255, 128, 0.2));
}

.cyber-metric-card.warning .chart-bar {
  background: linear-gradient(to top, rgba(255, 255, 0, 0.6), rgba(255, 255, 0, 0.2));
}

.cyber-metric-card.danger .chart-bar {
  background: linear-gradient(to top, rgba(255, 0, 64, 0.6), rgba(255, 0, 64, 0.2));
}

.metric-progress {
  width: 60px;
  height: 60px;
}

.progress-ring {
  width: 100%;
  height: 100%;
}

.progress-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-bg {
  fill: none;
  stroke: rgba(0, 255, 128, 0.1);
  stroke-width: 3;
}

.progress-fill {
  fill: none;
  stroke: #00ff80;
  stroke-width: 3;
  stroke-linecap: round;
  filter: drop-shadow(0 0 4px rgba(0, 255, 128, 0.5));
}

/* 图表区域 */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.cyber-chart-card {
  background: rgba(20, 20, 30, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 16px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.cyber-chart-card::before {
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

.cyber-chart-card.large {
  grid-column: span 2;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-left .header-icon {
  width: 36px;
  height: 36px;
  font-size: 18px;
}

.header-text {
  font-family: 'Orbitron', monospace;
  font-size: 14px;
  color: #00ffff;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 32px;
  height: 32px;
  background: rgba(0, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 6px;
  color: #00ffff;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: rgba(0, 255, 255, 0.1);
  border-color: rgba(0, 255, 255, 0.4);
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Orbitron', monospace;
  font-size: 11px;
  color: #00ff80;
  letter-spacing: 1px;
}

.live-dot {
  width: 8px;
  height: 8px;
  background: #00ff80;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

.chart-container {
  height: 220px;
  position: relative;
}

/* 折线图样式 */
.chart-y-axis {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 30px;
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Rajdhani', sans-serif;
  font-size: 11px;
  color: #606070;
  text-align: right;
  padding-right: 8px;
}

.chart-area {
  position: absolute;
  left: 50px;
  right: 0;
  top: 0;
  bottom: 30px;
}

.grid-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-line {
  height: 1px;
  background: rgba(0, 255, 255, 0.1);
}

.line-chart {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.line-path {
  filter: drop-shadow(0 0 4px rgba(0, 255, 255, 0.5));
}

.data-point {
  filter: drop-shadow(0 0 6px rgba(0, 255, 255, 0.8));
  animation: pointPulse 2s ease-in-out infinite;
}

@keyframes pointPulse {
  0%, 100% { r: 4; }
  50% { r: 6; }
}

.chart-x-axis {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  font-family: 'Rajdhani', sans-serif;
  font-size: 11px;
  color: #606070;
}

/* 饼图样式 */
.pie-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.pie-chart {
  position: relative;
  width: 140px;
  height: 140px;
  flex-shrink: 0;
}

.pie-chart svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.pie-segment {
  filter: drop-shadow(0 0 4px currentColor);
}

.pie-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.center-value {
  display: block;
  font-family: 'Orbitron', monospace;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
}

.center-label {
  display: block;
  font-family: 'Rajdhani', sans-serif;
  font-size: 11px;
  color: #808090;
}

.pie-legend {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.legend-label {
  flex: 1;
  color: #a0a0b0;
}

.legend-value {
  color: #ffffff;
  font-weight: 600;
}

/* 柱状图样式 */
.bar-chart {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
  padding-bottom: 30px;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.bar-wrapper {
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bar {
  width: 24px;
  background: linear-gradient(to top, rgba(0, 255, 255, 0.8), rgba(0, 255, 255, 0.3));
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: all 0.3s ease;
}

.bar-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to bottom, rgba(0, 255, 255, 0.5), transparent);
  border-radius: 4px 4px 0 0;
}

.bar:hover {
  background: linear-gradient(to top, rgba(0, 255, 255, 1), rgba(0, 255, 255, 0.5));
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4);
}

.bar-label {
  font-family: 'Rajdhani', sans-serif;
  font-size: 12px;
  color: #808090;
}

/* 数据流样式 */
.data-stream {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stream-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: rgba(0, 255, 255, 0.03);
  border-radius: 8px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  transition: all 0.3s ease;
}

.stream-item:hover {
  background: rgba(0, 255, 255, 0.08);
}

.stream-time {
  color: #606070;
  font-size: 11px;
  min-width: 40px;
}

.stream-type {
  flex: 1;
  color: #a0a0b0;
}

.stream-type.login {
  color: #00ff80;
}

.stream-type.logout {
  color: #ff8000;
}

.stream-type.action {
  color: #00ffff;
}

.stream-type.error {
  color: #ff0040;
}

.stream-user {
  color: #606070;
  font-size: 11px;
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .charts-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cyber-chart-card.large {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .cyber-chart-card.large {
    grid-column: span 1;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
