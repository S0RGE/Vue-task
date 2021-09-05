<template>
  <v-app>
    <Header />
    <MainBody />
    <Footer />
  </v-app>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import MainBody from "../components/MainBody.vue"

export default {
  name: "Home",
  components: {
    Footer,
    Header,
    MainBody
  },
};
</script>
