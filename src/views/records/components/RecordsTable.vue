<template>
  <div>
    <q-table
      title="Summary"
      :data="rows"
      :columns="columns"
      :filter="filter"
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
        />
        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <q-icon
            slot="append"
            name="search"
          />
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { get, reverse } from 'lodash';

export default Vue.extend({
  name: 'summary-table',
  props: {
    columns: { required: true },
    rows: { required: true }
  },
  data() {
    return {
      filter: '',
      pagination: {
        rowsPerPage: 20
      }
    };
  },
  computed: {
    loading(): boolean {
      return !get(this.columns, 'length') || !get(this.rows, 'length');
    }
  },
  methods: {
    ...mapActions(['NewSummaryRecords'])
  }
});
</script>
