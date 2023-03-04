<template>
    <my-header/>
    <MyButton/>
    <router-view/>
</template>

<script>
import MyHeader from "@/components/UI/MyHeader.vue";

import MyButton from "@/components/UI/MyButton.vue";


export default {
    name: "App",
    components: {MyButton, MyHeader},
    beforeMount() {
        this.$store.commit('initialiseVars')
        if (this.$store.state.subgroup_id !== undefined &&
            this.$store.state.subgroup_id !== "" &&
            this.$store.state.subgroup_id !== null) {
            this.$router.push('/home')
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
