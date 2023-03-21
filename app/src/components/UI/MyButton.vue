<template>
    <div class="field-btn">
        <div class="liceum">Лицей №2</div>
        <div class="adress">г.Иркутск, пер. Волконского, 7</div>
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
.adress {
    margin:10px 0;
}
.liceum {
    font-size: 20px;
}
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
    background-color: white;
    border-radius: 16px;
    margin: 30px 12px;
    text-align: center;
}
.btn:disabled{
    background: #D63D6D;
}
</style>