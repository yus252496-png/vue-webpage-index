<template>
  <div class="style-switcher-wrap" v-click-outside="closeMenu">
    <button class="style-trigger-btn" @click="toggleMenu" :title="currentStyleName">
      <span class="style-icon">🎨</span>
      <span class="style-label">{{ currentStyleName }}</span>
      <span class="style-arrow" :class="{ open: isOpen }">▼</span>
    </button>

    <transition name="style-dropdown">
      <div class="style-dropdown-menu" v-if="isOpen">
        <div class="dropdown-header">STYLE</div>
        <div
          v-for="style in availableStyles"
          :key="style.id"
          class="style-option"
          :class="{ active: currentStyle === style.id }"
          @click="selectStyle(style.id)"
        >
          <span class="option-dot"></span>
          <span class="option-name">{{ style.name }}</span>
          <span class="option-check" v-if="currentStyle === style.id">✓</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'StyleSwitcher',
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el._clickOutside = (e) => {
          if (!el.contains(e.target)) binding.value()
        }
        document.addEventListener('click', el._clickOutside)
      },
      unmounted(el) {
        document.removeEventListener('click', el._clickOutside)
      }
    }
  },
  data() {
    return {
      isOpen: false,
      availableStyles: [
        { id: 'cyberpunk', name: '赛博朋克' },
        { id: 'minimal',   name: '极简风格' },
        { id: 'classic',   name: '经典风格' },
        { id: 'modern',    name: '现代风格' },
        { id: 'comic',     name: '漫画风格' },
        { id: 'sketch',    name: '简笔风格' }
      ]
    }
  },
  computed: {
    currentStyle() {
      return this.$store.getters.pageStyle
    },
    currentStyleName() {
      const s = this.availableStyles.find(s => s.id === this.currentStyle)
      return s ? s.name : '风格'
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    closeMenu() {
      this.isOpen = false
    },
    selectStyle(styleId) {
      this.$store.dispatch('setPageStyle', styleId)
      this.isOpen = false
    }
  }
}
</script>

<style scoped>
.style-switcher-wrap {
  position: relative;
  z-index: 1001;
}

.style-trigger-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(0, 243, 255, 0.05);
  border: 1px solid rgba(0, 243, 255, 0.2);
  border-radius: 2px;
  color: #fff;
  font-family: 'Rajdhani', 'Microsoft YaHei', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.style-trigger-btn:hover {
  background: rgba(0, 243, 255, 0.1);
  border-color: rgba(0, 243, 255, 0.4);
  box-shadow: 0 0 12px rgba(0, 243, 255, 0.1);
}

.style-icon {
  font-size: 14px;
}

.style-label {
  color: #00f3ff;
}

.style-arrow {
  font-size: 8px;
  color: #00f3ff;
  transition: transform 0.3s ease;
  display: inline-block;
}

.style-arrow.open {
  transform: rotate(180deg);
}

/* 下拉菜单 */
.style-dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 140px;
  background: #0d0d14;
  border: 1px solid rgba(0, 243, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 243, 255, 0.1);
  z-index: 1000;
}

.dropdown-header {
  padding: 8px 14px;
  font-family: 'Orbitron', 'Courier New', monospace;
  font-size: 9px;
  color: #505060;
  letter-spacing: 3px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.1);
}

.style-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.style-option:hover {
  background: rgba(0, 243, 255, 0.07);
}

.style-option.active {
  background: rgba(0, 243, 255, 0.1);
}

.option-dot {
  width: 6px;
  height: 6px;
  border: 1px solid #505060;
  transform: rotate(45deg);
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.style-option:hover .option-dot,
.style-option.active .option-dot {
  border-color: #00f3ff;
  background: #00f3ff;
  box-shadow: 0 0 6px rgba(0, 243, 255, 0.8);
}

.option-name {
  flex: 1;
  font-size: 13px;
  color: #a0a0b0;
  letter-spacing: 1px;
  transition: color 0.2s ease;
}

.style-option:hover .option-name,
.style-option.active .option-name {
  color: #fff;
}

.option-check {
  font-size: 11px;
  color: #00f3ff;
  text-shadow: 0 0 8px rgba(0, 243, 255, 0.8);
}

/* 过渡动画 */
.style-dropdown-enter-active,
.style-dropdown-leave-active {
  transition: all 0.2s ease;
}

.style-dropdown-enter-from,
.style-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
