<template>
  <div class="app-body">
    <h1>{{ msg }}</h1>
    <button @click="decrease()">+</button>
    <span>{{ count }}</span>
    <button @click="increase()">+</button>
    <br/>
    <br/>
    <input v-model="username" placeholder="user name">
    <br/>
    <span>{{ output }}</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  name: 'app-body',
  data () {
    return {
      username: '',
      msg: 'Hello World'
    }
  },
  computed: {
    ...mapGetters({
      count: 'currentCount',
      output: 'getOutput'
    })
  },
  methods: {
    ...mapActions({
      increase: 'increaseCount',
      decrease: 'decreaseCount',
      getUser: 'getUser'
    }),
    submit: _.debounce(
      function () {
        this.getUser(this.username)
      },
      500
    )
  },
  watch: {
    username: function (username) {
      if (username) this.submit()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
