import Vue from 'vue'
import Vuex from 'vuex'
import { apiURL } from './gh-api'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    user: {},
    issues: {},
    repos: [],
    progress: 0,
    error: false
  },
  actions: {
    getURL (context, url) {
      let { promises, type } = apiURL(url)

      Promise.all(promises).then((res) => {
        let repoResult = res[0].data
        let userResult = type === 'user' ? res[1].data : {}
        let issueResult = type === 'repo' ? res[1].data : []
        context.commit('set_user', userResult)
        context.commit('set_repos', repoResult)
        context.commit('set_issues', issueResult)
        context.commit('set_progress', 100)
      }).catch((error) => {
        context.commit('set_error', true)
        console.log(type)
        let res = error.resource
        if (error === 'no match') {
          console.log('cant parse that thanggg')
        } else if (error.status === 403) {
          console.log('OUT OF REQUESTS')
        } else if (error.status === 404) {
          console.log('CANT FIND ' + res)
        } else {
          console.log('UHHHH')
        }
      })
    },
    setError (context, val) {
      context.commit('set_error', val)
    },
    setProgress (context, percentage) {
      context.commit('set_progress', percentage)
    }
  },
  mutations: {
    set_user (state, user) {
      state.user = user
    },
    set_issues (state, issues) {
      state.issues = issues
    },
    set_repos (state, repos) {
      state.repos = repos
    },
    set_error (state, e) {
      state.error = e
    },
    set_progress (state, percentage) {
      state.progress = percentage
    }
  },
  getters: {
    currentCount: state => {
      return state.count
    },
    getProgress: state => {
      return state.progress
    },
    getUser: state => {
      return state.user
    },
    getIssues: state => {
      return state.issues
    },
    getRepos: state => {
      return state.repos
    },
    getError: state => {
      return state.error
    }
  },
  strict: debug
})
