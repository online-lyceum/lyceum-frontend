<template>
    <div class="my-card">
        <form @submit.prevent>
            <div class="input_box">
                <input class="input" @input="selectClass" type="number" placeholder="10" v-model="class_number">
                <input class="input" @input="selectClass" type="text" placeholder="Б" v-model="class_letter">
                <!--                <p class="input">{{ class_number }}</p>-->
                <!--                <p class="input">{{ class_letter }}</p>-->
            </div>
            <select name="select_subgroup" v-model="subgroup_id" v-if="need_to_select_subgroup">
                <option disabled value="">Подгруппа</option>
                <option v-for="subgroup in subgroupsForClass" :key="subgroup.subgroup_id" :value="subgroup.subgroup_id">
                    {{ subgroup.name }}
                </option>
            </select>

        </form>
        <my-button @click="selectSubgroup" :disabled="subgroup_id === ''" class="select-button">Выбрать</my-button>
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
            schools: [],
            class_number: "",
            class_letter: "",
            subgroup_id: "",
            need_to_select_subgroup: false,
            subgroupsForClass: [],
        }
    },
    props: {
        school_id: {
            type: Number,
            required: true
        }
    },
    computed: {
        async subgroups() {
            try {
                const res = await axios.get("https://lava-land.ru/api/classes?school_id=" + this.school_id);
                return res.data.subgroups;
            } catch (e) {
                alert('Error');
            }
            return []
        }
    },
    methods: {
        async selectClass() {
            const res = await fetch("https://lava-land.ru/api/classes?school_id=" + this.school_id);
            let class_id = ""
            this.subgroup_id = ""
            this.need_to_select_subgroup = false;
            if (res.status === 200) {
                const json_res = await res.json();
                const classes = json_res['classes'];
                for (let i = 0; i < classes.length; i++) {
                    if ((this.class_number === classes[i]['number']) && (this.class_letter.toUpperCase() === classes[i]['letter'].toUpperCase())) {
                        class_id = classes[i]['class_id'];
                    }
                }
            }
            if (class_id !== "") {
                const subgroups_res = await fetch("https://dev.lava-land.ru/api/subgroups?class_id=" + class_id);
                if (subgroups_res.status === 200) {
                    const json_subgroup_res = await subgroups_res.json();
                    this.subgroupsForClass = json_subgroup_res['subgroups'];
                    if (this.subgroupsForClass.length === 1) {
                        this.subgroup_id = this.subgroupsForClass[0].subgroup_id;
                        this.need_to_select_subgroup = false;
                    } else if (this.subgroupsForClass.length > 1) {
                        this.subgroup_id = "";
                        this.need_to_select_subgroup = true;
                    } else {
                        this.subgroup_id = "";
                    }
                } else {
                    this.subgroup_id = "";
                    this.subgroupsForClass = [];
                }
            }

        },
        async selectSubgroup() {
            this.$store.commit('setSubgroupID', this.subgroup_id);
            this.$router.push('/home');
        },
        async loadSchools() {
            const res = await fetch("https://dev.lava-land.ru/api/schools");
            if (res.status === 200) {
                const json_res = await res.json();
                this.schools = json_res['schools'];
            }
        }
    }
}
</script>

<style scoped>
.input_box {
    display: flex;
    flex-direction: row;
    margin: 50px 80px;
}

.input {
    /*margin: 50px;*/
    position: center;
    margin: 0 auto;
    width: 100px;
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
