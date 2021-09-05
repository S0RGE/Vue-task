<template>
  <div class="ma-3">
    <v-treeview rounded hoverable :items="items">
      
    </v-treeview>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    let dataItem =
      this.data.map((el) => {
        const container = el;
        container.name = el.category;
        return container;
      }) || [];
      console.log('data item one', 
      dataItem.filter((item) => item.category === dataItem[0].category))
    while (dataItem.length > 0) {
      this.items.push({
        name: dataItem[0].category,
        children: [
          ...dataItem.filter((item) => 
            item.category === dataItem[0].category
          ),
        ],
      });
      console.log("data", this.items);
      dataItem = dataItem.filter(
        (item) => item.category !== dataItem[0].category
      );
    }
    return this.items;
  },
};
</script>

<style>
</style>
