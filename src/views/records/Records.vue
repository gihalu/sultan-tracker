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
import Vue from 'vue';
import { get, set, sortBy } from 'lodash';
import RecordsTable from './components/RecordsTable.vue';
import { summary } from '../../store/modules/summary';
import { Component } from 'vue-property-decorator';

@Component({
  components: {
    RecordsTable
  }
})
export default class Records extends Vue {
  get columns(): any {
    return this.$store.getters.summaryHeaders || [];
  }

  get isAdmin(): boolean {
    return this.$store.getters.isAdmin || false;
  }

  get rows(): any {
    const rows: summary[] = this.$store.getters.summaryRows || [];
    const currentDate = new Date();
    return sortBy(rows, row => {
      const date = new Date(row.date);
      return currentDate.valueOf() - date.valueOf();
    });
  }
}
</script>
