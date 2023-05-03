<template>
    <a style="text-decoration: none;" href="#openModal">
        <header class="block">
            <span class="my-header" style="color: #000; text-decoration: none"><span
                    class="menu-symbol">≡</span> ЛИЦЕЙ В ЦИФРЕ</span>
        </header>
    </a>
    <div id="openModal" class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Лицей в цифре</h3>
                    <a href="#" title="Close" class="close">×</a>
                </div>
                <div class="modal-body">
                    <a class="links-a" @click="$router.push('/home')" href="#">
                        <div class="links">Главная</div>
                    </a>
                    <a class="links-a" @click="$router.push('/schedule');
                    this.$store.state.isAnotherClassShow = false"
                       href="#">
                        <div class="links">Расписание</div>
                    </a>
                    <a class="links-a" href="#openQuestionModal">
                        <div class="links">Сменить школу и класс</div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div id="openQuestionModal" class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Лицей в цифре</h3>
                    <a href="#" title="Close" class="close">×</a>
                </div>
                <div class="modal-body">
                    <p>Вы действительно хотите сменить школу и класс?</p>
                    <a class="links-a" href="#">
                        <div class="links">Отмена</div>
                    </a>
                    <a class="links-a" @click="$store.commit('logout'); $router.push('/')" href="#">
                        <div class="links">Сменить</div>
                    </a>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
import SelectSubgroup from "@/components/SelectSubgroup.vue";
import SelectSchool from "@/components/SelectSchool.vue";

export default {
    components: {SelectSchool, SelectSubgroup}
}
</script>

<style scoped>

.block {
    /*flex-direction: row;*/
    display: flex;
    background-color: #fff;
    align-items: center;
    justify-content: center;
}

.links {
    border-radius: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
    margin: 10px;
    text-align: center;
    padding: 14px;
    background-color: #6d9773;
    color: #ffffff;
    text-decoration: none;
}

.links-a {
    color: #ffffff;
    text-decoration: none;
}

.links:focus, .links:hover {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    opacity: .75;
}

.my-header {
    margin: 0 12px;
    padding: 10px;
    background-color: white;
    border-radius: 0 0 16px 16px;
    text-decoration: none;
}

/* стилизация содержимого страницы */
body {
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #292b2c;
    background-color: #fff;
}

/* свойства модального окна по умолчанию */
.modal {

    text-align: center;
    position: fixed; /* фиксированное положение */
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5); /* цвет фона */
    z-index: 1050;
    opacity: 0; /* по умолчанию модальное окно прозрачно */
    -webkit-transition: opacity 200ms ease-in;
    -moz-transition: opacity 200ms ease-in;
    transition: opacity 200ms ease-in; /* анимация перехода */
    pointer-events: none; /* элемент невидим для событий мыши */
    margin: 0;
    padding: 0;
}

/* при отображении модального окно */
.modal:target {
    opacity: 1; /* делаем окно видимым */
    pointer-events: auto; /* элемент видим для событий мыши */
    overflow-y: auto; /* добавляем прокрутку по y, когда элемент не помещается на страницу */
}

/* ширина модального окна и его отступы от экрана */
.modal-dialog {
    position: relative;
    width: auto;
    margin: 10px;
}

@media (min-width: 576px) {
    .modal-dialog {
        max-width: 500px;
        margin: 30px auto; /* для отображения модального окна по центру */
    }
}

/* свойства для блока, содержащего контент модального окна */
.modal-content {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    background-color: #fff;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: .3rem;
    outline: 0;
}

@media (min-width: 768px) {
    .modal-content {
        -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
        box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    }
}

/* свойства для заголовка модального окна */
.modal-header {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #eceeef;
}

.modal-title {
    margin-top: 0;
    margin-bottom: 0;
    line-height: 1.5;
    font-size: 1.25rem;
    font-weight: 500;
}

/* свойства для кнопки "Закрыть" */
.close {
    float: right;
    font-family: sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
    text-decoration: none;
}

/* свойства для кнопки "Закрыть" при нахождении её в фокусе или наведении */
.close:focus, .close:hover {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    opacity: .75;
}

/* свойства для блока, содержащего основное содержимое окна */
.modal-body {
    position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 15px;
    overflow: auto;
}

header {
    font-size: 16px;

    height: 50px;
    margin: 0 12px 30px;

    text-align: center;

    border-radius: 0 0 16px 16px;
    background-color: #fff;
}

.menu-symbol {
    font-size: larger;
}
</style>