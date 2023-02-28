// Each mixin is a traditional ES class
import { applyMixins } from '../utils/utils'
import { Evadable, Attackable, Defendable } from './mixins'

console.log('\nMIXIN CLASSES\n')

//------------------------------------------------------------------------
//  Create archetypes
//------------------------------------------------------------------------

// ---------- SLACKER ----------
class Slacker {
  name = 'Slacker'

  constructor(name: string) {
    this.name = name
  }
}
interface Slacker extends Defendable, Evadable {}
applyMixins(Slacker, [Attackable, Defendable, Evadable])

// ---------- BESSERWISSER ----------
class Besserwisser {
  name = 'Besserwisser'

  constructor(name: string) {
    this.name = name
  }
}
interface Besserwisser extends Attackable {}
applyMixins(Besserwisser, [Attackable])

// ---------- LEADER ----------
class Leader {
  name = 'Leader'

  constructor(name: string) {
    this.name = name
  }
}
interface Leader extends Defendable, Evadable, Attackable {}
applyMixins(Leader, [Defendable, Evadable, Attackable])

export function MixinClasses() {
  console.log('\nMIXIN CLASSES\n')

  //------------------------------------------------------------------------
  //  Create our players
  //------------------------------------------------------------------------
  let roger = new Slacker('Roger')
  let richard = new Besserwisser('Richard')
  let diana = new Leader('diana')

  console.log(roger.defend())
  console.log(roger.evade())
  console.log(richard.attack())
  console.log(diana.attack())
  console.log(diana.defend())
  console.log(diana.evade())
}
