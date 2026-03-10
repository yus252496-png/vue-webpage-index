<template>
  <div class="typewriter-container">
    <pre class="cyber-code" ref="codeElement">
      <code>{{ displayContent }}</code>
    </pre>
    <div v-if="loading" class="typewriter-loading">
      <div class="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  delay: {
    type: Number,
    default: 0 // 打字机效果延迟，0表示实时更新
  }
})

const displayContent = ref('')
const codeElement = ref(null)

// 自动滚动到最新内容
const scrollToBottom = () => {
  nextTick(() => {
    if (codeElement.value) {
      codeElement.value.scrollTop = codeElement.value.scrollHeight
    }
  })
}

// 处理内容更新
watch(() => props.content, (newContent) => {
  if (props.delay > 0) {
    // 模拟打字机效果
    displayContent.value = ''
    let index = 0
    const timer = setInterval(() => {
      if (index < newContent.length) {
        displayContent.value += newContent.charAt(index)
        index++
        scrollToBottom()
      } else {
        clearInterval(timer)
      }
    }, props.delay)
  } else {
    // 实时更新
    displayContent.value = newContent
    scrollToBottom()
  }
}, { immediate: true })
</script>

<style scoped>
.typewriter-container {
  position: relative;
  min-height: 20px;
}

.cyber-code {
  margin: 0;
  padding: 16px;
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 4px;
  overflow-x: auto;
}

.cyber-code code {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.5;
  color: #00f3ff;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.typewriter-loading {
  position: absolute;
  bottom: 10px;
  right: 10px;
  margin-left: 8px;
}

.loading-dots {
  display: flex;
  gap: 4px;
  align-items: center;
}

.loading-dots span {
  width: 6px;
  height: 6px;
  background: #00f3ff;
  border-radius: 50%;
  animation: pulse 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes pulse {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
