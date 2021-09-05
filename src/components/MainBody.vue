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

export default {
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
      return this.dataSort.length > 0 ? this.dataSort : this.data;
    },
  },
  components: {
    Cards,
    Tree,
  },
  mounted() {
    this.$store.dispatch("fetchDataAsync");
  },
};
</script>

<style>
</style>