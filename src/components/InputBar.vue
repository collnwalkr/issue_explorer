<template>
  <div class="input-bar">
    <input v-model="gh_link" :placeholder=ph type="url"  v-on:blur="stop_thinking">

    <div class="loading-bar-parent">
      <loading-bar
        id="loading-bar"
        :on-error-done="load_errorDone"
        :on-progress-done="load_progressDone"
        :progress="load_progress"
        :direction="load_direction"
        :error="load_error"
        :class="{ 'LoadingBar--thinking' : thinking}"
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
      thinking: false,
      pathname: '',
      load_direction: 'right',
      ph: 'url for GitHub repo or user'
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
    stop_thinking: function () {
      this.thinking = false
    },
    submit: _.debounce(
      function () {
        this.stop_thinking()
        this.setError(false)
        router.push({ path: this.pathname })
        this.getURL(this.gh_link)
      },
      500
    ),
    load_errorDone: function () {},
    load_progressDone: function () {
      this.setProgress(0)
      this.stop_thinking()
    }
  },
  created: function () {
    let gh = 'https://github.com'
    let pathname = this.$route.path
    if (pathname !== '/') { this.gh_link = gh + pathname }
  },
  watch: {
    gh_link: function (rawUrl) {
      this.thinking = true
      let url = Parse(rawUrl)
      this.pathname = url.pathname
      if (rawUrl) this.submit()
      else this.stop_thinking()
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
    height: 4px;
    width: calc(100% - 8px);
  }

  .LoadingBar--error{
    background: #ff493e;
  }

  .LoadingBar--thinking {
    background: $light-grey;
    transition: background 300ms ease-out;
  }

  .LoadingBar-glow {
    box-shadow: none;
  }

  #loading-bar{
    position: relative;
  }

  .input-bar {
    text-align: left;
    padding-left: 40px;
  }

  .input-bar input{
    width: calc(100% - 30px);
    height: 30px;
    font-size: 1.5rem;
    padding: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: $light-grey;
    border-image: initial;
  }
</style>
