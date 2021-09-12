<template>
  <div>
    <div class="d-flex flex-wrap justify-center">
      <div v-for="card in paginationData" :key="card.timestamp">
        <Card :card="card" @closeCard="closeCard" />
      </div>
    </div>
    <div>
      <v-pagination
        v-model="page"
        :total-visible="10"
        :length="paginationLength"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  props: ["data"],
  data() {
    return {
      dataSort: [],
      page: 1,
    };
  },
  methods: {
    closeCard(timestamp) {
      this.$emit("closeCard", timestamp);
    },
  },
  components: {
    Card,
  },
  computed: {
    paginationData() {
      const start = (this.page - 1) * 10;
      const end = (this.page - 1) * 10 + 10;
      return this.data.slice(start, end);
    },
    paginationLength() {
      return Math.ceil(this.data.length / 10);
    },
  },
  watch: {
    paginationLength: function () {
      if (this.page > this.paginationLength) {
        this.page = this.paginationLength;
      }
    },
  },
};
</script>

<style></style>
