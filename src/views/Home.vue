<template>
  <v-app>
    <Header @SortItems="SortItems" />
    <MainBody :sort="sort"/>
    <Footer />
  </v-app>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import MainBody from "./MainBody.vue"

export default {
  name: "Home",
  data(){
    return{
      sort: "category"
    }
  },
  methods:{
    SortItems(item){
      this.sort = item;
    }
  },
  components: {
    Footer,
    Header,
    MainBody
  },
};
</script>
