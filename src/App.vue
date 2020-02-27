<template>
    <v-app>
        <v-content>
            <MainComponent/>
        </v-content>
    </v-app>
</template>

<script>
    import MainComponent from './components/MainComponent';
    import 'swiper/dist/css/swiper.css'

    export default {
        name: 'App',
        components: {
            MainComponent,
        },
    };
</script>
<style>

</style>
