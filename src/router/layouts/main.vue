<script>
import { layoutComputed } from '@state/helpers'
import Vertical from './vertical.vue'

export default {
  components: {
    Vertical,
  },
  computed: {
    ...layoutComputed,
  },
}
</script>

<template>
  <div>
    <div v-if="loader" id="preloader">
      <div id="status">
        <div class="spinner-chase">
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
          <div class="chase-dot"></div>
        </div>
      </div>
    </div>
    <Vertical>
      <slot />
    </Vertical>
  </div>
</template>

<style lang="scss" module>
@import '@design';
</style>
