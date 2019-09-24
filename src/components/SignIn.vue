/* eslint-disable vue/no-async-in-computed-properties */
<template>
  <div>
    <google-signin-btn
      label="Sign In"
      v-if="!isSignedIn"
      @click="SignIn"
    />
    <span v-else>
      {{ name }} : <a
        href="/"
        click.prevent="SignOut"
      >sign out</a>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { get } from 'lodash'

export default Vue.extend({
  name: 'sign-in',
  data () {
    return {
      isSignedIn: false,
      user: null
    }
  },
  computed: {
    name () {
      const vm: any = this
      return get(vm.user, 'name')
    }
  },
  methods: {
    SignIn () {
      const vm: any = this
      vm.$gapi
        .signIn()
        .then((response: any) => {
          console.log({ response })
        })
        .catch((error: any) => {
          console.error({ error })
        })
    },
    SignOut () {
      const vm: any = this
      vm.$gapi
        .signOut()
        .then((response: any) => {
          console.log({ response })
        })
        .catch((error: any) => {
          console.error({ error })
        })
    }
  },
  created () {
    const vm: any = this
    vm.$gapi.isSignedIn().then((result: boolean) => {
      this.isSignedIn = result
    })
    vm.$gapi.currentUser().then((result: any) => {
      this.user = result
    })
  }
})
</script>
