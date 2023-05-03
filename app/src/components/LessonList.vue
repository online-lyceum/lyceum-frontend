<template>
    <div>
        <div>
            <div :class="isLoading()">
                <li v-for="lesson in lesson_list" :key="lesson.lesson_id[0]"
                     :class="getCurrentTimeClass(
                                lesson.start_time[0].hour, lesson.start_time[0].minute,
                                lesson.end_time[1].hour, lesson.end_time[1].minute)">
                    <div>
                        <h3>{{ lesson.name }}</h3>
                        <p>{{ lesson.room }}<br>{{ lesson.teacher.name }}</p>
                    </div>
                    <div>
                        <time v-for="i in [0, 1]">
                            {{
                            lesson.start_time[i].hour
                            }}:{{
                            (lesson.start_time[i].minute < 10 ? '0' : '') + lesson.start_time[i].minute
                            }} -
                            {{
                            lesson.end_time[i].hour
                            }}:{{
                            (lesson.end_time[i].minute < 10 ? '0' : '') + lesson.end_time[i].minute
                            }}<br>
                        </time>
                    </div>
                </li>
            </div>
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
        }
    },
    methods: {
        async showList() {
            await axios.get(`${this.$store.state.TIME_API}/lessons/nearest_day`,
                {
                    params: {
                        subgroup_id: this.$store.state.subgroupID,
                        do_double: true
                    }
                })
                .then(
                    async (res) => {
                        this.lesson_list = await res.data.lessons
                        this.$store.commit('setNearestDayIndex', this.lesson_list[0].weekday)
                    })
                .catch(
                    this.$store.commit('initialiseVars')
                )

        },
        getCurrentTimeClass(startTimeHours, startTimeMinutes, endTimeHours, endTimeMinutes) {
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
            return this.lesson_list.length === 0 ? "loader" : ""
        },
    },
    props: {},
    mounted() {
        this.showList()

    }
}
</script>

<style scoped>
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

/* main */

h3 {
    font-size: 20px;
    font-weight: normal;

    margin: 0;

    text-align: left;
}

p {
    margin: 12px 0 19px;
    text-align: left;
}

time {
    font-size: 19px;
    white-space: nowrap;

}

h2 {
    font-size: 16px;
    font-weight: normal;

    margin: 0;
}

.subject {
    display: flex;

    padding: 16px 14px 5px 14px;
    border-radius: 16px;
    border: 3px solid #6d9773;
    justify-content: space-between;

    height: auto;
    margin: 5px 12px;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
}

.realtime-subject {

    display: flex;
    /*треть число потестить 205 */
    padding: 16px 14px 20px 14px;
    border-radius: 16px;
    border: 3px solid #364b39;
    justify-content: space-between;

    color: white;
    height: auto;
    margin: 5px 12px;
    background: #6d9773;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
}

.realtime-subject h3 {
    color: #ffc936;
}

/*.realtime-subject time {
    color: #ffc936;
}*/

/* Loading Data */
.loader {
    border: 10px solid #f3f3f3; /* Light grey */
    border-top: 10px solid #888888;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    display: flex;
    margin: auto;
}

/*тест класса от лавра*/
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

.cut-text {
    overflow: hidden;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

/*.description-subject {*/
/*    display: flex;*/

/*    border-bottom: 1px solid #fff;*/

/*    justify-content: space-between;*/
/*}*/

</style>
