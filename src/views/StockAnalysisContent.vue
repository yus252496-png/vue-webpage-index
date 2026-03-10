<template>
  <div class="stock-content">
    <!-- 头部区域 -->
    <div class="cyber-header-section">
      <div class="header-glow"></div>
      <div class="header-content">
        <div class="header-top">
          <span class="system-tag">MARKET_INTELLIGENCE</span>
          <span class="status-indicator" :class="schedulerRunning ? 'online' : 'offline'">
            {{ schedulerRunning ? 'AUTO_TRADING_ACTIVE' : 'MANUAL_MODE' }}
          </span>
        </div>
        <h2 class="cyber-title">
          <span class="title-icon">◊</span>
          涨停股票分析系统
          <span class="title-icon">◊</span>
        </h2>
        <p class="cyber-subtitle">
          <span class="blink">[</span> 实时数据监控 // 智能排序算法 // 预测分析引擎 <span class="blink">]</span>
        </p>
        
        <!-- 操作按钮 -->
        <div class="cyber-actions">
          <button class="cyber-btn cyber-btn-primary" @click="$emit('run-analysis')" :disabled="loading">
            <span class="btn-icon">◉</span>
            <span class="btn-text">{{ loading ? 'ANALYZING...' : '立即分析' }}</span>
            <div class="btn-glitch" v-if="loading"></div>
          </button>
          
          <button class="cyber-btn cyber-btn-success" @click="$emit('start-scheduler')" :disabled="schedulerRunning">
            <span class="btn-icon">▶</span>
            <span class="btn-text">启动定时</span>
          </button>
          
          <button class="cyber-btn cyber-btn-warning" @click="$emit('stop-scheduler')" :disabled="!schedulerRunning">
            <span class="btn-icon">◊</span>
            <span class="btn-text">停止定时</span>
          </button>
          
          <button class="cyber-btn cyber-btn-info" @click="$emit('export-data')">
            <span class="btn-icon">▼</span>
            <span class="btn-text">导出数据</span>
          </button>
        </div>
      </div>
      <div class="corner-decoration tl"></div>
      <div class="corner-decoration tr"></div>
      <div class="corner-decoration bl"></div>
      <div class="corner-decoration br"></div>
    </div>

    <!-- 状态栏 -->
    <div class="cyber-status-grid">
      <div class="cyber-status-card" v-for="(status, index) in statusCards" :key="index">
        <div class="status-glow"></div>
        <div class="status-icon-wrapper">
          <span class="status-icon">{{ status.icon }}</span>
          <div class="icon-ring"></div>
        </div>
        <div class="status-info">
          <div class="status-label">{{ status.label }}</div>
          <div class="status-value" :class="status.type">{{ status.value }}</div>
        </div>
        <div class="card-scan"></div>
      </div>
    </div>

    <!-- 筛选控制面板 -->
    <div class="cyber-panel filter-panel">
      <div class="panel-header">
        <div class="header-icon">◆</div>
        <h3>数据筛选 // FILTER_MODULE</h3>
        <div class="header-line"></div>
      </div>
      
      <div class="filter-grid">
        <div class="cyber-filter-item">
          <label class="filter-label">
            <span class="label-icon">◊</span>
            最小连板数
          </label>
          <div class="cyber-input-wrapper">
            <input 
              type="number" 
              v-model="filters.minConsecutive" 
              class="cyber-input"
              min="1" 
              max="10"
            />
            <div class="input-glow"></div>
          </div>
        </div>
        
        <div class="cyber-filter-item">
          <label class="filter-label">
            <span class="label-icon">◊</span>
            最小成交额(亿)
          </label>
          <div class="cyber-input-wrapper">
            <input 
              type="number" 
              v-model="filters.minAmount" 
              class="cyber-input"
              min="0" 
              max="100"
              step="0.1"
            />
            <div class="input-glow"></div>
          </div>
        </div>
        
        <div class="cyber-filter-item">
          <label class="filter-label">
            <span class="label-icon">◊</span>
            最大换手率(%)
          </label>
          <div class="cyber-input-wrapper">
            <input 
              type="number" 
              v-model="filters.maxTurnover" 
              class="cyber-input"
              min="0" 
              max="50"
            />
            <div class="input-glow"></div>
          </div>
        </div>
        
        <div class="cyber-filter-actions">
          <button class="cyber-btn cyber-btn-small cyber-btn-primary" @click="$emit('apply-filters')">
            <span class="btn-icon">◉</span>
            应用
          </button>
          <button class="cyber-btn cyber-btn-small" @click="$emit('reset-filters')">
            <span class="btn-icon">◊</span>
            重置
          </button>
        </div>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="cyber-panel data-panel">
      <div class="panel-header">
        <div class="header-icon">◈</div>
        <h3>涨停股票数据 // STOCK_DATA_MATRIX</h3>
        <div class="header-line"></div>
        <div class="record-count">
          <span class="count-label">RECORDS:</span>
          <span class="count-value">{{ filteredStocks.length }}</span>
        </div>
      </div>
      
      <div class="table-container" v-loading="loading">
        <table class="cyber-table">
          <thead>
            <tr>
              <th><span class="th-icon">#</span>排名</th>
              <th><span class="th-icon">◊</span>股票名称</th>
              <th><span class="th-icon">◊</span>代码</th>
              <th><span class="th-icon">▲</span>涨幅</th>
              <th><span class="th-icon">◊</span>现价</th>
              <th><span class="th-icon">◆</span>连板</th>
              <th><span class="th-icon">◆</span>历史最高</th>
              <th><span class="th-icon">◉</span>成交额</th>
              <th><span class="th-icon">◉</span>成交量</th>
              <th><span class="th-icon">◊</span>换手率</th>
              <th><span class="th-icon">◈</span>市值</th>
              <th><span class="th-icon">◈</span>市盈率</th>
              <th><span class="th-icon">◉</span>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(stock, index) in filteredStocks" 
              :key="stock.code"
              :class="{ 'high-priority': index < 5, 'medium-priority': index >= 5 && index < 10 }"
            >
              <td class="rank-cell">
                <span class="rank-number" :class="getRankClass(index)">{{ index + 1 }}</span>
              </td>
              <td class="name-cell">
                <a :href="`https://xueqiu.com/S/${stock.symbol}`" target="_blank" class="stock-link">
                  {{ stock.name }}
                </a>
              </td>
              <td class="code-cell">{{ stock.code }}</td>
              <td class="percent-cell">
                <span class="percent-value">{{ stock.percent.toFixed(2) }}%</span>
              </td>
              <td class="price-cell">{{ stock.current.toFixed(2) }}</td>
              <td class="consecutive-cell">
                <span class="consecutive-badge" :class="getConsecutiveClass(stock.consecutive)">
                  {{ stock.consecutive }}连板
                </span>
              </td>
              <td class="max-consecutive-cell">{{ stock.maxConsecutive }}</td>
              <td class="amount-cell">{{ (stock.amount / 100000000).toFixed(2) }}亿</td>
              <td class="volume-cell">{{ (stock.volume / 10000).toFixed(2) }}万</td>
              <td class="turnover-cell">{{ stock.turnover.toFixed(2) }}%</td>
              <td class="market-cap-cell">{{ (stock.market_cap / 100000000).toFixed(2) }}亿</td>
              <td class="pe-cell">{{ stock.pe.toFixed(2) }}</td>
              <td class="action-cell">
                <button class="cyber-btn-tiny" @click="$emit('view-detail', stock)">
                  <span>详情</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="filteredStocks.length === 0 && !loading" class="empty-state">
          <div class="empty-icon">◊</div>
          <p>暂无数据 // NO_DATA_FOUND</p>
          <span class="empty-hint">点击"立即分析"获取涨停股票数据</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

defineProps({
  loading: Boolean,
  schedulerRunning: Boolean,
  nextRunTime: String,
  lastUpdateTime: String
})

defineEmits([
  'run-analysis',
  'start-scheduler',
  'stop-scheduler',
  'export-data',
  'apply-filters',
  'reset-filters',
  'view-detail'
])

const filteredStocks = inject('filteredStocks')
const statusCards = inject('statusCards')
const filters = inject('filters')

const getRankClass = (index) => {
  if (index === 0) return 'rank-gold'
  if (index === 1) return 'rank-silver'
  if (index === 2) return 'rank-bronze'
  return ''
}

const getConsecutiveClass = (consecutive) => {
  if (consecutive >= 5) return 'consecutive-danger'
  if (consecutive >= 3) return 'consecutive-warning'
  if (consecutive >= 2) return 'consecutive-success'
  return 'consecutive-default'
}
</script>

<style scoped>
.stock-content {
  padding: 24px;
  background: #0a0a0f;
  min-height: 100%;
  font-family: 'Rajdhani', 'Microsoft YaHei', sans-serif;
}

/* 头部区域 */
.cyber-header-section {
  position: relative;
  background: linear-gradient(135deg, rgba(0, 243, 255, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(255, 0, 85, 0.1) 100%);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  overflow: hidden;
}

.header-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: radial-gradient(circle, rgba(0, 243, 255, 0.1) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.header-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.system-tag {
  font-family: 'Orbitron', sans-serif;
  font-size: 10px;
  color: #00f3ff;
  letter-spacing: 3px;
  background: rgba(0, 243, 255, 0.1);
  padding: 4px 12px;
  border: 1px solid rgba(0, 243, 255, 0.3);
}

.status-indicator {
  font-family: 'Orbitron', sans-serif;
  font-size: 10px;
  letter-spacing: 2px;
  padding: 4px 12px;
  border-radius: 4px;
}

.status-indicator.online {
  color: #00ff88;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  animation: blink 2s infinite;
}

.status-indicator.offline {
  color: #ff0055;
  background: rgba(255, 0, 85, 0.1);
  border: 1px solid rgba(255, 0, 85, 0.3);
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.5; }
}

.cyber-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px;
  letter-spacing: 4px;
  text-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
}

.title-icon {
  color: #00f3ff;
  margin: 0 12px;
}

.cyber-subtitle {
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  color: #a0a0b0;
  margin: 0 0 24px;
  letter-spacing: 2px;
}

.blink {
  animation: blinkText 1.5s infinite;
}

@keyframes blinkText {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

/* 角落装饰 */
.corner-decoration {
  position: absolute;
  width: 30px;
  height: 30px;
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

/* 操作按钮 */
.cyber-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.cyber-btn {
  position: relative;
  background: transparent;
  border: 1px solid rgba(0, 243, 255, 0.5);
  color: #00f3ff;
  padding: 12px 24px;
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  overflow: hidden;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
}

.cyber-btn:hover:not(:disabled) {
  background: rgba(0, 243, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.4);
  transform: translateY(-2px);
}

.cyber-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cyber-btn-primary {
  border-color: #00f3ff;
  background: rgba(0, 243, 255, 0.1);
}

.cyber-btn-success {
  border-color: #00ff88;
  color: #00ff88;
  background: rgba(0, 255, 136, 0.1);
}

.cyber-btn-success:hover:not(:disabled) {
  background: rgba(0, 255, 136, 0.2);
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
}

.cyber-btn-warning {
  border-color: #ffea00;
  color: #ffea00;
  background: rgba(255, 234, 0, 0.1);
}

.cyber-btn-warning:hover:not(:disabled) {
  background: rgba(255, 234, 0, 0.2);
  box-shadow: 0 0 20px rgba(255, 234, 0, 0.4);
}

.cyber-btn-info {
  border-color: #bd00ff;
  color: #bd00ff;
  background: rgba(189, 0, 255, 0.1);
}

.cyber-btn-info:hover:not(:disabled) {
  background: rgba(189, 0, 255, 0.2);
  box-shadow: 0 0 20px rgba(189, 0, 255, 0.4);
}

.cyber-btn-small {
  padding: 8px 16px;
  font-size: 10px;
}

.btn-icon {
  font-size: 14px;
}

.btn-text {
  position: relative;
  z-index: 1;
}

.btn-glitch {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: glitch 0.5s infinite;
}

@keyframes glitch {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 状态栏 */
.cyber-status-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.cyber-status-card {
  position: relative;
  background: linear-gradient(135deg, rgba(18, 18, 26, 0.9) 0%, rgba(15, 15, 26, 0.9) 100%);
  border: 1px solid rgba(0, 243, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  overflow: hidden;
}

.status-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00f3ff, transparent);
  opacity: 0.5;
}

.status-icon-wrapper {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-icon {
  font-size: 24px;
  color: #00f3ff;
  z-index: 1;
}

.icon-ring {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(0, 243, 255, 0.3);
  border-radius: 50%;
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.status-info {
  flex: 1;
}

.status-label {
  font-size: 11px;
  color: #606070;
  letter-spacing: 1px;
  margin-bottom: 4px;
}

.status-value {
  font-family: 'Orbitron', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}

.status-value.success {
  color: #00ff88;
}

.status-value.highlight {
  color: #ffea00;
}

.card-scan {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.5), transparent);
  animation: scan 3s linear infinite;
}

@keyframes scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* 面板样式 */
.cyber-panel {
  background: linear-gradient(135deg, rgba(18, 18, 26, 0.9) 0%, rgba(15, 15, 26, 0.9) 100%);
  border: 1px solid rgba(0, 243, 255, 0.2);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(0, 243, 255, 0.05);
  border-bottom: 1px solid rgba(0, 243, 255, 0.2);
}

.panel-header .header-icon {
  font-size: 18px;
  color: #00f3ff;
}

.panel-header h3 {
  font-family: 'Orbitron', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  margin: 0;
  letter-spacing: 2px;
}

.header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 243, 255, 0.3), transparent);
}

.record-count {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Orbitron', sans-serif;
}

.count-label {
  font-size: 10px;
  color: #606070;
  letter-spacing: 1px;
}

.count-value {
  font-size: 14px;
  color: #00f3ff;
  font-weight: 700;
}

/* 筛选面板 */
.filter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  align-items: end;
}

.cyber-filter-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #a0a0b0;
  letter-spacing: 1px;
}

.label-icon {
  color: #00f3ff;
  font-size: 10px;
}

.cyber-input-wrapper {
  position: relative;
}

.cyber-input {
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 243, 255, 0.3);
  color: #fff;
  padding: 10px 12px;
  font-family: 'Orbitron', sans-serif;
  font-size: 13px;
  outline: none;
  transition: all 0.3s ease;
}

.cyber-input:focus {
  border-color: #00f3ff;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.3);
}

.input-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00f3ff, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-input:focus + .input-glow {
  opacity: 1;
}

.cyber-filter-actions {
  display: flex;
  gap: 8px;
}

/* 数据表格 */
.table-container {
  padding: 20px;
  overflow-x: auto;
}

.cyber-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.cyber-table th {
  background: rgba(0, 243, 255, 0.1);
  color: #00f3ff;
  font-family: 'Orbitron', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 14px 12px;
  text-align: left;
  border-bottom: 2px solid rgba(0, 243, 255, 0.3);
  white-space: nowrap;
}

.cyber-table th .th-icon {
  margin-right: 4px;
  opacity: 0.7;
}

.cyber-table td {
  padding: 12px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.1);
  color: #c0c0d0;
  white-space: nowrap;
}

.cyber-table tbody tr {
  transition: all 0.3s ease;
}

.cyber-table tbody tr:hover {
  background: rgba(0, 243, 255, 0.05);
}

.cyber-table tbody tr.high-priority {
  background: rgba(255, 0, 85, 0.05);
}

.cyber-table tbody tr.medium-priority {
  background: rgba(255, 234, 0, 0.03);
}

.rank-cell {
  text-align: center;
}

.rank-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  font-size: 12px;
  border-radius: 4px;
}

.rank-gold {
  background: linear-gradient(135deg, #ffd700, #ffaa00);
  color: #000;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.rank-silver {
  background: linear-gradient(135deg, #c0c0c0, #a0a0a0);
  color: #000;
  box-shadow: 0 0 10px rgba(192, 192, 192, 0.5);
}

.rank-bronze {
  background: linear-gradient(135deg, #cd7f32, #b87333);
  color: #fff;
  box-shadow: 0 0 10px rgba(205, 127, 50, 0.5);
}

.stock-link {
  color: #00f3ff;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.stock-link:hover {
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
}

.percent-value {
  color: #ff0055;
  font-weight: 700;
}

.consecutive-badge {
  display: inline-block;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
  font-family: 'Orbitron', sans-serif;
}

.consecutive-danger {
  background: rgba(255, 0, 85, 0.2);
  color: #ff0055;
  border: 1px solid rgba(255, 0, 85, 0.5);
  box-shadow: 0 0 10px rgba(255, 0, 85, 0.3);
}

.consecutive-warning {
  background: rgba(255, 234, 0, 0.2);
  color: #ffea00;
  border: 1px solid rgba(255, 234, 0, 0.5);
}

.consecutive-success {
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
  border: 1px solid rgba(0, 255, 136, 0.5);
}

.consecutive-default {
  background: rgba(0, 243, 255, 0.2);
  color: #00f3ff;
  border: 1px solid rgba(0, 243, 255, 0.5);
}

.cyber-btn-tiny {
  background: transparent;
  border: 1px solid rgba(0, 243, 255, 0.5);
  color: #00f3ff;
  padding: 6px 12px;
  font-family: 'Orbitron', sans-serif;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cyber-btn-tiny:hover {
  background: rgba(0, 243, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.3);
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #606070;
}

.empty-icon {
  font-size: 48px;
  color: #00f3ff;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.empty-hint {
  font-size: 12px;
  color: #505060;
}

/* 响应式 */
@media (max-width: 1200px) {
  .cyber-status-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .filter-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stock-content {
    padding: 16px;
  }
  
  .cyber-title {
    font-size: 20px;
  }
  
  .cyber-actions {
    flex-direction: column;
  }
  
  .cyber-btn {
    width: 100%;
    justify-content: center;
  }
  
  .cyber-status-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-grid {
    grid-template-columns: 1fr;
  }
  
  .cyber-table {
    font-size: 11px;
  }
  
  .cyber-table th,
  .cyber-table td {
    padding: 10px 8px;
  }
}
</style>
