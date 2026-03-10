<template>
  <button 
    class="fullscreen-btn" 
    @click="toggleFullscreen"
    :title="isFullscreen ? '退出全屏' : '全屏显示'"
  >
    <span class="btn-icon">{{ isFullscreen ? '◱' : '◻' }}</span>
    <span class="btn-text">{{ isFullscreen ? 'EXIT' : 'FULLSCREEN' }}</span>
    <div class="btn-glow"></div>
  </button>
</template>

<script setup>
import { inject, ref } from 'vue'

const isFullscreen = inject('isFullscreen', ref(false))
const toggleFullscreen = inject('toggleFullscreen', () => {})
</script>

<style scoped>
.fullscreen-btn {
  position: relative;
  background: transparent;
  border: 1px solid rgba(0, 243, 255, 0.5);
  color: #00f3ff;
  padding: 8px 16px;
  font-family: 'Orbitron', sans-serif;
  font-size: 11px;
  letter-spacing: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  overflow: hidden;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
}

.fullscreen-btn:hover {
  background: rgba(0, 243, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.4);
  border-color: #00f3ff;
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 14px;
  z-index: 1;
}

.btn-text {
  font-size: 10px;
  z-index: 1;
}

.btn-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.fullscreen-btn:hover .btn-glow {
  opacity: 1;
}
</style>
