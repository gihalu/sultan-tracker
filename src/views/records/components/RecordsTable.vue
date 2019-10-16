<template>
  <div>
    <q-table
      title="Summary"
      :data="rows"
      :columns="columns"
      :loading="loading"
      :pagination.sync="pagination"
      row-key="key"
    >
      <template v-slot:top>
        <q-btn
          class="q-mb-md"
          color="primary"
          flat
          label="New Records"
          @click="NewSummaryRecords"
        /></template>
    </q-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { get } from 'lodash'

export default Vue.extend({
  name: 'summary-table',
  props: {
    columns: { required: true },
    rows: { required: true }
  },
  data () {
    return {
      pagination: {
        rowsPerPage: 10
      }
    }
  },
  computed: {
    loading (): boolean {
      return !get(this.columns, 'length') || !get(this.rows, 'length')
    }
  },
  methods: {
    ...mapActions(['NewSummaryRecords'])
  }
})
</script>
