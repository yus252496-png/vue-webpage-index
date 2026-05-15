import { analyzeLimitUpStocks, rankStocks } from './stockScraper.js'

class StockScheduler {
  constructor() {
    this.intervalId = null
    this.isRunning = false
  }

  isTradingDay() {
    const now = new Date()
    const day = now.getDay()
    
    if (day === 0 || day === 6) {
      return false
    }
    
    return true
  }

  getNextRunTime() {
    const now = new Date()
    const targetTime = new Date(now)
    targetTime.setHours(14, 40, 0, 0)
    
    if (now >= targetTime) {
      targetTime.setDate(targetTime.getDate() + 1)
    }
    
    while (!this.isTradingDayForDate(targetTime)) {
      targetTime.setDate(targetTime.getDate() + 1)
    }
    
    return targetTime
  }

  isTradingDayForDate(date) {
    const day = date.getDay()
    return day !== 0 && day !== 6
  }

  calculateDelay(targetTime) {
    const now = new Date()
    return targetTime.getTime() - now.getTime()
  }

  async executeTask() {
    if (!this.isTradingDay()) {
      console.log('今天不是交易日，跳过执行')
      this.scheduleNextRun()
      return
    }

    console.log('开始执行涨停股票分析任务...')
    const startTime = Date.now()

    try {
      const stocks = await analyzeLimitUpStocks()
      const rankedStocks = rankStocks(stocks)
      
      const endTime = Date.now()
      const executionTime = ((endTime - startTime) / 1000).toFixed(2)
      
      console.log(`任务执行完成，耗时 ${executionTime} 秒`)
      console.log(`找到 ${rankedStocks.length} 只涨停股票`)
      
      const result = {
        timestamp: new Date().toISOString(),
        executionTime: executionTime,
        totalStocks: rankedStocks.length,
        stocks: rankedStocks.slice(0, 20)
      }
      
      this.saveResult(result)
      
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('stockAnalysisComplete', { 
          detail: result 
        }))
      }
      
    } catch (error) {
      console.error('任务执行失败:', error)
    }

    this.scheduleNextRun()
  }

  saveResult(result) {
    try {
      const results = this.getHistoricalResults()
      results.push(result)
      
      if (results.length > 30) {
        results.shift()
      }
      
      localStorage.setItem('stockAnalysisResults', JSON.stringify(results))
      console.log('结果已保存到本地存储')
    } catch (error) {
      console.error('保存结果失败:', error)
    }
  }

  getHistoricalResults() {
    try {
      const stored = localStorage.getItem('stockAnalysisResults')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('读取历史结果失败:', error)
      return []
    }
  }

  getLatestResult() {
    const results = this.getHistoricalResults()
    return results.length > 0 ? results[results.length - 1] : null
  }

  scheduleNextRun() {
    if (this.intervalId) {
      clearTimeout(this.intervalId)
    }

    const nextRunTime = this.getNextRunTime()
    const delay = this.calculateDelay(nextRunTime)
    
    console.log(`下次执行时间: ${nextRunTime.toLocaleString('zh-CN')}`)
    console.log(`等待时间: ${(delay / 1000 / 60 / 60).toFixed(2)} 小时`)

    this.intervalId = setTimeout(() => {
      this.executeTask()
    }, delay)
  }

  start() {
    if (this.isRunning) {
      console.log('调度器已经在运行中')
      return
    }

    this.isRunning = true
    console.log('启动股票涨停分析调度器...')
    
    const now = new Date()
    const targetTime = new Date(now)
    targetTime.setHours(14, 40, 0, 0)
    
    if (now >= targetTime && this.isTradingDay()) {
      console.log('当前时间已过14:40，立即执行一次任务')
      this.executeTask()
    } else {
      this.scheduleNextRun()
    }
  }

  stop() {
    if (this.intervalId) {
      clearTimeout(this.intervalId)
      this.intervalId = null
    }
    
    this.isRunning = false
    console.log('调度器已停止')
  }

  getStatus() {
    const nextRunTime = this.getNextRunTime()
    return {
      isRunning: this.isRunning,
      nextRunTime: nextRunTime.toLocaleString('zh-CN'),
      isTradingDay: this.isTradingDay(),
      latestResult: this.getLatestResult()
    }
  }

  async runOnce() {
    console.log('手动执行涨停股票分析任务...')
    await this.executeTask()
  }
}

export const stockScheduler = new StockScheduler()
export default StockScheduler
