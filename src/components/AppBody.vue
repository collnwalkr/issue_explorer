<template>
  <div class="app-body">
    <user-view v-if=true />
  </div>
</template>

<script>
import userView from './UserView'
import { mapGetters } from 'vuex'

export default {
  name: 'app-body',
  components: {
    userView
  },
  data () {
    return {
      msg: 'Hello World'
    }
  },
  computed: {
    ...mapGetters({
      repos: 'getRepos',
      issues: 'getIssues'
    })
  }
}
</script>

<style scoped>

</style>
