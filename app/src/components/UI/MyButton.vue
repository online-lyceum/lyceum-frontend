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
  background: #6D9773;
  margin: 0;
  padding: 10px;
  padding-left: 40px;
  padding-right: 40px;
  border: none;
  border-radius: 16px;
  color: white;
}

.field-btn {
  text-align: center;
}

.btn:disabled {
  background: #D63D6D;
}
</style>
