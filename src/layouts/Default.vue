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

    <app-drawer :isAdmin="isAdmin" :drawer="{leftDrawerOpen}" v-if="isLoggedIn" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { set } from 'lodash'
import SignIn from '../components/SignIn.vue'
import AppDrawer from './Drawer.vue'

export default Vue.extend({
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {

    isAdmin () {
      return this.$store.getters.isAdmin
    },

    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  components: {
    AppDrawer,
    SignIn
  }
})
</script>
