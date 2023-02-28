<script setup lang="ts">
  import { ref } from 'vue'
  import Counter from './components/Counter.vue'
  const count = ref(0)
</script>

<template>
  <div>
    <Counter :value="count" />

    <button @click="count++">Increment</button>
  </div>
</template>
