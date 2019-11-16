<template>
  <q-page class="q-pa-lg">
    <div class="column q-gutter-md">
      <q-card
        :key="index"
        v-for="(row, index) in detailsGrid"
      >
        <q-card-section class="bg-grey-2 text-h6 q-pt-xs q-pb-xs q-pl-lg">{{ row.name }}</q-card-section>
        <div class="q-pa-md row items-start no-wrap q-gutter-md">
          <details-card
            :details="details"
            :key="detailsIndex"
            v-for="(details, detailsIndex) in row.detailRows"
          />
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Action, Getter } from 'vuex-class'
import { SultanDetailRow } from '../../store/modules/sultans'
import DetailsCard from './components/DetailsCard.vue'
import { assign, map, reverse } from 'lodash'

@Component({
  components: {
    DetailsCard
  }
})
export default class DetailsGrid extends Vue {
  @Getter sultanDetailGrid!: SultanDetailRow[];

  get detailsGrid () {
    return map(this.sultanDetailGrid, row => {
      const descendingDetails = reverse(row.detailRows)
      return assign(row, { detailRows: descendingDetails })
    })
  }
}
</script>
