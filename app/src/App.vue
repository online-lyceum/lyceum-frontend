 <template>
    <my-header/>
    <router-view/>
</template>

<script>
import MyHeader from "@/components/UI/MyHeader.vue"

import MyButton from "@/components/UI/MyButton.vue"


export default {
    name: "App",
    components: {MyButton, MyHeader},
    beforeMount() {
        document.title = "Лицей в Цифре"
        this.$store.commit('initialiseVars')
        if (this.$store.state.subgroupID !== undefined &&
            this.$store.state.subgroupID !== "" &&
            this.$store.state.subgroupID !== null) {
            this.$router.push('/home')
        } else {
            this.$router.push('/')
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
    text-align: center;
}

body {
    padding-top: 0;
    margin: 0;
    background-color: #0C3B2E;
}
</style>
