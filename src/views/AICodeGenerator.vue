<template>
  <MainLayout title="AI 代码生成器">
    <div class="cyber-ai-generator">
      <!-- 扫描线效果 -->
      <div class="scan-line"></div>
      
      <!-- 头部区域 -->
      <div class="cyber-header-section">
        <div class="header-glow"></div>
        <div class="header-content">
          <div class="header-top">
            <span class="system-tag">AI_DEVELOPMENT</span>
            <span class="status-indicator online">SYSTEM_READY</span>
          </div>
          <h2 class="cyber-title">
            <span class="title-icon">◊</span>
            AI 前端代码生成器
            <span class="title-icon">◊</span>
          </h2>
          <p class="cyber-subtitle">
            <span class="blink">[</span> DeepSeek API // 智能代码生成 // 实时预览 <span class="blink">]</span>
          </p>
        </div>
        <div class="corner-decoration tl"></div>
        <div class="corner-decoration tr"></div>
        <div class="corner-decoration bl"></div>
        <div class="corner-decoration br"></div>
      </div>
      
      <!-- 顶部操作栏 -->
      <div class="cyber-actions-bar">
        <div class="actions-left">
          <button class="cyber-btn cyber-btn-primary" @click="generateCode" :disabled="loading || !prompt.trim()">
            <span class="btn-icon">◉</span>
            <span class="btn-text">{{ loading ? 'GENERATING...' : '生成代码' }}</span>
            <div class="btn-glitch" v-if="loading"></div>
          </button>
        </div>
        <div class="actions-right">
          <button class="cyber-btn cyber-btn-small cyber-btn-success" @click="copyCode" :disabled="!generatedCode">
            <span class="btn-icon">◉</span>
            复制
          </button>
          <button class="cyber-btn cyber-btn-small cyber-btn-info" @click="downloadCode" :disabled="!generatedCode">
            <span class="btn-icon">▼</span>
            下载
          </button>
          <button class="cyber-btn cyber-btn-small" @click="previewCode" :disabled="!generatedCode">
            <span class="btn-icon">◊</span>
            预览
          </button>
          <button class="cyber-btn cyber-btn-small cyber-btn-warning" @click="toggleHistory">
            <span class="btn-icon">◈</span>
            {{ showHistory ? '关闭历史记录' : '查看历史记录' }}
          </button>
        </div>
      </div>
      
      <!-- 主内容区 -->
      <div class="ai-main-content">
        <!-- 左侧输入区域 -->
        <div class="cyber-panel input-panel">
          <div class="panel-header">
            <div class="header-icon">◈</div>
            <h3>输入需求 // INPUT_REQUIREMENTS</h3>
            <div class="header-line"></div>
          </div>
          
          <div class="input-content">
            <div class="input-wrapper">
              <textarea 
                v-model="prompt" 
                class="cyber-textarea"
                placeholder="请输入您的前端需求，例如：'做一个登录页面，带 Tailwind'"
                rows="8"
              ></textarea>
              <div class="textarea-glow"></div>
            </div>
          </div>
        </div>
        
        <!-- 右侧结果区域 -->
        <div class="cyber-panel result-panel">
          <div class="panel-header">
            <div class="header-icon">◈</div>
            <h3>生成结果 // GENERATION_RESULTS</h3>
            <div class="header-line"></div>
            <div class="record-count">
              <span class="count-label">STATUS:</span>
              <span class="count-value">{{ loading ? 'GENERATING...' : 'READY' }}</span>
            </div>
          </div>
          
          <div class="result-content">
            <div v-if="generatedCode" class="code-container">
              <TypewriterEffect :content="generatedCode" :loading="loading" />
            </div>
            <div v-else class="empty-state">
              <div class="empty-icon">◉</div>
              <p class="empty-text">输入需求并点击生成按钮开始</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 右侧历史记录面板 -->
      <div class="history-panel-overlay" v-if="showHistory" @click="toggleHistory"></div>
      <div class="history-panel" :class="{ 'show': showHistory }">
        <div class="history-panel-header">
          <div class="header-icon">◈</div>
          <h3>历史记录 // HISTORY</h3>
          <button class="close-btn" @click="toggleHistory">◊</button>
        </div>
        
        <div class="history-content">
          <div class="history-actions-top">
            <button class="cyber-btn cyber-btn-small cyber-btn-warning" @click="clearHistory" :disabled="history.length === 0">
              <span class="btn-icon">◊</span>
              清空
            </button>
          </div>
          
          <div v-if="history.length > 0" class="history-list">
            <div 
              v-for="item in history" 
              :key="item.id"
              class="history-item"
              @click="restoreFromHistory(item)"
            >
              <div class="history-item-header">
                <span class="history-time">{{ formatTime(item.timestamp) }}</span>
                <div class="history-actions">
                  <button class="history-btn" @click.stop="previewCodeFromHistory(item)">
                    <span class="btn-icon">◊</span>
                  </button>
                  <button class="history-btn delete-btn" @click.stop="deleteHistoryItem(item.id)">
                    <span class="btn-icon">✕</span>
                  </button>
                </div>
              </div>
              <div class="history-prompt">{{ item.prompt }}</div>
              <div class="history-code-preview">{{ item.code.substring(0, 100) }}...</div>
            </div>
          </div>
          <div v-else class="empty-history">
            <div class="empty-icon">◉</div>
            <p class="empty-text">暂无历史记录</p>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, inject } from 'vue'
import { streamApiRequest } from '../services/streamApi.js'
import TypewriterEffect from '../components/TypewriterEffect.vue'
import MainLayout from '../components/MainLayout.vue'

const isFullscreen = inject('isFullscreen', ref(false))

const prompt = ref('')
const generatedCode = ref('')
const loading = ref(false)
const history = ref([])
const previewCodeContent = ref('')
const showHistory = ref(false)

const toggleHistory = () => {
  showHistory.value = !showHistory.value
}

const generateCode = async () => {
  if (!prompt.value.trim()) return
  
  loading.value = true
  generatedCode.value = '' // 清空之前的代码
  
  try {
    console.log('开始生成代码...')
    
    await streamApiRequest(
      prompt.value,
      (chunk) => {
        // 处理流式数据块
        generatedCode.value += chunk
      },
      () => {
        // 生成完成
        console.log('代码生成完成')
        // 保存到历史记录
        saveToHistory()
      },
      (error) => {
        // 处理错误
        console.error('生成代码失败:', error)
        alert(`生成代码失败: ${error.message}\n请检查 API Key 是否正确`)
      }
    )
  } catch (error) {
    console.error('生成代码失败:', error)
    alert(`生成代码失败: ${error.message}\n请检查 API Key 是否正确`)
  } finally {
    loading.value = false
  }
}

const saveToHistory = () => {
  const historyItem = {
    id: Date.now(),
    prompt: prompt.value,
    code: generatedCode.value,
    timestamp: new Date().toISOString()
  }
  
  history.value.unshift(historyItem)
  
  // 限制历史记录数量，避免存储过大
  if (history.value.length > 20) {
    history.value = history.value.slice(0, 20)
  }
  
  // 保存到 localStorage
  try {
    localStorage.setItem('aiCodeGeneratorHistory', JSON.stringify(history.value))
  } catch (error) {
    console.error('保存历史记录失败:', error)
  }
}

const loadHistory = () => {
  try {
    const savedHistory = localStorage.getItem('aiCodeGeneratorHistory')
    if (savedHistory) {
      history.value = JSON.parse(savedHistory)
    }
  } catch (error) {
    console.error('加载历史记录失败:', error)
    history.value = []
  }
}

const restoreFromHistory = (item) => {
  prompt.value = item.prompt
  generatedCode.value = item.code
}

const clearHistory = () => {
  if (confirm('确定要清空历史记录吗？')) {
    history.value = []
    localStorage.removeItem('aiCodeGeneratorHistory')
  }
}

const deleteHistoryItem = (id) => {
  if (confirm('确定要删除这条历史记录吗？')) {
    history.value = history.value.filter(item => item.id !== id)
    localStorage.setItem('aiCodeGeneratorHistory', JSON.stringify(history.value))
  }
}

const previewCode = () => {
  if (!generatedCode.value) return
  previewCodeContent.value = generatedCode.value
  openFullscreenPreview()
}

const previewCodeFromHistory = (item) => {
  previewCodeContent.value = item.code
  openFullscreenPreview()
}

const openFullscreenPreview = () => {
  // 创建预览窗口
  const previewWindow = window.open('', '_blank', 'fullscreen=yes')
  if (!previewWindow) {
    alert('请允许弹出窗口权限')
    return
  }
  
  // 写入内容
  previewWindow.document.write(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AI 生成代码预览</title>
      <style>
        body {
          margin: 0;
          padding: 20px;
          font-family: Arial, sans-serif;
          background: white;
        }
        .preview-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
        .title {
          font-size: 18px;
          font-weight: bold;
        }
        .close-btn {
          background: #ff4d4f;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }
        .close-btn:hover {
          background: #ff7875;
        }
        .content {
          min-height: 80vh;
        }
      </style>
    </head>
    <body>
      <div class="preview-container">
        <div class="header">
          <div class="title">AI 生成代码预览</div>
          <button class="close-btn" onclick="window.close()">关闭</button>
        </div>
        <div class="content">
          ${previewCodeContent.value}
        </div>
      </div>
    </body>
    </html>
  `)
  previewWindow.document.close()
  
  // 尝试进入全屏模式
  if (previewWindow.document.documentElement.requestFullscreen) {
    previewWindow.document.documentElement.requestFullscreen()
  } else if (previewWindow.document.documentElement.mozRequestFullScreen) {
    previewWindow.document.documentElement.mozRequestFullScreen()
  } else if (previewWindow.document.documentElement.webkitRequestFullscreen) {
    previewWindow.document.documentElement.webkitRequestFullscreen()
  } else if (previewWindow.document.documentElement.msRequestFullscreen) {
    previewWindow.document.documentElement.msRequestFullscreen()
  }
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 组件挂载时加载历史记录
loadHistory()

const copyCode = () => {
  if (!generatedCode.value) return
  navigator.clipboard.writeText(generatedCode.value)
  alert('代码已复制到剪贴板')
}

const downloadCode = () => {
  if (!generatedCode.value) return
  const blob = new Blob([generatedCode.value], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'ai-generated-code.html'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.cyber-ai-generator {
  min-height: 80vh;
  position: relative;
  padding: 24px;
}

.ai-main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 32px;
}

.input-panel, .result-panel {
  min-height: 500px;
}

.input-content {
  padding: 24px;
  min-height: 400px;
}

.input-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.cyber-textarea {
  width: 100%;
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.3);
  color: #00f3ff;
  padding: 16px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  min-height: 200px;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.1);
}

.cyber-textarea:focus {
  border-color: #00f3ff;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
}

.textarea-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid rgba(0, 243, 255, 0.2);
  pointer-events: none;
  z-index: -1;
}

.ai-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.api-key-section {
  margin-top: 16px;
}

.api-key-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #00f3ff;
  font-size: 12px;
  font-family: 'Orbitron', sans-serif;
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.label-icon {
  font-size: 10px;
  color: #00f3ff;
}

.result-content {
  padding: 24px;
  min-height: 400px;
  max-height: 600px;
  overflow: auto;
}

.code-container {
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 4px;
  padding: 16px;
  position: relative;
}

.cyber-code {
  margin: 0;
  color: #00f3ff;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #606070;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  color: #303040;
  margin-bottom: 16px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

.empty-text {
  font-size: 14px;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
}

.result-actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.cyber-ai-generator {
  min-height: 80vh;
  position: relative;
  padding: 24px;
}

/* 顶部操作栏 */
.cyber-actions-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
  padding: 16px;
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 4px;
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.1);
}

.actions-left {
  display: flex;
  gap: 12px;
}

.actions-right {
  display: flex;
  gap: 12px;
}

.ai-main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 32px;
}

.input-panel, .result-panel {
  min-height: 500px;
}

.input-content {
  padding: 24px;
  min-height: 400px;
}

.input-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.cyber-textarea {
  width: 100%;
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.3);
  color: #00f3ff;
  padding: 16px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  min-height: 200px;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.1);
}

.cyber-textarea:focus {
  border-color: #00f3ff;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
}

.textarea-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid rgba(0, 243, 255, 0.2);
  pointer-events: none;
  z-index: -1;
}

.result-content {
  padding: 24px;
  min-height: 400px;
  max-height: 600px;
  overflow: auto;
}

.code-container {
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 4px;
  padding: 16px;
  position: relative;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #606070;
  text-align: center;
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 4px;
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.1);
}

.empty-icon {
  font-size: 48px;
  color: #303040;
  margin-bottom: 16px;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

.empty-text {
  font-size: 14px;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
}

.record-count {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.count-label {
  font-size: 11px;
  color: #606070;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 1px;
}

.count-value {
  font-size: 11px;
  color: #00f3ff;
  font-family: 'Courier New', monospace;
}

/* 右侧历史记录面板 */
.history-panel-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  opacity: 0;
  animation: fadeIn 0.3s ease-in-out forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.history-panel {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: linear-gradient(180deg, #0d0d14 0%, #12121a 100%);
  border-left: 2px solid rgba(0, 243, 255, 0.3);
  z-index: 1000;
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  box-shadow: -5px 0 15px rgba(0, 243, 255, 0.2);
}

.history-panel.show {
  right: 0;
}

.history-panel-header {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.2);
  background: rgba(10, 10, 15, 0.9);
}

.history-panel-header .header-icon {
  font-size: 16px;
  color: #00f3ff;
  margin-right: 12px;
}

.history-panel-header h3 {
  flex: 1;
  margin: 0;
  font-size: 14px;
  font-family: 'Orbitron', sans-serif;
  color: #00f3ff;
  letter-spacing: 2px;
}

.history-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.history-actions-top {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.history-item {
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.history-item:hover {
  border-color: #00f3ff;
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.2);
  transform: translateY(-2px);
}

.history-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.history-time {
  font-size: 10px;
  color: #606070;
  font-family: 'Courier New', monospace;
}

.history-actions {
  display: flex;
  gap: 6px;
}

.history-btn {
  background: transparent;
  border: 1px solid rgba(0, 243, 255, 0.5);
  color: #00f3ff;
  padding: 3px 6px;
  font-size: 9px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.history-btn:hover {
  background: rgba(0, 243, 255, 0.2);
  border-color: #00f3ff;
}

.history-btn.delete-btn {
  border-color: rgba(255, 0, 85, 0.5);
  color: #ff0055;
}

.history-btn.delete-btn:hover {
  background: rgba(255, 0, 85, 0.2);
  border-color: #ff0055;
  box-shadow: 0 0 10px rgba(255, 0, 85, 0.3);
}

.history-prompt {
  font-size: 12px;
  color: #00f3ff;
  margin-bottom: 6px;
  font-weight: 500;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.history-code-preview {
  font-size: 11px;
  color: #808090;
  font-family: 'Courier New', monospace;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.empty-history {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #606070;
  text-align: center;
}

.header-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

@media (max-width: 1200px) {
  .ai-main-content {
    grid-template-columns: 1fr;
  }
  
  .input-panel, .result-panel {
    min-height: 400px;
  }
  
  .cyber-textarea {
    min-height: 200px;
  }
  
  .result-content {
    min-height: 200px;
  }
  
  .cyber-actions-bar {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .actions-left, .actions-right {
    justify-content: center;
  }
  
  .history-panel {
    width: 320px;
    right: -320px;
  }
}
</style>
