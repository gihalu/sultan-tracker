<template>
  <q-page class="q-pa-lg">

    <q-card
      dark
      bordered
      class="bg-grey-9 text-white"
    >
      <q-card-section>
        <div class="text-h6">Promotions</div>
      </q-card-section>

      <q-separator
        dark
        inset
      />

      <q-card-section>
        <div
          :key="index"
          v-for="(details, index) in currentPromotions"
        >
          - {{ details.name }} was promoted to {{ details.tier }}
        </div>
      </q-card-section>
    </q-card>

    <q-card
      dark
      bordered
      class="bg-grey-9 text-white q-mt-sm"
    >
      <q-card-section>
        <div class="text-h6">Top Growth</div>
      </q-card-section>

      <q-separator
        dark
        inset
      />

      <q-card-section>
        <div
          :key="index"
          v-for="(details, index) in topGrowth"
        >
          - {{ details.name }} grew by {{ details.growth }}
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Getter } from 'vuex-class'
import { SultanDetailRow, DetailRow } from '../../store/modules/sultans'
import { filter, find, map, slice, sortBy } from 'lodash'

@Component
export default class Headlines extends Vue {
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
