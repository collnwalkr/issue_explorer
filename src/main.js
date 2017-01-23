import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import store from './store'
import VTooltip from 'v-tooltip'

Vue.use(VueRouter)
Vue.use(VTooltip)

const routes = [
  { path: '/:user/:repo' },
  { path: '/:user/' }
]
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
