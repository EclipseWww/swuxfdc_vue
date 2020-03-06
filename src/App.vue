<template>
  <v-app class="grey lighten-5">
    <v-content class="grey lighten-5">
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "./components/Footer";

export default {
  name: "App",

  components: {
    Footer
  },

  data: () => ({
    //
  })
};
</script>
<style lang="scss">
</style>