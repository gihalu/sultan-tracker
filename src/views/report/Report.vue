<template>
  <q-page class="q-pa-lg">
    <q-card v-if="filteredRows.length">
      <q-card-section class="bg-secondary text-accent">
        <div class="text-h6 row justify-between">
          {{ sultan }} Trending Report
          <q-chip
            class="q-ml-md"
            square
            icon="bookmark"
            color="accent"
          >{{ tier }}</q-chip>
        </div>
      </q-card-section>
      <q-card-section style="min-height: 25vh;">
        <chart
          class="q-mt-lg"
          :chart-data="chartData"
          :options="options"
          :update="update"
          v-if="rows"
        />
        <q-inner-loading :showing="!rows">
          <q-spinner-gears
            size="5rem"
            color="primary"
          />
        </q-inner-loading>
      </q-card-section>
    </q-card>
    <div
      class="fixed-center"
      v-else
    >
      <h6>
        <span v-if="loadingData">Loading data</span>
        <span> Unfortunately, we could not find any records for {{ sultan }}</span>
      </h6>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import Chart from './components/Chart.vue'
import { filter, get, last, map, toNumber } from 'lodash'
import Component from 'vue-class-component'
import { Getter } from 'vuex-class'

@Component({
  components: { Chart }
})
export default class report extends Vue {
  private update = { status: false };

  get chartData () {
    const rows = this.filteredRows
    return {
      labels: map(rows, 'date'),
      datasets: [
        {
          label: 'Strength',
          data: map(rows, row => {
            const scoreString = get(row, 'score', '')
            return toNumber(scoreString.replace(/,/g, ''))
          }),
          borderWidth: 1
        }
      ]
    }
  }

  get filteredRows () {
    const sultan = this.sultan
    return filter(this.rows, { name: sultan })
  }

  get lastRow () {
    return last(this.filteredRows)
  }

  get loadingData () {
    return !get(this.sultans, 'length') || !get(this.rows, 'length')
  }

  get options () {
    return {
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  }
  get rows (): any {
    return this.$store.getters.summaryRows
  }
  get sultan () {
    return this.$route.params.sultan
  }
  get tier () {
    const score = Number(get(this, 'lastRow.score', '').replace(/,/g, ''))
    return this.$store.getters.tier(score)
  }

  @Getter sultans!: [];

  UpdateSelectedSultan (sultan: string) {
    this.$router.push(`/report/${sultan}`)
  }
}
</script>
