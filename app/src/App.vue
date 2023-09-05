<template>
  <div id="app">
    <div class="app-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue"
import AuthView from "@/views/AuthView.vue";
import axios from "axios";

export default {
  name: "App",
  components: {AuthView, MyButton},
  async beforeCreate() {
    this.$store.commit('initialiseVars')
    if (
        this.$store.state.subgroupID !== undefined &&
        this.$store.state.subgroupID !== "" &&
        this.$store.state.subgroupID !== null &&
        this.$store.state.subgroupID === this.$store.state.subgroupID &&
        await this.isTokenValid()
    ) {
      this.$router.push('/home')
    } else {
      console.log("subgroupID equals null")
    }
  },
  async isTokenValid() {
    try {
      await axios.get(this.$store.state.TIME_API + "/users/me")
    } catch (e) {
      console.log(e)
      return false
    }
    return true
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
