<template>
  <MainLayout title="股票分析">
    <div class="cyber-stock-analysis" :class="{ 'fullscreen-mode': isFullscreen }">
      <!-- 扫描线效果 -->
      <div class="scan-line"></div>
      
      <!-- 页面内容 -->
      <StockAnalysisContent 
        :stocks="stocks"
        :loading="loading"
        :schedulerRunning="schedulerRunning"
        :nextRunTime="nextRunTime"
        :lastUpdateTime="lastUpdateTime"
        :filters="filters"
        @run-analysis="runAnalysis"
        @start-scheduler="startScheduler"
        @stop-scheduler="stopScheduler"
        @export-data="exportData"
        @apply-filters="applyFilters"
        @reset-filters="resetFilters"
        @view-detail="viewDetail"
      />
    </div>

    <!-- 详情弹窗 -->
    <div v-if="detailDialogVisible" class="cyber-modal-overlay" @click.self="detailDialogVisible = false">
      <div class="cyber-modal">
        <div class="modal-header">
          <div class="header-icon">◈</div>
          <h3>股票详情 // STOCK_DETAIL_VIEW</h3>
          <button class="close-btn" @click="detailDialogVisible = false">◊</button>
        </div>
        
        <div v-if="selectedStock" class="modal-body">
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">股票名称</span>
              <span class="detail-value highlight">{{ selectedStock.name }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">股票代码</span>
              <span class="detail-value">{{ selectedStock.code }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">现价</span>
              <span class="detail-value price">{{ selectedStock.current.toFixed(2) }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">涨幅</span>
              <span class="detail-value percent">{{ selectedStock.percent.toFixed(2) }}%</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">连板数</span>
              <span class="detail-value consecutive">{{ selectedStock.consecutive }}连板</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">历史最高连板</span>
              <span class="detail-value">{{ selectedStock.maxConsecutive }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">成交额</span>
              <span class="detail-value">{{ (selectedStock.amount / 100000000).toFixed(2) }}亿</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">成交量</span>
              <span class="detail-value">{{ (selectedStock.volume / 10000).toFixed(2) }}万手</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">换手率</span>
              <span class="detail-value">{{ selectedStock.turnover.toFixed(2) }}%</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">市值</span>
              <span class="detail-value">{{ (selectedStock.market_cap / 100000000).toFixed(2) }}亿</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">市盈率</span>
              <span class="detail-value">{{ selectedStock.pe.toFixed(2) }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">更新时间</span>
              <span class="detail-value time">{{ new Date(selectedStock.timestamp).toLocaleString('zh-CN') }}</span>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <div class="footer-line"></div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, provide, reactive, inject } from 'vue'
import { ElMessage } from 'element-plus'
import MainLayout from '../components/MainLayout.vue'
import StockAnalysisContent from './StockAnalysisContent.vue'
import { analyzeLimitUpStocks, rankStocks } from '../services/stockScraper.js'
import { stockScheduler } from '../services/stockScheduler.js'

// 注入全屏状态
const isFullscreen = inject('isFullscreen', ref(false))

// 状态管理
const loading = ref(false)
const stocks = ref([])
const schedulerRunning = ref(false)
const nextRunTime = ref('-')
const lastUpdateTime = ref('-')
const detailDialogVisible = ref(false)
const selectedStock = ref(null)

const filters = reactive({
  minConsecutive: 1,
  minAmount: 0,
  maxTurnover: 50
})

// 计算属性
const filteredStocks = computed(() => {
  return stocks.value.filter(stock => {
    return stock.consecutive >= filters.minConsecutive &&
           (stock.amount / 100000000) >= filters.minAmount &&
           stock.turnover <= filters.maxTurnover
  })
})

const statusCards = computed(() => [
  {
    icon: '◉',
    label: '调度器状态',
    value: schedulerRunning.value ? '运行中' : '已停止',
    type: schedulerRunning.value ? 'success' : 'default'
  },
  {
    icon: '◆',
    label: '下次执行',
    value: nextRunTime.value,
    type: 'default'
  },
  {
    icon: '◈',
    label: '最后更新',
    value: lastUpdateTime.value,
    type: 'default'
  },
  {
    icon: '◊',
    label: '涨停股票数',
    value: stocks.value.length.toString(),
    type: 'highlight'
  }
])

// 提供数据给子组件
provide('filteredStocks', filteredStocks)
provide('statusCards', statusCards)
provide('filters', filters)

// 方法
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

const runAnalysis = async () => {
  loading.value = true
  try {
    const data = await analyzeLimitUpStocks()
    stocks.value = rankStocks(data)
    lastUpdateTime.value = new Date().toLocaleString('zh-CN')
    ElMessage.success(`分析完成，找到 ${stocks.value.length} 只涨停股票`)
  } catch (error) {
    ElMessage.error('分析失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

const startScheduler = () => {
  stockScheduler.start()
  schedulerRunning.value = true
  updateSchedulerStatus()
  ElMessage.success('定时任务已启动，将在每个交易日14:40执行')
}

const stopScheduler = () => {
  stockScheduler.stop()
  schedulerRunning.value = false
  nextRunTime.value = '-'
  ElMessage.info('定时任务已停止')
}

const updateSchedulerStatus = () => {
  const status = stockScheduler.getStatus()
  nextRunTime.value = status.nextRunTime
}

const applyFilters = () => {
  ElMessage.success('筛选条件已应用')
}

const resetFilters = () => {
  filters.minConsecutive = 1
  filters.minAmount = 0
  filters.maxTurnover = 50
  ElMessage.info('筛选条件已重置')
}

const viewDetail = (stock) => {
  selectedStock.value = stock
  detailDialogVisible.value = true
}

const exportData = () => {
  if (filteredStocks.value.length === 0) {
    ElMessage.warning('没有数据可导出')
    return
  }

  const headers = ['排名', '股票名称', '股票代码', '涨幅(%)', '现价', '连板数', '历史最高连板', '成交额(亿)', '成交量(万手)', '换手率(%)', '市值(亿)', '市盈率']
  const rows = filteredStocks.value.map((stock, index) => [
    index + 1,
    stock.name,
    stock.code,
    stock.percent.toFixed(2),
    stock.current.toFixed(2),
    stock.consecutive,
    stock.maxConsecutive,
    (stock.amount / 100000000).toFixed(2),
    (stock.volume / 10000).toFixed(2),
    stock.turnover.toFixed(2),
    (stock.market_cap / 100000000).toFixed(2),
    stock.pe.toFixed(2)
  ])

  const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n')
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `涨停股票分析_${new Date().toLocaleDateString('zh-CN')}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  ElMessage.success('数据导出成功')
}

const handleStockAnalysisComplete = (event) => {
  const result = event.detail
  stocks.value = result.stocks
  lastUpdateTime.value = new Date(result.timestamp).toLocaleString('zh-CN')
  ElMessage.success(`定时任务执行完成，找到 ${result.totalStocks} 只涨停股票`)
}

onMounted(() => {
  window.addEventListener('stockAnalysisComplete', handleStockAnalysisComplete)
  updateSchedulerStatus()
})

onUnmounted(() => {
  window.removeEventListener('stockAnalysisComplete', handleStockAnalysisComplete)
  stockScheduler.stop()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');

.cyber-stock-analysis {
  position: relative;
  min-height: 100%;
  padding: 24px;
  background: #0a0a0f;
  font-family: 'Rajdhani', 'Microsoft YaHei', sans-serif;
}

/* 全屏模式样式 */
.fullscreen-mode {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  padding: 40px;
  overflow-y: auto;
}

/* 扫描线效果 */
.scan-line {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00f3ff, transparent);
  box-shadow: 0 0 10px #00f3ff;
  animation: scanMove 4s linear infinite;
  pointer-events: none;
  z-index: 1000;
}

@keyframes scanMove {
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

/* 弹窗样式 */
.cyber-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
}

.cyber-modal {
  background: linear-gradient(135deg, #12121a 0%, #0f0f1a 100%);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  background: rgba(0, 243, 255, 0.1);
  border-bottom: 1px solid rgba(0, 243, 255, 0.2);
}

.modal-header h3 {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin: 0;
  flex: 1;
  letter-spacing: 2px;
}

.header-icon {
  font-size: 18px;
  color: #00f3ff;
}

.close-btn {
  background: transparent;
  border: 1px solid rgba(255, 0, 85, 0.5);
  color: #ff0055;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 0, 85, 0.2);
  box-shadow: 0 0 10px rgba(255, 0, 85, 0.3);
}

.modal-body {
  padding: 24px;
  max-height: 60vh;
  overflow-y: auto;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 243, 255, 0.1);
  border-radius: 4px;
}

.detail-label {
  font-size: 11px;
  color: #606070;
  letter-spacing: 1px;
}

.detail-value {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  color: #fff;
  font-weight: 600;
}

.detail-value.highlight {
  color: #00f3ff;
  font-size: 16px;
}

.detail-value.price {
  color: #00ff88;
}

.detail-value.percent {
  color: #ff0055;
}

.detail-value.consecutive {
  color: #ffea00;
}

.detail-value.time {
  font-size: 12px;
  color: #a0a0b0;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid rgba(0, 243, 255, 0.1);
}

.footer-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.5), transparent);
}

/* 响应式 */
@media (max-width: 768px) {
  .fullscreen-mode {
    padding: 20px;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #0a0a0f;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 243, 255, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 243, 255, 0.5);
}
</style>
