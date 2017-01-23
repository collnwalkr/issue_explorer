<template>
  <div class="input-bar">
    <input v-model="gh_link" :placeholder=ph type="url">

    <div class="loading-bar-parent">
      <loading-bar
        id="loading-bar"
        :on-error-done="load_errorDone"
        :on-progress-done="load_progressDone"
        :progress="load_progress"
        :direction="load_direction"
        :error="load_error"
      />
    </div>
  </div>
</template>

<script>
import loadingBar from 'vue2-loading-bar'
import VueRouter from 'vue-router'
import Parse from 'url-parse'
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'

const routes = [
  { path: '/:user/:repo' },
  { path: '/:user/' }
]

const router = new VueRouter({
  routes
})

export default{
  name: 'input-bar',
  components: {
    loadingBar
  },
  data () {
    return {
      username: '',
      gh_link: '',
      pathname: '',
      load_direction: 'right',
      ph: 'link to GitHub repo or user'
    }
  },
  computed: {
    ...mapGetters({
      load_progress: 'getProgress',
      load_error: 'getError'
    })
  },
  methods: {
    ...mapActions([
      'getUser',
      'getURL',
      'setError',
      'setProgress'
    ]),
    submit: _.debounce(
      function () {
        this.setError(false)
        router.push({ path: this.pathname })
        this.getURL(this.gh_link)
      },
      500
    ),
    load_errorDone: function () {},
    load_progressDone: function () {
      this.setProgress(0)
    }
  },
  created: function () {
    let gh = 'https://github.com'
    let pathname = this.$route.path
    if (pathname !== '/') { this.gh_link = gh + pathname }
  },
  watch: {
    gh_link: function (rawUrl) {
      let url = Parse(rawUrl)
      this.pathname = url.pathname
      if (rawUrl) this.submit()
    },
    '$route' (to) {
      if (to.path === '/') {
        this.gh_link = ''
      }
      if (!_.isEmpty(to.params)) {
        let gh = 'https://github.com/'
        let { user, repo } = to.params
        let userLink = gh + user
        let repoLink = gh + user + '/' + repo
        this.gh_link = repo ? repoLink : userLink
      }
    }
  }
}

</script>

<style lang="scss">
  @import "~vue2-loading-bar/src/css/loading-bar.css";
  @import "../assets/variables";

  .loading-bar-parent{
    width: 500px;
    height: 4px;
  }

  .LoadingBar--error{
    background: #ff493e;
  }

  #loading-bar{
    position: relative;
  }

  input{
    width: 400px;
    height: 30px;
    font-size: 1.5rem;
    padding: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: $light-grey;
    border-image: initial;
  }
</style>
