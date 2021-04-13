<script>
import Layout from '@layouts/main.vue'
import LoadingView from './_loading.vue'

export default {
  page: {
    title: 'Page timeout',
    meta: [
      { name: 'description', content: 'The page timed out while loading.' },
    ],
  },
  components: { Layout, LoadingView },
  data() {
    return {
      offlineConfirmed: false,
    }
  },
  beforeCreate() {
    //  ping
  },
}
</script>

<template>
  <Layout v-if="offlineConfirmed">
    <h1 class="text-center">
      The page timed out while loading. Are you sure you're still connected to
      the Internet?
    </h1>
  </Layout>
  <LoadingView v-else />
</template>
