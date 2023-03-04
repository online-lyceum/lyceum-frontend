<template>
    <div class="home">
        <h1 style="color: white;">Home for {{ $store.state.subgroup_id}}</h1>
        <lesson-list/>
    </div>
</template>

<script>
import LessonList from "@/components/LessonList.vue";

export default {
    name: 'HomeView',
    components: {
        LessonList
    }
}
</script>
