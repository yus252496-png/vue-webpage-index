<template>
  <div 
    v-if="isFullscreen" 
    class="draggable-exit-btn"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
    @mousedown="startDrag"
    @click="handleClick"
    title="退出全屏"
  >
    <span class="exit-icon">◱</span>
    <span class="exit-text">EXIT</span>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'

const isFullscreen = inject('isFullscreen', ref(false))
const toggleFullscreen = inject('toggleFullscreen', () => {})

const position = ref({ x: window.innerWidth - 120, y: 20 })
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })
const startPos = ref({ x: 0, y: 0 })
const hasMoved = ref(false)

const handleClick = () => {
  if (!hasMoved.value) {
    toggleFullscreen()
  }
}

const startDrag = (e) => {
  isDragging.value = true
  hasMoved.value = false
  startPos.value = { x: e.clientX, y: e.clientY }
  dragOffset.value = {
    x: e.clientX - position.value.x,
    y: e.clientY - position.value.y
  }
  
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const onDrag = (e) => {
  if (!isDragging.value) return
  
  const moveDistance = Math.sqrt(
    Math.pow(e.clientX - startPos.value.x, 2) + 
    Math.pow(e.clientY - startPos.value.y, 2)
  )
  
  if (moveDistance > 5) {
    hasMoved.value = true
  }
  
  const newX = e.clientX - dragOffset.value.x
  const newY = e.clientY - dragOffset.value.y
  
  position.value = {
    x: Math.max(0, Math.min(window.innerWidth - 100, newX)),
    y: Math.max(0, Math.min(window.innerHeight - 50, newY))
  }
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  
  setTimeout(() => {
    hasMoved.value = false
  }, 100)
}

onMounted(() => {
  position.value = { x: window.innerWidth - 120, y: 20 }
})
</script>

<style scoped>
.draggable-exit-btn {
  position: fixed;
  z-index: 10000;
  background: rgba(255, 0, 85, 0.2);
  border: 2px solid rgba(255, 0, 85, 0.6);
  color: #ff0055;
  padding: 12px 24px;
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 2px;
  cursor: move;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
  user-select: none;
}

.draggable-exit-btn:hover {
  background: rgba(255, 0, 85, 0.4);
  box-shadow: 0 0 20px rgba(255, 0, 85, 0.5);
  border-color: #ff0055;
}

.exit-icon {
  font-size: 16px;
}

.exit-text {
  font-size: 11px;
}
</style>
