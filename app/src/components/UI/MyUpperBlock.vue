<template>
    <div style="color: #FFFFFF">
        <div class="lesson-list-content">
            <div class="day-of-week" style="color: #000">{{ this.weekday_names[this.$store.state.nearestDayIndex] }}</div>
            <a
                class="scheduleBtn"
                @click="$router.push('/schedule'); this.$store.state.isAnotherClassShow = false"
            >
                Полное расписание
            </a>
        </div>
    </div>

</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
    name: "MyUpperBlock",
    components: {MyButton},
    data(){
       return{
           weekday_names: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
       }
    },
}
</script>

<style scoped>
.lesson-list-content {
    display: flex;

    margin: 32px 0;

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
.scheduleBtn {
    width: 50%;
    padding: 10px 10px;
    text-align: center;
    color: #fff;
    border-radius: 16px;
    background-color: #6d9773;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
}
</style>