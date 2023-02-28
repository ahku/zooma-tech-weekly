import {
  withAttack,
  withDefence,
  withEvasion,
  withFlying,
  withBasics,
  withLanding,
  WithBasicsType,
} from './abilities'
import type { MoveMeta, Player, PlayerBaseOpts, PlayerStats } from './types'
import { Character } from './types'

const createBoss = () => {}

const createCharacter = (
  name: string,
  color: string,
  energy: number,
  stats: PlayerStats = {}
): Character => ({
  name,
  color,
  stats,
  energy,
  moveList: [],
})

export const createPlayer = <T extends Character & WithBasicsType>(
  character: T,
  energy: number
): Player => ({
  ...character,
  currentEnergy: energy,
  nextAction: { type: 'idle', targetIndex: -1 },
  position: 'land',
})

//------------------------------------------------------------------------
//  Archetype Functions
//-----------------------------------------------------------------------
export interface PlayerCommonerOpts extends PlayerBaseOpts {
  attacks: MoveMeta[]
  defences: MoveMeta[]
}
export const createCommoner = ({
  name,
  color,
  energy,
  stats,
  attacks,
  defences,
}: PlayerCommonerOpts) => {
  const player = createCharacter(name, color, energy, stats)
  return Object.assign(
    withBasics(player),
    ...attacks.map((attack) => withAttack(player, attack)),
    ...defences.map((defence) => withDefence(player, defence))
  )
}

export interface PlayerFighterOpts extends PlayerBaseOpts {
  attacks: MoveMeta[]
  defences: MoveMeta[]
  evasions: MoveMeta[]
}

export const createFighter = ({
  name,
  color,
  energy,
  stats,
  attacks,
  defences,
  evasions,
}: PlayerFighterOpts) => {
  const player = createCharacter(name, color, energy, stats)

  return Object.assign(
    withBasics(player),
    ...attacks.map((attack) => withAttack(player, attack)),
    ...defences.map((defence) => withDefence(player, defence)),
    ...evasions.map((evasion) => withEvasion(player, evasion))
  )
}

export interface PlayerAngelOpts extends PlayerBaseOpts {
  attacks: MoveMeta[]
  evasions: MoveMeta[]
  flyMeta: MoveMeta
  landMeta: MoveMeta
}
export const createAngel = ({
  name,
  color,
  energy,
  stats,
  attacks,
  evasions,
  flyMeta,
  landMeta,
}: PlayerAngelOpts) => {
  const player = createCharacter(name, color, energy, stats)
  return Object.assign(
    withBasics(player),
    withFlying(player, flyMeta),
    withLanding(player, landMeta),
    ...attacks.map((attack) => withAttack(player, attack)),
    ...evasions.map((evasion) => withEvasion(player, evasion))
  )
}
