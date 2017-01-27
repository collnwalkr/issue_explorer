<template>
  <div class="side-bar">
    <h3>
      {{ appName }}
    </h3>
    <p id="version">
      v {{ version }}
    </p>

    <li v-for="(radio, index) in radioButtons" class="radio" :class="{ disabled }">
      <input type="radio" :id=index :value="radio.value" v-model="filter" :disabled="disabled">
      <label :for=index>{{ radio.msg }} <span class="count" v-if="!disabled">{{ filterCount[index] }}</span></label>
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
      version: '0.0.2',
      dd: '',
      filter: 'all',
      radioButtons: [
        {
          msg: 'Last Day',
          value: 'day'
        },
        {
          msg: 'Last Week',
          value: 'week'
        },
        {
          msg: 'All time',
          value: 'all'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      error: 'getError',
      issues: 'getIssues',
      view: 'getView'
    }),
    lastDay: function () {
      if (this.issues[0]) return this.issues[0].length
    },
    lastWeek: function () {
      if (this.issues[1]) return this.issues[1].length + this.lastDay
    },
    older: function () {
      if (this.issues[2]) return this.issues[2].length + this.lastWeek
    },
    filterCount: function () {
      return [this.lastDay, this.lastWeek, this.older]
    },
    disabled: function () {
      return this.view !== 'repo'
    }
  },
  methods: {
    ...mapActions([
      'getUser',
      'getURL',
      'setError',
      'setDateFilter'
    ])
  },
  watch: {
    filter: function () {
      this.setDateFilter(this.filter)
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
    margin-bottom: 5px;
  }

  #version{
    margin-bottom: 1rem;
    font-size: 0.75rem;
    margin-top: 0;
    color: $light-grey;
  }

  .radio{
    display: block;
  }

  .count{
    float: right;
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
    padding: 8px 31px;
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

  li.disabled , li.disabled:hover {
    color: $off-white;
    label, .check {
      color: $off-white;
    }
    .check {
      border: 2px solid $off-white;
    }
    input[type=radio]:checked{
      ~ label {
        color: $mid-grey;
      }
      ~ .check {
        border: 2px solid $mid-grey;
      }
      ~ .check::before{
        background: $mid-grey;
      }
    }
  }

</style>
