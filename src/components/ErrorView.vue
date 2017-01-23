<template>
  <div class="error-view">
    <h2>
      error!
    </h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import externalLink from './ExternalLink'

export default {
  name: 'error-view',
  components: {
    externalLink
  },
  data () {
    return {
      msg: 'Hello World'
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      repos: 'getRepos'
    })
  }
}

</script>

<style scoped lang="scss">
  @import "../assets/variables.scss";

</style>
