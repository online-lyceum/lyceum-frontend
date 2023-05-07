<template>
    <div>
        <my-loader v-if="isLoading()"></my-loader>
        <lesson-list :lesson-list="lesson_list"/>
    </div>
</template>

<script>
import axios from "axios";
import MyEvent from "@/components/UI/MyEvent.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyUpperBlock from "@/components/UI/MyUpperBlock.vue";
import MyLoader from "@/components/UI/MyLoader.vue";
import LessonList from "@/components/LessonList.vue";

export default {
    components: {LessonList, MyLoader, MyUpperBlock, MyButton, MyEvent},
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
                    () => {
                        this.$store.commit('logout')
                        this.$router.push('/')
                    }
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
            return this.lesson_list.length === 0
        },
    },
    created() {
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

/* Content */


/* main */

h3 {
    font-size: 20px;
    font-weight: normal;

    margin: 0;
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

.realtime-subject h3 {
    color: #ffc936;
}

.realtime-subject time span {
    color: #ffc936;
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

.cut-text {
    overflow: hidden;
}

</style>
