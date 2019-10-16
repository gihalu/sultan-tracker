<template>
  <q-page class="vertical-top q-pa-lg">
    <records-table
      :columns="columns"
      :rows="rows"
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
    rows (): any {
      return this.$store.getters.summaryRows
    }
  },
  methods: {
    SignIn () {
      const gapi = get(this, '$gapi')
      gapi
        .signIn()
        .then((response: any) => console.log({ response }))
        .catch((error: any) => console.error({ error }))
    }
  },
  components: {
    RecordsTable
  },
  created () {
    this.$store.dispatch('GetSummary')
    this.$store.dispatch('GetSultans')
  }
})
</script>
