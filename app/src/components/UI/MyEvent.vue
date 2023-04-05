<template>
    <div>
        <aside>
<!--            <img src="src/assets/image.png" alt="school">-->
            <h3>Обычный учебный день</h3>
            <p>До каникул 21 день</p>
            <div
                    @click="$router.push('/events/')"
                    class="events"
            >
                Мероприятия
            </div>
        </aside>
    </div>

</template>

<script>

export default {
    name: "MyEvent",
}
</script>

<style scoped>
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

.events {
    padding: 10px;

    color: white;
    border-radius: 16px;
    background-color: #6d9773;
}
</style>