<template>
  <div id="app">
    <side-bar class="side-bar"/>
    <div class="flex-stack">
      <input-bar class="input-bar"/>
      <app-body/>
    </div>
  </div>
</template>

<script>
import inputBar from './components/InputBar'
import appBody from './components/AppBody'
import sideBar from './components/SideBar'

require('reset-css/reset.css')
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

  .octicon{
    transform: translateY(2px);
  }

  a{
    text-decoration: underline;
    color: $link;
    &:hover{
      color: $link-hover;
    }
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    min-height: 100%;
    padding-top: 80px;
    padding-bottom: 80px;
    margin: auto;
    max-width: 1300px;
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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    display: none;
    opacity: 0;
    transition: opacity .1s;
    pointer-events: none;
    padding: 15px;
    font-size: 0.95rem;
    z-index: 10000;

    .tooltip-content {
      background: $dark-grey;
      color: white;
      border-radius: 6px;
      padding: 10px 10px 10px;
    }

    &.tooltip-open-transitionend {
      display: block;
    }

    &.tooltip-after-open {
      opacity: 1;
    }
  }

  .input-bar{
    height: 150px;
  }

  .divider{
    margin: 2em 0 1em 0;
    position: relative;
    .line {
      position: absolute;
      top: 50%;
      border-top: 1px dashed $light-grey;
      z-index: -1;
      width: 100%;
    }
    span {
      @include label();
      padding: 0 5px 0 0;
      background: #ffffff;
    }
  }
</style>
