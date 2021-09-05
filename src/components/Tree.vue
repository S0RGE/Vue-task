<template>
  <v-card class="ma-3">
    <v-row class="pa-4" justify="space-between">
      <v-col cols="5">
        <v-treeview rounded hoverable :items="items">
          <template v-slot:prepend="{ item }">
            <div class="d-flex" v-if="item.image" @click="showCard(item)">
              <img
                class="thumbnail"
                :src="`http://contest.elecard.ru/frontend_data/${item.image}`"
                alt="picture"
              />
            </div>
          </template>
        </v-treeview>
      </v-col>
      <v-col class="d-flex text-center" v-if="item.image">
        <v-card class="mx-auto my-12 card" max-width="374">
          <v-img
            height="250"
             :src="`http://contest.elecard.ru/frontend_data/${item.image}`"
          ></v-img>

          <v-card-title>{{item.category}}</v-card-title>

          <v-card-text>
              <div class="grey--text ms-4">timestamp: &nbsp; {{ item.timestamp }}</div>
              <div class="grey--text ms-4">filesize: &nbsp; {{ item.filesize }}mb</div>           
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      items: [],
      item: {},
    };
  },
  methods: {
    showCard(item) {
      this.item = item;
    },
  },
  mounted() {
    let dataItem = this.data || [];
    while (dataItem.length > 0) {
      this.items.push({
        name: dataItem[0].category,
        children: [
          ...dataItem.filter((item) => item.category === dataItem[0].category),
        ],
      });
      dataItem = dataItem.filter(
        (item) => item.category !== dataItem[0].category
      );
    }
    return this.items;
  },
};
</script>

<style scoped>
img {
  width: 250px;
  height: 250px;
}

.thumbnail {
  padding: 5px;
  width: 100px;
  height: 100px;
}

.thumbnail:hover {
  cursor: pointer;
}

.card{
  position: sticky;
  top: 100px;
  height: 300px;
}
</style>
