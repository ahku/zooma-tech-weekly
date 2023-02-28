---
theme: apple-basic
background: 'https://source.unsplash.com/collection/94734566/1920x1080'
class: ''
---

# Tech weekly
Exploring composition with functions & classes

---

# Summary tree-shaking
<br/>

- **Aim for composability** – think smaller decoupled lego bricks
  - Do we need to create monster objects?
  - Do we need to create inter-connected classes?
  - Can we decouple our shared functions?


---

# Object-oriented programming (OOP)
<br/>

- Has fallen out of favour in the front-end development world
- All leading frameworks have or are moving away from classes
- "You wanted a banana but what you got was a gorilla holding the banana"
- Makes most sense if you are working with "is-a" relationships, eg. "Gandalf is a *wizard*"

---

# Composition over inheritance
<br/>

- Composition thrives in "has-a" relationships, eg. "Gandalf has *magic*"
- Optimal for flexible systems and code reuse
- Highly compatible with functional programming

---

# Characteristics of a pure function
<br/>

- Decoupled
- No shared state
- No mutable data
- No side-effects
- The value of the output is totally *dependent on the arguments passed to the function*
- The result is predictable, and testable

---

# TypeScript
<br/>

- Introduces static typing to JavaScript 
- Familiar concepts from C#
- Static class-based programming is an apparent focus
- Has dynamic types for functional programming  

---

# Applying composition in 3 ways
<br/>

## Specifications
- A character creation tool that lets us create characters with any of the three abilities: **Attack, defence and evasion**
- A character can be named
- When executing one of the character's abilities, it will return a message like "[name] used an attack"
- Adding new abilities should be easy and as decoupled as possible

---
layout: image-right
image: 'https://www.teknikhype.se/wp-content/uploads/2021/03/maxresdefault-2.jpg'
---

# Method 1:<br/>Object assign

```ts {1-8|9-16|16-19}
// Ability
const withAttack = (player) => {
  return {
    attack() {
      return `${player.name} attacks!`
    },
  }
}
// Create archetype
const createFighter = ({ name }) => {
  const player = { name }
  return Object.assign(
    withAttack(player),
    withDefence(player),
  )
}
// Create player
const cloud = createFighter({ name: 'Cloud' })
cloud.attack() // "Cloud attacks!"
```

---
layout: image-right
image: 'https://www.teknikhype.se/wp-content/uploads/2021/03/maxresdefault-2.jpg'
---

# Method 2:<br/>Compose
```ts {1-8|9-13|14-16}
// Ability
const withAttack = (player) => {
  return Object.assign(player, {
    attack() {
      return `${player.name} attacks!`
    },
  })
}
// Create character
const createFighter = compose(
    withAttack, 
    withDefence
)
// Create player
const cloud = createFighter({ name: 'Cloud' })
cloud.attack() // "Cloud attacks!"
```

---
layout: image-right
image: 'https://www.teknikhype.se/wp-content/uploads/2021/03/maxresdefault-2.jpg'
---

# Method 3:<br/>Class mixins
```ts {1-7|8-16|17-20}
// Ability
class Attackable {
  name: string
  attack() {
    return `${this.name} attacks!`
  }
}
// Create character
class Fighter {
  name = 'Fighter'
  constructor({ name }) {
    this.name = name
  }
}
interface Fighter extends Attackable, Defendable {}
applyMixins(Fighter, [Attackable, Defendable])

// Create character
const cloud = new Fighter({ name: 'Cloud'})
cloud.attack() // "Cloud attacks!"
```
