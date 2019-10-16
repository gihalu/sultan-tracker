<template>
  <q-page class="q-pa-lg">
    <div>
      <chart
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
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import Chart from './components/Chart.vue'
import { filter, map } from 'lodash'

export default Vue.extend({
  name: 'report',
  data () {
    return {
      update: { status: false }
    }
  },
  computed: {
    chartData () {
      const rows = this.filteredRows
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
      const sultan = this.sultan
      return filter(this.rows, { sultan })
    },
    options () {
      return {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: `${this.sultan} Trending Report`
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
  }
})
</script>
