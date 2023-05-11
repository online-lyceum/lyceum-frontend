<template>
    <div class="home">
        <div class="day">
            <h2></h2>
        </div>
        <my-upper-block></my-upper-block>
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
        LessonList,
    },
}
</script>
