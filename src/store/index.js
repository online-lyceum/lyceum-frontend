import { createStore } from 'vuex'

export default createStore({
  state: {
    subgroup_id: null
  },
  getters: {
  },
  mutations: {
    initialiseVars(state) {
      if (localStorage.getItem('subgroup_id')) {
        state.subgroup_id = JSON.parse(localStorage.subgroup_id)
      }
    },
    setSubgroupID(state, subgroup_id){
      state.subgroup_id = subgroup_id;
    }
  },
  actions: {
  },
  modules: {
  }
})
