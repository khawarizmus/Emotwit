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
      <span class="subheading font-weight-light mr-1">Tweets Collected: {{ tweets.length }}</span>
      <v-chart
        :options="options"
        ref="bar"
        :theme="theme"
        :key="options.series[0].data[0] + options.series[0].data[1] + options.series[0].data[2]"
        autoresize
      />
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
      options: {
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
        yAxis: { type: "category", data: ["Positive", "Negative", "Neutral"] },
        // Declare several series, each of them mapped to a
        // column of the dataset by default.
        series: [
          {
            type: "bar",
            data: [0, 0, 0],
            itemStyle: { color: "#F4843E" }
          }
        ]
      },
      theme: "dark",
      positive: [],
      negative: [],
      neutral: [],
      analyzer: {}
    };
  },
  mounted() {
    const that = this;
    this.analyzer = new Sentiment();
    EventBus.$on("collected", () => {
      this.tweets.forEach(tweet => {
        let result = that.analyzer.analyze(tweet.text);
        if (result.score > 0) {
          that.positive.push(tweet);
          that.options.series[0].data[0] = that.options.series[0].data[0] + 1;
        } else if (result.score < 0) {
          that.negative.push(tweet);
          that.options.series[0].data[1] = that.options.series[0].data[1] + 1;
        } else {
          that.neutral.push(tweet);
          that.options.series[0].data[2] = that.options.series[0].data[2] + 1;
        }
      });
    });
  },
  methods: {},
  computed: {
    tweets() {
      return this.$store.getters.getTwet;
    }
  }
};
</script>

<style>
</style>
