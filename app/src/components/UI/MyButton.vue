<template>
  <div class="field-btn">
    <div class="btn">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-button"
}
</script>

<style scoped>
.btn {
  border: none;
  margin: 0;
}

.field-btn {
  padding: 10px 40px;
  background: #6D9773;
  text-align: center;
  border-radius: 16px;
  color: white;
}

.btn:disabled {
  background: #D63D6D;
}
</style>
