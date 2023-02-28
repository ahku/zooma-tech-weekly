---
theme: geist
class: ''
title: Front-end framework analysis
---

# Front-end framework analysis

Zooma Tech Weekly, 2022-02-22


---

# Index

- Why Vue?
- The new JavaScript era
- Framework comparisons
- Alternatives


---

# Why Vue?

<v-click>

### Frameworks/libraries explored prior

* Meteor
* React
* Vue
* Elm

</v-click>

---

# Progressive enhancement

```html
<div class="product-listing">
  <h1>Products</h1>
  <div id="app">
    <ul>
      <li v-for="product in products" v-bind:key="product.id" class="product-item">
        <img v-bind:src="product.image.src" v-bind:alt="product.image.alt" />
        <h4>{{ product.title }}</h4>
        <p>{{ product.desc }}</p>
      </li>
    </ul>
  </div>
</div>
```

---

# Vue SFC

```html {1-|1-5|7-11|13-15}
<template>
  <button class="primary" @click="count++">
    Count: {{ count }}
  </button>
</template>

<script>
export default {
  data: () => ({ count: 0 })
}
</script>

<style scoped>
  button { color: blue; }
</style>

```

---

# Other advantages

* `<transition>`
* Routing
* Global state management
* Official solutions

---

# React at that time

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  increment() {
    this.setState({
      count: this.state.count + 1
    });
  };
  render() {
    return (
      <button className='primary' onClick={(e) => this.increment(e)}>
        Count: {this.state.count}!
      </button>
    );
  }
};
```

---

# The New JavaScript Era

### New factors

* Web app development / direction
* More frameworks available, with common goals (functional, single file, etc.)
* Improving web performance 
* Ecosystem

---

# False prediction?

<v-clicks>

* I thought the lower learning curve of Vue would serve as a head start for us to reach the mountain top
* The fast developer adoption and big community of React might make it a much better choice in the long run

</v-clicks>

---

# However

<v-clicks>

* This still only applies if we are moving towards app making, and static site generation
* The goal of React or any frontend-framework has never and will never be to ”improve templating of traditional server-side languages such as PHP or .net” Rather the opposite: **It’s to eliminate and make them _obsolete_**
* …and that won’t be Zooma’s main direction in a while

</v-clicks>

---

# Framework comparisons
### …or rather "React vs Vue" due to time constraints

---

# React: Basic counter

```jsx {1-|2|5-9}
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h2>You clicked {count} times!</h2>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

# Vue: Basic counter

```html {1-|3|7-11}
<script setup>
  import { ref } from 'vue'
  const count = ref(0)
</script>

<template>
  <h2>You clicked {{ count }} times!</h2>
  <button @click="count--">Decrement</button>
  <button @click="count++">Increment</button>
</template>
```

---

# React: Handling inputs

```jsx {1-|4}
function Input() {
  const [value, setValue] = useState('')
  return (
    <input value={value} onChange={e => setValue(e.target.value)} type={type} />
  )
}
```

---

# Vue: Handling inputs

```html {1-|7}
<script setup>
  import { ref } from 'vue'
  const value = ref('')
</script>

<template>
  <input v-model="value">
</template>
```

---

# React: Control flow

```jsx {1-|5|8-11|14-19}
function App() {
  return (
    <>
      <div>
        {condition && (<span>Simple AND condition</span>)}
      </div>
      <div>
        {condition1
          ? <span>Ternary</span>
          : null
        }
      </div>
      <div>
        {condition1
          ? <span>Nested ternary 1</span>
          : condition2
            ? <span>Nested ternary 2</span>
            : null
        }
      </div>
    </>
  )
}
```

---

# Vue: Control flow

```html
<template>
  <template v-if="condition1">Hello 1</template>
  <template v-else-if="condition2">Hello 2</template>
  <template v-else>Bye</template>
</template>
```

---

# React: Loops

```jsx {1-|6-8}
function App() {
  const animals = ["Dog", "Bird", "Cat", "Mouse", "Horse"];
  
  return (
    <ul>
      {animals.map((animal, index) => (
        <li key={index}>{animal}</li>
      ))}
    </ul>
  )
}
```

---

# Vue: Loops

```html {6-9}
<script setup>
  const animals = ["Dog", "Bird", "Cat", "Mouse", "Horse"];
</script>

<template>
  <ul>
    <li v-for="(animal, index) in animals" :key="index">
      {{ animal }}
    </li>
  </ul>
</template>
```
---

# React: Life cycle hooks

```jsx {4-11|8-10}
import { useEffect } from 'react';

function RepeatMessage({ message }) {
  useEffect(() => {
    const id = setInterval(() => {
      console.log(message);
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, [message]);
  return <div>I'm logging to console "{message}"</div>;
}
```

---

# Vue: Life cycle stages

```js {5-9|11-13}
<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  const id = ref(0)
  
  onMounted(() => {
    id.value = setInterval(() => {
      console.log(message);
    }, 2000);
  })
  
  onUnmounted(() => {
    clearInterval(id)
  })
</script>
```

---

# React: Functional components

```html
<Greeting name="Linda" age={24} />
```

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}, {props.age} years old</h1>;
}
```

<v-click>

With destructuring:

```jsx
function Greeting({ name, age }) {
  return <h1>Hello, {name}, {age} years old</h1>;
}
```

</v-click>

<v-click>

With TypeScript:

```tsx
interface IProps { name: string, age: number }
function Greeting(props:IProps) {
  return <h1>Hello, {props.name}, {props.age} years old</h1>
}
```

</v-click>

---

# Vue: Components

```html
<script setup>
  const { name, age } = defineProps({
    name: String,     
    age: Number
  }) 
</script>

<template>
  <h1>Hello, {{ name }}, {{ age }} years old</h1>
</template>
```

<v-click>

With TypeScript:

```html
<script lang="ts" setup>
  const { name, age } = defineProps<{
    name: string
    age: number
  }>()
</script>
```

</v-click>

---

# React: Pros & Cons

<v-clicks>

* **Pros**
  * Just JavaScript, and few new concepts to learn
  * Functional components ❤️
  * Easy to use with TypeScript
* **Cons**
  * Requires JavaScript fundamentals
  * Hook rules
  * (So many ways to do things)

</v-clicks>

---

# Vue: Pros & Cons

<v-clicks>

* **Pros**
  * Familiarity if you’re coming from a templating background
  * Documentation
  * Progressiveness
* **Cons**
  * So many new concepts and APIs to learn with Vue 3
  * Typescript experience not fully mature
  * Not as flexible and dynamic, if that's your jam 

</v-clicks>

---

# Other frameworks/libraries

* Alternatives
  * Svelte
  * Solid
  * Preact
* Progressive
  * Alpine.js
  * Petite Vue
