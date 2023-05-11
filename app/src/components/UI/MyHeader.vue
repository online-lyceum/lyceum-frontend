<template>
    <div v-if="isOpen" class="backdrop" @click="close">
        <div v-if="isConfirmPopup" class="popup" @click.stop>
            <h3>Вы действительно хотите сменить школу и класс?</h3>
            <div class="footer">
                <a @click="close(); closeConfirmPopup()">
                    <div class="link">Отмена</div>
                </a>
                <a @click="$store.commit('logout'); $router.push('/'); close(); closeConfirmPopup()">
                    <div class="link">Сменить</div>
                </a>
            </div>
        </div>


        <div v-else class="popup" @click.stop>
            <h3>Лицей в Цифре</h3>
            <div class="footer">
                <a @click="$router.push('/home'); close()">
                    <div class="link">Главная</div>
                </a>
                <a @click="$router.push('/schedule');
                    this.$store.state.isAnotherClassShow = false; close()">
                    <div class="link">Расписание</div>
                </a>
                <a>
                    <div class="link"
                         :is-open="isPopupOpen"
                         @close="isPopupOpen = false"
                         @click="openConfirmPopup(); openPopup()"
                    >Сменить школу и класс</div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {isPopupOpen: false, isConfirmPopup: false};
    },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        isConfirm: {
            type: Boolean,
            required: true
        }
    },
    emits: {
        ok: null,
        close: null,
    },

    mounted() {
        document.addEventListener("keydown", this.handleKeydown);
    },
    beforeUnmount() {
        document.removeEventListener("keydown", this.handleKeydown);
    },

    methods: {
        openPopup() {
            this.isPopupOpen = true;
        },
        openConfirmPopup(){
            this.isConfirmPopup = true;
        },
        closeConfirmPopup(){
            this.isConfirmPopup = false;
        },

        handleKeydown(e) {
            if (this.isOpen && e.key === "Escape") {
                this.close();
            }
        },

        close() {
            this.$emit("close");
        },
        confirm() {
            this.$emit("ok");
        },
    },
};
</script>

<style>
.popup {
    padding: 20px;
    background-color: white;
    border-radius: 0 0 16px 16px;
    position: relative;
    margin: 0 auto;
    max-width: 638px;
}

.popup h3 {
    margin-top: 0;
    margin-bottom: 30px;
    line-height: 1.5;
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
}

.link {
    border-radius: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
    margin: 10px;
    text-align: center;
    padding: 14px;
    background-color: #6d9773;
    color: #ffffff;
    text-decoration: none;
}
.link:hover{
    background-color: #405b44;
}

.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 100;
}

.footer {
    text-align: center;
}
</style>
