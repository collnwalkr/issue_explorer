<template>

  <div class="empty-view">
      <octicon scale="8" name="eye"></octicon>
      <h2> {{ msg }} </h2>
  </div>

</template>

<script>
import Octicon from 'vue-octicon/components/Octicon.vue'
import 'vue-octicon/icons/eye'

export default {
  name: 'empty',
  props: [
    'msg'
  ],
  components: {
    Octicon
  },
  data () {
    return {
    }
  }
}

</script>

<style scoped lang="scss">
  @import "../assets/variables.scss";

  .empty-view{
    padding: 3rem 0;
    text-align: center;
  }

  .octicon{
    color: $light-grey;
    margin-bottom: 2rem;
  }

  h2{
    font-size: 1.5rem;
    color: $light-grey;
    font-weight: bold;
  }

</style>
