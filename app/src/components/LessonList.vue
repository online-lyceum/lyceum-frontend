<template>
    <div class="lesson-list">
        <div v-for="i in lessonList.length" :key="lessonList[i - 1].lesson_id[0]"
             :class="lessonCSSClasses[i - 1]">
            <div>
                <h3 class="cut-text">{{ lessonList[i - 1].name }}</h3>
                <p class="cut-text">{{ lessonList[i - 1].room }}<br>{{ lessonList[i - 1].teacher.name }}</p>
            </div>
            <div>
                <time v-for="j in lessonList[i - 1].start_time.length">
                    {{
                    lessonList[i - 1].start_time[j - 1].hour
                    }}:{{
                    (lessonList[i - 1].start_time[j - 1].minute < 10 ? '0' : '') + lessonList[i - 1].start_time[j - 1].minute
                    }} -
                    {{
                    lessonList[i - 1].end_time[j - 1].hour
                    }}:{{
                    (lessonList[i - 1].end_time[j - 1].minute < 10 ? '0' : '') + lessonList[i - 1].end_time[j - 1].minute
                    }}<br>
                </time>
            </div>
        </div>
    </div>
</template>

<script>
import MyEvent from "@/components/UI/MyEvent.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyUpperBlock from "@/components/UI/MyUpperBlock.vue";

export default {
    components: {MyUpperBlock, MyButton, MyEvent},
    props: {
        lessonList: Array,
    },
    computed: {
        lessonCSSClasses() {
            let result = []
            for (let i = 0; i < this.lessonList.length; i++) {
                if (this.isCurrentLesson(i)) {
                    result.push('current-subject')
                    continue
                }
                let isStarted = this.isStarted(this.lessonList[i].start_time)
                if (i === 0) {
                    if (!isStarted) {
                        result.push('next-subject')
                        continue
                    }
                } else {
                    let isEnded = this.isEnded(this.lessonList[i - 1].end_time)
                    if (isEnded && !isStarted) {
                        result.push('next-subject')
                        continue
                    }
                }
                result.push('subject')
            }
            return result
        }
    },
    methods: {
        isEnded(endTime, now = new Date()) {
            return now.getHours() * 60 + now.getMinutes() >= endTime.hours * 60 + endTime.minutes
        },
        isStarted(startTime, now = new Date()) {
            return now.getHours() * 60 + now.getMinutes() > startTime.hours * 60 + startTime.minutes
        },
        isCurrentLesson(index) {
            let lesson = this.lessonList[index]
            return this.isCurrentTime(
                lesson.weekday,
                lesson.start_time[0],
                lesson.end_time[lesson.end_time.length]
            )
        },
        isCurrentTime(weekday, startTime, endTime, now = new Date()) {
            let is_current_time = (now.weekday + 6) % 7 !== weekday
            is_current_time &&= this.isStarted(startTime, now)
            return is_current_time && this.isEnded(endTime, now)

        }
    },
}
</script>

<style scoped>
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

.lesson-list {
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

.next-subject {
    display: flex;

    padding: 16px 14px 5px 14px;

    justify-content: space-between;

    border: 5px solid #6d9773;
    border-radius: 16px;
}

.realtime-subject {
    display: flex;

    padding: 16px 14px 20px 14px;

    color: white;
    border-radius: 16px;
    background-color: #6d9773;

    justify-content: space-between;
}

/* upper-block */

.lesson-list-content {
    display: flex;

    margin: 0 12px 32px;

    border-radius: 16px;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, .25);

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
