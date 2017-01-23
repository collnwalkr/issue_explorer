<template>
    <a :href=html v-tooltip.bottom-center=message target="_blank">
      <i class="fa fa-fw fa-external-link-square"></i>
    </a>
</template>

<script>
export default {
  name: 'external-link',
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
  }
  img{
  }

</style>
