export interface Player {
  name: string
}

//------------------------------------------------------------------------
//  Ability Typings
//------------------------------------------------------------------------
export interface WithAttack {
  attack: Function
}
export interface WithDefence {
  defend: Function
}
export interface WithEvasion {
  evade: Function
}

interface AnyAbility extends Partial<WithAttack> {}
interface AnyAbility extends Partial<WithDefence> {}
interface AnyAbility extends Partial<WithEvasion> {}

//------------------------------------------------------------------------
//  Abilities
//------------------------------------------------------------------------
export const withAttack = (player: Player) => {
  return {
    attack() {
      return `${player.name} showed the client ”the best practises.” It was mildly effective.`
    },
  }
}
export const withDefence = (player: Player) => {
  return {
    defend() {
      return `${player.name} curled up into the foetal position.`
    },
  }
}
export const withEvasion = (player: Player) => {
  return {
    evade() {
      return `${player.name} took a day off.`
    },
  }
}

//------------------------------------------------------------------------
//  Hacky Ability Composer
//------------------------------------------------------------------------
type AbilityFunction = ({ name: string }) => AnyAbility

export const composePlayer = (
  name: string,
  behaviors: AbilityFunction[]
): AnyAbility => {
  const player = { name }
  return Object.assign({}, ...behaviors.map((behavior) => behavior(player)))
}
