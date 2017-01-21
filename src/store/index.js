import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    count: 1
  },
  actions: {
    increaseCount (context) {
      context.commit('increment')
    },
    decreaseCount (context) {
      context.commit('decrease')
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    decrease (state) {
      state.count--
    }
  },
  getters: {
    currentCount: state => {
      return state.count
    }
  },
  strict: debug
})
