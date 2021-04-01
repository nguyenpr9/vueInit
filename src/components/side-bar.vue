<script>
import simplebar from 'simplebar-vue'

import { layoutComputed } from '@state/helpers'
import SideNav from './side-nav.vue'
/**
 * Sidebar component
 */
export default {
  components: { simplebar, SideNav },
  props: {
    isCondensed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      settings: {
        minScrollbarLength: 60,
      },
    }
  },
  computed: {
    ...layoutComputed,
  },
  watch: {
    $route: {
      handler: 'onRoutechange',
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    document.body.setAttribute('data-sidebar', 'dark')
  },
  methods: {
    onRoutechange() {
      setTimeout(() => {
        if (document.getElementsByClassName('mm-active').length > 0) {
          const currentPosition = document.getElementsByClassName(
            'mm-active'
          )[0].offsetTop
          if (currentPosition > 500)
            this.$refs.currentMenu.SimpleBar.getScrollElement().scrollTop =
              currentPosition + 300
        }
      }, 300)
    },
  },
}
</script>

<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="vertical-menu">
    <simplebar
      v-if="!isCondensed"
      id="my-element"
      ref="currentMenu"
      :settings="settings"
      class="h-100"
    >
      <SideNav />
    </simplebar>

    <simplebar v-else class="h-100">
      <SideNav />
    </simplebar>
  </div>
  <!-- Left Sidebar End -->
</template>
