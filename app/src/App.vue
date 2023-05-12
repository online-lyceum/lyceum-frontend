<template>
    <div id="app">
        <div class="app-content">
            <router-view/>
        </div>
    </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue"


export default {
    name: "App",
    components: {MyButton},
    async beforeCreate() {
        this.$store.commit('initialiseVars')
        if (
            this.$store.state.subgroupID !== undefined &&
            this.$store.state.subgroupID !== "" &&
            this.$store.state.subgroupID !== null &&
            this.$store.state.subgroupID === this.$store.state.subgroupID
        ) {
            this.$router.push('/home')
        } else {
            console.log("subgroupID equals null")
            this.$router.push('/')
        }
    },
    beforeMount() {
        document.title = "Лицей в Цифре"
    }
}
</script>
<style>
#app {
    /*font-family: 'Open Sans', sans-serif;*/
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    margin: 0 auto;
    max-width: 700px;
}

.app-content {
    margin: 0 12px;
}


body {
    padding: 0;
    margin: 0;
    background-color: #0C3B2E;
}

</style>
