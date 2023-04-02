<template>
    <div class="home">
        <div class="day">
            <h2></h2>
        </div>

        <lesson-list/>
    </div>
</template>

<script>
import LessonList from "@/components/LessonList.vue";

export default {
    name: 'HomeView',
    components: {
        LessonList,
    },
}
</script>
