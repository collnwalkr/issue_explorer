<template>
  <div class="side-bar">
    <h3>
      {{ appName }}
    </h3>
    <p id="version">
      v {{ version }}
    </p>

    <li v-for="(radio, index) in radioButtons" class="radio">
      <input type="radio" :id=index :value="radio.value" v-model="ff">
      <label :for=index>{{ radio.msg }}</label>
      <div class="check"><div class="inside"></div></div>
    </li>
  </div>
</template>
<script>
import loadingBar from 'vue2-loading-bar'
import { mapActions, mapGetters } from 'vuex'

export default{
  name: 'side-bar',
  components: {
    loadingBar
  },
  data () {
    return {
      appName: 'Issue Explorer',
      version: '0.0.1',
      dd: '',
      ff: 'all',
      radioButtons: [
        {
          msg: '24 hours',
          value: 'day'
        },
        {
          msg: 'One week',
          value: 'week'
        },
        {
          msg: 'All time',
          value: 'all'
        }]
    }
  },
  computed: {
    ...mapGetters({
      error: 'getError'
    })
  },
  methods: {
    ...mapActions([
      'getUser',
      'getURL',
      'setError',
      'setDateFilter'
    ]),
    submit: function () {
      console.log('h')
    }
  },
  watch: {
    ff: function () {
      this.setDateFilter(this.ff)
    }
  }
}

</script>

<style scoped lang="scss">
  @import "../assets/variables.scss";
  .side-bar{
    border-right: 1px solid $off-white;
    text-align: left;
    -ms-flex: 0 100px;
    -webkit-box-flex:  0;
    -moz-box-flex:  0;
    -ms-box-flex:  0;
    flex:  0 1 200px;
    padding: 20px;
    background: white;
    z-index: 100;
  }

  h3{
    margin-bottom: 0;
  }

  #version{
    margin-bottom: 0.5rem;
    margin-top: 0;
    color: $light-grey;
  }

  .radio{
    display: block;
  }

  ul{
    list-style: none;
  }

  li{
    color: $light-grey;
    display: block;
    position: relative;
    float: left;
    width: 100%;
  }

  li input[type=radio]{
    position: absolute;
    visibility: hidden;
  }

  li label{
    display: block;
    position: relative;
    font-weight: 300;
    font-size: 1em;
    padding: 9px 31px;
    margin: 0 auto;
    height: 22px;
    z-index: 9;
    cursor: pointer;
    -webkit-transition: color 0.1s $transition-type;
  }

  li:hover label{
    color: $dark-grey;
  }

  li .check{
    display: block;
    position: absolute;
    border: 2px solid $light-grey;
    border-radius: 100%;
    height: 15px;
    width: 15px;
    top: 7px;
    left: 0;
    z-index: 5;
    transition: border .1s $transition-type;
    -webkit-transition: border .1s $transition-type;
  }

  li:hover .check {
    border: 2px solid $dark-grey;
  }

  li .check::before {
    display: block;
    position: absolute;
    content: '';
    border-radius: 100%;
    height: 11px;
    width: 11px;
    top: 2px;
    left: 2px;
    margin: auto;
    transition: background 0.1s $transition-type;
    -webkit-transition: background 0.1s $transition-type;
  }

  input[type=radio]:checked ~ .check {
    border: 2px solid $highlight;
  }

  input[type=radio]:checked ~ .check::before{
    background: $highlight;
  }

  input[type=radio]:checked ~ label{
    color: $highlight;
  }

</style>
