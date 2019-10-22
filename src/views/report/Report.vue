<template>
  <q-page class="q-pa-lg">
    <q-card>
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
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import Chart from './components/Chart.vue'
import { filter, get, last, map } from 'lodash'

export default Vue.extend({
  name: 'report',
  data () {
    return {
      update: { status: false }
    }
  },
  computed: {
    chartData () {
      const rows = get(this, 'filteredRows')
      return {
        labels: map(rows, 'date'),
        datasets: [
          {
            label: 'Strength',
            data: map(rows, 'score'),
            borderWidth: 1
          }
        ]
      }
    },
    filteredRows () {
      const sultan = get(this, 'sultan')
      return filter(get(this, 'rows'), { name: sultan })
    },
    lastRow () {
      return last(get(this, 'filteredRows'))
    },
    options () {
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
    },
    rows (): any {
      return this.$store.getters.summaryRows
    },
    sultan () {
      return this.$route.params.sultan
    },
    tier () {
      return this.$store.getters.tier(get(this, 'lastRow.score'))
    }
  },
  methods: {
    UpdateSelectedSultan (sultan: string) {
      this.$router.push(`/report/${sultan}`)
    }
  },
  components: {
    Chart
  },
  created () {
    this.$store.dispatch('GetSummary')
    this.$store.dispatch('GetTiers')
  }
})
</script>
