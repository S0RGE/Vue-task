<template>
  <div>
    
    <div class="d-flex flex-wrap justify-center">
      <div v-for="card in data" :key="card.timestamp">
        <Card :card="card" @closeCard="closeCard" />
      </div>
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
    };
  },
  methods: {    
    closeCard(timestamp) {
      this.$emit("closeCard", timestamp)
    },
  },
  components: {
    Card,
  },
};
</script>

<style></style>
