<script setup lang="ts">
  import { ref } from 'vue'
  import Counter from './components/Counter.vue'
  const count = ref(0)
</script>

<template>
  <div>
    <Counter :value="count" />

    <div class="text-center">
      <button @click="count++">Increment</button>
    </div>
  </div>
</template>
