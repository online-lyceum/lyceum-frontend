<template>
    <div>
        <div class="my-card">
            <div class="upper-block">
                <div class="day-of-week" style="color: #000">{{ weekday_names[currentWeekday] }}</div>
                <a href="#schedule" class="schedule">Расписание</a>
            </div>
            <ul>
                <li v-for="lesson in lesson_list" :key="lesson.lesson_id">
                    <p :class="(checkCurrentTime(lesson.start_time.hour, lesson.start_time.minute,
                    lesson.end_time.hour, lesson.end_time.minute)) ? 'realtime-subject' : 'subject'">
                        {{ lesson.name }}
                        {{
                        lesson.start_time.hour
                        }}:{{
                        (lesson.start_time.minute < 10 ? '0' : '') + lesson.start_time.minute
                        }} -
                        {{
                        lesson.end_time.hour
                        }}:{{
                        (lesson.end_time.minute < 10 ? '0' : '') + lesson.end_time.minute
                        }}
                    </p>
                </li>
            </ul>
        </div>
        <MyEvent></MyEvent>
    </div>
</template>

<script>
import axios from "axios";
import MyEvent from "@/components/UI/MyEvent.vue";

export default {
    components: {MyEvent},
    data() {
        return {
            lesson_list: [],
            weekday_names: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
            currentWeekday: null
        }
    },
    methods: {
        async showList() {
            await axios.get("https://lyceumland.ru/api/lessons/nearest_day",
                {
                    params: {
                        subgroup_id: this.$store.state.subgroupID
                    }
                })
                .then(
                    async (res) => {
                        this.lesson_list = await res.data.lessons
                    })
            this.lesson_list.length !== 0 ? this.currentWeekday = this.lesson_list[0].weekday : this.currentWeekday = null
        },
        checkCurrentTime(startTimeHours, startTimeMinutes, endTimeHours, endTimeMinutes) {
            let currentDate = new Date();
            return currentDate.getHours() >= startTimeHours &&
                currentDate.getHours() <= endTimeHours &&
                currentDate.getMinutes() >= startTimeMinutes &&
                currentDate.getMinutes() <= endTimeMinutes
        },
    },
    props: {},
    mounted() {
        this.showList()
    }
}
</script>

<style scoped>
.my-card {
    color: #ffffff;
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
/* upper-block */

.upper-block {
    display: flex;

    margin: 0 12px 32px;

    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);

    justify-content: space-between;
}

.day-of-week {
    width: 50%;
    padding: 10px 0;

    text-align: center;

    border-radius: 16px;
    background-color: white;
}

.schedule {
    width: 50%;
    padding: 10px 10px;

    text-align: center;

    color: #fff;
    border-radius: 16px;
    background-color: #6d9773;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
}

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
    padding: 16px 14px 20px 14px;

    color: white;
    border-radius: 16px;
    background-color: #6d9773;

    justify-content: space-between;
}

.realtime-subject h3 {
    color: #ffc936;
}

.realtime-subject time span {
    color: #ffc936;
}

.description-subject {
    display: flex;

    border-bottom: 1px solid #fff;

    justify-content: space-between;
}

/* 	aside */

aside {
    margin: 32px 14px 58px;

    text-align: center;

    border-radius: 16px;
    background-color: #fff;
}

aside img {
    width: 100%;

    border-radius: 16px;
}

aside p {
    margin: 12px 0 19px;
}
</style>
