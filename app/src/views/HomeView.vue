<template>
    <div class="home">
        <my-header/>
        <my-upper-block/>
        <lesson-list/>
    </div>
</template>

<script>
import LessonList from "@/components/NearestLessonList.vue";
import MyUpperBlock from "@/components/UI/MyUpperBlock.vue";
import MyHeader from "@/components/UI/MyHeader.vue";

export default {
    name: 'HomeView',
    components: {
        MyHeader,
        MyUpperBlock,
        LessonList
    },
}
</script>
