<template>
  <q-page class="flex flex-center custom-background">
    <h4 class="fixed-center text-primary text-weight-bold">{{ welcomeMessage }}</h4>
  </q-page>
</template>

<style lang="stylus" scoped>
.custom-background {
  background-image: url('../assets/background.jpg');
  background-color: black;
  background-size: cover;
  background-position: center;
}
</style>

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
