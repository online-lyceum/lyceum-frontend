<template>
    <my-header disabled/>
    <div class="home" style="margin-top: 20px">
        <select-subgroup :school_id="$route.params.school_id"/>
    </div>
    <div class="buttons_store">
        <my-button @click="$router.back()">Назад</my-button>
    </div>
</template>

<script>
import SelectSubgroup from "@/components/SelectSubgroup.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyHeader from "@/components/MyHeader.vue";

export default {
    name: 'HomeView',
    components: {
        MyHeader,
        MyButton,
        SelectSubgroup
    }
}
</script>

<style scoped>
.buttons_store {
    flex-direction: column;
    display: flex;
    padding: 20px 0;
}
</style>