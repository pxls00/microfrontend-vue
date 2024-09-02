<template>
  <div class='item-item'>
    <b>{{ count }}</b>
    <button class='increment' @click='increment'>Increment</button>
    <button class='decrement' @click='decrement'>Decrement</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watchEffect } from 'vue'

const count = ref<number>(0)

const increment = function () {
  count.value += 1
}

const decrement = function () {
  count.value -=1
}
</script>

<style lang='scss' scoped>
  .increment {
    background: green;
    color: white;
  }

  .decrement {
    background: red;
    color: white
  }
</style>