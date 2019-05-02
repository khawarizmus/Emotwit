<template>
  <v-card height="100%">
    <v-toolbar card dense>
      <v-toolbar-title>
        <span class="subheading">TWEETS COLLECTION</span>
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>-->
    </v-toolbar>
    <v-card-text>
      <v-layout justify-center mb-3>
        <v-flex px-6 xs5>
          <v-text-field
            outline
            label="Keyword"
            placeholder="Enter a hashtag a username or a keyword"
            v-model="input"
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-btn
            type="success"
            @click="analyse"
            :disabled="input === ''"
            :loading="loading"
            @keypress.enter="analyse"
          >Analyse</v-btn>
        </v-flex>
      </v-layout>

      <v-layout justify-space-between mb-3>
        <v-flex text-xs-left>
          <span class="display-3 font-weight-light" v-text="count"></span>
          <span class="subheading font-weight-light mr-1">Tweets</span>
        </v-flex>
      </v-layout>

      <v-slider v-model="count" :color="color" always-dirty min="15" max="100">
        <template v-slot:prepend>
          <v-icon :color="color" @click="decrement">mdi-minus</v-icon>
        </template>

        <template v-slot:append>
          <v-icon :color="color" @click="increment">mdi-plus</v-icon>
        </template>
      </v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { EventBus } from "../EventBus.ts";

export default {
  data() {
    return {
      input: "",
      count: 100,
      axios: undefined,
      error: "",
      loading: false
    };
  },
  mounted() {
    this.axios = axios.create({
      baseURL:
        "https://weod97zklg.execute-api.ap-southeast-1.amazonaws.com/dev/",
      timeout: 20000
      // headers: {'X-Custom-Header': 'foobar'}
    });
  },
  methods: {
    analyse() {
      this.loading = true;
      this.axios
        .get(`/search?${qs.stringify({ q: this.input, count: this.count })}`)
        .then(data => {
          this.$store.commit("PUSH-TWET", data.data.statuses);
          EventBus.$emit("collected");
          this.loading = false;
        })
        .catch(e => {
          this.error = e.message;
          this.loading = false;
        });
    },
    decrement() {
      this.count--;
    },
    increment() {
      this.count++;
    }
  },
  computed: {
    color() {
      if (this.count < 20) return "indigo";
      if (this.count < 35) return "teal";
      if (this.count < 65) return "green";
      if (this.count < 80) return "orange";
      return "red";
    }
  }
};
</script>

<style>
</style>
