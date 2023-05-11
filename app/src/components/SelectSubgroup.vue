<template>
    <div class="my-card">
        <form @submit.prevent>
            <div class="input_box">
                <div class="blocks">
                    <button @click="decreaseClassNum(); selectClass();" style="font-size: 50px">←</button>
                    <input
                            class="input"
                            @input="selectClass"
                            type="number"
                            v-model="class_number"
                    >
                    <button @click="increaseClassNum(); selectClass();" style="font-size: 50px">→</button>
                </div>

                <div class="blocks">
                    <button @click="decreaseClassLetter(); selectClass();" style="font-size: 50px">←</button>
                    <input
                            class="input"
                            @input="selectClass"
                            type="text"
                            v-model="class_letter"
                    >
                    <button @click="increaseClassLetter(); selectClass();" style="font-size: 50px">→</button>
                </div>

            </div>

            <select
                    class="select-input"
                    name="select_subgroup"
                    v-model="subgroupID"
                    v-if="need_to_select_subgroup"
            >
                <option
                        v-for="subgroup in subgroupsForClass"
                        :key="subgroup.subgroup_id"
                        :value="subgroup.subgroup_id"
                >
                    {{ subgroup.name }}
                </option>
            </select>


        </form>
        <a class="select-link" href="#">
            <my-button
                    @click="selectSubgroup()"
                    class="select-button"
            >
                {{
                subgroupID === null ?
                    'Выбирите класс и подгруппу' :
                    'Выбрать'
                }}
            </my-button>
        </a>
    </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";
import axios from "axios";

export default {
    components: {
        MyButton
    },
    data() {
        return {
            classNums: new Set(),
            classLetters: new Set(),
            letterIndex: 0,
            class_number: "",
            class_letter: "",
            subgroupID: null,
            schoolID: this.$route.params.schoolID,
            need_to_select_subgroup: false,
            subgroupsForClass: [],
            classes: [],
            subgroups: [],
            disabled: true
        }
    },
    async mounted() {
        await this.loadClasses()
        await this.loadSubgroups()
        this.getClassNumsLetters()
        await this.selectClass()
    },
    methods: {
        getClassNumsLetters() {
            for (let i = 0; i < this.classes.length; i++) {
                this.classNums.add(this.classes[i].number)
                this.classLetters.add(this.classes[i].letter)
            }
            this.classNums = [...this.classNums]
            this.classLetters = [...this.classLetters]
            this.class_number = this.classNums[0]
            this.class_letter = this.classLetters[this.letterIndex]
        },
        increaseClassNum() {
            if (this.class_number < this.classNums[this.classNums.length - 1]) {
                this.class_number++
            }
        },
        decreaseClassNum() {
            if (this.class_number > this.classNums[0]) {
                this.class_number--
            }
        },
        increaseClassLetter() {
            if (this.letterIndex < this.classLetters.length - 1) {
                this.letterIndex++
                this.class_letter = this.classLetters[this.letterIndex]
            }
        },
        decreaseClassLetter() {
            if (this.letterIndex > 0) {
                this.letterIndex--
                this.class_letter = this.classLetters[this.letterIndex]
            }
        },

        async selectClass() {
            let class_id = "";
            this.subgroupID = null;
            this.need_to_select_subgroup = false;

            for (let i = 0; i < this.classes.length; i++) {
                if ((this.class_number === this.classes[i].number) &&
                    (this.class_letter.toUpperCase() ===
                        this.classes[i].letter.toUpperCase())) {
                    class_id = this.classes[i].class_id
                }
            }
            if (class_id !== "" && class_id !== undefined) {
                const flt = (subgroup) => (subgroup.class_id === class_id)
                this.subgroupsForClass = this.subgroups.filter(flt)
                if (this.subgroupsForClass.length === 1) {
                    this.subgroupID = this.subgroupsForClass[0].subgroup_id
                    this.need_to_select_subgroup = false;
                } else if (this.subgroupsForClass.length > 1) {
                    this.subgroupID = this.subgroupsForClass[0].subgroup_id
                    this.need_to_select_subgroup = true;
                } else {
                    this.subgroupID = null;
                }
            } else {
                this.subgroupID = null;
                this.subgroupsForClass = [];
            }
        },
        async loadClasses() {
            try {
                const res = await axios.get(
                    `${this.$store.state.TIME_API}/classes`,
                    {
                        params: {school_id: this.schoolID}
                    }
                );
                this.classes = res.data.classes;
            } catch (e) {
                alert('Error');
                this.classes = []
            }
        },
        async loadSubgroups() {
            const res = await axios.get(
                `${this.$store.state.TIME_API}/subgroups`,
                {params: {school_id: this.schoolID}}
            )
            this.subgroups = res.data.subgroups
        },
        async selectSubgroup() {
            if (this.subgroupID !== null) {
                if (this.$store.state.isAnotherClassShow) {
                    this.$store.commit('setAnotherSubgroupID', this.subgroupID);
                    this.$router.push('/schedule');
                } else {
                    this.$store.commit('setSubgroupID', this.subgroupID);
                    this.$router.push('/home');
                }
            }
        }
    },
}
</script>

<style scoped>

form {
    padding-top: 40px;
}

.input_box {
    display: flex;
    background-color: #fff;
    align-items: center;
    justify-content: center;
}

.input {
    margin: 0 auto;
    width: 2em;
    text-align: center;
    font-size: 64px;
    font-weight: 100;
}

.select-button {
    margin-top: 50px;
}

.my-card {
    background-color: #FFF;
    /*padding: 20px;*/
    border-radius: 16px;
    display: flex;
    text-align: center;
    flex-direction: column;
}

p {
    margin: 10px 0;
}
.select-link {
    text-decoration: none;
}
.select-input {
    margin-top: 50px;
}
</style>
