/**
 * Character state
 */
import { WithBasicsType } from './abilities'

export type Character = {
  name: string
  color: string
  energy: number
  stats: PlayerStats
  moveList: MoveData[]
}

/**
 * Player data used in game
 */
export type Player = Character &
  WithBasicsType & {
    currentEnergy: number
    nextAction?: ActionType
    position: PositionType
  }

/**
 * Boss state
 * ---
 * 'mode' is unique for bosses, as it controls the possible next action
 */
export type BossState = 'attack-one' | 'attack-all'
export interface Boss extends Character {
  mode: 'idle' | 'attack-one' | 'attack-all' | 'defend'
}

export type MoveType = 'idle' | 'attack' | 'defend' | 'evade' | 'fly' | 'land'
export type PositionType = 'land' | 'air'
export type StatScale = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

/**
 * Name of the move, and what message to output when the move is used
 */
export type MoveMeta = {
  name: string
  desc: string
  target?: 'all' | 'one'
}

/**
 * Stores the move type and what action (method)
 * should be called
 */
export interface MoveData extends Partial<MoveMeta> {
  type: MoveType
  action: string
}

/**
 * Used for nextAction, to store what the next
 * action should be, and what to target
 */
export type ActionType = {
  type: MoveType
  targetIndex: number
}

/**
 * Base options that must be passed as arguments
 * when creating a new player
 */
export interface PlayerBaseOpts {
  name: string
  color: string
  energy: number
  stats: PlayerStats
}

export interface PlayerStats {
  landAttack?: StatScale
  landDefence?: StatScale
  airAttack?: StatScale
  airDefence?: StatScale
  dexterity?: StatScale // How quick you can take control
  evasion?: StatScale
}
