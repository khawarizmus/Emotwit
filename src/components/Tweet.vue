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
export default {
  data() {
    return {
      input: ""
    };
  },
  methods: {
    analyse() {}
  }
};
</script>

<style>
</style>
