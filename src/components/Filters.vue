<template>
  <v-card height="100%">
    <v-toolbar card dense>
      <v-toolbar-title>
        <span class="subheading">FILTERS</span>
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>-->
    </v-toolbar>
    <v-card-text>
      <v-layout>
        <v-flex>
          <v-select :items="types" v-model="type" label="Types of tweets" outline></v-select>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-select :items="languages" v-model="lang" label="Language" outline></v-select>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex justify-center>
          <!-- <v-date-picker v-model="date" :allowed-dates="allowedDates" class="mt-3"></v-date-picker> -->
          <v-menu
            ref="picker"
            v-model="picker"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Date"
                hint="Returns tweets created before the given date."
                persistent-hint
                outline
                @blur="date"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="picker = false"
              :allowed-dates="allowedDates"
            ></v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions></v-card-actions>
  </v-card>
</template>

<script>
import ISO6391 from "iso-639-1";
import { format, differenceInDays, isPast } from "date-fns";

export default {
  data() {
    return {
      types: ["mixed", "recent", "popular"],
      languages: [...ISO6391.getAllNativeNames()],
      type: "mixed",
      lang: "English",
      date: format(Date.now(), "YYYY-MM-DD"),
      picker: false
    };
  },
  mounted() {},
  methods: {
    allowedDates: val => {
      return (
        differenceInDays(new Date(val), new Date()) < 7 && isPast(new Date(val))
      );
    }
  },
  watch: {
    date: {
      handler: function(val) {
        this.$store.commit("PUSH-DATE", val);
      },
      immediate: true
    },
    type: {
      handler: function(val) {
        this.$store.commit("PUSH-TYPE", val);
      },
      immediate: true
    },
    lang: {
      handler: function(val) {
        this.$store.commit("PUSH-LANG", ISO6391.getCode(val));
      },
      immediate: true
    }
  }
};
</script>

<style>
</style>
