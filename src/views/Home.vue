<template>
  <q-page class="flex flex-center q-pa-lg">
    <div v-if="displayTable">
      <q-btn
        class="q-mb-md"
        color="primary"
        label="New Records"
        @click="NewSummaryRecords"
      />
      <summary-table
        :columns="columns"
        :rows="rows"
      />
    </div>
    <!-- <div v-if="rows">{{ rows }}</div> -->
    <div v-else>
      <span class="text-h5 q-pt-sm">Loading Data</span>
      <q-spinner-grid
        class="q-ml-sm"
        color="primary"
        size="1.5rem"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { get, set } from 'lodash'
import SummaryTable from './SummaryTable.vue'

export default Vue.extend({
  name: 'PageHome',
  computed: {
    columns (): any {
      return this.$store.getters.summaryHeaders
    },
    displayTable (): boolean {
      return get(this.columns, 'length') && get(this.rows, 'length')
    },
    rows (): any {
      return this.$store.getters.summaryRows
    }
  },
  methods: {
    ...mapActions(['NewSummaryRecords']),
    SignIn () {
      const gapi = get(this, '$gapi')
      gapi
        .signIn()
        .then((response: any) => console.log({ response }))
        .catch((error: any) => console.error({ error }))
    }
  },
  components: {
    SummaryTable
  },
  created () {
    this.$store.dispatch('GetSummary')
    this.$store.dispatch('GetSultans')
  }
})
</script>
