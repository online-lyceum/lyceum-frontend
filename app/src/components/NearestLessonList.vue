<template>
  <div>
    <my-loader v-if="isLoading"></my-loader>
    <lesson-list always-display-next :lesson-list="lessonList"/>
  </div>
</template>

<script>
import axios from "axios";
import MyEvent from "@/components/UI/MyEvent.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyUpperBlock from "@/components/UI/MyUpperBlock.vue";
import MyLoader from "@/components/UI/MyLoader.vue";
import LessonList from "@/components/LessonList.vue";

export default {
  components: {LessonList, MyLoader, MyUpperBlock, MyButton, MyEvent},
  data() {
    return {
      isLoading: false,
      lessonList: [],
    }
  },
  methods: {
    async loadLessons() {
      this.isLoading = true
      let date = new Date().toISOString().split('T')[0]
      await axios.get(`${this.$store.state.TIME_API}/lessons/${date}`,
          {
            params: {
              subgroup_id: this.$store.state.subgroupID
            }
          })
          .then(
              async (res) => {
                this.lessonList = await res.data.lessons
                this.$store.commit('setNearestDayIndex', this.lessonList[0].weekday)
              })
          .catch(
              () => {
                this.$store.commit('logout')
                this.$router.push('/')
              }
          )
      this.isLoading = false
    }
  },
  created() {
    this.loadLessons()
  },
}
</script>

<style scoped>
/* Global */

body {
  font-family: sans-serif;

  margin: 0;

  background-color: #0c3b2e;
}

a {
  text-decoration: none;
  color: black;
}

/* Main Page */
/* header */

header {
  font-size: 16px;

  height: 50px;
  margin: 0 12px 30px;

  text-align: center;

  border-radius: 0 0 16px 16px;
  background-color: #fff;
}

/* Content */


/* main */

h3 {
  font-size: 20px;
  font-weight: normal;

  margin: 0;
}

time {
  font-size: 19px;
  white-space: nowrap;

}

h2 {
  font-size: 16px;
  font-weight: normal;

  margin: 0;
}

main {
  display: flex;
  flex-direction: column;

  height: auto;
  margin: 0 12px;

  border-radius: 16px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .25);
}

.subject {
  display: flex;

  padding: 16px 14px 5px 14px;

  justify-content: space-between;

  border-bottom: 1px solid black;
}

.realtime-subject {
  display: flex;

  padding: 16px 14px 20px 14px;

  color: white;
  border-radius: 16px;
  background-color: #6d9773;

  justify-content: space-between;
}

.realtime-subject h3 {
  color: #ffc936;
}

.realtime-subject time span {
  color: #ffc936;
}

/* 	aside */

aside {
  margin: 32px 14px 58px;

  text-align: center;

  border-radius: 16px;
  background-color: #fff;
}

aside img {
  width: 100%;

  border-radius: 16px;
}

aside p {
  margin: 12px 0 19px;
}

.cut-text {
  overflow: hidden;
}

</style>
