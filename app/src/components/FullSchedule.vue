<template>
    <div>
        <my-button @click="$router.push('/home')">Назад</my-button>
        <div class="lesson-list-content">
            <!--            TODO: window to choose class-->
            <div class="current-class" style="color: #000">Ваш класс</div>
            <a
                    class="other-class"
                    href="#openChangeModal"
                    @click="setAnotherClassShowTrue()"
            >
                Другие классы
            </a>
        </div>
        <div id="openChangeModal" class="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Лицей в цифре</h3>
                        <a href="#" title="Close" class="close">×</a>
                    </div>
                    <div class="modal-body">
                        <select-subgroup :school_id="$route.params.school_id" @click="showList()"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="lesson-list-content">
            <button class="btnDay" :class="{
                'btnDaySelected' : checkCurrentDay(0),
                'btnDayToday' : checkTodayDay(0),
            }" @click="this.chosenDay = 0; showList()">Пн
            </button>
            <button class="btnDay" :class="{
                'btnDaySelected' : checkCurrentDay(1),
                'btnDayToday' : checkTodayDay(1),
            }" @click="this.chosenDay = 1; showList()">Вт
            </button>
            <button class="btnDay" :class="{
                'btnDaySelected' : checkCurrentDay(2),
                'btnDayToday' : checkTodayDay(2),
            }" @click="this.chosenDay = 2; showList()">Ср
            </button>
            <button class="btnDay" :class="{
                'btnDaySelected' : checkCurrentDay(3),
                'btnDayToday' : checkTodayDay(3),
            }" @click="this.chosenDay = 3; showList()">Чт
            </button>
            <button class="btnDay" :class="{
                'btnDaySelected' : checkCurrentDay(4),
                'btnDayToday' : checkTodayDay(4),
            }" @click="this.chosenDay = 4; showList()">Пт
            </button>
            <button class="btnDay" :class="{
                'btnDaySelected' : checkCurrentDay(5),
                'btnDayToday' : checkTodayDay(5),
            }" @click="this.chosenDay = 5; showList()">Сб
            </button>
        </div>
        <my-loader v-if="isLoading()"></my-loader>
        <lesson-list v-else :lesson-list="lesson_list"></lesson-list>
    </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import LessonList from "@/components/LessonList.vue";
import axios from "axios";
import SelectSubgroup from "@/components/SelectSubgroup.vue";
import MyLoader from "@/components/UI/MyLoader.vue";

export default {
    components: {MyLoader, SelectSubgroup, LessonList, MyButton},
    data() {
        return {
            chosenDay: null,
            lesson_list: [],
            currentClass: "",
            weekday_names: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
        }
    },
    methods: {
        getWeekDay() {
            let a = new Date()
            this.chosenDay = (a.getDay() + 6) % 7

        },
        async showList() {
            await axios.get(`${this.$store.state.TIME_API}/lessons`,
                {
                    params: {
                        subgroup_id: (this.$store.state.isAnotherClassShow) ?
                            this.$store.state.anotherSubgroupID : this.$store.state.subgroupID,
                        weekday: (this.chosenDay === 6) ? 0 : this.chosenDay,
                        do_double: true,
                    }
                })
                .then(
                    async (res) => {
                        this.lesson_list = await res.data.lessons
                        this.currentClass = this.lesson_list[0].lesson_id
                    })
                .catch(
                    this.$store.commit('initialiseVars')
                )
        },
        getCurrentTimeClass(startTimeHours, startTimeMinutes, endTimeHours, endTimeMinutes) {
            if (this.chosenDay !== new Date().getDay() - 1)
                return 'subject'
            if (startTimeHours < 10) {
                startTimeHours = `0${startTimeHours}`
            }
            if (startTimeMinutes < 10) {
                startTimeMinutes = `0${startTimeMinutes}`
            }
            if (endTimeHours < 10) {
                endTimeHours = `0${endTimeHours}`
            }
            if (endTimeMinutes < 10) {
                endTimeMinutes = `0${endTimeMinutes}`
            }
            let currentDate = new Date()
            let hours = currentDate.getHours()
            let minutes = currentDate.getMinutes()
            let dateToday = new Date(0, 0, 0, hours, minutes, 0, 0)
            let lessonStarts = new Date(0, 0, 0, startTimeHours, startTimeMinutes, 0, 0)
            let lessonEnds = new Date(0, 0, 0, endTimeHours, endTimeMinutes, 0, 0)
            let res = (dateToday <= lessonEnds && dateToday >= lessonStarts)
            return (res) ? "realtime-subject" : "subject"
        },
        isLoading() {
            //обработка на наличие ошибки + добавить это в выбор школы и мероприятие
            return (this.lesson_list.length === 0) ? "loader" : ""
        },
        setAnotherClassShowTrue() {
            this.$store.state.isAnotherClassShow = true
        },
        checkCurrentDay(day) {
            return this.chosenDay === day
        },
        checkTodayDay(today) {
            let a = new Date()
            return today === (a.getDay() + 6) % 7
        }
    },
    mounted() {
        this.getWeekDay()
        this.showList()
    },
}
</script>

<style scoped>

.btnDay {
    width: 50%;
    padding: 10px 10px;

    text-align: center;

    color: #000;
    border-radius: 16px;
    border: none;
    background-color: #fff;
    font-size: 19px;
}

.btnDaySelected {
    background-color: #6d9773;
    color: white;
}

.btnDayToday {
    border: solid #6d9773 2px;
}

.lesson-list-content {
    display: flex;

    margin: 20px 0;

    border-radius: 16px;
    background-color: #fff;

    justify-content: space-between;
}

.current-class {
    width: 50%;
    padding: 10px 0;

    text-align: center;

    border-radius: 16px;
    background-color: white;
}

.other-class {
    width: 50%;
    padding: 10px 10px;

    text-align: center;

    color: #fff;
    border-radius: 16px;
    background-color: #6d9773;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
}


/* Global */

body {
    font-family: sans-serif;

    margin: 0;

    background-color: #0c3b2e;
}

a {
    text-decoration: none;
    color: black;
}

/* Main Page */
/* header */

header {
    font-size: 16px;

    height: 50px;
    margin: 0 12px 30px;

    text-align: center;

    border-radius: 0 0 16px 16px;
    background-color: #fff;
}

/* Content */
/* main */

h3 {
    font-size: 20px;
    font-weight: normal;

    margin: 0;
}

time {
    font-size: 19px;
}

h2 {
    font-size: 16px;
    font-weight: normal;

    margin: 0;
}

main {
    display: flex;
    flex-direction: column;

    height: auto;

    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
}

.subject {
    display: flex;

    padding: 16px 14px 5px 14px;

    justify-content: space-between;

    border-bottom: 1px solid black;
}

.realtime-subject {
    display: flex;

    padding: 16px 14px 20px 14px;

    color: white;
    border-radius: 16px;
    background-color: #6d9773;

    justify-content: space-between;
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
        max-width: 1000px;
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

</style>