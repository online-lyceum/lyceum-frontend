import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


store.subscribe( (mutation, state) => {
    localStorage.setItem('subgroupID', JSON.stringify(state.subgroupID));
})

createApp(App).use(store).use(router).mount('#app')
