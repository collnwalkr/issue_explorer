import Vue from 'vue'
import Vuex from 'vuex'
import { apiURL, filterIssues } from './gh-api'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    user: {},
    issues: {},
    repos: [],
    repo: {},
    progress: 0,
    error: false,
    current_view: 'default',
    filter: 'all'
  },
  actions: {
    getURL (context, url) {
      let { promises, type, repoName } = apiURL(url)

      Promise.all(promises).then((res) => {
        context.commit('set_error', false)
        let repoResult = res[0].data
        let userResult = type === 'user' ? res[1].data : {}
        let issueResult = type === 'repo' ? res[1].data : []
        issueResult = filterIssues(issueResult)
        let repo = repoResult.filter(repo => repo.name === repoName)
        context.commit('set_user', userResult)
        context.commit('set_repos', repoResult)
        context.commit('set_issues', issueResult)
        context.commit('set_repo', repo)
        context.commit('set_progress', 100)
      }).catch((error) => {
        context.commit('set_error', true)
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
    },
    setView (context, view) {
      context.commit('set_view', view)
    },
    setDateFilter (context, filter) {
      context.commit('set_filter', filter)
    },
    setRepo (context, repo) {
      context.commit('set_repo', repo)
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
    },
    set_view (state, view) {
      state.current_view = view
    },
    set_filter (state, filter) {
      state.filter = filter
    },
    set_repo (state, repo) {
      if (repo[0]) state.repo = repo[0]
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
    },
    getView: state => {
      return state.current_view
    },
    getFilter: state => {
      return state.filter
    },
    getRepo: state => {
      return state.repo
    }
  },
  strict: debug
})
