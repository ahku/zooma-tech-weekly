import { compose } from '../utils/utils'
import {
  Player,
  withAttack,
  withEvasion,
  withDefence,
  WithAttack,
  WithDefence,
  WithEvasion,
} from './abilities'

export function FunctionPipeComposition() {
  console.log('\n====== FUNCTIONAL COMPOSITION 2: PIPED FUNCTIONS ======\n')

  //------------------------------------------------------------------------
  //  Create archetypes
  //------------------------------------------------------------------------
  const createSlacker = compose<Player & WithDefence & WithEvasion>(
    withDefence,
    withEvasion
  )
  const createBesserwisser = compose<Player & WithAttack>(withAttack)

  const createLeader = compose<Player & WithDefence & WithEvasion & WithAttack>(
    withAttack,
    withDefence,
    withEvasion,
    withDefence
  )

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
}
