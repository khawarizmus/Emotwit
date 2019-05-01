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
import { CONSUMER_KEY, CONSUMER_SECRET } from "../../env.js";
import Twit from "twit";

export default {
  data() {
    return {
      input: "",
      count: 100,
      tw: undefined
    };
  },
  mounted() {
    this.tw = new Twit({
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
      timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
      strictSSL: true, // optional - requires SSL certificates to be valid.
      app_only_auth: true
    });
  },
  methods: {
    analyse() {
      this.tw.get(
        "search/tweets",
        { q: this.input, count: this.count },
        (err, data, response) => {
          console.log(data);
        }
      );
    }
  }
};
</script>

<style>
</style>
