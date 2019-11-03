<template>
  <div class="fixed-center">
    <h4>{{ message }}
      <q-spinner-puff />
    </h4>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Authenticating extends Vue {
  private message = 'Authenticating';
}
</script>
