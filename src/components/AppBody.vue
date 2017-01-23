<template>
  <div class="app-body">
    <input-bar/>
    <br/>
    <user-view/>
  </div>
</template>

<script>
import inputBar from './InputBar'
import userView from './UserView'
import { mapGetters } from 'vuex'

export default {
  name: 'app-body',
  components: {
    inputBar,
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
