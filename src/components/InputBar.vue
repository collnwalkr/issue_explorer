<template>
  <div class="input-bar">
    <input v-model="gh_link" placeholder="github link" type="url">

    <div class="loading-bar-parent">
      <loading-bar
        id="loading-bar"
        :on-error-done="load_errorDone"
        :on-progress-done="load_progressDone"
        :progress="load_progress"
        :direction="load_direction"
        :error="load_error"
      />
    </div>
  </div>
</template>

<script>
import loadingBar from 'vue2-loading-bar'
import { mapActions, mapGetters } from 'vuex'
import _ from 'lodash'

export default{
  name: 'input-bar',
  components: {
    loadingBar
  },
  data () {
    return {
      username: '',
      gh_link: '',
      load_direction: 'right'
    }
  },
  computed: {
    ...mapGetters({
      load_progress: 'getProgress',
      load_error: 'getError'
    })
  },
  methods: {
    ...mapActions([
      'getUser',
      'getURL',
      'setError',
      'setProgress'
    ]),
    submit: _.debounce(
      function () {
        this.getURL(this.gh_link)
      },
      500
    ),
    load_errorDone: function () {
    },
    load_progressDone: function () {
      this.setError(false)
      this.setProgress(0)
    }
  },
  watch: {
    username: function (username) {
      if (username) this.submit()
    },
    gh_link: function (url) {
      if (url) this.submit()
    }
  }
}
</script>

<style lang="scss">
@import "~vue2-loading-bar/src/css/loading-bar.css";

.loading-bar-parent{
  width: 500px;
  height: 4px;
}
.LoadingBar--error{
  background: #ff493e;
}
#loading-bar{
  position: relative;
}
</style>
