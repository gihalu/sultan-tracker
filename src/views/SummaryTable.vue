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

// declare global {
//   interface Vue {
//     $store: any
//   }
// }

export default Vue.extend({
  name: 'summary-table',
  props: {
    columns: { required: true },
    rows: { required: true }
  },
  data () {
    return {}
  },
  computed: {}
})
</script>
