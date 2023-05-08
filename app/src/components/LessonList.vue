<template>
    <div class="lesson-list">
        <div
                v-for="i in lessonList.length"
                :key="lessonList[i - 1].lesson_id[0]"
                class="subject"
                :class="{'next-subject': lessonStatus[i - 1] === 'next', 'current-subject': lessonStatus[i - 1] === 'current'}"
        >
            <div class="subject-content">
                <div class="description-subject">
                    <div class="info-subject">
                        <h3 class="cut-text">{{ lessonList[i - 1].name }}</h3>
                        <p class="cut-text">{{ lessonList[i - 1].room }}<br>{{ lessonList[i - 1].teacher.name }}</p>
                    </div>
                    <div class="time-subject">
                        <time>
                            <span
                                    v-for="j in lessonList[i - 1].start_time.length"
                                    :class="{'current-time': isCurrentTime(lessonList[i - 1].weekday, lessonList[i - 1].start_time[j - 1], lessonList[i - 1].end_time[j - 1])}"
                            >
                                {{
                                lessonList[i - 1].start_time[j - 1].hour
                                }}:{{
                                (lessonList[i - 1].start_time[j - 1].minute < 10 ? '0' : '') + lessonList[i - 1].start_time[j - 1].minute
                                }}
                                -
                                {{
                                lessonList[i - 1].end_time[j - 1].hour
                                }}:{{
                                (lessonList[i - 1].end_time[j - 1].minute < 10 ? '0' : '') + lessonList[i - 1].end_time[j - 1].minute
                                }}
                                <br>
                            </span>
                        </time>
                    </div>
                </div>
                <p v-if="lessonStatus[i - 1] === 'current'" class="start-time-label">
                    {{ getLessonStatusText(lessonList[i - 1]) }}</p>
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
        lessonStatus() {
            let now = new Date()
            let result = []
            for (let i = 0; i < this.lessonList.length; i++) {
                if (this.isCurrentLesson(i, now)) {
                    result.push('current')
                    continue
                }
                let isStarted = this.isStarted(this.lessonList[i].start_time[0], now)
                let isEnded = this.isEnded(this.lessonList[i].end_time[this.lessonList[i].end_time.length - 1], now)
                console.log(isStarted, isEnded)
                if (i === 0) {
                    if (!isStarted && !isEnded) {
                        result.push('next')
                        continue
                    }
                } else {
                    let isPreviousEnded = this.isEnded(this.lessonList[i - 1].end_time[this.lessonList[i - 1].end_time.length - 1], now)
                    if (isPreviousEnded && !isStarted) {
                        result.push('next')
                        continue
                    }
                }
                if (this.lessonList.length > i + 1 && this.isStarted(this.lessonList[i + 1].start_time[0], now)) {
                    result.push('')
                    continue
                }
                result.push('hr')
            }
            return result
        },
    },
    updated() {
        console.log('Updated')
    },
    methods: {
        getLessonStatusText(lesson) {
            for (let i = 0; i < lesson.start_time.length; i++) {
                if (!this.isStarted(lesson.start_time[i])) {
                    return 'Начало через 5:12'
                }
                if (this.isCurrentTime(lesson.weekday, lesson.start_time[i], lesson.end_time[i])) {
                    return 'Конец через 5:12'
                }
            }
            return ''
        },
        isEnded(endTime, now = new Date()) {
            return now.getHours() * 60 + now.getMinutes() >= endTime.hour * 60 + endTime.minute
        },
        isStarted(startTime, now = new Date()) {
            return now.getHours() * 60 + now.getMinutes() > startTime.hour * 60 + startTime.minute
        },
        isCurrentLesson(index, now = new Date()) {
            let lesson = this.lessonList[index]
            return this.isCurrentTime(
                lesson.weekday,
                lesson.start_time[0],
                lesson.end_time[lesson.end_time.length - 1],
                now
            )
        },
        isCurrentTime(weekday, startTime, endTime, now = new Date()) {

            let is_current_time = (now.weekday + 6) % 7 !== weekday
            is_current_time &&= this.isStarted(startTime, now)
            is_current_time &&= !this.isEnded(endTime, now)
            return is_current_time

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
}

.next-subject {
    display: flex;

    padding: 16px 14px 5px 14px;

    justify-content: space-between;

    border: 5px solid #6d9773;
    border-radius: 16px;
}

.current-subject {
    display: flex;

    padding: 16px 14px 20px 14px;

    color: white;
    border-radius: 16px;
    background-color: #6d9773;

    justify-content: space-between;
}

.current-time {
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

.description-subject {
    width: 100%;

    display: flex;

    justify-content: space-between;
}

.current-subject .description-subject {
    border-bottom: 2px solid #fff;
}

.next-subject .description-subject {
    border-bottom: 2px solid #6d9773;
}

.subject-content {
    width: 100%;
}

.start-time-label {
    text-align: center;
    padding: 0;
    margin: 5px 0 0 0;
}
</style>
