<template>
  <div class="app-body">
    <input-bar/>
    <br/>
    <span>{{ output }}</span>
  </div>
</template>

<script>
import inputBar from './InputBar'
import { mapGetters } from 'vuex'

export default {
  name: 'app-body',
  components: {
    inputBar
  },
  data () {
    return {
      msg: 'Hello World'
    }
  },
  computed: {
    ...mapGetters({
      output: 'getOutput'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
