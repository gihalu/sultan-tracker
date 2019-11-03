<template>
  <div id="app">
    <router-view v-if="isAuthorized" />
    <authenticating v-else />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import Authenticating from './layouts/Authenticating.vue'

const serviceAccount = namespace('serviceAccount')

@Component({
  components: {
    Authenticating
  }
})
export default class App extends Vue {
  @serviceAccount.Getter isAuthorized!: boolean;
  @serviceAccount.Action GetAccessToken!: Function;

  created () {
    this.GetAccessToken()
  }
}
</script>
