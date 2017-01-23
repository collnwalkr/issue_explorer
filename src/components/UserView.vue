<template>
  <div class="user-view">
    <img :src="user.avatar_url">
    <br/>
    <h2>{{ user.login }}</h2>
    <external-link :html="user.html_url" :message="'Go to GitHub profile'" target="_blank"/>

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

    <br/>

    <span>{{ user }}</span>
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
      msg: 'Hello World'
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

  img{
  }

  h2{
    display: inline-block;
    position: relative;
  }

  h3{
    display: inline-block;
  }

  .repo-count{
    background-color: $off-white;
  }

  ul{
    list-style-type: none;
    text-align: left;
  }

</style>
