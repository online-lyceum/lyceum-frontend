<template>
    <div v-if="shown && !isError" class="my-card">
        <p>Установить мобильное приложение?</p>
        <div class="btns">
            <my-button class="button" @click="installPWA()">
                Установить!
            </my-button>
            <my-button class="button" @click="dismissPrompt()">Нет, спасибо</my-button>
        </div>
    </div>
    <div class="my-card" v-if="isError">
        <p style="padding: 20px">Произошла ошибка, возможно, ваше устройство не поддерживается</p>
    </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
    components: {MyButton},
    data: () => ({
        shown: true,
        isError: false
    }),

    beforeMount() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault()
            this.installEvent = e
            this.shown = false
        })
    },

    methods: {
        dismissPrompt() {
            this.shown = false
        },

        installPWA() {
            if (this.installEvent === undefined){
                this.dismissPrompt()
                this.isError = true
                return
            }
            this.installEvent.prompt()
            this.installEvent.userChoice.then((choice) => {
                this.dismissPrompt() // Hide the prompt once the user's clicked
                if (choice.outcome === 'accepted') {
                    // Do something additional if the user chose to install
                } else {
                    // Do something additional if the user declined
                }
            })
        },
    }
}
</script>
<style scoped>
.my-card {
    margin-top: 30px;
    background-color: #fff;
    border-radius: 16px;
    text-align: center;
}

.btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.button {
    width: 48%;
}
</style>