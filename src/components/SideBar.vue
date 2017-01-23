<template>
  <div class="side-bar">
    <h3>
      {{ appName }}
    </h3>
    <span>
      {{ version }}
    </span>
    <br/>

    <span v-for="(radio, index) in radioButtons">
      <input type="radio" :id=index :value="radio.msg" v-model="picked">
      <label :for=index>{{ radio.msg }}</label>
    </span>
    <span>Picked: {{ picked }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import externalLink from './ExternalLink'

export default {
  name: 'side-bar',
  components: {
    externalLink
  },
  data () {
    return {
      appName: 'Issue Explorer',
      version: '0.0.1',
      picked: '',
      radioButtons: [
        {
          msg: '24 hours'
        },
        {
          msg: 'One week'
        },
        {
          msg: 'All time'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      error: 'getError'
    })
  }
}

</script>

<style scoped lang="scss">
  @import "../assets/variables.scss";

</style>
