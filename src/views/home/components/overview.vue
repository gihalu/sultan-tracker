<template>
  <div> date: {{ maxDate }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter } from 'vuex-class'

@Component
export default class Overview extends Vue {
  @Getter maxDate!: string;
}
</script>
