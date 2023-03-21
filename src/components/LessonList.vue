<template>
  <div>
    <div class="my-card">
      <h3>{{ weekday_names[currentWeekday] }}</h3>
      <ul>
        <li v-for="lesson in lesson_list" :key="lesson.lesson_id">
<!--          <p :style="new Date().getHours() >= lesson.start_time.hour &&-->
<!--          new Date().getHours() <= lesson.end_time.hour &&-->
<!--          new Date().getMinutes() >= lesson.start_time.minute &&-->
<!--          new Date().getMinutes() <= lesson.end_time.minute ? '{color: #ccc}' : '{color: #000}'"-->
<!--          >-->
          <p>
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

  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      lesson_list: [],
      weekday_names: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
      currentWeekday: null
    }
  },
  methods: {
    async showList() {
      await axios.get("https://lyceumland.ru/api/lessons/today",
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
    }
  },
  props: {},
  mounted() {
    this.showList();
  }
}
</script>

<style scoped>
.my-card {
  color: #ffffff;
}
</style>
