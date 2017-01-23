<template>
  <div id="app">
    <app-body></app-body>
  </div>
</template>

<script>
import appBody from './components/AppBody'
require('font-awesome/css/font-awesome.css')

export default {
  name: 'app',
  components: {
    appBody
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
