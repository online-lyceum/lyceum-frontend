<template>
      <div>
          <full-schedule></full-schedule>
      </div>
</template>

<script>
import MyButton from "@/App.vue";
import LessonList from "@/components/LessonList.vue";
import FullSchedule from "@/components/FullSchedule.vue";

export default {
    name: "ScheduleView",
    components: {FullSchedule, MyButton}
}
</script>

<style scoped>

</style>