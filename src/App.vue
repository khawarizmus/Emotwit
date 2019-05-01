<template>
  <v-app id="inspire" :dark="dark">
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>CYK Parser</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            flat
            icon
            v-on="on"
            href="https://github.com/gimyboya/Emotwit/issues/new/choose"
            target="_Blank_"
          >
            <v-icon>mdi-fire</v-icon>
          </v-btn>
        </template>
        <span>Found a bug or got a hot idea?</span>
      </v-tooltip>
      <v-btn flat icon @click="dark = !dark">
        <v-icon>mdi-compare</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex px-1 mb-2 sx12 md6>
            <tweet></tweet>
          </v-flex>
          <v-flex px-1 mb-2 sx12 md6></v-flex>
          <v-flex sx12></v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <v-btn flat icon href="https://t.me/bafatah" target="_Blank_">
        <v-icon>mdi-telegram</v-icon>
      </v-btn>
      <v-btn flat icon href="https://twitter.com/gimyboya" target="_Blank_">
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn flat icon href="https://github.com/gimyboya/Emotwit" target="_Blank_">
        <v-icon>mdi-github-circle</v-icon>
      </v-btn>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Tweet from "./components/Tweet";

export default {
  name: "App",
  components: {
    Tweet
  },
  data() {
    return {
      dark: true
    };
  }
};
</script>

<style>
.wrapper {
  flex-grow: 0.3;
}
footer {
  display: flex;
  justify-content: center;
}
</style>