<template>
    <div>
        <div class="my-card">
            <h3>{{ weekday_names[weekday] }}</h3>
            <ul>
                <li v-for="lesson in lesson_list.filter(l => l.weekday === weekday)" :key="lesson.lesson_id">
                    <p>
                        {{ lesson.name }}
                        {{
                            lesson.start_time.hour
                        }}:{{ (lesson.start_time.minute < 10 ? '0' : '') + lesson.start_time.minute }} -
                        {{
                            lesson.end_time.hour
                        }}:{{ (lesson.end_time.minute < 10 ? '0' : '') + lesson.end_time.minute }}
                    </p>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import axios from "axios";


export default {
    data() {
        return {
            lesson_list: [],
            weekdays: [0, 1, 2, 3, 4, 5, 6],
            weekday_names: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
        }
    },
    methods: {
        async showList() {
            let res = {}
            if (this.weekday !== null){
                res = await axios.get("https://lyceumland.ru/api/lessons",
                    {
                        subgroup_id: this.$store.state.subgroup_id,
                        weekday: this.weekday
                    });
            }
            if (res.status === 200) {
                const json_res = await res.json();

                this.lesson_list = json_res.lessons;
            } else {
                this.lesson_list = [];
            }
            console.log(this.lesson_list);
        }
    },
    props: {
        weekday: {
            type: [Number, null],
            default: null
        }
    },
    mounted() {
        this.showList();
    }
}
</script>

<style>
</style>
