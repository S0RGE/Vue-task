<template>
  <div>
    <v-btn class="ma-3" @click="toggleButton" dark>{{
      toggleButtonText
    }}</v-btn>
    <v-btn class="ma-3" @click="getData" dark v-if="data.length <= 0"
      >get data</v-btn
    >    
    <v-btn class="ma-3" @click="resetData" dark v-else>reset data</v-btn>
    <div v-if="toggleCards">
      <Cards :data="sortedData" @closeCard="closeCard" />
    </div>
    <div v-else>
      <Tree :data="sortedData" />
    </div>
  </div>
</template>

<script>
import Cards from "./Cards.vue";
import Tree from "./Tree.vue";
// import TreeTest from "./TreeTest.vue";

export default {
  props: ["sort"],
  data() {
    return {
      toggleCards: false,
      data: [],
      dataSort: [],
      toggleButtonText: "Tree to Card",
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
    },
    async getData() {
      this.data = this.$store.getters.getData;
    },
    async resetData() {
      this.dataSort = [];
    },
  },
  computed: {
    sortedData() {
      let data = this.dataSort.length > 0 ? this.dataSort : this.data;
      console.log("data", this.sort, data);
      return data.sort(this.sortMethod);
    },
  },
  components: {
    Cards,
    Tree,
  },
  mounted() {
    this.$store.dispatch("fetchDataAsync");
    console.log("sort this", this.sort);
  },
};
</script>

<style>
</style>