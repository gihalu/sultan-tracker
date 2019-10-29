<template>
  <q-drawer
    v-model="drawer.leftDrawerOpen"
    bordered
    content-class="bg-grey-2"
  >
    <q-list>
      <q-expansion-item
        expand-separator
        icon="bar_chart"
        label="Reports"
      >
        <q-list dense>

          <q-item
            :to="`/report/${sultan}`"
            exact
            :key="index"
            v-for="(sultan, index) in activeSultanNames"
          >
            <q-item-section>
              <q-item-label>{{ sultan }}</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>

      </q-expansion-item>

      <q-item
        to="/"
        exact
        v-if="isAdmin"
      >
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Team Records</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        to="/sultans"
        exact
        v-if="isAdmin"
      >
        <q-item-section avatar>
          <q-icon name="people" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Sultans</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import { filter, get, map } from 'lodash'

export default Vue.extend({
  name: 'app-drawer',
  props: {
    drawer: { required: true },
    isAdmin: { required: true, type: Boolean }
  },
  computed: {
    activeSultanNames () {
      return map(
        filter(get(this, 'sultans'), sultan => Number(sultan.active)),
        'name'
      )
    },

    sultans () {
      return this.$store.getters.sultans
    }
  },
  created () {
    this.$store.dispatch('GetSultans')
  }
})
</script>
