import { createStore } from 'vuex'

export default createStore({
  state: {
    subgroupID: null,
    TIME_API: (process.env.VUE_APP_TIME_API_URL !== undefined) ? process.env.VUE_APP_TIME_API_URL : 'https://lyceumland.ru/api'
  },
  getters: {
    isLogin(state){
      return state.subgroupID !== null
    },
  },
  mutations: {
    initialiseVars(state) {
      if (localStorage.getItem('subgroup_id')) {
        state.subgroupID = JSON.parse(localStorage.subgroup_id)
      }
    },
    setSubgroupID(state, subgroup_id){
      state.subgroupID = subgroup_id
    },
    logout(state){
      state.subgroupID = null
    }
  },
  actions: {
  },
  modules: {
  }
})
