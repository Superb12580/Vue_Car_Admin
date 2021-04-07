import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(sessionStorage.getItem('user'))
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
      sessionStorage.setItem('user', JSON.stringify(user))
    },

    REMOVE_USER: (state) => {
      // state.token = ''
      // state.userInfo = {}
      // localStorage.setItem("token", '')
      sessionStorage.setItem('user', JSON.stringify(''))
      sessionStorage.clear()
    }
  },
  getters: {
    // get
    GET_USER: (state) => {
      return state.user
    }
  },
  actions: {
  },
  modules: {
  }
})
