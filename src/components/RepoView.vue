<template>

  <div class="repo-view">
    <octicon scale="1.1" name="repo" v-if="repo.name"></octicon>
    <h2 class="repo-name">
      {{ repo.name }}
    </h2>
    <external-link v-if="this.repo.name" :html="repo.html_url" :message="'Go to ' + repo.name + ' GitHub repo'" target="_blank"/>

    <p class="repo-description">
      {{ repo.description }}
    </p>

    <span v-if="this.repo.owner">
        <octicon scale="0.9" name="mark-github" class="user-icon"></octicon>
        <router-link :to="'/' + user.login">
          {{ user.login }}
        </router-link>
        <external-link :html="user.html_url" :message="'Go to ' + user.login + '\'s Github profile'" target="_blank"/>
    </span>

    <div class="divider"  v-if="lastDay">
      <span>Last Day</span>
      <div class="line">&nbsp;</div>
    </div>
    <issue-list v-if="lastDay" :issues="issues[0]" />

    <div class="divider" v-if="lastWeek">
      <span>Last Week</span>
      <div class="line">&nbsp;</div>
    </div>
    <issue-list v-if="lastWeek" :issues="issues[1]" />

    <div class="divider" v-if="older">
      <span>All Time</span>
      <div class="line">&nbsp;</div>
    </div>
    <issue-list v-if="older" :issues="issues[2]" />

    <empty v-if="empty" :msg="'No open issues in ' + repo.name" />

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import externalLink from './ExternalLink'
import issueList from './IssueList'
import empty from './Empty'
import Octicon from 'vue-octicon/components/Octicon.vue'
import 'vue-octicon/icons/repo'
import 'vue-octicon/icons/mark-github'

export default {
  name: 'repo-view',
  components: {
    externalLink,
    issueList,
    empty,
    Octicon
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
    empty: function () {
      if (this.issues[0]) return this.issues[0].length === this.issues[1].length && this.issues[1].length === this.issues[2].length && this.issues[1].length === 0
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

  .repo-view{
    text-align: left;
    padding-left: 40px;
  }

  .repo-description{
    margin-bottom: 0.5rem;
  }

  h2.repo-name{
    display: inline-block;
    text-align: left;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .label {
    @include label();
    padding-right: 5px;
  }

  .user-icon{
    color: $mid-grey;
    padding-right: 4px;
  }

  svg + h2 {
    margin-left: 4px;
  }

</style>
