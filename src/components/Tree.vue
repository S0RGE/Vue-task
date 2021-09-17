<template>
  <v-card class="ma-3">
    <v-row class="pa-4" justify="space-between">
      <v-col cols="5">
        <v-treeview rounded hoverable :items="computedData">
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
            @contextmenu="show"
            height="250"
            :src="`http://contest.elecard.ru/frontend_data/${item.image}`"
          ></v-img>
          <v-card-title>{{
            item.image.split("-")[0].split("/")[1].trim() +
            "  " +
            item.image
              .split("-")
              .slice(1, item.image.split("-").length - 1)
              .join(" ")
          }}</v-card-title>
          <v-card-text>
            <div class="grey--text ms-4">
              timestamp: &nbsp;
              {{ new Date(item.timestamp).toLocaleString().substring(0, 10) }}
            </div>
            <div class="grey--text ms-4">
              filesize: &nbsp; {{ (item.filesize / 10240).toFixed(2) }}mb
            </div>
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
    show(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
    convertData(data) {
      let dataItem = data || [];
      this.items = [];
      while (dataItem.length > 0) {
        this.items.push({
          name: dataItem[0].category,
          id: dataItem[0].timestamp,
          children: [
            ...dataItem.filter(
              (item) => item.category === dataItem[0].category
            ),
          ],
        });
        dataItem = dataItem.filter(
          (item) => item.category !== dataItem[0].category
        );
      }
      return this.items;
    },
  },
  computed: {
    computedData() {
      return this.convertData(this.data);
    },
  },
  mounted() {
    this.convertData(this.data);
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
  width: 150px;
  height: 100px;
}

.thumbnail:hover {
  cursor: pointer;
}

.card {
  position: sticky;
  top: 100px;
  height: 300px;
}
</style>
