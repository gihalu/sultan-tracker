<template>
  <q-card
    class="details-card"
    :class="details.promoted ? 'bg-positive' : ''"
  >
    <q-card-section class="bg-grey-9 text-white q-pa-xs text-center">{{ details.date }}</q-card-section>
    <q-card-section class="q-mt-sm">
      <div>Score: {{ details.score }}</div>
      <div>Growth: {{ details.growth }}</div>
      <div>Tier: {{ details.tier }}</div>
    </q-card-section>
  </q-card>
</template>

<style lang="stylus" scoped>
.details-card {
  min-width: 10rem;
  max-width: 10rem;
}
</style>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class DetailsCard extends Vue {
  @Prop({ required: true }) readonly details!: any;
}
</script>
