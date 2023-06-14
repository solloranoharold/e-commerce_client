import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[createPersistedState()],
  state: {
    userInfo:null ,Notifications:[]
  },
  mutations: {
    STORE_USERINFO : (state , newState )=>{
      state.userInfo = newState
    },
    STORE_NOTIFICATIONS : (state , newState )=>{
      state.Notifications = newState
    },
  },
  actions: {
  },
  modules: {
  }
})
