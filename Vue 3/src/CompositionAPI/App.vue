<template>
  <Demo1 />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Demo1 from './components/Demo1-JS.vue'

export default defineComponent({
  name: 'App',
  components: {
    Demo1,
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
