<template>
  <div class="user-view">
    <octicon scale="1.25" name="mark-github" v-if="user.login"></octicon>
    <h2>
      {{ user.login }}
    </h2>
    <external-link :html="user.html_url" :message="'Go to ' + user.login + '\'s Github profile'" target="_blank"/>

    <ul>
      <li v-for="(repo, index) in repos" v-if="!repo.fork">
        <octicon name="repo" class="repo-icon"></octicon>
        <router-link :to="repo.name" append>
          {{ repo.name }}
        </router-link>
        <external-link :html="repo.html_url" :message="'Go to ' + repo.name + ' GitHub repo'" target="_blank"/>
        <p class="repo-count label">
          <span>Open Issues: {{ repo.open_issues }}</span>
        </p>
        <p class="repo-description">
          {{ repo.description }}
        </p>
      </li>
    </ul>

    <empty v-if="empty" :msg="'No repos for ' + user.login" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import externalLink from './ExternalLink'
import empty from './Empty'
import Octicon from 'vue-octicon/components/Octicon.vue'
import 'vue-octicon/icons/repo'
import 'vue-octicon/icons/mark-github'

export default {
  name: 'user-view',
  components: {
    externalLink,
    Octicon,
    empty
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
      repos: 'getRepos'
    }),
    empty: function () {
      if (this.repos) return this.repos.length === 0
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/variables.scss";

  .user-view{
    padding-left: 40px;
    text-align: left;
  }

  .label{
    @include label();
  }

  .repo-icon{
    @include label();
    color: $mid-grey;
    padding-right: 4px;
  }

  img.user-picture{
    width: 150px;
    height: 150px;
    display: inline-block;
  }

  h2{
    display: inline-block;
    position: relative;
    font-size: 2rem;
    font-weight: bold;
  }

  a{
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  .repo-count{
    color: $mid-grey;
  }

  p{
    padding-left: 20px;
    line-height: 1.75;
  }

  ul{
    margin-top: 3rem;
    list-style-type: none;
    text-align: left;
  }

  li{
    margin-bottom: 2rem;
  }

</style>
