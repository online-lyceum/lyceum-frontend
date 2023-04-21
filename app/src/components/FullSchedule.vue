<template>
    <div>
        <div class="upper-block">
            <!--            TODO: window to choose class-->
            <div class="current-class" style="color: #000">Class</div>
            <button
                    class="other-class"
            >
                Другие классы
            </button>
        </div>
        <div class="choose-day">
            <button class="btnDay" @click="this.chosenDay = 0; showList()">Пн</button>
            <button class="btnDay" @click="this.chosenDay = 1; showList()">Вт</button>
            <button class="btnDay" @click="this.chosenDay = 2; showList()">Ср</button>
            <button class="btnDay" @click="this.chosenDay = 3; showList()">Чт</button>
            <button class="btnDay" @click="this.chosenDay = 4; showList()">Пт</button>
            <button class="btnDay" @click="this.chosenDay = 5; showList()">Сб</button>
        </div>
        <main>
            <ul style="margin-top: 20px">
                <li v-for="lesson in lesson_list" :key="lesson.lesson_id"
                    :class="isCurrentTime(lesson.start_time.hour, lesson.start_time.minute,
                    lesson.end_time.hour, lesson.end_time.minute)">
                    <h3>{{ lesson.name }}</h3>
                    <div>
                        <time>{{
                            lesson.start_time.hour
                            }}:{{
                            (lesson.start_time.minute < 10 ? '0' : '') + lesson.start_time.minute
                            }} -
                            {{
                            lesson.end_time.hour
                            }}:{{
                            (lesson.end_time.minute < 10 ? '0' : '') + lesson.end_time.minute
                            }}
                        </time>
                    </div>
                </li>
            </ul>
        </main>
        <button
                class="btn"
                @click="$router.back()"
        >
            Назад
        </button>
    </div>
</template>

<script>
import MyButton from "@/App.vue";
import LessonList from "@/components/LessonList.vue";
import axios from "axios";

export default {
    components: {LessonList, MyButton},
    data() {
        return {
            chosenDay: null,
            lesson_list: [],
            weekday_names: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
        }
    },
    methods: {
        getWeekDay() {
            let a = new Date()
            this.chosenDay = a.getDay() - 1

        },
        async showList() {
            await axios.get(`${this.$store.state.TIME_API}/lessons`,
                {
                    params: {
                        subgroup_id: this.$store.state.subgroupID,
                        weekday: this.chosenDay
                    }
                })
                .then(
                    async (res) => {
                        this.lesson_list = await res.data.lessons
                    })
        },
        isCurrentTime(startTimeHours, startTimeMinutes, endTimeHours, endTimeMinutes) {
            if (this.chosenDay !== new Date().getDay()-1)
                return 'subject'
            if (startTimeHours < 10){
                startTimeHours = `0${startTimeHours}`
            }
            if (startTimeMinutes < 10){
                startTimeMinutes = `0${startTimeMinutes}`
            }
            if (endTimeHours < 10){
                endTimeHours = `0${endTimeHours}`
            }
            if (endTimeMinutes < 10){
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
    },
    mounted() {
        this.getWeekDay()
        this.showList()
    }
}
</script>

<style scoped>
.btn {
    margin: 20px;
    width: 50%;
    padding: 10px 10px;

    text-align: center;

    color: #fff;
    border-radius: 16px;
    background-color: #6d9773;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
}

.btnDay {
    margin: 10px;
    width: 50%;
    padding: 10px 10px;

    text-align: center;

    color: #fff;
    border-radius: 16px;
    background-color: #6d9773;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
}

.btnDay:focus {
    background-color: #405b44;
}

.choose-day {
    width: 100%;
    padding: 10px 0;
    display: flex;
    margin: 0 0 20px 0;
    text-align: center;

    border-radius: 16px;
    background-color: white;
}

.upper-block {
    display: flex;

    margin: 20px 12px 20px;

    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);

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
    margin: 0 12px;

    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
}

.subject {
    display: flex;

    padding: 16px 14px 5px 14px;

    color: black;
    border-radius: 16px;
    background-color: #FFFFFF;

    justify-content: space-between;
}

.realtime-subject {

    display: flex;

    padding: 16px 14px 5px 14px;

    color: white;
    border-radius: 16px;
    background-color: #6d9773;

    justify-content: space-between;
}

/*.description-subject {*/
/*    display: flex;*/

/*    border-bottom: 1px solid #fff;*/

/*    justify-content: space-between;*/
/*}*/

</style>