import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
 // from a vuex store guide
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    user: null,
    isUserLoggedIn: false
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }
})
