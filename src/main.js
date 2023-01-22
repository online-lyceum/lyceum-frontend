import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

store.subscribe( (mutation, state) => {
    localStorage.setItem('subgroup_id', JSON.stringify(state.subgroup_id));
})

createApp(App).use(store).use(router).mount('#app')