<script setup lang="ts">
  import { computed, watchEffect } from 'vue'

  const props = defineProps<{
    value: number
  }>()

  console.log('Vue component rendered')

  const varDouble = props.value * 2
  const fnDouble = () => props.value * 2
  const computedDouble = computed(() => props.value * 2)

  let watchDouble = props.value * 2
  watchEffect(() => {
    watchDouble = props.value * 2
  })
</script>

<template>
  <div class="greetings">
    <h1 class="green">Vue prop reactivity</h1>
    <h3>
      Value (<code>prop</code>): <strong>{{ value }}</strong>
    </h3>
    <h3>
      Double (<code>const</code>):
      <strong style="color: #f13a3a; font-weight: bold">{{ varDouble }}</strong>
    </h3>
    <h3>
      Double (<code>function</code>): <strong>{{ fnDouble() }}</strong>
    </h3>
    <h3>
      Double (<code>computed</code>): <strong>{{ computedDouble }}</strong>
    </h3>
    <h3>
      Double (<code>watchEffect</code>): <strong>{{ watchDouble }}</strong>
    </h3>
  </div>
</template>
