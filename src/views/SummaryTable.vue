<template>
  <div>
    <q-table
      title="Summary"
      :data="rows"
      :columns="columns"
      row-key="sultan"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'summary-table',
  props: {
    columns: { required: true },
    rows: { required: true }
  },
  computed: {}
})
</script>
