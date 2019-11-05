<template>
  <q-drawer
    content-class="bg-grey-3"
    v-model="leftDrawerOpen"
  >
    <q-list dense>

      <q-item
        to="/"
        exact
        @click="CloseDrawer"
      >
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Home</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        to="/records"
        exact
        v-if="isAdmin"
        @click="CloseDrawer"
      >
        <q-item-section avatar>
          <q-icon name="list" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Team Records</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        to="/sultans"
        exact
        v-if="isAdmin"
        @click="CloseDrawer"
      >
        <q-item-section avatar>
          <q-icon name="people" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Sultans</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item-label header>Reports</q-item-label>

      <q-item
        :to="`/report/${sultan}`"
        exact
        :key="index"
        v-for="(sultan, index) in activeSultanNames"
        @click="CloseDrawer"
      >
        <q-item-section avatar>
          <q-icon name="show_chart" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ sultan }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import { filter, get, map } from 'lodash';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class AppDrawer extends Vue {
  @Prop(Boolean) readonly leftDrawerOpen: boolean | undefined;
  @Prop(Boolean) readonly isAdmin: boolean | undefined;

  get activeSultanNames() {
    return map(
      filter(this.sultans, (sultan: { active: string }) => {
        return Number(sultan.active);
      }),
      'name'
    );
  }

  get sultans() {
    return get(this.$store, 'getters.sultans');
  }

  CloseDrawer() {
    this.$emit('close');
  }

  created() {
    const actions: any = get(this, '$store.dispatch');
    actions('GetSultans');
  }
}
</script>
