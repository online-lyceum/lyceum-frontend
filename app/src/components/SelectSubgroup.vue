<template>
    <div class="my-card">
        <form @submit.prevent>
            <div class="input_box">
                <div class="blocks">
                    <button @click="decreaseClassNum(); selectClass();">ТУДА</button>
                    <input
                            class="input"
                            @input="selectClass"
                            type="number"
                            v-model="class_number"
                    >
                    <button @click="increaseClassNum(); selectClass();">СЮДА</button>
                </div>

                <div class="blocks">
                    <button @click="decreaseClassLetter(); selectClass();">ТУДА</button>
                    <input
                            class="input"
                            @input="selectClass"
                            type="text"
                            v-model="class_letter"
                    >
                    <button @click="increaseClassLetter(); selectClass();">СЮДА</button>
                </div>

            </div>

            <select
                    name="select_subgroup"
                    v-model="subgroupID"
                    v-if="need_to_select_subgroup"
            >
                <option disabled value="">Подгруппа</option>
                <option
                        v-for="subgroup in subgroupsForClass"
                        :key="subgroup.subgroup_id"
                        :value="subgroup.subgroup_id"
                >
                    {{ subgroup.name }}
                </option>
            </select>


        </form>
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
    mounted() {
        this.loadClasses();
        this.loadSubgroups();
        this.getClassNumsLetters()
    },
    methods: {
        async getClassNumsLetters() {
            let res = await axios.get(`${this.$store.state.TIME_API}/classes`,
                {params: {
                        school_id: this.schoolID
                    }
                }
            )
            const jsonRes = await res.json()
            for (let i = 0; i < jsonRes.classes.length; i++) {
                this.classNums.add(jsonRes.classes[i].number)
                this.classLetters.add(jsonRes.classes[i].letter)
            }
            this.classNums = [...this.classNums]
            this.classLetters = [...this.classLetters]
            this.class_number = this.classNums[0]
            this.class_letter = this.classLetters[this.letterIndex]
            await this.selectClass()
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
                    this.subgroupID = this.subgroupsForClass[0].subgroup_id;
                    this.need_to_select_subgroup = false;
                } else if (this.subgroupsForClass.length > 1) {
                    this.subgroupID = null;
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
            this.max_class_number = 1;
            this.min_class_number = 100;
            for (let i = 0; i < this.classes.length; i++) {
                this.max_class_number = Math.max(
                    this.max_class_number, this.classes[i].number
                );
                this.min_class_number = Math.min(
                    this.min_class_number, this.classes[i].number
                );
            }
        },
        async loadSubgroups() {
            try {
                const res = await axios.get(
                    `${this.$store.state.TIME_API}/subgroups`,
                    {params: {school_id: this.schoolID}}
                );
                this.subgroups = res.data.subgroups;
            } catch (e) {
                alert('Error');
                this.subgroups = []
            }
        },
        async selectSubgroup() {
            if (this.subgroupID !== null) {
                this.$store.commit('setSubgroupID', this.subgroupID);
                this.$router.push('/home');
            }
        }
    },
}
</script>

<style scoped>

.blocks {
    display: inline-block;
    height: 100px;
    width: 20%;
    margin: 50px 50px 0;
}

.input_box {
    flex-direction: row;
    margin: 0 25px;
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
    flex-direction: column;
}

p {
    margin: 10px 0;
}
</style>
