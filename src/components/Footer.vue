<template>
  <v-footer style="z-index: 100" app dark padless>
    <v-row justify="center" no-gutters>
      <v-btn v-for="link in links" :key="link.name" :href="link.adress" text rounded class="my-2">
         {{ link.name }}
      </v-btn>
      <v-col dark class="py-4 text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Boro</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      { name: "Home", adress: "https://www.elecard.com/" },
      { name: "Products", adress: "https://www.elecard.com/products" },
      { name: "Team", adress: "https://www.elecard.com/page/elecard_team" },
      { name: "News", adress: "https://www.elecard.com/news?type=1" },
      { name: "Contact Us", adress: "https://www.elecard.com/page/contact_us" },
    ],
  }),
  methods: {
    linlAdress(adress) {
      console.log(adress);
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
