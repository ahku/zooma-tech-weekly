<template>
  <div class="Ball" :style="ballStyle"></div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Demo1-Setup-JS',
  setup() {
    const ballPos = ref({ x: 0, y: 0 })
    const ballSize = ref(200)
    const ballStyle = computed(() => {
      let style = []
      style.push(`width: ${ballSize.value}px`)
      style.push(`height: ${ballSize.value}px`)
      style.push(`--x: ${ballPos.value.x - ballSize.value / 2}px`)
      style.push(`--y: ${ballPos.value.y - ballSize.value / 2}px`)
      return style.join(';')
    })

    const mousePos = ref({ x: 0, y: 0 })
    function onMouseMove(e) {
      mousePos.value.x = e.clientX + document.body.scrollLeft
      mousePos.value.y = e.clientY + document.body.scrollTop
    }

    function init() {
      const main = () => {
        let x = ballPos.value.x,
          y = ballPos.value.y
        const xStep = Math.abs(mousePos.value.x - x) / 60
        const yStep = Math.abs(mousePos.value.y - y) / 60

        if (mousePos.value.x > ballPos.value.x) {
          x += xStep
        } else {
          x -= xStep
        }
        if (mousePos.value.y > ballPos.value.y) {
          y += yStep
        } else {
          y -= yStep
        }

        if (x > ballSize.value / 2 && x < window.innerWidth - ballSize.value / 2) {
          ballPos.value.x = x
        }
        if (y > ballSize.value / 2 && y < window.innerWidth - ballSize.value / 2) {
          ballPos.value.y = y
        }
        window.requestAnimationFrame(main)
      }
      window.requestAnimationFrame(main)
    }

    onMounted(() => {
      window.addEventListener('mousemove', onMouseMove, false)

      ballPos.value.x = window.innerWidth / 2
      ballPos.value.y = window.innerHeight / 2
      init()
    })

    onUnmounted(() => {
      window.removeEventListener('mousemove', onMouseMove, false)
    })

    return { ballStyle }
  },
}
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
