<template>
  <div>
    <v-btn class="ma-3" @click="toggleButton" dark>{{
      toggleButtonText
    }}</v-btn>
    <v-btn class="ma-3" @click="getData" dark v-if="data.length <= 0"
      >get data</v-btn
    >
    <v-btn class="ma-3" @click="resetData" dark v-else>reset data</v-btn>
    <div class="text-center" v-if="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-if="toggleCards">
      <Cards :data="sortedData" @closeCard="closeCard" />
    </div>
    <div v-else>
      <Tree :data="sortedData" :key="forceRender" />
    </div>
  </div>
</template>

<script>
import Cards from "./Cards.vue";
import Tree from "./Tree.vue";

export default {
  props: ["sort"],
  data() {
    return {
      toggleCards: false,
      data: [],
      dataSort: [],
      toggleButtonText: "Tree to Card",
      loading: false,
      forceRender: 0,
    };
  },
  methods: {
    toggleButton() {
      this.toggleCards = !this.toggleCards;
      if (this.toggleCards) {
        this.toggleButtonText = "Card to Tree";
      } else {
        this.toggleButtonText = "Tree to Card";
      }
    },
    sortMethod(a, b) {
      if (!this.sort) this.sort = "category";
      if (a[this.sort] > b[this.sort]) {
        return 1;
      }
      if (a[this.sort] < b[this.sort]) {
        return -1;
      }
      return 0;
    },
    closeCard(timestamp) {
      this.dataSort = this.sortedData.filter((el) => el.timestamp != timestamp);
      localStorage.setItem("Boro", JSON.stringify(this.dataSort));
    },
    async getData() {
      this.loading = true;
      await this.$store.dispatch("fetchDataAsync");
      this.data = this.$store.getters.getData;
      this.forceRender += 1;
      this.loading = false;
    },
    resetData() {
      this.dataSort = this.getData();
      localStorage.removeItem("Boro");
    },
  },
  computed: {
    sortedData() {
      let data = this.dataSort.length > 0 ? this.dataSort : this.data;
      return data.sort(this.sortMethod);
    },
    // loading() {
    //   console.log('loading', this.$store.getters.getLoading);
    //   return this.$store.getters.getLoading;
    // },
  },  
  components: {
    Cards,
    Tree,
  },
  mounted() {
    if (localStorage.Boro) this.data = JSON.parse(localStorage.Boro);
  },
};
</script>

<style>
</style>