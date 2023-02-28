import {
  withAttack,
  withDefence,
  withEvasion,
  composePlayer,
} from './abilities'
import type { Player } from './abilities'

export function FunctionComposition() {
  console.log('\n====== FUNCTIONAL COMPOSITION 1: OBJECT ASSIGN ======\n')

  //------------------------------------------------------------------------
  //  Create archetypes
  //------------------------------------------------------------------------
  const createSlacker = ({ name }: Player) => {
    const player = { name }
    return Object.assign(withDefence(player), withEvasion(player))
  }

  const createBesserwisser = ({ name }: Player) => {
    const player = { name }
    return Object.assign(withAttack(player))
  }

  const createLeader = ({ name }: Player) => {
    const player = { name }
    return Object.assign(
      withDefence(player),
      withEvasion(player),
      withAttack(player)
    )
  }

  //------------------------------------------------------------------------
  //  Create our players
  //------------------------------------------------------------------------
  const roger = createSlacker({
    name: 'RogerRoger',
  })
  const richard = createBesserwisser({
    name: 'Richard',
  })
  const diana = createLeader({
    name: 'Diana',
  })

  console.log(roger.defend())
  console.log(roger.evade())
  console.log(richard.attack())
  console.log(diana.attack())
  console.log(diana.defend())
  console.log(diana.evade())

  console.log('\n')
  // Using dynamic composer function
  const freestyler = composePlayer('Freestyler', [withDefence, withAttack])
  console.log(freestyler.attack())
}
