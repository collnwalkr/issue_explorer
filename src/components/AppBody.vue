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
import { mapGetters, mapActions } from 'vuex'

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
    ...mapActions({
      sendView: 'setView'
    }),
    setView: _.debounce(
      function (path) {
        if (path.matched) {
          if (this.error) {
            this.view = 'error'
          } else if (path.matched[0]) {
            this.view = path.matched[0].name
          } else {
            this.view = 'default'
          }
          this.sendView(this.view)
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
