import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        subgroupID: null,
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
            if (localStorage.getItem('subgroup_id')) {
                let subgroupID = JSON.parse(localStorage.subgroup_id)
                if (subgroupID !== '' && subgroupID !== null && subgroupID !== undefined) {
                    let data = await axios.get(`${state.TIME_API}/subgroups/${subgroupID}`)
                    if (data.status !== 200) {
                        console.log("Logout by deprecated subgroupID in localStorage")
                        return
                    }
                }
                state.subgroupID = subgroupID
            }
        },
        setSubgroupID(state, subgroup_id) {
            state.subgroupID = subgroup_id
        },
        setAnotherSubgroupID(state, subgroup_id){
            state.anotherSubgroupID = subgroup_id
        },
        logout(state) {
            state.subgroupID = null
        },
        setNearestDayIndex(state, day){
            state.nearestDayIndex = day
        }
    },
    actions: {},
    modules: {}
})
