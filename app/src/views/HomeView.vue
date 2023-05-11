<template>
    <div class="home">
        <my-upper-block/>
        <lesson-list/>
    </div>
</template>

<script>
import LessonList from "@/components/NearestLessonList.vue";
import MyUpperBlock from "@/components/UI/MyUpperBlock.vue";

export default {
    name: 'HomeView',
    components: {
        MyUpperBlock,
        LessonList
    },
}
</script>
