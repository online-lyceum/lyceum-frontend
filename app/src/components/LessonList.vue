<template>
    <div>
        <div class="my-card">
            <main>
                <ul>
                    <li
                            v-for="lesson in lesson_list" :key="lesson.lesson_id"
                            :class="(checkCurrentTime(lesson.start_time.hour, lesson.start_time.minute,
                    lesson.end_time.hour, lesson.end_time.minute)) ? 'realtime-subject' : 'subject'"
                    >
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
        </div>
    </div>
</template>

<script>
import axios from "axios";
import MyEvent from "@/components/UI/MyEvent.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyUpperBlock from "@/components/UI/MyUpperBlock.vue";

export default {
    components: {MyUpperBlock, MyButton, MyEvent},
    data() {
        return {
            lesson_list: [],
            weekday_names: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
            currentWeekday: null
        }
    },
    methods: {
        async showList() {
            await axios.get("https://dev.lyceumland.ru/api/lessons/nearest_day",
                {
                    params: {
                        subgroup_id: this.$store.state.subgroupID
                    }
                })
                .then(
                    async (res) => {
                        this.lesson_list = await res.data.lessons
                    })
        },
        //TODO: make this fun work
        checkCurrentTime(startTimeHours, startTimeMinutes, endTimeHours, endTimeMinutes) {
            let currentDate = new Date();
            let res =  currentDate.getHours() >= startTimeHours &&
                currentDate.getHours() <= endTimeHours &&
                currentDate.getMinutes() >= startTimeMinutes &&
                currentDate.getMinutes() <= endTimeMinutes;
            return res;
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
    padding: 0 10px;

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
</style>
