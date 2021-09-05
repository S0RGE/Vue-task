<template>
  <v-app-bar dense app style="z-index: 15">
    <v-app-bar-title> Challenge Boro frontend </v-app-bar-title>
    <v-select
      @change="sortSelect"
      class="ml-2"
      v-model="sortBy"
      flat
      solo-inverted
      hide-details
      :items="keys"
      label="Sort by"
    ></v-select>
    <v-divider></v-divider>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      keys: ["category", "timestamp", "filesize"],
      sortBy: "category",
      data: [],
    };
  },
  methods: {
    sortSelect() {
      this.$emit("SortItems", this.sortBy)
    },
  },
};
</script>

<style></style>
