<template>
  <div class="content">
    <div class="white_box">
      <div class="input_container">
        <input class="auth_input" placeholder="Логин" v-model="username">
        <input class="auth_input" placeholder="Пароль" v-model="password">
      </div>
      <my-button class="btn" @click="login()">Войти</my-button>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";

export default {
  name: "Auth",
  components: {MyButton},
  data() {
    return {
      username: null,
      password: null
    }
  },
  mounted() {
    if (this.$store.state.token !== undefined) {
      this.$router.push('/')
    }
  },
  methods: {
    async login() {
      let login_data;
      try {
        login_data = await axios.post(
            this.$store.state.TIME_API + "/login",
            {
              username: this.username,
              password: this.password,
            },
            {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
        );
      } catch {
        console.log("ERR")
        return;
      }
      this.$store.commit(
          "setToken",
          login_data.data.token_type + " " + login_data.data.access_token
      );
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.white_box {
  position: relative;
  border-radius: 16px;
  width: 95vw;
  height: 25vh;
  background: #fff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.25);
}

.input_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 50%;
  margin-top: 32px;
}

.btn {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 10%;
}

.auth_input {
  width: 70%;
  height: 32px;
  border-radius: 11px;
  border: 3px solid #6D9773;
  padding: 0 20px;
}
</style>