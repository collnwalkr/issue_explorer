<template>
  <div class="repo-view">
    <h2>
      repo!
    </h2>
    <ul>
      <li v-for="(issue, index) in issues">
        {{ issue.title }}
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
import { mapGetters } from 'vuex'
import externalLink from './ExternalLink'

export default {
  name: 'repo-view',
  components: {
    externalLink
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      repos: 'getRepos',
      issues: 'getIssues'
    })
  }
}

</script>

<style scoped lang="scss">
  @import "../assets/variables.scss";

  ul{
    list-style-type: none;
    text-align: left;
  }

</style>
