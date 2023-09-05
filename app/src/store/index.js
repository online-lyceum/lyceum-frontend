import {createStore} from 'vuex'

export default createStore({
    state: {
        subgroupID: null,
        token: null,
        anotherSubgroupID: null,
        TIME_API: (process.env.VUE_APP_TIME_API_URL !== undefined) ? process.env.VUE_APP_TIME_API_URL : '/api',
        nearestDayIndex: null,
        isAnotherClassShow: null,
    },
    getters: {
        isLogin(state) {
            return state.subgroupID !== null
        },
    },
    mutations: {
        async initialiseVars(state) {
            if (localStorage.getItem('subgroupID')) {
                state.subgroupID = JSON.parse(localStorage.subgroupID)
            }
            if (localStorage.getItem('token')) {
                state.token = JSON.parse(localStorage.token)
            }
        },
        setToken(state, token) {
            state.token = token
        },
        setSubgroupID(state, subgroupID) {
            state.subgroupID = subgroupID
        },
        setAnotherSubgroupID(state, subgroupID){
            state.anotherSubgroupID = subgroupID
        },
        logout(state) {
            console.log('Log out')
            state.subgroupID = null
        },
        setNearestDayIndex(state, day){
            state.nearestDayIndex = day
        }
    },
    modules: {}
})
