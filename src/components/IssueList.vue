<template>

  <div class="issue-list">
    <ul>
      <li v-for="(issue, index) in issues">
        <octicon name="issue-opened"></octicon>
        <span>{{ issue.title }}</span>
        <external-link :html="issue.html_url" :message="'Go to issue'" target="_blank"/>
        <router-link :to="'/' + issue.user.login">
          {{ issue.user.login }}
        </router-link>
        <external-link :html="issue.user.html_url" :message="'Go to ' + issue.user.login + '\'s Github profile'" target="_blank"/>
      </li>
    </ul>
  </div>

</template>

<script>
import externalLink from './ExternalLink'
import Octicon from 'vue-octicon/components/Octicon.vue'
import 'vue-octicon/icons/issue-opened'

export default {
  name: 'repo-view',
  props: [
    'issues'
  ],
  components: {
    externalLink,
    Octicon
  },
  data () {
    return {
    }
  },
  methods: {
  }
}

</script>

<style scoped lang="scss">
  @import "../assets/variables.scss";

  ul{
    list-style-type: none;
    text-align: left;
    padding-left: 0;
  }

  li{
    line-height: 2;
  }

  svg {
    color: $mid-grey;
    padding-right: 4px;
  }
</style>
