import { ref, computed, onMounted } from 'vue'
import { Point } from './types'

export default function useBall() {
  const ballPos = ref<Point>({ x: 0, y: 0 })
  const ballSize = ref<number>(200)

  const ballStyle = computed<string>(() => {
    let style = []
    style.push(`width: ${ballSize.value}px`)
    style.push(`height: ${ballSize.value}px`)
    style.push(`--x: ${ballPos.value.x - ballSize.value / 2}px`)
    style.push(`--y: ${ballPos.value.y - ballSize.value / 2}px`)
    return style.join(';')
  })

  function updateBallPosition(mousePos: Point) {
    let x: number = ballPos.value.x,
      y: number = ballPos.value.y
    const xStep: number = Math.abs(mousePos.x - x) / 60
    const yStep: number = Math.abs(mousePos.y - y) / 60

    if (mousePos.x > ballPos.value.x) {
      x += xStep
    } else {
      x -= xStep
    }
    if (mousePos.y > ballPos.value.y) {
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
  }

  onMounted(() => {
    ballPos.value.x = window.innerWidth / 2
    ballPos.value.y = window.innerHeight / 2
  })

  return { ballStyle, updateBallPosition }
}
