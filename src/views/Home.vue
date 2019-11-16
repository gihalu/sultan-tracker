<template>
  <q-page class="q-pa-lg custom-background">
    <q-card class="text-h4 text-center bg-tinted text-accent text-weight-bold">{{ welcomeMessage }}</q-card>

    <q-card
      dark
      bordered
      class="bg-tinted text-white q-mt-md"
    >
      <q-card-section>
        <div class="text-h6">Weekly Growth</div>
      </q-card-section>

      <q-separator
        dark
        inset
      />

      <q-card-section class="bg-tinted">
        <div
          :key="index"
          v-for="(details, index) in topGrowth"
        >
          - {{ details.name }} grew by {{ details.growth }}
        </div>
      </q-card-section>
    </q-card>

    <q-card
      dark
      bordered
      class="bg-tinted text-white q-mt-md"
    >
      <q-card-section>
        <div class="text-h6">Promotions</div>
      </q-card-section>

      <q-separator
        dark
        inset
      />

      <q-card-section class="bg-tinted">
        <div
          :key="index"
          v-for="(details, index) in currentPromotions"
        >
          - {{ details.name }} was promoted to {{ details.tier }}
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style lang="stylus" scoped>
.bg-tinted {
  background-color: rgba(0, 0, 0, 0.5);
}

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
import { SultanDetailRow, DetailRow } from '../store/modules/sultans'
import { filter, find, map, slice, sortBy } from 'lodash'

@Component
export default class Home extends Vue {
  private welcomeMessage = 'Welcome to the Gotham Elite Sultan Tracker';

  @Getter isAdmin!: boolean;
  @Getter sultanDetailGrid!: SultanDetailRow[];

  get currentDetails () {
    return map(this.sultanDetailGrid, (row: SultanDetailRow) => {
      const details = row.detailRows
      return find(details, { current: true })
    })
  }

  get currentPromotions () {
    return filter(this.currentDetails, { promoted: true })
  }

  get topGrowth () {
    const sortedRows = sortBy(this.currentDetails, (row: DetailRow) => {
      if (!row.growth) return 0
      return row.growth * -1
    })

    return slice(sortedRows, 0, 5)
  }
}
</script>
