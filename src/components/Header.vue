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
        :items="sortKeys"
      ></v-select>
    </div>
    <v-divider></v-divider>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      keys: [
        { name: "Category", value: "category" },
        { name: "Date time", value: "timestamp" },
        { name: "File size", value: "filesize" },
        { name: "Name", value: "image" },
      ],
      sortBy: "category",
      data: [],
    };
  },
  methods: {
    sortSelect() {
      this.$emit("SortItems", this.keys.find(key => (key.name === this.sortBy)).value);
    },
  },
  computed:{
    sortKeys(){
      let keys = [];
      this.keys.forEach(key => {
        keys.push(key.name)
      })
      return keys;
    }
  }
};
</script>

<style></style>
