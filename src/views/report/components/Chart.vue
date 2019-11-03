<template>
  <canvas :id='chartId' />
</template>

<script lang="ts">
import Vue from 'vue'
import Chart from 'chart.js'

export default Vue.extend({
  name: 'report-chart',
  props: {
    chartData: { required: true },
    options: { required: true },
    update: { required: false }
  },
  data () {
    return {
      chart: null,
      chartId: 'report-chart'
    }
  },
  computed: {
    ctx () {
      const id: string = this.chartId
      return document.getElementById(id)
    }
  },
  methods: {
    CreateChart (): any {
      const ctx = this.ctx
      const myChart = new Chart(ctx, {
        type: 'line',
        data: this.chartData,
        options: this.options
      })
      return myChart
    },
    UpdateChart () {
      const chart: any = this.chart
      if (chart === null) {
      } else {
        chart.update()
      }
    }
  },
  mounted () {
    const chart = this.CreateChart()
    this.chart = chart
  },
  watch: {
    chartData: {
      handler (newData: any) {
        const chart: any = this.chart
        const options: any = this.options
        chart.data = newData
        chart.options = options
        chart.update()
      },
      deep: true
    }
  }
})
</script>
