import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    token: null,
    pageStyle: localStorage.getItem('pageStyle') || 'cyberpunk'
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    currentUser: (state) => state.user,
    pageStyle: (state) => state.pageStyle
  },
  mutations: {
    SET_USER(state, { user, token }) {
      state.user = user
      state.token = token
    },
    CLEAR_USER(state) {
      state.user = null
      state.token = null
    },
    SET_AVATAR(state, avatar) {
      if (state.user) {
        state.user = { ...state.user, avatar }
      }
    },
    SET_PAGE_STYLE(state, style) {
      state.pageStyle = style
      localStorage.setItem('pageStyle', style)
    }
  },
  actions: {
    login({ commit }, payload) {
      commit('SET_USER', payload)
      localStorage.setItem('token', payload.token)
      localStorage.setItem('user', JSON.stringify(payload.user))
    },
    logout({ commit }) {
      commit('CLEAR_USER')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    initAuth({ commit }) {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token && user) {
        commit('SET_USER', { token, user: JSON.parse(user) })
      }
    },
    updateAvatar({ commit, state }, avatar) {
      commit('SET_AVATAR', avatar)
      if (state.user) {
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
    setPageStyle({ commit }, style) {
      commit('SET_PAGE_STYLE', style)
    }
  }
})
