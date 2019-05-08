<template>
  <v-card height="100%">
    <v-toolbar card dense>
      <v-toolbar-title>
        <span class="subheading">SENTIMENTS ANALYSIS</span>
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>-->
    </v-toolbar>
    <v-card-text>
      <v-layout>
        <v-flex sx6>
          <v-select :items="keywords" v-model="keyword" label="Keywords" outline></v-select>
          <v-chart
            v-if="collected"
            :options="options[keyword]"
            ref="bar"
            :theme="theme"
            :key="keyword"
            autoresize
          />
        </v-flex>
      </v-layout>
      <v-layout v-if="collected">
        <v-flex sx6>
          <span
            v-if="keyword != 'Overall'"
            class="subheading font-weight-light mr-1"
          >Tweets Collected: {{ tweets[keyword].length }}</span>
          <span
            v-else
            class="subheading font-weight-light mr-1"
          >Tweets Collected: {{ positive.length + negative.length + neutral.length }}</span>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import Sentiment from "sentiment";
import { EventBus } from "../EventBus.ts";
import ECharts from "vue-echarts"; // refers to components/ECharts.vue in webpack

// import ECharts modules manually to reduce bundle size
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";

import "echarts/theme/dark";

export default {
  components: {
    "v-chart": ECharts
  },
  data() {
    return {
      options: {},
      collected: false,
      theme: "dark",
      keyword: "Overall",
      keywords: [],
      positive: [],
      negative: [],
      neutral: [],
      analyzer: {}
    };
  },
  mounted() {
    const that = this;
    this.analyzer = new Sentiment();
    EventBus.$on("reset", () => {
      that.collected = false;
      that.keyword = "Overall";
      that.keywords = [];
      that.positive = [];
      that.negative = [];
      that.neutral = [];
      that.options = {};
    });
    EventBus.$on("collected", () => {
      console.log(that.$store.getters.getTwet);
      console.log(Object.keys(that.$store.getters.getTwet));
      that.keywords = Object.keys(that.$store.getters.getTwet);
      that.keywords.push("Overall");
      that.keywords.forEach(keyword => {
        if (keyword != "Overall") {
          that.options[keyword] = {
            legend: {
              data: ["Positive", "Negative", "Neutral"]
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },
            // Declare X axis, which is a category axis, mapping
            // to the first column by default.
            xAxis: { type: "value" },
            // Declare Y axis, which is a value axis.
            yAxis: {
              type: "category",
              data: ["Positive", "Negative", "Neutral"]
            },
            // Declare several series, each of them mapped to a
            // column of the dataset by default.
            series: [
              {
                type: "bar",
                data: [0, 0, 0],
                itemStyle: { color: "#F4843E" }
              }
            ]
          };
          that.tweets[keyword].forEach(tweet => {
            let result = that.analyzer.analyze(tweet.text);
            if (result.score > 0) {
              that.positive.push(tweet);
              that.options[keyword].series[0].data[0] =
                that.options[keyword].series[0].data[0] + 1;
            } else if (result.score < 0) {
              that.negative.push(tweet);
              that.options[keyword].series[0].data[1] =
                that.options[keyword].series[0].data[1] + 1;
            } else {
              that.neutral.push(tweet);
              that.options[keyword].series[0].data[2] =
                that.options[keyword].series[0].data[2] + 1;
            }
          });
        }
      });
      that.options["Overall"] = {
        legend: {
          data: ["Positive", "Negative", "Neutral"]
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        // Declare X axis, which is a category axis, mapping
        // to the first column by default.
        xAxis: { type: "value" },
        // Declare Y axis, which is a value axis.
        yAxis: {
          type: "category",
          data: ["Positive", "Negative", "Neutral"]
        },
        // Declare several series, each of them mapped to a
        // column of the dataset by default.
        series: [
          {
            type: "bar",
            data: [
              that.positive.length,
              that.negative.length,
              that.neutral.length
            ],
            itemStyle: { color: "#F4843E" }
          }
        ]
      };
      that.collected = true;
    });
  },
  methods: {},
  computed: {
    tweets() {
      return this.$store.getters.getTwet;
    }
  },
  watch: {
    "$vuetify.dark": {
      handler: function(val) {
        return this.$vuetify.dark
          ? (this.theme = "dark")
          : (this.theme = "light");
      },
      immediate: true
    }
  }
};
</script>

<style>
</style>
