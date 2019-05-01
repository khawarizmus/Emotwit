<template>
  <v-card height="100%">
    <v-card-title>Grammar</v-card-title>
    <v-card-text>
      <v-text-field
        outline
        label="Keyword"
        placeholder="Enter a hashtag or a keyword"
        v-model="input"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="analyse">Analyse</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Twit from "twit";
import axois from "axios";

export default {
  data() {
    return {
      input: "",
      count: 100,
      axios: undefined
    };
  },
  mounted() {
    this.axios = axios.create({
      baseURL:
        "https://weod97zklg.execute-api.ap-southeast-1.amazonaws.com/dev/",
      timeout: 1000
      // headers: {'X-Custom-Header': 'foobar'}
    });
  },
  methods: {
    analyse() {}
  }
};
</script>

<style>
</style>
