<template>
  <div class="user-view">
    <img :src="user.avatar_url">
    <br/>
    <h2>{{ user.login }}</h2>
    <a :href="user.html_url" v-tooltip.bottom-center="'Go to GitHub profile'" target="_blank">
      <i class="fa fa-fw fa-external-link-square"></i>
    </a>
    <br/>
    <li v-for="(repo, index) in repos" v-if="!repo.fork">
      <h3>{{ repo.name }}</h3>
      <a :href="repo.html_url" v-tooltip.bottom-center="'Go to ' + repo.name + ' GitHub repo'" target="_blank">
        <i class="fa fa-fw fa-external-link-square"></i>
      </a>
      <span class="repo-count" v-tooltip.bottom-center="'Number of open issues in ' + repo.name">
        {{ repo.open_issues }}
      </span>
      {{ repo.description }}
    </li>
    <br/>
    <span>{{ user }}</span>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'user-view',
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
    background-color: $light-grey;
  }
</style>
