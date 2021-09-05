<template>
  <v-card class="ma-3" width="344">
    <div class="rightTopCross">
      <v-icon @click="closeCard">mdi-close</v-icon>
    </div>
    <v-img :src="cardImage" height="200px"> </v-img>
    <v-card-title> {{ card.category }} </v-card-title>
    <v-card-subtitle> {{ cardText }} </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props: ["card"],
  data() {
    return {
      cardImage: "http://contest.elecard.ru/frontend_data/" + this.card.image,
      cardText: "Elecard. Video compression guru",
    };
  },
  methods: {
    closeCard() {
      this.$emit("closeCard", this.card.timestamp);
    },
  },
};
</script>

<style>
.rightTopCross {
  background: white;
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 10;
  border-radius: 5px;
}
</style>
