<template>
    <v-container fluid>
        <v-row no-gutters justify="center">
            <v-col
                    cols="12"
                    xs="12"
                    sm="12"
                    md="10"
            >
                <v-tabs
                        v-model="tab"
                        background-color="blue accent-4"
                        center-active
                        show-arrows
                        dark
                >
                    <v-tab to="/temperature">Температура</v-tab>
                    <v-tab to="/humidity">Влажность</v-tab>
                    <v-tab to="/speed">Скорость Ветра</v-tab>
                    <v-tab to="/slider">Слайдер фото</v-tab>
                </v-tabs>
                <router-view :key="$route.fullPath"></router-view>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

  export default {
    name: 'MainComponent',
    data() {
      return {
        tab: null,
        hash: ''
      }
    },
  }

</script>
<style scoped>
    @media (max-width: 600px) {
        .sm-border:not(:last-child) {
            border-bottom: none !important;
        }
    }
</style>
