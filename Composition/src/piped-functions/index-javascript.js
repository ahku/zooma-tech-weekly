import { compose } from '../utils/utils'
import { withAttack, withEvasion, withDefence } from './abilities'

export function FunctionPipeComposition() {
  console.log('\nFUNCTIONAL COMPOSITION 2: PIPED FUNCTIONS\n')

  //------------------------------------------------------------------------
  //  Create archetypes
  //------------------------------------------------------------------------
  const createSlacker = compose(withDefence, withEvasion)
  const createBesserwisser = compose(withAttack)
  const createLeader = compose(
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
