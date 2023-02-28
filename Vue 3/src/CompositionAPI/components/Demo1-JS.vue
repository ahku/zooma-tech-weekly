<template>
  <div class="Ball" :style="ballStyle"></div>
</template>

<script>
export default {
  name: 'Demo1-JS',
  data() {
    return {
      ballSize: 200,
      ballPos: { x: 0, y: 0 },
      mousePos: { x: 0, y: 0 },
    }
  },
  computed: {
    ballStyle() {
      let style = []
      style.push(`width: ${this.ballSize}px`)
      style.push(`height: ${this.ballSize}px`)
      style.push(`--x: ${this.ballPos.x - this.ballSize / 2}px`)
      style.push(`--y: ${this.ballPos.y - this.ballSize / 2}px`)
      return style.join(';')
    },
  },
  methods: {
    onMouseMove(e) {
      this.mousePos.x = e.clientX + document.body.scrollLeft
      this.mousePos.y = e.clientY + document.body.scrollTop
    },
    init() {
      const main = () => {
        let x = this.ballPos.x,
          y = this.ballPos.y
        const xStep = Math.abs(this.mousePos.x - x) / 60
        const yStep = Math.abs(this.mousePos.y - y) / 60

        if (this.mousePos.x > this.ballPos.x) {
          x += xStep
        } else {
          x -= xStep
        }
        if (this.mousePos.y > this.ballPos.y) {
          y += yStep
        } else {
          y -= yStep
        }

        if (x > this.ballSize / 2 && x < window.innerWidth - this.ballSize / 2) {
          this.ballPos.x = x
        }
        if (y > this.ballSize / 2 && y < window.innerWidth - this.ballSize / 2) {
          this.ballPos.y = y
        }
        window.requestAnimationFrame(main)
      }
      window.requestAnimationFrame(main)
    },
  },
  mounted() {
    window.addEventListener('mousemove', this.onMouseMove, false)

    this.ballPos.x = window.innerWidth / 2
    this.ballPos.y = window.innerHeight / 2
    this.init()
  },
  unmounted() {
    window.removeEventListener('mousemove', this.onMouseMove, false)
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
