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
          :loading='saving'
          @click="NewRecords"
        >
          New Records
          <template v-slot:loading>
            Saving
            <q-spinner-hourglass class="q-ml-sm" />
          </template>
        </q-btn>
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
import { Action } from 'vuex-class';
import { Prop, Component } from 'vue-property-decorator';
import { summary } from '../../../store/modules/summary';

interface Notification {
  color: 'negative' | 'positive';
  message: string;
  position: 'center';
}

@Component
export default class SummaryTable extends Vue {
  @Prop({ required: true }) columns!: string[][];
  @Prop({ required: true }) rows!: summary[];

  private filter: string = '';
  private notification: Notification = {
    color: 'negative',
    message: 'Update failed',
    position: 'center'
  };
  private pagination = {
    rowsPerPage: 20
  };
  private saving: boolean = false;

  get loading(): boolean {
    return !get(this.columns, 'length') || !get(this.rows, 'length');
  }

  @Action NewSummaryRecords!: Function;

  NewRecords() {
    this.saving = true;
    this.NewSummaryRecords()
      .then((response: any) => {
        this.notification.color = 'positive';
        this.notification.message = 'Spreadsheet successfully updated';
      })
      .catch((error: any) => {
        this.notification.color = 'negative';
        this.notification.message = `Spreadsheet could not be updated (${error})`;
      })
      .then(() => {
        this.$q.notify(this.notification);
        this.saving = false;
      });
  }
}
</script>
