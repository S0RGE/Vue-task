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
          <v-card-title>{{ item.category }}</v-card-title>
          <v-card-text>
            <div class="grey--text ms-4">
              timestamp: &nbsp; {{ item.timestamp }}
            </div>
            <div class="grey--text ms-4">
              filesize: &nbsp; {{ item.filesize }}mb
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list>
        <v-list-item v-for="(item, index) in menuItems" :key="index">
          <v-list-item-title style="cursor: pointer" @click="closeCard">{{
            item.title
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-card>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      items: [],
      item: {},
      showMenu: false,
      x: 0,
      y: 0,
      menuItems: [
        { title: "Delete" },
        { title: "Destroy" },
        { title: "Annigilate" },
        { title: "Hide" },
      ],
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
    closeCard() {
      this.$emit("closeCard", this.item.timestamp);
      this.item = {};
    },
    convertData(data) {
      let dataItem = data || [];
      this.items = [];
      while (dataItem.length > 0) {
        this.items.push({
          name: dataItem[0].category,
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
