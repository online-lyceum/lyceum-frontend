<template>
    <div v-if="shown" class="my-card">
        <p>Установить мобильное приложение?</p>
        <div class="btns">
            <my-button @click="installPWA()">
                Да, установить!
            </my-button>
        </div>
    </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
    components: {MyButton},
    data: () => ({
        shown: false,
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
}
.btns {
    display: flex;
    flex-direction: column;
}
.btn {
    width: 50%;
    padding: 10px 10px;
    text-align: center;
    color: #fff;
    border-radius: 16px;
    border: none;
    background-color: #6d9773;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
}
</style>