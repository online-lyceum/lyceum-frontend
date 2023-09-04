<template>
  <div class="content">
    <my-header/>
    <div class="title_box">
      <h1 class="title">Вход в аккаунт</h1>
    </div>
    <auth/>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import Auth from "@/components/Auth.vue";

export default {
  name: "AuthView",
  components: {Auth, MyHeader}
}
</script>

<style scoped>
.title_box {
  color: white;
  display: flex;
  height: 250px;
}

.title {
  margin: auto;
  font-weight: 100;
}
</style>