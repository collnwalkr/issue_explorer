<template>
  <div class="user-view">
    <img class="user-picture" :src="user.avatar_url">
    <br/>
    <h2>{{ user.login }}</h2>
    <external-link :html="user.html_url" :message="'Go to ' + user.login + '\'s Github profile'" target="_blank"/>

    <br/>

    <ul>
      <li v-for="(repo, index) in repos" v-if="!repo.fork">
        <router-link :to="repo.name" append>
          <h3>{{ repo.name }}</h3>
        </router-link>
        <external-link :html="repo.html_url" :message="'Go to ' + repo.name + ' GitHub repo'" target="_blank"/>
        <span class="repo-count" v-tooltip.bottom-center="'Number of open issues in ' + repo.name">
          {{ repo.open_issues }}
        </span>
        <p>
          {{ repo.description }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import externalLink from './ExternalLink'

export default {
  name: 'user-view',
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
      repos: 'getRepos'
    })
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/variables.scss";

  img.user-picture{
    border-radius: 50%;
    width: 150px;
    height: 150px;
  }

  h2{
    display: inline-block;
    position: relative;
  }

  h3{
    display: inline;
  }

  .repo-count{
    background-color: $off-white;
    padding: 4px;
    border-radius: 3px;
  }

  ul{
    list-style-type: none;
    text-align: left;
  }

  li{
    margin-bottom: 3rem;
  }

</style>
