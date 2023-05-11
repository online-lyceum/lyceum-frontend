<template>
    <div class="lesson-list">
        <div
                v-for="i in lessonList.length"
                :key="lessonList[i - 1].lesson_id[0]"
                class="subject"
                :class="{
                    'next-subject': lessonStatus[i - 1] === 'next',
                    'current-subject': lessonStatus[i - 1] === 'current'
                }"
        >
            <div class="subject-content">
                <div
                        class="description-subject"
                        :class="{'subject-hr': lessonStatus[i - 1] === 'hr'}"
                >
                    <div class="info-subject">
                        <h3 class="cut-text">{{ lessonList[i - 1].name }}</h3>
                        <p class="cut-text">
                            {{ lessonList[i - 1].room }}
                            <br>
                            {{ lessonList[i - 1].teacher.name }}
                        </p>
                    </div>
                    <div class="time-subject">
                        <time>
                            <span
                                    v-for="j in lessonList[i - 1].start_time.length"
                                    :class="{
                                        'current-time': isCurrentTime(
                                            lessonList[i - 1].weekday,
                                            lessonList[i - 1].start_time[j - 1],
                                            lessonList[i - 1].end_time[j - 1]
                                            )
                                    }"
                            >
                                {{
                                    lessonList[i - 1].start_time[j - 1].hour
                                }}:{{
                                lessonList[i - 1].start_time[j - 1].minute < 10 ? '0' : ''
                                }}{{
                                    lessonList[i - 1].start_time[j - 1].minute
                                }}-{{
                                    lessonList[i - 1].end_time[j - 1].hour }}:{{
                                    lessonList[i - 1].end_time[j - 1].minute < 10 ? '0' : ''
                                }}{{
                                    lessonList[i - 1].end_time[j - 1].minute
                                }}
                                <br>
                            </span>
                        </time>
                    </div>
                </div>
                <p
                        v-if="lessonStatus[i - 1] === 'current' || lessonStatus[i - 1] === 'next'"
                        class="start-time-label"
                >
                    {{ getLessonStatusText(lessonList[i - 1]) }}
                </p>
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
    data() {
        return {
            now: new Date()
        }
    },
    created() {
        setInterval(() => {
            this.now = new Date()
        }, 1000)
    },
    props: {
        lessonList: Array,
    },
    computed: {
        lessonStatus() {
            let result = []
            for (let i = 0; i < this.lessonList.length; i++) {
                if (this.isCurrentLesson(i)) {
                    result.push('current')
                    continue
                }
                let isStarted = this.isStarted(this.lessonList[i].start_time[0])
                let isEnded
                if (i > 0) {
                    let last_end_time_index = this.lessonList[i - 1].end_time.length - 1
                    let end_time = this.lessonList[i].end_time[last_end_time_index]
                    isEnded = this.isEnded(end_time)
                } else {
                    isEnded = true
                }
                if (i === 0) {
                    if (!isStarted && !isEnded) {
                        result.push('next')
                        continue
                    }
                } else {
                    let last_end_time_index = this.lessonList[i - 1].end_time.length - 1
                    let end_time = this.lessonList[i - 1].end_time[last_end_time_index]
                    let isPreviousEnded = this.isEnded(end_time)
                    if (isPreviousEnded && !isStarted) {
                        result.push('next')
                        continue
                    }
                }
                result.push('hr')
            }
            for (let i = 1; i < this.lessonList.length; i++) {
                if (result[i] === 'current' || result[i] === 'next') {
                    result[i - 1] = ''
                }
            }
            if (result[result.length - 1] === 'hr') {
                result[result.length - 1] = ''
            }
            return result
        },
    },
    methods: {
        timeBefore(someTime) {
            let nowSeconds = this.now.getHours() * 3600 + this.now.getMinutes() * 60 + this.now.getSeconds()
            let someTimeSeconds = someTime.hour * 3600 + someTime.minute * 60
            let diff = someTimeSeconds - nowSeconds
            let hour = Math.floor(diff / 3600)
            let minute = Math.floor(diff % 3600 / 60)
            let second = diff % 60
            return {hour, minute, second}
        },
        getLessonStatusText(lesson) {
            for (let i = 0; i < lesson.start_time.length; i++) {
                if (!this.isStarted(lesson.start_time[i])) {
                    let beforeStart = this.timeBefore(lesson.start_time[i])
                    if (beforeStart.hour === 1) {
                        return 'До начала больше часа'
                    }
                    if (beforeStart.hour > 0) {
                        return 'До начала больше ' + beforeStart.hour + ' часов'
                    }
                    return 'Начало через ' + beforeStart.minute + ((beforeStart.second < 10) ? ': 0' : ':') + beforeStart.second
                }
                if (this.isCurrentTime(lesson.weekday, lesson.start_time[i], lesson.end_time[i])) {
                    let beforeEnd = this.timeBefore(lesson.end_time[i])
                    if (beforeEnd.hour === 1) {
                        return 'До конца больше часа'
                    }
                    if (beforeEnd.hour > 0) {
                        return 'До конца больше ' + beforeEnd.hour + ' часов'
                    }
                    return 'Конец через ' + beforeEnd.minute + ((beforeEnd.second < 10) ? ': 0' : ':') + beforeEnd.second
                }
            }
            return ''
        },
        isEnded(endTime) {
            return this.now.getHours() * 60 + this.now.getMinutes() >= endTime.hour * 60 + endTime.minute
        },
        isStarted(startTime) {
            return this.now.getHours() * 60 + this.now.getMinutes() > startTime.hour * 60 + startTime.minute
        },
        isCurrentLesson(index) {
            let lesson = this.lessonList[index]
            return this.isCurrentTime(
                lesson.weekday,
                lesson.start_time[0],
                lesson.end_time[lesson.end_time.length - 1]
            )
        },
        isCurrentTime(weekday, startTime, endTime) {

            let is_current_time = (this.now.weekday + 6) % 7 !== weekday
            is_current_time &&= this.isStarted(startTime)
            is_current_time &&= !this.isEnded(endTime)
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

.subject-hr {
    border-bottom: 1px solid #b3b3b3;
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
