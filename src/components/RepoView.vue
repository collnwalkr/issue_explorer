<template>

  <div class="repo-view">
    <h2>
      {{ repo.name }}
    </h2>
    <external-link :html="repo.html_url" :message="'Go to ' + repo.name + ' GitHub repo'" target="_blank"/>
    <p>
      {{ repo.description }}
    </p>

    <span v-if="this.repo.owner">
        <router-link :to="'/' + user.login">
          {{ user.login }}
        </router-link>
        <external-link :html="user.html_url" :message="'Go to ' + user.login + '\'s Github profile'" target="_blank"/>
    </span>

    <h3 v-if="lastDay">Last Day</h3>
    <issue-list v-if="lastDay" :issues="issues[0]" />

    <h3 v-if="lastWeek">Last Week</h3>
    <issue-list v-if="lastWeek" :issues="issues[1]" />

    <h3 v-if="older">All Time</h3>
    <issue-list v-if="older" :issues="issues[2]" />

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import externalLink from './ExternalLink'
import issueList from './IssueList'

export default {
  name: 'repo-view',
  components: {
    externalLink,
    issueList
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      repos: 'getRepos',
      issues: 'getIssues',
      filter: 'getFilter',
      repo: 'getRepo'
    }),
    lastDay: function () {
      if (this.issues[0]) return this.issues[0].length > 0
      else return false
    },
    lastWeek: function () {
      if (this.issues[1]) return this.issues[1].length > 0 && (this.filter === 'week' || this.filter === 'all')
      else return false
    },
    older: function () {
      if (this.issues[2]) return this.issues[2].length > 0 && this.filter === 'all'
      else return false
    },
    user: function () {
      if (this.repo.owner) return this.repo.owner
    }
  },
  methods: {
  }
}

</script>

<style scoped lang="scss">
  @import "../assets/variables.scss";

</style>
