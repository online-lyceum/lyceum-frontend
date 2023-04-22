<template>
    <div class="home">
        <select-school/>
    </div>
</template>

<script>
import SelectSchool from "@/components/SelectSchool.vue";

export default {
    name: 'StartView',
    components: {
        SelectSchool
    },
    beforeMount() {
        this.$store.state.isAnotherClassShow = false
    },
}
</script>
