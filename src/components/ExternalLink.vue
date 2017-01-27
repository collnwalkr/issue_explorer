<template>
    <a :href=html v-tooltip.bottom-center=message target="_blank">
      <octicon name="link"></octicon>
    </a>
</template>

<script>
import Octicon from 'vue-octicon/components/Octicon.vue'
import 'vue-octicon/icons/link'

export default {
  name: 'external-link',
  components: {
    Octicon
  },
  props: [
    'html',
    'message'
  ]
}
</script>

<style scoped lang="scss">
  @import "../assets/variables.scss";

  a{
    color: $mid-grey;
    :hover{
      color: $link-hover;
    }
  }
  img{
  }

</style>
