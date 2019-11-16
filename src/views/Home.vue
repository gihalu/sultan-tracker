<template>
  <q-page class="q-pa-lg custom-background">

    <q-card
      dark
      bordered
      class="bg-tinted text-white"
    >
      <q-card-section>
        <div class="text-h6">Top growth this week</div>
      </q-card-section>

      <q-separator
        dark
        inset
      />

      <q-card-section
        class="bg-tinted"
        v-if="(currentDetails || []).length"
      >
        <div
          :key="index"
          v-for="(details, index) in topGrowth"
        >
          - {{ details.name }} grew by {{ details.growth }}
        </div>

      </q-card-section>

      <q-inner-loading :showing="!(currentDetails || []).length">
        <q-spinner-gears
          size="50px"
          color="primary"
        />
      </q-inner-loading>
    </q-card>

    <q-card
      dark
      bordered
      class="bg-tinted text-white q-mt-md"
    >
      <q-card-section>
        <div class="text-h6">Promotions this week</div>
      </q-card-section>

      <q-separator
        dark
        inset
      />

      <q-card-section
        class="bg-tinted"
        v-if="(currentDetails || []).length"
      >
        <div
          :key="index"
          v-for="(details, index) in currentPromotions"
        >
          - {{ details.name }} was promoted to {{ details.tier }}
        </div>
      </q-card-section>

      <q-inner-loading :showing="!(currentDetails || []).length">
        <q-spinner-gears
          size="50px"
          color="primary"
        />
      </q-inner-loading>
    </q-card>

  </q-page>
</template>

<style lang="stylus" scoped>
.bg-tinted {
  background-color: rgba(0, 0, 0, 0.35);
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
  private topGrowthCount = 3;

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

    return slice(sortedRows, 0, this.topGrowthCount)
  }
}
</script>
