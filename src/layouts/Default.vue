<template>
  <q-layout view="hLf Lpr lff">
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

        <q-btn
          class="text-warn"
          stretch
          flat
          to="/"
        >

          <q-toolbar-title>
            Gotham Elite Sultan Tracker
          </q-toolbar-title>

        </q-btn>

        <q-space />

        <sign-in />
      </q-toolbar>
    </q-header>

    <app-drawer
      :isAdmin="isAdmin"
      :leftDrawerOpen="leftDrawerOpen"
      @close="leftDrawerOpen = false"
    />

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
import Component from 'vue-class-component'

@Component({
  components: {
    AppDrawer,
    SignIn
  }
})
export default class Layout extends Vue {
  private leftDrawerOpen: boolean = Boolean(this.$q.platform.is.desktop);

  get isAdmin () {
    return this.$store.getters.isAdmin
  }
}
</script>
