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
        >
          <q-item-section>
            <q-item-label>{{sultan.name}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle
              color="blue"
              :value="Boolean(Number(sultan.active))"
              @input="ToggleSultan(sultan)"
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
import { findIndex, isMatch } from 'lodash'
import Component from 'vue-class-component'
import { Getter, Action } from 'vuex-class'

@Component
export default class Sultans extends Vue {
  @Getter sultans!: [];

  @Action AddSultan!: Function;
  @Action GetSultans!: Function;
  @Action ToggleSultan!: Function;

  Test (sultan: any) {
    console.log({ sultan })
  }

  created () {
    this.GetSultans()
  }
}
</script>
