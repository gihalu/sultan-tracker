<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
      class="glossy"
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
        <q-item-label header>Navigation</q-item-label>
        <q-item
          to="/"
          exact
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Summary</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          to="/sultans"
          exact
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
import { set } from 'lodash'
import SignIn from '../components/SignIn.vue'

export default Vue.extend({
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {},
  methods: {},
  created () {
    set(window, 'store', this.$store)
  },
  components: {
    SignIn
  }
})
</script>
