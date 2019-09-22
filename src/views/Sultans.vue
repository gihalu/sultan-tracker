<template>
  <q-page class="q-pa-lg">
    <div v-if="sultans">
      <q-list
        bordered
        separator
      >
        <q-item
          :key="key"
          tag="label"
          v-ripple
          v-for="(sultan, key) in sultans"
          @click="ToggleSultan(sultan)"
        >
          <q-item-section>
            <q-item-label>{{sultan.name}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle
              color="blue"
              :value="Boolean(Number(sultan.active))"
            />
          </q-item-section>
        </q-item>
      </q-list>
      <q-btn
        class="q-mt-md"
        color="primary"
        label="Add Sultan"
        @click="AddSultan"
      />
    </div>
    <div v-else>
      <span class="text-h5 q-pt-sm">Loading Data</span>
      <q-spinner-grid
        class="q-ml-sm"
        color="primary"
        size="1.5em"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { findIndex, isMatch } from 'lodash'

export default Vue.extend({
  name: 'PageHome',
  computed: {
    ...mapGetters(['sultans'])
  },
  methods: {
    ...mapActions(['AddSultan', 'ToggleSultan'])
  },
  created () {
    this.$store.dispatch('GetSultans')
  }
})
</script>
