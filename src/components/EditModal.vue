<template>
  <div class="cyber-modal-overlay" @click.self="closeModal">
    <div class="cyber-modal">
      <div class="modal-header">
        <div class="header-icon">◈</div>
        <span class="header-text">{{ isEdit ? 'EDIT_RECORD' : 'NEW_RECORD' }}</span>
        <button class="close-btn" @click="closeModal">×</button>
      </div>

      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
          <div class="cyber-form-group">
            <label>
              <span class="label-icon">◉</span>
              名称
            </label>
            <div class="input-wrapper">
              <input
                v-model="form.name"
                type="text"
                class="cyber-input"
                placeholder="输入名称"
                required
              />
              <div class="input-glow"></div>
            </div>
          </div>

          <div class="cyber-form-group">
            <label>
              <span class="label-icon">◊</span>
              类型
            </label>
            <div class="select-wrapper">
              <el-select
                v-model="form.type"
                class="cyber-el-select"
                placeholder="请选择类型"
                popper-class="cyber-select-dropdown"
                :teleported="true"
              >
                <el-option label="类型一" value="类型一" />
                <el-option label="类型二" value="类型二" />
                <el-option label="类型三" value="类型三" />
              </el-select>
            </div>
          </div>

          <div class="cyber-form-group">
            <label>
              <span class="label-icon">◈</span>
              状态
            </label>
            <div class="status-options">
              <label
                v-for="status in statusOptions"
                :key="status.value"
                class="status-option"
                :class="{ active: form.status === status.value }"
              >
                <input
                  type="radio"
                  v-model="form.status"
                  :value="status.value"
                  class="status-radio"
                />
                <span class="status-indicator" :class="status.value"></span>
                <span class="status-label">{{ status.label }}</span>
              </label>
            </div>
          </div>

          <div class="cyber-form-group">
            <label>
              <span class="label-icon">◉</span>
              日期
            </label>
            <div class="date-wrapper">
              <el-date-picker
                v-model="form.date"
                type="date"
                placeholder="选择日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                class="cyber-date-picker"
                :clearable="false"
              />
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="cyber-btn btn-secondary" @click="closeModal">
              <span class="btn-icon">◊</span>
              <span>取消</span>
            </button>
            <button type="submit" class="cyber-btn btn-primary">
              <span class="btn-icon">◈</span>
              <span>{{ isEdit ? '保存' : '创建' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditModal',
  props: {
    item: {
      type: Object,
      required: true
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        id: null,
        name: '',
        type: '类型一',
        status: 'active',
        date: ''
      },
      statusOptions: [
        { value: 'active', label: '活跃' },
        { value: 'inactive', label: '未活跃' },
        { value: 'pending', label: '待处理' }
      ]
    }
  },
  watch: {
    item: {
      immediate: true,
      handler(newItem) {
        if (newItem && Object.keys(newItem).length > 0) {
          this.form = { ...newItem }
        } else {
          this.resetForm()
        }
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
      this.resetForm()
    },
    resetForm() {
      this.form = {
        id: null,
        name: '',
        type: '类型一',
        status: 'active',
        date: new Date().toISOString().split('T')[0]
      }
    },
    handleSubmit() {
      this.$emit('save', { ...this.form })
      this.closeModal()
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');

.cyber-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.cyber-modal {
  background: rgba(18, 18, 26, 0.95);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 4px;
  width: 100%;
  max-width: 480px;
  position: relative;
  animation: modalIn 0.3s ease;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.cyber-modal::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #00f3ff, #0080ff);
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(0, 243, 255, 0.1);
}

.header-icon {
  font-size: 18px;
  color: #00f3ff;
}

.header-text {
  font-family: 'Orbitron', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 2px;
}

.close-btn {
  margin-left: auto;
  background: none;
  border: none;
  color: #a0a0b0;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #ff0055;
}

.modal-body {
  padding: 24px;
}

.cyber-form-group {
  margin-bottom: 20px;
}

.cyber-form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-family: 'Orbitron', sans-serif;
  font-size: 11px;
  font-weight: 600;
  color: #00f3ff;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.label-icon {
  font-size: 10px;
}

.input-wrapper,
.select-wrapper {
  position: relative;
}

.cyber-input,
.cyber-select {
  width: 100%;
  padding: 14px 16px;
  background: rgba(10, 10, 15, 0.8);
  border: 1px solid rgba(0, 243, 255, 0.3);
  border-radius: 2px;
  color: #fff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
  appearance: none;
}

.cyber-input:focus,
.cyber-select:focus {
  border-color: #00f3ff;
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.2);
}

.input-glow {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #00f3ff, #0080ff);
  transition: width 0.3s ease;
  pointer-events: none;
}

.cyber-input:focus ~ .input-glow,
.cyber-select:focus ~ .input-glow {
  width: 100%;
}

.select-wrapper {
  position: relative;
  width: 100%;
}

/* Element Plus Select 赛博朋克风格 */
:deep(.cyber-el-select) {
  width: 100%;
}

:deep(.cyber-el-select .el-input__wrapper) {
  background: rgba(10, 10, 15, 0.8) !important;
  border: 1px solid rgba(0, 243, 255, 0.3) !important;
  border-radius: 2px !important;
  box-shadow: none !important;
  padding: 0 12px !important;
  height: 46px !important;
  transition: all 0.3s ease !important;
}

:deep(.cyber-el-select .el-input__wrapper:hover) {
  border-color: rgba(0, 243, 255, 0.5) !important;
}

:deep(.cyber-el-select .el-input__wrapper.is-focus) {
  border-color: #00f3ff !important;
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.2) !important;
}

:deep(.cyber-el-select .el-input__inner) {
  color: #fff !important;
  font-family: 'Rajdhani', sans-serif !important;
  font-size: 14px !important;
  background: transparent !important;
}

:deep(.cyber-el-select .el-input__inner::placeholder) {
  color: #606070 !important;
}

:deep(.cyber-el-select .el-input__suffix-inner) {
  color: #00f3ff !important;
}

/* 日期选择器样式 - Element Plus 赛博朋克主题 */
.date-wrapper {
  position: relative;
  width: 100%;
}

/* 覆盖 Element Plus 日期选择器样式 - 输入框部分 */
:deep(.cyber-date-picker) {
  width: 100%;
}

:deep(.cyber-date-picker .el-input__wrapper) {
  background: rgba(10, 10, 15, 0.8) !important;
  border: 1px solid rgba(0, 243, 255, 0.3) !important;
  border-radius: 2px !important;
  box-shadow: none !important;
  padding: 0 12px !important;
  height: 46px !important;
  transition: all 0.3s ease !important;
}

:deep(.cyber-date-picker .el-input__wrapper:hover) {
  border-color: rgba(0, 243, 255, 0.5) !important;
}

:deep(.cyber-date-picker .el-input__wrapper.is-focus) {
  border-color: #00f3ff !important;
  box-shadow: 0 0 15px rgba(0, 243, 255, 0.2) !important;
}

:deep(.cyber-date-picker .el-input__inner) {
  color: #fff !important;
  font-family: 'Rajdhani', sans-serif !important;
  font-size: 14px !important;
  background: transparent !important;
}

:deep(.cyber-date-picker .el-input__inner::placeholder) {
  color: #606070 !important;
}

:deep(.cyber-date-picker .el-input__prefix) {
  color: #00f3ff !important;
}

:deep(.cyber-date-picker .el-input__suffix) {
  color: #00f3ff !important;
}

/* 状态选项 */
.status-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.status-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.status-option:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
}

.status-option.active {
  background: rgba(0, 243, 255, 0.1);
  border-color: #00f3ff;
}

.status-radio {
  display: none;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #505060;
  transition: all 0.3s ease;
}

.status-indicator.active {
  background: #00ff88;
  box-shadow: 0 0 10px #00ff88;
}

.status-indicator.inactive {
  background: #ff0055;
  box-shadow: 0 0 10px #ff0055;
}

.status-indicator.pending {
  background: #ffea00;
  box-shadow: 0 0 10px #ffea00;
}

.status-label {
  font-size: 12px;
  color: #a0a0b0;
}

.status-option.active .status-label {
  color: #fff;
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid rgba(0, 243, 255, 0.1);
}

.cyber-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
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
</style>
