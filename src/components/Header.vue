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
        :items="Object.keys(keys)"
      ></v-select>
    </div>
    <v-divider></v-divider>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      keys:{
        "Category": "category",
        "Date time": "timestamp",
        "File size": "filesize",
        "Name": "image"
      },
      sortBy: "category",
      data: [],
    };
  },
  methods: {
    sortSelect() {
      this.$emit("SortItems", this.keys[this.sortBy]); 
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
