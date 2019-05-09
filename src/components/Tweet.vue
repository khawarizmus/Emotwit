<template>
  <v-card height="100%">
    <v-toolbar card dense>
      <v-toolbar-title>
        <span class="subheading">TWEETS COLLECTION</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-layout justify-left mb-3>
        <v-flex px-6>
          <v-combobox
            v-model="input"
            :items="suggestions"
            hide-selected
            hint="Maximum of 5 keywords"
            label="Add some keywords"
            multiple
            persistent-hint
            small-chips
            outline
          >
            <template v-slot:no-data>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    Press
                    <kbd>enter</kbd> to add your keyword
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-combobox>
        </v-flex>
      </v-layout>

      <v-layout mb-3>
        <v-flex text-xs-left>
          <span class="display-3 font-weight-light" v-text="count"></span>
          <span class="subheading font-weight-light mr-1">Tweets per keyword</span>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-slider v-model="count" :color="color" always-dirty min="15" max="100">
            <template v-slot:prepend>
              <v-icon :color="color" @click="decrement">mdi-minus</v-icon>
            </template>

            <template v-slot:append>
              <v-icon :color="color" @click="increment">mdi-plus</v-icon>
            </template>
          </v-slider>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-flex>
        <v-btn
          type="success"
          @click="analyse"
          :disabled="input === ''"
          :loading="loading"
          @keypress.enter="analyse"
        >Analyse</v-btn>
      </v-flex>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { EventBus } from "../EventBus.ts";

export default {
  data() {
    return {
      input: [],
      suggestions: ["#Algeria_protests", "#Yetna7aw_Ga3", "#Hirak"],
      count: 100,
      axios: undefined,
      error: "",
      loading: false,
      requests: []
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
      const that = this;
      EventBus.$emit("reset");
      this.loading = true;
      this.requests = [];
      this.error = "";
      this.$store.commit("FLUSH-TWET");
      // we iterate over all keywords
      this.input.forEach(keyword => {
        that.requests.push(
          that.axios
            .get(
              `/search?${qs.stringify({
                q: keyword,
                count: that.count,
                until: that.queries[1],
                result_type: that.queries[2],
                lang: that.queries[0]
              })}`
            )
            .then(data => {
              that.$store.commit("PUSH-TWET", {
                keyword,
                statuses: data.data.statuses
              });
              console.log("pushing..", keyword);
            })
            .catch(e => {
              that.error = e.message;
              that.loading = false;
            })
        );
        console.log("adding a request");
      });
      // we finaliize the collection
      axios.all(that.requests).then(
        axios.spread(function(acct, perms) {
          // Both requests are now complete
          EventBus.$emit("collected");
          that.loading = false;
          console.log("done");
        })
      );
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
    },
    queries() {
      return this.$store.getters.getQueries;
    }
  },
  watch: {
    input(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.input.pop());
      }
    }
  }
};
</script>

<style>
</style>
