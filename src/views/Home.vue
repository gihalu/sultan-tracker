<template>
  <q-page padding>
    <!-- <overview v-if="summaryRows && summaryRows.length" /> -->
    <h5 class="fixed-center">{{ welcomeMessage }}</h5>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter } from 'vuex-class'
import Overview from './home/components/overview.vue'

@Component({
  components: {
    Overview
  }
})
export default class Home extends Vue {
  private welcomeMessage = 'Welcome to the Gotham Elite Sultan Tracker';

  @Getter isAdmin!: boolean;
  @Getter summaryRows!: {}[];
}
</script>
