<template>
  <div id="app">
    <side-bar/>
    <div class="flex-stack">
      <input-bar/>
      <app-body/>
    </div>
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
  @import "./assets/variables";

  html,
  body {
    height: 100%;
    padding: 0;
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
    display: -ms-flexbox;
    display: -webkit-box;
    display: -moz-box;
    display: flex;

    -ms-flex-direction: row;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -ms-box-orient: horizontal;
    box-orient: horizontal;
  }

  .flex-stack{
    -ms-flex: 1;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -ms-box-flex: 1;
    flex: 1;
  }

  .tooltip {
    display: none;
    opacity: 0;
    transition: opacity .15s;
    pointer-events: none;
    padding: 4px;
    z-index: 10000;

    .tooltip-content {
      background: $dark-grey;
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
