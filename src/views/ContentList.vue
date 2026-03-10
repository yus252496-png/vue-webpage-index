<template>
  <div class="content-list">
    <MainLayout :title="pageTitle">
      <div class="cyber-content-list">
        <!-- 筛选区 -->
        <div class="cyber-filter-section">
          <div class="filter-header">
            <div class="header-icon">◈</div>
            <span class="header-text">数据筛选</span>
            <div class="header-line"></div>
          </div>
          <div class="filter-grid">
            <div class="cyber-filter-group">
              <label>状态</label>
              <div class="select-wrapper">
                <select v-model="filters.status" class="cyber-select">
                  <option value="">全部</option>
                  <option value="active">活跃</option>
                  <option value="inactive">未活跃</option>
                  <option value="pending">待处理</option>
                </select>
                <div class="select-glow"></div>
              </div>
            </div>

            <div class="cyber-filter-group">
              <label>类型</label>
              <div class="select-wrapper">
                <select v-model="filters.type" class="cyber-select">
                  <option value="">全部</option>
                  <option value="type1">类型一</option>
                  <option value="type2">类型二</option>
                  <option value="type3">类型三</option>
                </select>
                <div class="select-glow"></div>
              </div>
            </div>

            <div class="cyber-filter-group">
              <label>日期范围</label>
              <div class="select-wrapper">
                <select v-model="filters.dateRange" class="cyber-select">
                  <option value="">全部</option>
                  <option value="today">今天</option>
                  <option value="week">本周</option>
                  <option value="month">本月</option>
                  <option value="year">今年</option>
                </select>
                <div class="select-glow"></div>
              </div>
            </div>

            <div class="cyber-filter-group search-group">
              <label>搜索</label>
              <div class="input-wrapper">
                <input
                  v-model="filters.search"
                  type="text"
                  placeholder="输入关键词..."
                  class="cyber-search-input"
                />
                <div class="input-glow"></div>
                <span class="search-icon">◉</span>
              </div>
            </div>
          </div>

          <div class="filter-actions">
            <button class="cyber-btn btn-primary" @click="applyFilters">
              <span class="btn-icon">◈</span>
              <span>查询</span>
            </button>
            <button class="cyber-btn btn-secondary" @click="resetFilters">
              <span class="btn-icon">◊</span>
              <span>重置</span>
            </button>
          </div>
        </div>

        <!-- 数据列表 -->
        <div class="cyber-data-section">
          <div class="section-toolbar">
            <div class="toolbar-left">
              <div class="data-count">
                <span class="count-label">TOTAL_RECORDS:</span>
                <span class="count-value">{{ mockData.length }}</span>
              </div>
            </div>
            <div class="toolbar-right">
              <button class="cyber-btn btn-add" @click="showAddModal = true">
                <span class="btn-icon">+</span>
                <span>新增数据</span>
              </button>
              <button class="cyber-btn btn-refresh" @click="refreshData">
                <span class="btn-icon">↻</span>
                <span>刷新</span>
              </button>
            </div>
          </div>

          <div class="cyber-table-container">
            <table class="cyber-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>名称</th>
                  <th>类型</th>
                  <th>状态</th>
                  <th>日期</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filteredData" :key="item.id" class="cyber-row">
                  <td class="cell-id">#{{ String(item.id).padStart(4, '0') }}</td>
                  <td class="cell-name">{{ item.name }}</td>
                  <td class="cell-type">
                    <span class="type-tag">{{ item.type }}</span>
                  </td>
                  <td class="cell-status">
                    <span class="cyber-status-badge" :class="item.status">
                      {{ statusMap[item.status] }}
                    </span>
                  </td>
                  <td class="cell-date">{{ item.date }}</td>
                  <td class="cell-actions">
                    <button class="cyber-action-icon edit" @click="editItem(item)">
                      <span>◈</span>
                    </button>
                    <button class="cyber-action-icon delete" @click="deleteItem(item)">
                      <span>◊</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div v-if="filteredData.length === 0" class="cyber-empty-state">
              <div class="empty-icon">◉</div>
              <p>暂无数据记录</p>
              <span class="empty-hint">NO_DATA_FOUND</span>
            </div>
          </div>

          <!-- 分页 -->
          <div class="cyber-pagination">
            <button 
              class="page-btn" 
              :disabled="currentPage === 1" 
              @click="prevPage"
            >
              <span>◀</span>
            </button>
            <div class="page-info">
              <span class="page-current">{{ currentPage }}</span>
              <span class="page-separator">/</span>
              <span class="page-total">{{ totalPages }}</span>
            </div>
            <button 
              class="page-btn" 
              :disabled="currentPage === totalPages" 
              @click="nextPage"
            >
              <span>▶</span>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>

    <!-- 编辑/新增模态框 -->
    <EditModal
      v-if="showEditModal"
      :item="currentItem"
      :is-edit="isEditing"
      @close="closeModal"
      @save="saveItem"
    />

    <EditModal
      v-if="showAddModal"
      :item="newItem"
      :is-edit="false"
      @close="showAddModal = false"
      @save="addNewItem"
    />
  </div>
</template>

<script>
import MainLayout from '../components/MainLayout.vue'
import EditModal from '../components/EditModal.vue'

export default {
  name: 'ContentList',
  components: {
    MainLayout,
    EditModal
  },
  data() {
    return {
      contentType: 'articles',
      showEditModal: false,
      showAddModal: false,
      isEditing: false,
      currentItem: {},
      newItem: {
        id: null,
        name: '',
        type: '类型一',
        status: 'active',
        date: new Date().toISOString().split('T')[0]
      },
      filters: {
        status: '',
        type: '',
        dateRange: '',
        search: ''
      },
      currentPage: 1,
      itemsPerPage: 5,
      mockData: [
        { id: 1, name: '项目一', type: '类型一', status: 'active', date: '2024-01-15' },
        { id: 2, name: '项目二', type: '类型二', status: 'pending', date: '2024-01-16' },
        { id: 3, name: '项目三', type: '类型一', status: 'inactive', date: '2024-01-17' },
        { id: 4, name: '项目四', type: '类型三', status: 'active', date: '2024-01-18' },
        { id: 5, name: '项目五', type: '类型二', status: 'active', date: '2024-01-19' },
        { id: 6, name: '项目六', type: '类型一', status: 'pending', date: '2024-01-20' },
        { id: 7, name: '项目七', type: '类型三', status: 'inactive', date: '2024-01-21' },
        { id: 8, name: '项目八', type: '类型二', status: 'active', date: '2024-01-22' },
        { id: 9, name: '项目九', type: '类型一', status: 'active', date: '2024-01-23' },
        { id: 10, name: '项目十', type: '类型三', status: 'pending', date: '2024-01-24' }
      ]
    }
  },
  computed: {
    pageTitle() {
      const titles = {
        articles: '文章管理',
        categories: '分类管理',
        tags: '标签管理',
        users: '用户管理'
      }
      return titles[this.contentType] || '内容管理'
    },
    filteredData() {
      let data = [...this.mockData]

      if (this.filters.status) {
        data = data.filter(item => item.status === this.filters.status)
      }

      if (this.filters.type) {
        const typeMap = {
          type1: '类型一',
          type2: '类型二',
          type3: '类型三'
        }
        data = data.filter(item => item.type === typeMap[this.filters.type])
      }

      if (this.filters.search) {
        const search = this.filters.search.toLowerCase()
        data = data.filter(item =>
          item.name.toLowerCase().includes(search) ||
          item.type.toLowerCase().includes(search)
        )
      }

      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return data.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.mockData.length / this.itemsPerPage)
    },
    statusMap() {
      return {
        active: '活跃',
        inactive: '未活跃',
        pending: '待处理'
      }
    }
  },
  watch: {
    '$route.params.type': {
      immediate: true,
      handler(newType) {
        this.contentType = newType
      }
    }
  },
  methods: {
    editItem(item) {
      this.currentItem = { ...item }
      this.isEditing = true
      this.showEditModal = true
    },
    deleteItem(item) {
      if (confirm(`确定要删除 "${item.name}" 吗？`)) {
        const index = this.mockData.findIndex(d => d.id === item.id)
        if (index > -1) {
          this.mockData.splice(index, 1)
        }
      }
    },
    saveItem(updatedItem) {
      const index = this.mockData.findIndex(d => d.id === updatedItem.id)
      if (index > -1) {
        this.mockData[index] = updatedItem
      }
      this.closeModal()
    },
    addNewItem(newItem) {
      newItem.id = Math.max(...this.mockData.map(d => d.id)) + 1
      this.mockData.push(newItem)
      this.showAddModal = false
    },
    closeModal() {
      this.showEditModal = false
      this.currentItem = {}
      this.isEditing = false
    },
    refreshData() {
      console.log('刷新数据')
    },
    applyFilters() {
      this.currentPage = 1
    },
    resetFilters() {
      this.filters = {
        status: '',
        type: '',
        dateRange: '',
        search: ''
      }
      this.currentPage = 1
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');

.cyber-content-list {
  padding: 24px;
  font-family: 'Rajdhani', 'Microsoft YaHei', sans-serif;
}

/* 筛选区 */
.cyber-filter-section {
  background: rgba(18, 18, 26, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.2);
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 24px;
  position: relative;
}

.cyber-filter-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #00f3ff, transparent);
}

.filter-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.1);
}

.header-icon {
  font-size: 16px;
  color: #00f3ff;
}

.header-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 2px;
}

.header-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(0, 243, 255, 0.3), transparent);
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.cyber-filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cyber-filter-group label {
  font-size: 12px;
  font-weight: 600;
  color: #00f3ff;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.select-wrapper,
.input-wrapper {
  position: relative;
}

.cyber-select,
.cyber-search-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 2px;
  color: #fff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
  appearance: none;
  cursor: pointer;
}

.cyber-search-input {
  padding-right: 40px;
}

.cyber-select:focus,
.cyber-search-input:focus {
  border-color: #00f3ff;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
}

.select-glow,
.input-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #00f3ff, #ff00ff);
  transition: width 0.3s ease;
}

.cyber-select:focus ~ .select-glow,
.cyber-search-input:focus ~ .input-glow {
  width: 100%;
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #00f3ff;
  font-size: 14px;
}

.filter-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

/* 按钮 */
.cyber-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-family: 'Orbitron', sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
}

.cyber-btn .btn-icon {
  font-size: 14px;
}

.btn-primary {
  background: linear-gradient(135deg, rgba(0, 243, 255, 0.2) 0%, rgba(0, 243, 255, 0.1) 100%);
  border: 1px solid #00f3ff;
  color: #00f3ff;
}

.btn-primary:hover {
  background: rgba(0, 243, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #a0a0b0;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
}

/* 数据区域 */
.cyber-data-section {
  background: rgba(18, 18, 26, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.2);
  border-radius: 4px;
  padding: 24px;
  position: relative;
}

.cyber-data-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #00f3ff, transparent);
}

.section-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.1);
}

.data-count {
  display: flex;
  align-items: center;
  gap: 8px;
}

.count-label {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #505060;
  letter-spacing: 2px;
}

.count-value {
  font-family: 'Orbitron', sans-serif;
  font-size: 16px;
  color: #00f3ff;
  letter-spacing: 1px;
}

.toolbar-right {
  display: flex;
  gap: 12px;
}

.btn-add {
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid #00ff88;
  color: #00ff88;
}

.btn-add:hover {
  background: rgba(0, 255, 136, 0.2);
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

.btn-refresh {
  background: rgba(255, 234, 0, 0.1);
  border: 1px solid #ffea00;
  color: #ffea00;
}

.btn-refresh:hover {
  background: rgba(255, 234, 0, 0.2);
  box-shadow: 0 0 20px rgba(255, 234, 0, 0.3);
}

/* 表格 */
.cyber-table-container {
  overflow-x: auto;
}

.cyber-table {
  width: 100%;
  border-collapse: collapse;
}

.cyber-table thead {
  background: rgba(0, 243, 255, 0.05);
}

.cyber-table th {
  padding: 16px;
  text-align: left;
  font-family: 'Orbitron', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #00f3ff;
  letter-spacing: 2px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.2);
}

.cyber-row {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.cyber-row:hover {
  background: rgba(0, 243, 255, 0.03);
}

.cyber-table td {
  padding: 16px;
  font-size: 13px;
  color: #a0a0b0;
}

.cell-id {
  font-family: 'Courier New', monospace;
  color: #505060;
  letter-spacing: 1px;
}

.cell-name {
  color: #fff;
  font-weight: 500;
}

.type-tag {
  padding: 4px 12px;
  background: rgba(0, 243, 255, 0.1);
  border: 1px solid rgba(0, 243, 255, 0.3);
  color: #00f3ff;
  font-size: 11px;
  letter-spacing: 1px;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
}

.cyber-status-badge {
  padding: 4px 12px;
  font-size: 11px;
  letter-spacing: 1px;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
}

.cyber-status-badge.active {
  background: rgba(0, 255, 136, 0.2);
  border: 1px solid #00ff88;
  color: #00ff88;
}

.cyber-status-badge.inactive {
  background: rgba(255, 0, 85, 0.2);
  border: 1px solid #ff0055;
  color: #ff0055;
}

.cyber-status-badge.pending {
  background: rgba(255, 234, 0, 0.2);
  border: 1px solid #ffea00;
  color: #ffea00;
}

.cell-actions {
  display: flex;
  gap: 8px;
}

.cyber-action-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #a0a0b0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cyber-action-icon:hover {
  border-color: #00f3ff;
  color: #00f3ff;
  box-shadow: 0 0 10px rgba(0, 243, 255, 0.3);
}

.cyber-action-icon.delete:hover {
  border-color: #ff0055;
  color: #ff0055;
  box-shadow: 0 0 10px rgba(255, 0, 85, 0.3);
}

/* 空状态 */
.cyber-empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 48px;
  color: rgba(0, 243, 255, 0.3);
  margin-bottom: 16px;
}

.cyber-empty-state p {
  font-size: 14px;
  color: #a0a0b0;
  margin-bottom: 8px;
}

.empty-hint {
  font-family: 'Courier New', monospace;
  font-size: 10px;
  color: #505060;
  letter-spacing: 3px;
}

/* 分页 */
.cyber-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 243, 255, 0.1);
}

.page-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 243, 255, 0.1);
  border: 1px solid rgba(0, 243, 255, 0.3);
  color: #00f3ff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background: rgba(0, 243, 255, 0.2);
  border-color: #00f3ff;
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Orbitron', sans-serif;
}

.page-current {
  font-size: 18px;
  color: #00f3ff;
}

.page-separator {
  color: #505060;
}

.page-total {
  font-size: 14px;
  color: #a0a0b0;
}

/* 响应式 */
@media (max-width: 1200px) {
  .filter-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .filter-grid {
    grid-template-columns: 1fr;
  }
  
  .section-toolbar {
    flex-direction: column;
    gap: 16px;
  }
  
  .cyber-table th,
  .cyber-table td {
    padding: 12px 8px;
    font-size: 12px;
  }
}
</style>
