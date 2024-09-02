<template>
  <div class='wrapper'>
    Webpack learn
    <div class='nav-list'>
      <div class='nav-item'>
        <RouterLink :to='{name: "about"}'>About</RouterLink>
      </div>
    </div>
    <RouterView />
  </div>
</template>


<script lang='ts' setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<style lang='scss' scoped></style>