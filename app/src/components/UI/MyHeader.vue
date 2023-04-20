<template>
    <div class="block">
        <div class="my-header">ЛИЦЕЙ В ЦИФРЕ</div>
        <a href="#openModal" style="font-size: 20px; color: #000; text-decoration: none">(-)</a>
    </div>
        <div id="openModal" class="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Лицей в цифре</h3>
                        <a href="#" title="Close" class="close">×</a>
                    </div>
                    <div class="modal-body">
                        <a class="links" @click="$router.push('/home')" href="#">Главная</a><br><br><br>
                        <a class="links" @click="$router.push('/schedule')" href="#">Расписание</a><br><br><br>
                        <a class="links" @click="$store.commit('logout'); $router.push('/')" href="#">Сменить школу и класс</a>
                    </div>
                </div>
            </div>
        </div>

</template>


<script>
export default {}
</script>

<style scoped>

.block{
    /*flex-direction: row;*/
    display: flex;
    background-color: #fff;

    justify-content: space-between;
}

.links {
    color: #000;
    text-decoration: none;
    padding: 10px 10px;
    text-align: center;
    border-radius: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
    margin: 10px;
}
.links:focus, .links:hover {
    color: #000;
    text-decoration: none;
    cursor: pointer;
    opacity: .75;
}

.my-header {
    margin:0 12px;
    padding:10px;
    background-color: white;
    border-radius: 0 0 16px 16px;
}

/* стилизация содержимого страницы */
body {
    font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #292b2c;
    background-color: #fff;
}

/* свойства модального окна по умолчанию */
.modal {
    position: fixed; /* фиксированное положение */
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.5); /* цвет фона */
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
    border: 1px solid rgba(0,0,0,.2);
    border-radius: .3rem;
    outline: 0;
}
@media (min-width: 768px) {
    .modal-content {
        -webkit-box-shadow: 0 5px 15px rgba(0,0,0,.5);
        box-shadow: 0 5px 15px rgba(0,0,0,.5);
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
</style>