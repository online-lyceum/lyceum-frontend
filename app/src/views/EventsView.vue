<template>
    <my-header/>
    <div class="button-back">Назад</div>
    <section>
        <h3>День ничего не делания</h3>
        <p>Предлагаем скипнуть учёбу всем лицеем 25 апреля. Всех же сразу не отчислят?</p>
    </section>
    <section>
        <h3>Олимпиада<br> исторического факультета</h3>
        <p>Обязательно учавствуйте, иначе лицею не будут давать деньги и директор не сможет съездить на бали</p>
        <a class="link" href="#">На сайт олимпиады</a>
    </section>
</template>
<script>
import MyHeader from "@/components/UI/MyHeader.vue";

export default {
    name: "EventsView",
    components: {MyHeader}
}
</script>

<style scoped>
body {
    background: #0C3B2E;
    margin: 0 12px;
    font-family: sans-serif;
}

header {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    background-color: #FFFFFF;
    border-radius: 0 0 16px 16px;
    text-align: center;
    height: 50px;
}

.button-back {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #6D9773;
    border-radius: 16px;
    margin-top: 30px;
    height: 40px;
    text-align: center;
    font-size: 16px;
    color: white;
}

h3 {
    text-align: center;
    font-size: 24px;
    font-weight: 200;
}

p {
    font-size: 16px;
    margin: 0 22.54px 10px;
}

section {
    margin: 30px 0;
    background: white;
    border-radius: 16px;
}

.link {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: #6D9773;
    text-decoration: none;
    border-radius: 16px;
    text-align: center;
    height: 40px;
}
</style>