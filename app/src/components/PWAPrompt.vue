<template>
    <div v-if="shown" class="my-card">
        <p>Добавить сайт на главный экран?</p>

        <div class="btns">
            <button class="btn" @click="installPWA()">
                Да, конечно!
            </button>

            <button style="margin-left: 12px" class="btn" @click="dismissPrompt">
                Нет, спасибо
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        shown: true,
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
    flex-direction: row;
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