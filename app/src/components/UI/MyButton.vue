<template>
  <div class="field-btn">
    <button class="btn">
      <slot>Выбрать</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "my-button"
}
</script>

<style scoped>
.btn {
  background: #6D9773;
  margin: 0;
  padding: 10px;
  padding-left: 40px;
  padding-right: 40px;
  margin-top: 10px;
  border: none;
  border-radius: 16px;
  color: white;
}

.field-btn {
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  text-align: center;
}

.btn:disabled {
  background: #D63D6D;
}
</style>
