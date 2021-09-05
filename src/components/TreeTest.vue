<template>
  <v-card>
    <v-card-title class="indigo white--text text-h5"> Tree </v-card-title>
    <v-row class="pa-4" justify="space-between">
      <v-col cols="5">
        <v-treeview
          :active.sync="active"
          :items="items"
          :load-children="fetchUsers"
          :open.sync="open"
          activatable
          color="warning"
          open-on-click
          transition
        >
          <template v-slot:prepend="{ item }">
            <img
            size="88"
              :src="`http://contest.elecard.ru/frontend_data/${item.image}`"             
            />
            <p>{{item.timestamp}}</p>
          </template>
        </v-treeview>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col class="d-flex text-center">
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selected"
            class="text-h6 grey--text text--lighten-1 font-weight-light"
            style="align-self: center"
          >
            Select a User
          </div>
          <v-card
            v-else
            :key="selected.id"
            class="pt-6 mx-auto"
            flat
            max-width="400"
          >
            <v-card-text>
              <v-avatar v-if="avatar" size="88">
                <v-img
                  :src="`http://contest.elecard.ru/frontend_data/${item.image}`"
                  class="mb-6"
                ></v-img>
              </v-avatar>
              <h3 class="text-h5 mb-2">
                {{ selected.name }}
              </h3>
              <div class="blue--text mb-2">
                {{ selected.email }}
              </div>
              <div class="blue--text subheading font-weight-bold">
                {{ selected.category }}
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-row class="text-left" tag="v-card-text">
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                Company:
              </v-col>
              <v-col>{{ selected.company.name }}</v-col>
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                Website:
              </v-col>
              <v-col>
                <a :href="`//${selected.website}`" target="_blank">{{
                  selected.timestamp
                }}</a>
              </v-col>
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                Phone:
              </v-col>
              <v-col>{{ selected.filesize }}</v-col>
            </v-row>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
const avatars = [
  "?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban",
  "?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun",
  "?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong",
  "?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair",
  "?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly",
];

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default {
  props: ["data"],
  data: () => ({
    active: [],
    avatar: null,
    open: [],
    users: [],
    items: [],
  }),

  computed: {
    // items() {
    //   return [
    //     {
    //       name: "Users",
    //       children: this.users,
    //     },
    //   ];
    // },
    selected() {
        console.log('this active', this.active);
      if (!this.active.length) return undefined;

      const id = this.active;
      console.log('id=', id);

      return this.items.find((item) => item.id === id);
    },
  },

  watch: {
    selected: "randomAvatar",
  },

  methods: {
    async fetchUsers(item) {
      // Remove in 6 months and say
      // you've made optimizations! :)
      await pause(1500);

      const data =  fetch("http://contest.elecard.ru/frontend_data/catalog.json")
        .then((res) => res.json())
        .then((json) => item.children.push(...json))
        .catch((err) => console.warn(err));

        console.log('data', data);
        return data
    },
    randomAvatar() {
      this.avatar = avatars[Math.floor(Math.random() * avatars.length)];
    },
  },
  mounted() {
    let dataItem =
      this.data.map((el) => {
        const container = el;
        container.name = el.category;
        return container;
      }) || [];
    // console.log(
    //   "data item one",
    //   dataItem.filter((item) => item.category === dataItem[0].category)
    // );
    while (dataItem.length > 0) {
      this.items.push({
        name: dataItem[0].category,
        children: [
          ...dataItem.filter((item) => item.category === dataItem[0].category),
        ],
      });
      //   console.log("data", this.items);
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
  border: 1px solid #ddd; /* Gray border */
  border-radius: 4px; /* Rounded border */
  padding: 5px; /* Some padding */
  width: 150px; /* Set a small width */
}
</style>