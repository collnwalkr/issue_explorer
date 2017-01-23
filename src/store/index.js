import Vue from 'vue'
import Vuex from 'vuex'
import { apiURL } from './gh-api'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    output: '',
    progress: 0,
    error: false
  },
  actions: {
    getURL (context, url) {
      let { promises, type } = apiURL(url)

      Promise.all(promises).then(() => {
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
    set_user (state, results) {
      state.output = results
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
    getOutput: state => {
      return state.output
    },
    getProgress: state => {
      return state.progress
    },
    getError: state => {
      return state.error
    }
  },
  strict: debug
})
