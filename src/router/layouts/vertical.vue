<script>
import router from '@router'
import { layoutComputed } from '@state/helpers'

import NavBar from '@components/nav-bar.vue'
import SideBar from '@components/side-bar.vue'
import Footer from '@components/footer.vue'

/**
 * Vertical layout
 */
export default {
  components: { NavBar, SideBar, Footer },
  data() {
    return {
      isMenuCondensed: false,
    }
  },
  computed: {
    ...layoutComputed,
  },
  created: () => {
    document.body.removeAttribute('data-topbar', 'dark')
    document.body.removeAttribute('data-layout-size', 'boxed')
    document.body.classList.remove('auth-body-bg')
  },
  methods: {
    toggleMenu() {
      document.body.classList.toggle('sidebar-enable')

      if (window.screen.width >= 992) {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove('sidebar-enable')
          document.body.classList.remove('vertical-collpsed')
        })
        document.body.classList.toggle('vertical-collpsed')
      } else {
        // eslint-disable-next-line no-unused-vars
        router.afterEach((routeTo, routeFrom) => {
          document.body.classList.remove('sidebar-enable')
        })
        document.body.classList.remove('vertical-collpsed')
      }
      this.isMenuCondensed = !this.isMenuCondensed
    },
  },
}
</script>

<template>
  <div>
    <div id="layout-wrapper">
      <NavBar />
      <SideBar :is-condensed="isMenuCondensed" />
      <!-- ============================================================== -->
      <!-- Start Page Content here -->
      <!-- ============================================================== -->

      <div class="main-content">
        <div class="page-content">
          <!-- Start Content-->
          <div class="container-fluid">
            <slot />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>
