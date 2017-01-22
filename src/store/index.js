import Vue from 'vue'
import Vuex from 'vuex'
import { getUserAPI } from './gh-api'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
console.log(getUserAPI)

export default new Vuex.Store({
  state: {
    count: 1,
    output: ''
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
        console.log(results.statusText)
        context.commit('set_user', results)
      }).catch((error) => {
        console.log('uh-oh ' + error)
      })
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    decrease (state) {
      state.count--
    },
    set_user (state, results) {
      state.output = results
    }
  },
  getters: {
    currentCount: state => {
      return state.count
    },
    getOutput: state => {
      return state.output
    }
  },
  strict: debug
})
