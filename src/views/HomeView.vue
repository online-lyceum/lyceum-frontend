<template>
    <div class="home">
    	<my-header/>
        <h1 style="color: white;">Home for {{ $store.state.subgroup_id}}</h1>
        <lesson-list/>
    </div>
</template>

<script>
import LessonList from "@/components/LessonList.vue";
import MyHeader from "@/components/UI/MyHeader.vue";

export default {
    name: 'HomeView',
    components: {
        LessonList,
	MyHeader
    }
}
</script>
