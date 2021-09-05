<template>
  <v-app-bar dark dense app style="z-index: 15">
    <v-app-bar-title> Challenge Boro frontend </v-app-bar-title>
    <div>
      <v-select     
      @change="sortSelect"
      class="ml-4"
      v-model="sortBy"
      flat
      dark
      hide-details
      :items="keys"
    ></v-select>
    </div>
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
