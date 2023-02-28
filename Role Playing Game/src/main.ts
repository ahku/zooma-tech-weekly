import './styles/style.css'
import { createCommoner, createFighter, createAngel } from './includes/assets'
import { createGame } from './includes/engine'

//------------------------------------------------------------------------
//  Create our players
//------------------------------------------------------------------------
const Peter = createCommoner({
  name: 'Peter',
  color: 'green',
  energy: 100,
  stats: {
    landAttack: 4,
    landDefence: 5,
    dexterity: 4,
  },
  attacks: [
    {
      name: 'Punch',
      desc: '<label>Peter</label> <strong>swung</strong> as if his life depended on it.',
    },
  ],
  defences: [
    {
      name: 'Block',
      desc: '<label>Peter</label> <strong>covered</strong> his flawless face. He cried a little behind his smelly hands.',
    },
  ],
})

const Richard = createFighter({
  name: 'Richard',
  color: 'blue',
  energy: 200,
  stats: {
    landAttack: 8,
    landDefence: 6,
    dexterity: 8,
    evasion: 6,
  },
  attacks: [
    {
      name: 'Kick',
      desc: '<label>Richard</label> <strong>kicked</strong> with impressive hip rotation. *Craaack*. Oouch!!!',
    },
  ],
  defences: [
    {
      name: 'Parry',
      desc: '<label>Richard</label> <strong>parried</strong> all incoming attacks, except for the pollen in the air. His hay fever was his bane. ACHOO!',
    },
  ],
  evasions: [
    {
      name: 'Evade',
      desc: '<label>Richard</label> <strong>swiftly</strong> evaded the enemies attacks.',
    },
  ],
})

const Diana = createAngel({
  name: 'Diana',
  color: 'hotpink',
  energy: 200,
  stats: {
    landAttack: 2,
    landDefence: 3,
    airAttack: 8,
    airDefence: 6,
    dexterity: 8,
    evasion: 6,
  },
  attacks: [
    {
      name: 'Shoot',
      desc: '<label>Diana</label> <strong>shoots</strong> her amorous arrow. Love is in the air ❤️!',
    },
  ],
  flyMeta: {
    name: 'Fly',
    desc: '<label>Diana</label> <strong>took to the skies</strong> with much elegance.',
  },
  landMeta: {
    name: 'Land',
    desc: '<label>Diana</label> decided to <strong>land</strong>. Actually, she was quite tired at this point.',
  },
  evasions: [
    {
      name: 'Evade',
      desc: '<label>Diana</label> awkwardly <strong>leaned back</strong> to avoid the attack.',
    },
  ],
})

createGame([Peter, Richard, Diana])

console.log(Peter.getEnergy())
console.log(Peter.attack())
console.log(Peter.defend())
console.log(Peter.getMoveList())
console.log(Richard.getEnergy())
console.log(Richard.attack())
console.log(Richard.defend())
console.log(Richard.evade())
console.log(Richard.getMoveList())

const app = document.querySelector<HTMLDivElement>('#app')!

const uiPlayers = []
for (let i = 0; i < 3; i++) {
  uiPlayers.push(`
    <div class="Player" data-index="${i}">
      <div class="Player-commands">
        Player ${i}       
      </div>
    </div>
  `)
}

// app.innerHTML = `
// <div class="Stage">
//   <div class="Stage-announcements">
//     <div class="MsgWindow">
//       <ul>
//         <li style="--player-accent-color: hotpink">
//           <label>Peter</label> <strong>swang</strong> for his life!
//         </li>
//         <li style="--player-accent-color: blue">
//           <label>Richard</label> <strong>parried</strong> all incoming attacks, except for the pollen in the air. His hay fever was his bane. ACHOO!
//         </li>
//         <li style="--player-accent-color: blue">
//           <label>Richard</label> still took <strong>5 HP</strong> damage!
//         </li>
//
//         <li style="--player-accent-color: hotpink">
//           <label>Peter</label> received the beating of his life. 20 HP… Poof!
//         </li>
//       </ul>
//     </div>
//   </div>
//   <div class="Stage-opponent">
//     <div class="Opponent">
//       <div class="Opponent-meter">
//         Boss
//         <meter value="100" max="100" min="0"></meter>
//       </div>
//     </div>
//   </div>
//   <div class="Stage-players">
//     ${uiPlayers.join('\n')}
//   </div>
// </div>
// `
