<template>
      <div>
          <my-header/>
          <full-schedule></full-schedule>
      </div>
</template>

<script>
import MyButton from "@/App.vue";
import FullSchedule from "@/components/FullSchedule.vue";
import MyHeader from "@/components/UI/MyHeader.vue";

export default {
    name: "ScheduleView",
    components: {MyHeader, FullSchedule, MyButton}
}
</script>

<style scoped>

</style>