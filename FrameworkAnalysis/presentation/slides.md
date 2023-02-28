---
theme: geist
class: ''
---

# Learnings from building a&nbsp;game, part 1

Zooma Tech Weekly, 2021-05-26

---

# Index

- Goal
- Demo
- Breakdown
- Learnings
  - Advantages of classes
  - Advantages of functions
  - Advantages of combining
  - Unexplored areas
- Typescript tricks

---

# Goal

<v-click>

> Creating a fun challenge, that forces me to learn and explore things that I normally won't have a chance to. Game programming is traditionally very object-oriented, but with JavaScript we could combine OOP and functional paradigms achieve both structure and flexibility.

</v-click>

<v-clicks>

* Use only vanilla JavaScript and CSS to focus on:
  * Getting more comfortable with TypeScript
  * Learning to use classes better
  * Applying composition principles

</v-clicks>

---

# Demo time!

---

# Composing with “ability functions”

```ts {3-|6-11|12|14-|17-20}
export type WithAttackType = {
  attack: AbilityFunction 
}
export const withAttack = (character: Character, meta: AttackMeta): WithAttackType => {
  
  character.moveList.push({
    type: MoveType.Attack,
    action: 'attack',
    fnName: 'attack',
    ...meta,
  })
  let locallyScopedVariable = {}
  
  return {
    attack(name = meta.name) {
      return {
        init: () => {}, // Optional 
        execute: () => {
          return { type: ActionEvent.DealDamage, ... }
        },
      }
    },
  }
}
```

---

# Example usage of ability function

```ts {|9-10}
const frodoState = {
  name: 'Frodo',
  energy: 800,
  moveList: [],
}

const Frodo = Object.assign(
  withBasics(frodoState),
  withAttack(frodoState, { name: 'Kick' }),
  withAttack(frodoState, { name: 'Throw stone' }),
  withDefence(frodoState),
)
```


---

# …Refining character creation

```ts
const Frodo = createCommoner({
  name: 'Frodo',
  color: '0,128,1',
  energy: 1000,
  stats: {
    attack: 4,
    defence: 5,
    speed: 9,
  },
  attacks: [
    {
      name: 'Kick',
      desc: '[name] --kicked-- with amazing hip rotation. *Craack*. Ouch.',
      reach: [PositionType.Land],
    },
    {
      name: 'Throw stone',
      desc: '[name] --throws a stone-- with all his might.',
      reach: [PositionType.Land, PositionType.Air],
    },
  ],
  defences: [ ... ],
})
```

---

# …Archetype functions apply compositions

```ts {1-4|5-|17}
export interface PlayerCommonerOpts extends PlayerBaseOpts {
  attacks: Array<AttackMeta>
  defences: Array<MoveMeta>
}

export const createCommoner = ({
  name, 
  color, 
  energy, 
  stats, 
  attacks, 
  defences,
}: PlayerCommonerOpts) => {
  const character = createCharacter(name, color, energy, stats)
  return Object.assign(
      withBasics(character),
      ...attacks.map((attack) => withAttack(character, attack)),
      ...defences.map((defence) => withDefence(character, defence))
  )
} 
```

---

# My learnings so far…

---

# Classes are awesome for:

<v-click>

#### When objects can be instantiated multiple times

```ts
const playerPanel = new PlayerPanel(player, index)
```

</v-click>

<v-click>

#### Simple and structured encapsulation

```ts{1-3|4-}
class Person {
  age() {}
}
// vs.
function Person() {}
Person.prototype.age = () => {}

```

</v-click>  

<v-click>

#### Simpler typings and signature matching

```ts
class Person {}

const Bertil: Person // <-- Set as a type
console.log(Bertil instanceof Person) // true
```

</v-click> 

---

# Functions/closures are awesome for:

<v-click>

#### Single instances, eg. replacement for static classes

```ts
const Game = (() => {
  return {
    start() {}
  }
})()
Game.start() // No instantiation needed
const game = new Game() // ERROR!
```

</v-click>

<v-click>

#### Creating standalone, and highly reusable helpers

```ts {1-5|6-11}
// Inside 'Player' class
getMoveData(name, type) {
  return this.getMoveList().find(move => move.name === name && move.type === type)
}

// Refactored function can be called from anywhere
function getMoveData(name, type, character) {
  return character.getMoveList().find(move => move.name === name && move.type === type)
}
```

</v-click> 

---

# It's also awesome to combine them!

```ts {1-12|13-22}
interface PersonData {
  id: number
  name: string;
  age: number
}

class Person {
  private readonly data: PersonData

  constructor(id) {
    const { name, age } = getPersonFromDb(id) // returns { name, age, city, etc })
    this.data = { id, name, age }
  }

  // Super clever method to demo functional chaining
  getSameAgedSouls(): Array<PersonData> {
    return getAllPersonsFromDb()
        .filter(({ age }) => age === this.age)
        .sort((a, b) => a.name > b.name ? 1 : -1)
        .map(({ id, name, age }) => { id, name, age })
  }
}
```

---

# Not (personally) explored yet

- Great use cases for inheritance
- Polymorphism
- Class mixins

---

# Some cool TypeScript tricks I learnt

<v-click>

#### Enforcing RGB string format

```ts {1-2|4|4-5|6-}
// --player-color-rgb: 255,0,0;
// color: rgba(var(--player-color-rgb), 0.35);

type ColorRgbString = `${number},${number},${number}`
function setRgbColor(color: ColorRgbString) {}

setColor('255,0,0') // Valid
setColor('255,0') // Invalid
setColor('red') // Invalid
```

</v-click>

<v-click>

#### Constraining type to a certain shape

```ts {1-|1-2|4|5|6-}
interface HeroType { name: string; greatness: number }
interface EnemyType { name: string; evilness: number }

class PlayerPanel<T extends { name: string }> { 
  characters: Array<T> 
}
const heroPanel = new PlayerPanel<HeroType>()
const enemyPanel = new PlayerPanel<EnemyType>()
```

</v-click>
