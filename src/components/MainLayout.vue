<template>
  <div class="main-layout" :class="{ 'fullscreen-mode': isFullscreen, 'mobile-menu-open': isMobileMenuOpen }">
    <!-- 移动端菜单按钮 -->
    <div class="mobile-menu-btn" @click="toggleMobileMenu" v-if="!isFullscreen">
      <div class="menu-icon" :class="{ 'open': isMobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    
    <!-- 左侧导航 -->
    <aside class="cyber-sidebar" v-if="!isFullscreen">
      <!-- 扫描线效果 -->
      <div class="scan-line"></div>
      
      <div class="sidebar-header">
        <div class="logo-section">
          <div class="logo-icon">◈</div>
          <div class="logo-text">
            <h2>NEURAL<span class="highlight">_OS</span></h2>
            <span class="version">v2.0.77</span>
          </div>
        </div>
        <div class="header-line"></div>
      </div>

      <nav class="sidebar-nav">
        <div
          v-for="(section, index) in menuSections"
          :key="index"
          class="nav-section"
          :class="{ 'section-active': expandedSections[index] }"
        >
          <div class="nav-section-title" @click="toggleSection(index)">
            <div class="section-icon-wrapper">
              <span class="section-icon">{{ section.icon }}</span>
              <div class="icon-glow"></div>
            </div>
            <span class="section-name">{{ section.title }}</span>
            <div class="section-arrow" :class="{ open: expandedSections[index] }">
              <span>▶</span>
            </div>
            <div class="active-indicator" v-if="expandedSections[index]"></div>
          </div>

          <transition name="cyber-expand">
            <div v-if="expandedSections[index]" class="nav-items">
              <div
                v-for="item in section.items"
                :key="item.id"
                class="nav-item"
                :class="{ active: isActiveRoute(item) }"
                @click.stop="navigateTo(item)"
              >
                <div class="item-indicator"></div>
                <span class="item-icon">{{ item.icon }}</span>
                <span class="item-name">{{ item.name }}</span>
                <div class="item-glow" v-if="isActiveRoute(item)"></div>
              </div>
            </div>
          </transition>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="connection-status">
          <span class="status-dot"></span>
          <span class="status-text">SYSTEM ONLINE</span>
        </div>
        <button class="cyber-logout-btn" @click="handleLogout">
          <span class="btn-icon">◈</span>
          <span class="btn-text">断开连接</span>
          <div class="btn-glitch"></div>
        </button>
      </div>
    </aside>

    <!-- 右侧内容区 -->
    <main class="cyber-content">
      <!-- 背景网格 -->
      <div class="content-bg">
        <div class="grid-pattern"></div>
        <div class="ambient-glow"></div>
      </div>
      
      <!-- 头部 -->
      <header class="cyber-header" v-if="!isFullscreen">
        <div class="header-left">
          <div class="breadcrumb">
            <span class="bc-system">SYSTEM</span>
            <span class="bc-separator">/</span>
            <span class="bc-current">{{ title.toUpperCase() }}</span>
          </div>
          <div class="header-line-left"></div>
        </div>
        
        <div class="header-right">
          <FullscreenButton />
          
          <div class="cyber-notification">
            <div class="notif-icon">
              <span>◉</span>
              <div class="notif-glow"></div>
            </div>
            <span class="notif-badge">3</span>
          </div>
          
          <div class="cyber-user-dropdown" @click="goToUserInfo">
            <div class="user-avatar">
              <img v-if="avatarUrl" :src="avatarUrl" class="avatar-img" alt="头像" />
              <span v-else>◈</span>
              <div class="avatar-ring"></div>
            </div>
            <div class="user-info">
              <span class="user-name">{{ username }}</span>
              <span class="user-role">OPERATOR</span>
            </div>
            <div class="dropdown-arrow">
              <span>▼</span>
            </div>
          </div>
        </div>
      </header>

      <!-- 内容插槽 -->
      <div class="content-body">
        <div class="content-wrapper">
          <slot></slot>
        </div>
      </div>
      
      <!-- 底部装饰 -->
      <div class="content-footer">
        <div class="footer-scan"></div>
        <div class="footer-data">
          <span>LATENCY: 12ms</span>
          <span>UPTIME: 99.9%</span>
          <span>NODE: ASIA-EAST-1</span>
        </div>
      </div>
    </main>
    
    <!-- 可拖动的退出全屏按钮 -->
    <DraggableExitButton />
  </div>
</template>

<script>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import FullscreenButton from './FullscreenButton.vue'
import DraggableExitButton from './DraggableExitButton.vue'

export default {
  name: 'MainLayout',
  components: {
    FullscreenButton,
    DraggableExitButton
  },
  props: {
    title: {
      type: String,
      default: '管理后台'
    }
  },
  setup() {
    const isFullscreen = ref(false)
    const isMobileMenuOpen = ref(false)
    
    const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value
    }
    
    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }
    
    const handleKeydown = (e) => {
      if (e.key === 'Escape' && isFullscreen.value) {
        isFullscreen.value = false
      }
    }
    
    onMounted(() => {
      window.addEventListener('keydown', handleKeydown)
    })
    
    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeydown)
    })
    
    provide('isFullscreen', isFullscreen)
    provide('toggleFullscreen', toggleFullscreen)
    
    return {
      isFullscreen,
      toggleFullscreen,
      isMobileMenuOpen,
      toggleMobileMenu
    }
  },
  data() {
    return {
      expandedSections: JSON.parse(localStorage.getItem('expandedSections')) || [true, false, false],
      menuSections: [
        {
          title: '工作台',
          icon: '◈',
          items: [
            { id: 'dashboard', name: '仪表盘', icon: '◉', route: '/dashboard' },
            { id: 'analytics', name: '数据分析', icon: '◆', route: '/analytics' },
            { id: 'stock-analysis', name: '股票分析', icon: '◊', route: '/stock-analysis' },
            { id: 'ai-code-generator', name: 'AI 代码生成器', icon: '◈', route: '/ai-code-generator' }
          ]
        },
        {
          title: '内容管理',
          icon: '◆',
          items: [
            { id: 'articles', name: '文章管理', icon: '◊', route: '/content/articles' },
            { id: 'categories', name: '分类管理', icon: '◊', route: '/content/categories' },
            { id: 'tags', name: '标签管理', icon: '◊', route: '/content/tags' }
          ]
        },
        {
          title: '系统管理',
          icon: '◉',
          items: [
            { id: 'users', name: '用户管理', icon: '◊', route: '/content/users' },
            { id: 'roles', name: '角色权限', icon: '◊', route: '/roles' },
            { id: 'settings', name: '系统配置', icon: '◊', route: '/settings' }
          ]
        }
      ]
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    },
    username() {
      return (this.currentUser && this.currentUser.username) || 'OPERATOR'
    },
    avatarUrl() {
      return (this.currentUser && this.currentUser.avatar) || ''
    }
  },
  methods: {
    toggleSection(index) {
      this.expandedSections[index] = !this.expandedSections[index]
      localStorage.setItem('expandedSections', JSON.stringify(this.expandedSections))
    },
    isActiveRoute(item) {
      return this.$route.path === item.route
    },
    navigateTo(item) {
      if (this.$route.path !== item.route) {
        this.$router.push(item.route)
      }
    },
    goToUserInfo() {
      this.$router.push('/user/info')
    },
    handleLogout() {
      if (confirm('确定要断开神经连接吗？')) {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');

.main-layout {
  display: flex;
  height: 100vh;
  background: #0a0a0f;
  font-family: 'Rajdhani', 'Microsoft YaHei', sans-serif;
  overflow: hidden;
}

/* 左侧导航 - 赛博朋克风格 */
.cyber-sidebar {
  width: 280px;
  background: linear-gradient(180deg, #0d0d14 0%, #12121a 100%);
  border-right: 1px solid rgba(0, 243, 255, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* 扫描线效果 */
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00f3ff, transparent);
  box-shadow: 0 0 10px #00f3ff;
  animation: scanMove 4s linear infinite;
  pointer-events: none;
  z-index: 10;
}

@keyframes scanMove {
  0% { transform: translateY(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

/* 侧边栏头部 */
.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.1);
  position: relative;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  font-size: 28px;
  color: #00f3ff;
  text-shadow: 0 0 20px rgba(0, 243, 255, 0.8);
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.logo-text h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  letter-spacing: 2px;
}

.logo-text .highlight {
  color: #00f3ff;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
}

.version {
  font-family: 'Courier New', monospace;
  font-size: 10px;
  color: #ff00ff;
  letter-spacing: 2px;
}

.header-line {
  position: absolute;
  bottom: -1px;
  left: 20px;
  right: 20px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00f3ff, transparent);
}

/* 导航菜单 */
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
}

.nav-section {
  margin-bottom: 4px;
}

.nav-section-title {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  gap: 12px;
}

.nav-section-title:hover {
  background: rgba(0, 243, 255, 0.05);
}

.section-active .nav-section-title {
  background: rgba(0, 243, 255, 0.08);
}

.section-icon-wrapper {
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.section-icon {
  font-size: 16px;
  color: #00f3ff;
  z-index: 1;
}

.icon-glow {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(0, 243, 255, 0.3);
  transform: rotate(45deg);
  transition: all 0.3s ease;
}

.nav-section-title:hover .icon-glow {
  border-color: #00f3ff;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.3);
}

.section-name {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
}

.section-arrow {
  font-size: 10px;
  color: #00f3ff;
  transition: transform 0.3s ease;
}

.section-arrow.open {
  transform: rotate(90deg);
}

.active-indicator {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: linear-gradient(180deg, #00f3ff, #ff00ff);
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
}

/* 子菜单 */
.nav-items {
  background: rgba(0, 0, 0, 0.3);
  border-left: 2px solid rgba(0, 243, 255, 0.2);
  margin-left: 36px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 20px 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  gap: 10px;
}

.nav-item:hover {
  background: rgba(0, 243, 255, 0.05);
  padding-left: 20px;
}

.nav-item.active {
  background: rgba(0, 243, 255, 0.1);
}

.item-indicator {
  width: 6px;
  height: 6px;
  background: #505060;
  transform: rotate(45deg);
  transition: all 0.3s ease;
}

.nav-item:hover .item-indicator,
.nav-item.active .item-indicator {
  background: #00f3ff;
  box-shadow: 0 0 8px rgba(0, 243, 255, 0.8);
}

.item-icon {
  font-size: 12px;
  color: #00f3ff;
}

.item-name {
  font-size: 13px;
  color: #a0a0b0;
  letter-spacing: 1px;
  transition: color 0.3s ease;
}

.nav-item:hover .item-name,
.nav-item.active .item-name {
  color: #fff;
}

.item-glow {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, transparent, #00f3ff, transparent);
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
}

/* 展开动画 */
.cyber-expand-enter-active,
.cyber-expand-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
}

.cyber-expand-enter-from,
.cyber-expand-leave-to {
  max-height: 0;
  opacity: 0;
}

/* 侧边栏底部 */
.sidebar-footer {
  padding: 20px;
  border-top: 1px solid rgba(0, 243, 255, 0.1);
}

.connection-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: rgba(0, 255, 136, 0.05);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 2px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.8);
  animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.status-text {
  font-family: 'Courier New', monospace;
  font-size: 10px;
  color: #00ff88;
  letter-spacing: 2px;
}

.cyber-logout-btn {
  width: 100%;
  padding: 12px;
  background: transparent;
  border: 1px solid rgba(255, 0, 85, 0.5);
  color: #ff0055;
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.cyber-logout-btn:hover {
  background: rgba(255, 0, 85, 0.1);
  border-color: #ff0055;
  box-shadow: 0 0 20px rgba(255, 0, 85, 0.3);
}

.btn-icon {
  font-size: 10px;
}

/* 右侧内容区 */
.cyber-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.content-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 243, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 243, 255, 0.02) 1px, transparent 1px);
  background-size: 40px 40px;
}

.ambient-glow {
  position: absolute;
  top: -200px;
  right: -200px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(0, 243, 255, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

/* 头部 */
.cyber-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: rgba(13, 13, 20, 0.8);
  border-bottom: 1px solid rgba(0, 243, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
}

.bc-system {
  color: #505060;
}

.bc-separator {
  color: #00f3ff;
}

.bc-current {
  color: #00f3ff;
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
}

.header-line-left {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #00f3ff, transparent);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

/* 通知 */
.cyber-notification {
  position: relative;
  cursor: pointer;
}

.notif-icon {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #00f3ff;
}

.notif-glow {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(0, 243, 255, 0.3);
  transform: rotate(45deg);
  transition: all 0.3s ease;
}

.cyber-notification:hover .notif-glow {
  border-color: #00f3ff;
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
}

.notif-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  background: #ff0055;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(255, 0, 85, 0.8);
}

/* 用户下拉 */
.cyber-user-dropdown {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 16px 6px 6px;
  background: rgba(0, 243, 255, 0.05);
  border: 1px solid rgba(0, 243, 255, 0.2);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cyber-user-dropdown:hover {
  background: rgba(0, 243, 255, 0.1);
  border-color: rgba(0, 243, 255, 0.4);
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.1);
}

.user-avatar {
  position: relative;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #00f3ff 0%, #ff00ff 100%);
  font-size: 16px;
  color: #0a0a0f;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-ring {
  position: absolute;
  inset: 2px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
}

.user-role {
  font-family: 'Courier New', monospace;
  font-size: 9px;
  color: #00f3ff;
  letter-spacing: 2px;
}

.dropdown-arrow {
  font-size: 8px;
  color: #00f3ff;
}

/* 内容主体 */
.content-body {
  flex: 1;
  overflow-y: auto;
  position: relative;
  z-index: 1;
  padding: 24px 32px;
}

.content-wrapper {
  min-height: 100%;
}

/* 内容底部 */
.content-footer {
  padding: 12px 32px;
  background: rgba(13, 13, 20, 0.8);
  border-top: 1px solid rgba(0, 243, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.footer-scan {
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00f3ff, transparent);
  animation: footerScan 3s linear infinite;
}

@keyframes footerScan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.footer-data {
  display: flex;
  gap: 24px;
}

.footer-data span {
  font-family: 'Courier New', monospace;
  font-size: 10px;
  color: #505060;
  letter-spacing: 2px;
}

/* 滚动条 */
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

/* 全屏模式样式 */
.fullscreen-mode {
  overflow: visible;
}

.fullscreen-mode .cyber-content {
  width: 100%;
}

.fullscreen-mode .content-body {
  padding: 0;
}

.fullscreen-mode .content-footer {
  display: none;
}

/* 移动端菜单按钮 */
.mobile-menu-btn {
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  cursor: pointer;
}

.menu-icon {
  width: 30px;
  height: 24px;
  position: relative;
  cursor: pointer;
}

.menu-icon span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: #00f3ff;
  border-radius: 3px;
  opacity: 1;
  left: 0;
  transition: all 0.3s ease;
}

.menu-icon span:nth-child(1) {
  top: 0px;
}

.menu-icon span:nth-child(2) {
  top: 10px;
}

.menu-icon span:nth-child(3) {
  top: 20px;
}

.menu-icon.open span:nth-child(1) {
  top: 10px;
  transform: rotate(135deg);
}

.menu-icon.open span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

.menu-icon.open span:nth-child(3) {
  top: 10px;
  transform: rotate(-135deg);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }
  
  .cyber-sidebar {
    position: fixed;
    top: 0;
    left: -280px;
    height: 100vh;
    z-index: 999;
    transition: left 0.3s ease;
  }
  
  .mobile-menu-open .cyber-sidebar {
    left: 0;
  }
  
  .cyber-content {
    width: 100%;
  }
  
  .cyber-header {
    padding: 16px 20px;
  }
  
  .header-right {
    gap: 16px;
  }
  
  .content-body {
    padding: 16px 20px;
  }
  
  .cyber-user-dropdown {
    padding: 4px 12px 4px 4px;
  }
  
  .user-info {
    display: none;
  }
  
  .breadcrumb {
    font-size: 10px;
  }
  
  .content-footer {
    padding: 12px 20px;
  }
  
  .footer-data {
    gap: 12px;
  }
  
  .footer-data span {
    font-size: 8px;
  }
}

/* 平板适配 */
@media (min-width: 769px) and (max-width: 1024px) {
  .cyber-sidebar {
    width: 240px;
  }
  
  .content-body {
    padding: 20px 24px;
  }
  
  .cyber-header {
    padding: 16px 24px;
  }
}
</style>
