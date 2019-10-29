<template>
  <q-page class="vertical-top q-pa-lg">
    <records-table
      :columns="columns"
      :rows="rows"
      v-if="isAdmin"
    />
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { get, set } from 'lodash'
import RecordsTable from './components/RecordsTable.vue'

export default Vue.extend({
  name: 'Records',
  computed: {
    columns (): any {
      return this.$store.getters.summaryHeaders
    },
    isAdmin (): boolean {
      return this.$store.getters.isAdmin
    },
    rows (): any {
      return this.$store.getters.summaryRows
    }
  },
  methods: {},
  components: {
    RecordsTable
  },
  created () {
    this.$store.dispatch('GetSummary')
    this.$store.dispatch('GetSultans')
  }
})
</script>
