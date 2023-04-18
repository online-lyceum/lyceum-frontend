<template>
    <div>
        <button
                class="btn"
                @click="check()"
        >
            Назад
        </button>

        <div class="upper-block">
<!--            TODO: window to choose class-->
            <div class="current-class" style="color: #000">10 B</div>
            <button
                    class="other-class"
                    @click="$router.push('/about')"
            >
                Другие классы
            </button>
        </div>
        <div class="choose-day">
            <button @click="this.chosenDay = 0; showList()">Пн</button>
            <button @click="this.chosenDay = 1; showList()">Вт</button>
            <button @click="this.chosenDay = 2; showList()">Ср</button>
            <button @click="this.chosenDay = 3; showList()">Чт</button>
            <button @click="this.chosenDay = 4; showList()">Пт</button>
            <button @click="this.chosenDay = 5; showList()">Сб</button>
        </div>
        <div>
            <ul style="margin-top: 20px">
                <li v-for="lesson in lesson_list" :key="lesson.lesson_id" \>
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


            <lesson-list style="margin-top: 20px"></lesson-list>
        </div>
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
            lesson_list: []
        }
    },
    methods: {
        async showList() {
            await axios.get(`https://dev.lyceumland.ru/api/lessons?weekday=${this.chosenDay}`,
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
    },
    mounted() {
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

.upper-block {
    display: flex;

    margin: 0 12px 32px;

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

.choose-day {
    width: 50%;
    padding: 10px 0;
    display: flex;
    margin: auto;
    text-align: center;

    border-radius: 16px;
    background-color: white;
}

</style>