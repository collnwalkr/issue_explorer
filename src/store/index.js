import Vue from 'vue'
import Vuex from 'vuex'
import { getUserAPI } from './gh-api'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    output: '',
    progress: 0,
    error: false
  },
  actions: {
    increaseCount (context) {
      context.commit('increment')
    },
    decreaseCount (context) {
      context.commit('decrease')
    },
    getUser (context, name) {
      getUserAPI(name).then((results) => {
        context.commit('set_progress', 100)
        context.commit('set_user', results)
      }).catch((error) => {
        console.log('uh-oh ' + error)
        context.commit('set_error', true)
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
    increment (state) {
      state.progress += 10
    },
    decrease (state) {
      state.progress -= 10
    },
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
