<template>
    <header class="block" @click="openPopup">
            <span class="my-header"
                  style="color: #000; text-decoration: none"
            >
                <span v-if="!disabled" class="menu-symbol">≡</span>
                ЛИЦЕЙ В ЦИФРЕ
            </span>
    </header>
    <my-header-popup
            :is-open="isPopupOpen"
            @close="isPopupOpen = false"
            is-confirm>
    </my-header-popup>
</template>
<script>

import {defineComponent} from "vue";
import MyHeaderPopup from "@/components/UI/MyHeaderPopup.vue";

export default defineComponent({
    components: {MyHeaderPopup},
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {isPopupOpen: false, isConfirm: false};
    },
    methods: {
        openPopup(){
            if (!this.disabled){
                this.isPopupOpen = true
            }
        }
    }
})
</script>

<style scoped>

.block {
    display: flex;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    border-radius: 0 0 16px 16px;
}

.my-header {
    margin: 0 12px;
    padding: 10px;
    background-color: white;
    border-radius: 0 0 16px 16px;
    text-decoration: none;
}

.menu-symbol {
    font-size: larger;
}
</style>