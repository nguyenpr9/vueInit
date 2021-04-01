<script>
import Layout from '@layouts/main.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library as fontAwesomeIconLibrary } from '@fortawesome/fontawesome-svg-core'

fontAwesomeIconLibrary.add(
  require('@fortawesome/free-solid-svg-icons/faSync').definition,
  require('@fortawesome/free-solid-svg-icons/faUser').definition
)
export default {
  page: {
    title: 'Loading page...',
    meta: [{ name: 'description', content: 'Loading page...' }],
  },
  components: { Layout, FontAwesomeIcon },
}
</script>

<template>
  <Layout>
    <Transition appear>
      <FontAwesomeIcon :class="$style.loadingIcon" icon="sync" spin />
    </Transition>
  </Layout>
</template>

<style lang="scss" scoped>
.loadingIcon {
  display: block;
  margin: 0 auto;
  font-size: 3.157rem;
  color: #35495e;

  // stylelint-disable-next-line selector-class-pattern
  &:global(.v-enter-active) {
    transition: opacity 1s;
  }
  // stylelint-disable-next-line selector-class-pattern
  &:global(.v-enter) {
    opacity: 0;
  }
}
</style>
