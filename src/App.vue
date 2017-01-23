<template>
  <div id="app">
    <input-bar/>
    <app-body/>
    <side-bar/>
  </div>
</template>

<script>
import inputBar from './components/InputBar'
import appBody from './components/AppBody'
import sideBar from './components/SideBar'

require('font-awesome/css/font-awesome.css')
require('babel-polyfill')

export default {
  name: 'app',
  components: {
    appBody,
    inputBar,
    sideBar
  }
}

</script>

<style lang="scss">

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .tooltip {
    display: none;
    opacity: 0;
    transition: opacity .15s;
    pointer-events: none;
    padding: 4px;
    z-index: 10000;

    .tooltip-content {
      background: black;
      color: white;
      border-radius: 16px;
      padding: 5px 10px 4px;
    }

    &.tooltip-open-transitionend {
      display: block;
    }

    &.tooltip-after-open {
      opacity: 1;
    }
  }
</style>
