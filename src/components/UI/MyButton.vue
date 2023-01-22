<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "my-button"
}
</script>

<style scoped>
.btn {
    background: #6D9773;
    padding: 10px;
    padding-left: 40px;
    padding-right: 40px;
    border: none;
    border-radius: 16px;
    color: white;
}
</style>