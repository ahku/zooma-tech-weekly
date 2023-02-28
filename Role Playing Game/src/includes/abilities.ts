import type {
  MoveMeta,
  PlayerStats,
  Character,
  ActionType,
  MoveType,
} from './types'
import { MoveData } from './types'

export type WithBasicsType = {
  getName: () => string
  getColor: () => string
  getEnergy: () => number
  getStats: () => PlayerStats
  getMoveList: () => MoveData[]
}

export const withBasics = (character: Character): WithBasicsType => {
  return {
    getName() {
      return character.name
    },
    getColor() {
      return character.color
    },
    getEnergy() {
      return character.energy
    },
    getStats() {
      return character.stats
    },
    getMoveList() {
      return character.moveList
    },
  }
}

/**
 * Get move data utility, helps us get a move by its name.
 * Also helps setting some defaults in case of missing data
 * @param {string} name
 * @param {MoveType} type
 * @param {Character} character
 * @param {string} defaultDesc
 * @return {MoveData}
 */
function getMoveData(
  name: string,
  type: MoveType,
  character: Character,
  defaultDesc = ''
): MoveData {
  return (
    character.moveList.find(
      (data) => data.type === type && data.name === name
    ) ?? { type: 'idle', action: '', name, desc: defaultDesc }
  )
}

//------------------------------------------------------------------------
//  Ability: Attack
//------------------------------------------------------------------------
export type WithAttackType = {
  attack: Function
}
export const withAttack = (
  character: Character,
  meta: MoveMeta
): WithAttackType => {
  character.moveList.push({ type: 'attack', action: 'attack', ...meta })
  return {
    attack(name = meta.name) {
      return getMoveData(
        name,
        'attack',
        character,
        `<label>${character.name}</label> launched an <strong>attack</strong>!`
      )
    },
  }
}

//------------------------------------------------------------------------
//  Ability: Defence
//------------------------------------------------------------------------
export type WithDefendType = {
  defend: Function
}
export const withDefence = (
  character: Character,
  meta: MoveMeta
): WithDefendType => {
  character.moveList.push({ type: 'defend', action: 'defend', ...meta })
  return {
    defend(name = meta.name) {
      return getMoveData(
        name,
        'defend',
        character,
        `<label>${character.name}</label> <strong>defended</strong> the attack.`
      )
    },
  }
}

//------------------------------------------------------------------------
//  Ability: Evasion
//------------------------------------------------------------------------
export type WithEvadeType = {
  evade: Function
}
export const withEvasion = (
  character: Character,
  meta: MoveMeta
): WithEvadeType => {
  character.moveList.push({ type: 'evade', action: 'evade', ...meta })
  return {
    evade(name = meta.name) {
      return getMoveData(
        name,
        'evade',
        character,
        `<label>${character.name}</label> <strong>evaded</strong> the attack.`
      )
    },
  }
}

//------------------------------------------------------------------------
//  Ability: Flying
//------------------------------------------------------------------------
export type WithFlyType = {
  fly: Function
}
export const withFlying = (
  character: Character,
  meta: MoveMeta
): WithFlyType => {
  character.moveList.push({ type: 'fly', action: 'fly', ...meta })

  return {
    fly(name = meta.name) {
      return getMoveData(
        name,
        'fly',
        character,
        `<label>${character.name}</label> took to the sky`
      )
    },
  }
}

//------------------------------------------------------------------------
//  Ability: Landing
//------------------------------------------------------------------------
export type WithLandType = {
  land: Function
}
export const withLanding = (
  character: Character,
  meta: MoveMeta
): WithLandType => {
  character.moveList.push({ type: 'land', action: 'land', ...meta })

  return {
    land(name = meta.name) {
      return getMoveData(
        name,
        'evade',
        character,
        `<label>${character.name}</label> landed on the ground`
      )
    },
  }
}
