<template>
    <nav>
        <router-link to="/">Home</router-link>
        |
        <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
</template>

<script>
export default {
    name: "App",
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
    padding: 12px;
    padding-top: 0;
    margin: 0;
    background-color: #0C3B2E;
}
</style>
