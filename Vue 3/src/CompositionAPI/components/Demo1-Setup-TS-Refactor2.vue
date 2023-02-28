<template>
  <div class="Ball" :style="ballStyle"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useMousePosition from './utils/MousePosition'
import useBall from './utils/BallThing'

const { mousePos } = useMousePosition()
const { ballStyle, updateBallPosition } = useBall()

function init(): void {
  const main = () => {
    updateBallPosition(mousePos.value)
    window.requestAnimationFrame(main)
  }
  window.requestAnimationFrame(main)
}

onMounted(() => {
  init()
})
</script>

<style scoped>
.Ball {
  --x: 0;
  --y: 0;
  position: absolute;
  top: 0;
  left: 0;
  background-color: violet;
  border-radius: 50%;
  will-change: transform;
  transform-origin: center center;
  transform: translate3d(var(--x), var(--y), 0);
}
</style>
