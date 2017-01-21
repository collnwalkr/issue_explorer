<template>
  <div class="appbody">
    <h1>{{ msg }}</h1>
    <button @click="decrease()">+</button>
    <span>{{ count }}</span>
    <button @click="increase()">+</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app-body',
  data () {
    return {
      msg: 'Hello World'
    }
  },
  computed: {
    ...mapGetters({
      count: 'currentCount'
    })
  },
  methods: {
    ...mapActions({
      increase: 'increaseCount',
      decrease: 'decreaseCount'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
