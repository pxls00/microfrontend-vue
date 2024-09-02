<template>
  <div class='item-list'>
    <DefaultLayout>
      <RouterView/>
    </DefaultLayout>
  </div>
</template>

<script>
import {RouterLink, RouterView} from 'vue-router'
import DefaultLayout from '@/layout/default.vue'

export default {
  name: "App",
  components: {
    DefaultLayout
  }
}
</script>

<style lang='scss' scoped>
.item-list {
  padding: 20px;
}
</style>