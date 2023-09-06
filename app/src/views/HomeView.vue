<template>
  <div class="home">
    <my-header/>
    <my-upper-block/>
    <nearest-lesson-list/>
  </div>
</template>

<script>
import NearestLessonList from "@/components/NearestLessonList.vue";
import MyUpperBlock from "@/components/UI/MyUpperBlock.vue";
import MyHeader from "@/components/MyHeader.vue";

export default {
  name: 'HomeView',
  components: {
    MyHeader,
    MyUpperBlock,
    NearestLessonList
  },
}
</script>
