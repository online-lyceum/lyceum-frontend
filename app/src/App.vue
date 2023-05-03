 <template>
    <my-header/>
    <router-view/>
</template>

<script>
import MyHeader from "@/components/UI/MyHeader.vue"

import MyButton from "@/components/UI/MyButton.vue"
import axios from "axios";


export default {
    name: "App",
    components: {MyButton, MyHeader},
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
        async checkSubgroupID(){
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

body {
    padding-top: 0;
    margin: 0;
    background-color: #0C3B2E;
}
</style>
