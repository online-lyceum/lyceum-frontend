<template>
    <header class="block">
            <span class="my-header"
                  style="color: #000; text-decoration: none"
                  @click="openPopup"
            >
                <span class="menu-symbol"
                      @click="openPopup">≡</span>
                ЛИЦЕЙ В ЦИФРЕ
            </span>
    </header>
    <my-header
            :is-open="isPopupOpen"
            @close="isPopupOpen = false"
            is-confirm>
    </my-header>
    <router-view/>
</template>

<script>
import MyHeader from "@/components/UI/MyHeader.vue"

import MyButton from "@/components/UI/MyButton.vue"
import axios from "axios";


export default {
    name: "App",
    components: {MyButton, MyHeader},
    data() {
        return {isPopupOpen: false, isConfirm: false};
    },
    async beforeCreate() {
        this.$store.commit('initialiseVars')
        if (this.$store.state.subgroupID !== undefined &&
            this.$store.state.subgroupID !== "" &&
            this.$store.state.subgroupID !== null) {
            this.$router.push('/home')
        } else {
            console.log("subgroupID equals null")
            this.$router.push('/')
        }
    },
    beforeMount() {
        document.title = "Лицей в Цифре"
    },
    methods: {
        openPopup() {
            this.isPopupOpen = true;
        },

        async checkSubgroupID() {
            if (this.$store.state.subgroupID !== '' &&
                this.$store.state.subgroupID !== null &&
                this.$store.state.subgroupID !== undefined) {
                let data = await axios.get(`${state.TIME_API}/subgroups/${subgroupID}`)
                if (data.status !== 200) {
                    console.log("Logout by deprecated subgroupID in localStorage")
                    this.$store.commit('logout')
                }
            }
        }
    }
}
</script>
<style>
#app {
    /*font-family: 'Open Sans', sans-serif;*/
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.block {
    display: flex;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    margin: 0 12px;
    border-radius: 0 0 16px 16px;
}

.my-header {
    margin: 0 12px;
    padding: 10px;
    background-color: white;
    border-radius: 0 0 16px 16px;
    text-decoration: none;
}

.menu-symbol {
    font-size: larger;
}

body {
    padding-top: 0;
    margin: 0;
    background-color: #0C3B2E;
}
</style>
