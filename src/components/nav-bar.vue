<script>
import { authComputed } from '@state/helpers'

export default {
  data() {
    return {
      persistentNavRoutes: [
        {
          name: 'home',
          title: 'Home',
        },
      ],
      loggedInNavRoutes: [
        {
          name: 'profile',
          title: () => `Logged in as ${this.currentUser.name}`,
        },
        {
          name: 'logout',
          title: 'Log out',
        },
      ],
      loggedOutNavRoutes: [
        {
          name: 'login',
          title: 'Log in',
        },
      ],
    }
  },
  computed: {
    ...authComputed,
  },
}
</script>

<template>
  <div>
    <router-link to="/">home</router-link>
    <router-link v-if="loggedIn" to="/logout">logout</router-link>
    <router-link v-else to="/profile">profile</router-link>
  </div>
</template>

<style lang="scss" module>
@import '@design';
</style>
