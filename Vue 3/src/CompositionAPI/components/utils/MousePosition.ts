import { ref, onMounted, onUnmounted } from 'vue'
import { Point } from './types'

export default function useMousePosition() {
  const mousePos = ref<Point>({ x: 0, y: 0 })

  function onMouseMove(e: MouseEvent): void {
    mousePos.value.x = e.clientX + document.body.scrollLeft
    mousePos.value.y = e.clientY + document.body.scrollTop
  }

  onMounted(() => {
    window.addEventListener('mousemove', onMouseMove, false)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove, false)
  })

  return { mousePos }
}
