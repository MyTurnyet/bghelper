/**
 * Dead Reckoning Solo Helper - Type Definitions
 *
 * Core interfaces for managing the Wayward Covenant AI opponent's state
 * in Dead Reckoning's solo mode.
 */

/**
 * Covenant's resource and upgrade state
 */
export interface CovenantState {
  /** Current coin supply (starts at 15) */
  coins: number
  /** Current wood supply (converts 3:1 to coins) */
  wood: number
  /** Current ship damage (0-5, sunk at 5) */
  damage: number
  /** Number of ship upgrades acquired (0-4) */
  shipUpgrades: number
  /** Count of advancements in the Pirate pile (cannons/battle abilities) */
  piratePileCount: number
  /** Count of advancements in the Mercantile pile (all others) */
  mercantilePileCount: number
}

/**
 * Achievement progress tracking for Covenant
 * 8 total achievements (cannot claim Master Merchant)
 */
export interface AchievementProgress {
  /** Legendary: 4 cubes (defeat player Ship or Merchant ships) */
  legendary: number
  /** Terror of the Sea: Sink player's Ship */
  terrorOfTheSea: boolean
  /** Expert Sailors: 3 cubes (from card effects) */
  expertSailors: number
  /** Elite Vessel: Acquire 4 Ship Upgrades */
  eliteVessel: boolean
  /** Explorer: Explore 5 Ocean boards (solo) or 3 (co-op) */
  explorer: number
  /** Builder: Control 5+ Buildings simultaneously */
  builder: number
  /** Settler: 6+ permanent cubes on all islands */
  settler: Record<string, number> // island name -> cube count
  /** Capitalist: 30+ coins in supply */
  capitalist: boolean
}

/**
 * Game phase state
 */
export type GamePhase = 'setup' | 'active' | 'ended'

/**
 * Difficulty levels
 */
export type Difficulty = 'normal' | 'expert'

/**
 * Main game state container
 */
export interface GameState {
  /** Current turn number (starts at 0, increments each turn) */
  turn: number
  /** Selected difficulty level */
  difficulty: Difficulty
  /** Covenant AI state */
  covenant: CovenantState
  /** Covenant achievement progress */
  covenantAchievements: AchievementProgress
  /** Player achievement count (tracked externally) */
  playerAchievementCount: number
  /** Current game phase */
  gamePhase: GamePhase
}

/**
 * Initial state factory
 */
export const createInitialGameState = (): GameState => ({
  turn: 0,
  difficulty: 'normal',
  covenant: {
    coins: 15,
    wood: 0,
    damage: 0,
    shipUpgrades: 0,
    piratePileCount: 0,
    mercantilePileCount: 0
  },
  covenantAchievements: {
    legendary: 0,
    terrorOfTheSea: false,
    expertSailors: 0,
    eliteVessel: false,
    explorer: 0,
    builder: 0,
    settler: {},
    capitalist: false
  },
  playerAchievementCount: 0,
  gamePhase: 'setup'
})

/**
 * Helper function to calculate current card section based on turn number
 * Turns 1-3 = A, 4-6 = B, 7-9 = C, etc.
 */
export const getCardSection = (turn: number): string => {
  if (turn === 0) return 'Setup'
  const sectionIndex = Math.floor((turn - 1) / 3)
  return String.fromCharCode(65 + sectionIndex) // 65 = 'A'
}

/**
 * Helper function to count total Covenant achievements
 */
export const countCovenantAchievements = (achievements: AchievementProgress): number => {
  let count = 0

  if (achievements.legendary >= 4) count++
  if (achievements.terrorOfTheSea) count++
  if (achievements.expertSailors >= 3) count++
  if (achievements.eliteVessel) count++
  if (achievements.explorer >= 5) count++
  if (achievements.builder >= 5) count++

  // Settler: check if all islands have 6+ cubes
  const settlerIslands = Object.values(achievements.settler)
  if (settlerIslands.length > 0 && settlerIslands.every(cubes => cubes >= 6)) {
    count++
  }

  if (achievements.capitalist) count++

  return count
}

/**
 * Helper function to check if game should end (4 achievements reached)
 */
export const shouldGameEnd = (covenantAchievements: AchievementProgress, playerAchievementCount: number): boolean => {
  return countCovenantAchievements(covenantAchievements) >= 4 || playerAchievementCount >= 4
}
