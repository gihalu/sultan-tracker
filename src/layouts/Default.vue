<template>
  <q-layout view="hHh Lpr lFf">
    <q-header
      elevated
      class="text-accent"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Drunken Sultan Tracker
        </q-toolbar-title>
        <sign-in />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { filter, map, set } from 'lodash'
import SignIn from '../components/SignIn.vue'

export default Vue.extend({
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    activeSultanNames () {
      return map(filter(this.sultans, sultan => Number(sultan.active)), 'name')
    },

    isAdmin () {
      return this.$store.getters.isAdmin
    },

    sultans () {
      return this.$store.getters.sultans
    }
  },
  methods: {},
  created () {
    set(window, 'store', this.$store)
    this.$store.dispatch('GetSultans')
  },
  components: {
    SignIn
  }
})
</script>
