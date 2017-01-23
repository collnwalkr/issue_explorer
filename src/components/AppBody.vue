<template>
  <div class="app-body">
    <user-view v-if="view === 'user'"/>
    <repo-view v-if="view === 'repo'"/>
    <error-view v-if="view === 'error'"/>
    <div v-if="view === 'default'">
      Hello World
    </div>
  </div>
</template>

<script>
import userView from './UserView'
import repoView from './RepoView'
import errorView from './ErrorView'
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'app-body',
  components: {
    userView,
    errorView,
    repoView
  },
  data () {
    return {
      view: 'default'
    }
  },
  computed: {
    ...mapGetters({
      error: 'getError'
    })
  },
  methods: {
    setView: _.debounce(
      function (path) {
        let matched = path.matched[0]
        if (this.error) {
          this.view = 'error'
        } else if (matched) {
          this.view = matched.name
        }
        if (!matched) {
          this.view = 'default'
        }
      },
      500
    )
  },
  created: function () {
    this.setView(this.$route)
  },
  watch: {
    '$route' (to) {
      this.setView(this.$route)
    },
    error () {
      this.setView(this.$route)
    }
  }
}
</script>

<style scoped>

</style>
