<script setup>

</script>

<template>
    <div class="loader"></div>
</template>

<style scoped>
.loader {
    border: 10px solid #f3f3f3;
    border-top: 10px solid #888888;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    display: flex;
    margin: auto;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>