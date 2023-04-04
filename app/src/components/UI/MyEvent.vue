<template>
    <div class="events">
        <a>
            <aside>
<!--                <img src="src/assets/image.png" alt="school">-->
                <h3>Обычный учебный день</h3>
                <p>До каникул 21 день</p>
                <div
                    @click="$router.push('/events/')"
                >
                    Мероприятия
                </div>
            </aside>
        </a>
    </div>
</template>

<script>

export default {
    name: "MyEvent",
}
</script>

<style scoped>
.events {
    padding: 10px;

    color: white;
    border-radius: 16px;
    background-color: #6d9773;
}
</style>