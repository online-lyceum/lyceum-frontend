<template>
    <div>
        <p-w-a-prompt></p-w-a-prompt>
        <div class="title_box">
            <h1 class="title">Привет!</h1>
        </div>
        <div class="my-card-store">
            <div class="my-card" v-for="school in schools" v-bind:key="school.school_id">
                <h3 class="lyceum-name">{{ school.name }}</h3>
                <p style="color: grey;">{{ school.address }}</p>

                <my-button
                        class="button"
                        @click="$router.push('/schools/' + school.school_id)"
                        :value="school.school_id"
                >
                    Выбрать
                </my-button>
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import PWAPrompt from "@/components/PWAPrompt.vue";

export default {
    components: {
        MyButton,
        PWAPrompt
    },
    data() {
        return {
            schools: [],
        }
    },
    mounted() {
        this.loadSchools()
    },
    methods: {
        async loadSchools() {
            const res = await fetch(`${this.$store.state.TIME_API}/schools`)
            if (res.status === 200) {
                const json_res = await res.json()
                this.schools = json_res['schools'];
            }
        },
        // async isAPIworks() {
        //     await fetch(`${this.$store.state.TIME_API}`)
        //         .then(null, () => {
        //             //Здесь будет заглушка
        //             return '1'
        //         })
        // },
    }

}
</script>

<style scoped>

.title_box {
    color: white;
    display: flex;
    height: 300px;
}

.title {
    margin: auto;
    font-weight: 200;
}

.my-card {
    background-color: #FFF;
    /*padding: 20px;*/
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    text-align: center;

}

.button {
    margin-top: 30px;
}

.lyceum-name {
    margin: 20px 0 0;
    font-weight: 400;
}

p {
    margin: 10px 0;
}

.my-card-store {
    display: flex;
    flex-direction: column;
}
</style>
