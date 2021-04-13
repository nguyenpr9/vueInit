<script>
import Vertical from './vertical.vue'

export default {
  components: {
    Vertical,
  },
}
</script>

<template>
  <div>
    <Vertical>
      <slot />
    </Vertical>
  </div>
</template>

<style lang="scss" module>
@import '@design';
</style>
