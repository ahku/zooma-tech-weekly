export interface Player {
  name: string
}

//------------------------------------------------------------------------
//  Ability Typings
//------------------------------------------------------------------------
export type WithAttack = {
  attack?: Function
}
export type WithDefence = {
  defend?: Function
}
export type WithEvasion = {
  evade?: Function
}

//------------------------------------------------------------------------
//  Abilities
//------------------------------------------------------------------------
export const withAttack = (player: Player) => {
  return Object.assign(player, {
    attack() {
      return `${player.name} showed the client ”the best practises.” It was mildly effective.`
    },
  })
}
export const withDefence = (player: Player) => {
  return Object.assign(player, {
    defend() {
      return `${player.name} curled up into the foetal position.`
    },
  })
}
export const withEvasion = (player: Player) => {
  return Object.assign(player, {
    evade() {
      return `${player.name} took a day off.`
    },
  })
}
