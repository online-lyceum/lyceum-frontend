<template>
    <my-header disabled/>
    <div class="home">
        <select-school/>
    </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";
import SelectSchool from "@/components/SelectSchool.vue";

export default {
    name: 'StartView',
    components: {
        SelectSchool, MyHeader
    },
    beforeMount() {
        this.$store.state.isAnotherClassShow = false
    },
}
</script>
