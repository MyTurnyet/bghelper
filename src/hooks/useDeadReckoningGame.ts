/**
 * Dead Reckoning Solo Helper - Game State Hook
 *
 * Custom hook for managing the Wayward Covenant AI opponent's state
 * and game progression in Dead Reckoning's solo mode.
 */

import { useState, useCallback } from 'react'
import type {
  GameState,
  AchievementProgress,
  Difficulty,
  GamePhase
} from '../types/deadReckoning'
import {
  createInitialGameState,
  getCardSection,
  countCovenantAchievements,
  shouldGameEnd
} from '../types/deadReckoning'

export const useDeadReckoningGame = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState())

  /**
   * Initialize a new game with selected difficulty
   */
  const initializeGame = useCallback((difficulty: Difficulty = 'normal') => {
    const newState = createInitialGameState()
    newState.difficulty = difficulty
    newState.gamePhase = 'active'
    setGameState(newState)
  }, [])

  /**
   * Reset game to initial setup state
   */
  const resetGame = useCallback(() => {
    setGameState(createInitialGameState())
  }, [])

  /**
   * Increment turn counter and handle end-of-turn effects
   */
  const incrementTurn = useCallback(() => {
    setGameState(prev => {
      const newState = { ...prev, turn: prev.turn + 1 }

      // Auto-convert wood to coins at end of turn (3:1 ratio)
      const woodToConvert = Math.floor(prev.covenant.wood / 3)
      if (woodToConvert > 0) {
        newState.covenant = {
          ...prev.covenant,
          wood: prev.covenant.wood - (woodToConvert * 3),
          coins: prev.covenant.coins + woodToConvert
        }
      }

      // Check if game should end
      if (shouldGameEnd(newState.covenantAchievements, newState.playerAchievementCount)) {
        newState.gamePhase = 'ended'
      }

      return newState
    })
  }, [])

  /**
   * Set Covenant coins directly
   */
  const setCovenantCoins = useCallback((coins: number) => {
    setGameState(prev => ({
      ...prev,
      covenant: {
        ...prev.covenant,
        coins: Math.max(0, coins)
      },
      covenantAchievements: {
        ...prev.covenantAchievements,
        capitalist: coins >= 30
      }
    }))
  }, [])

  /**
   * Add coins to Covenant supply
   */
  const addCovenantCoins = useCallback((amount: number) => {
    setGameState(prev => {
      const newCoins = prev.covenant.coins + amount
      return {
        ...prev,
        covenant: {
          ...prev.covenant,
          coins: Math.max(0, newCoins)
        },
        covenantAchievements: {
          ...prev.covenantAchievements,
          capitalist: newCoins >= 30
        }
      }
    })
  }, [])

  /**
   * Set Covenant wood directly
   */
  const setCovenantWood = useCallback((wood: number) => {
    setGameState(prev => ({
      ...prev,
      covenant: {
        ...prev.covenant,
        wood: Math.max(0, wood)
      }
    }))
  }, [])

  /**
   * Add wood to Covenant supply
   */
  const addCovenantWood = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      covenant: {
        ...prev.covenant,
        wood: Math.max(0, prev.covenant.wood + amount)
      }
    }))
  }, [])

  /**
   * Convert wood to coins (3:1 ratio)
   */
  const convertWoodToCoins = useCallback(() => {
    setGameState(prev => {
      const woodToConvert = Math.floor(prev.covenant.wood / 3)
      if (woodToConvert === 0) return prev

      const newCoins = prev.covenant.coins + woodToConvert
      return {
        ...prev,
        covenant: {
          ...prev.covenant,
          wood: prev.covenant.wood - (woodToConvert * 3),
          coins: newCoins
        },
        covenantAchievements: {
          ...prev.covenantAchievements,
          capitalist: newCoins >= 30
        }
      }
    })
  }, [])

  /**
   * Set Covenant damage level (0-5)
   */
  const setCovenantDamage = useCallback((damage: number) => {
    setGameState(prev => ({
      ...prev,
      covenant: {
        ...prev.covenant,
        damage: Math.max(0, Math.min(5, damage))
      }
    }))
  }, [])

  /**
   * Add damage to Covenant ship
   */
  const addCovenantDamage = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      covenant: {
        ...prev.covenant,
        damage: Math.max(0, Math.min(5, prev.covenant.damage + amount))
      }
    }))
  }, [])

  /**
   * Set number of ship upgrades (0-4)
   */
  const setShipUpgrades = useCallback((upgrades: number) => {
    setGameState(prev => ({
      ...prev,
      covenant: {
        ...prev.covenant,
        shipUpgrades: Math.max(0, Math.min(4, upgrades))
      },
      covenantAchievements: {
        ...prev.covenantAchievements,
        eliteVessel: upgrades >= 4
      }
    }))
  }, [])

  /**
   * Add ship upgrade
   */
  const addShipUpgrade = useCallback(() => {
    setGameState(prev => {
      const newUpgrades = Math.min(4, prev.covenant.shipUpgrades + 1)
      return {
        ...prev,
        covenant: {
          ...prev.covenant,
          shipUpgrades: newUpgrades
        },
        covenantAchievements: {
          ...prev.covenantAchievements,
          eliteVessel: newUpgrades >= 4
        }
      }
    })
  }, [])

  /**
   * Set Pirate pile count
   */
  const setPiratePileCount = useCallback((count: number) => {
    setGameState(prev => ({
      ...prev,
      covenant: {
        ...prev.covenant,
        piratePileCount: Math.max(0, count)
      }
    }))
  }, [])

  /**
   * Set Mercantile pile count
   */
  const setMercantilePileCount = useCallback((count: number) => {
    setGameState(prev => ({
      ...prev,
      covenant: {
        ...prev.covenant,
        mercantilePileCount: Math.max(0, count)
      }
    }))
  }, [])

  /**
   * Update Covenant achievements
   */
  const updateCovenantAchievements = useCallback((achievements: Partial<AchievementProgress>) => {
    setGameState(prev => ({
      ...prev,
      covenantAchievements: {
        ...prev.covenantAchievements,
        ...achievements
      }
    }))
  }, [])

  /**
   * Set player achievement count
   */
  const setPlayerAchievementCount = useCallback((count: number) => {
    setGameState(prev => ({
      ...prev,
      playerAchievementCount: Math.max(0, count)
    }))
  }, [])

  /**
   * Set game phase
   */
  const setGamePhase = useCallback((phase: GamePhase) => {
    setGameState(prev => ({
      ...prev,
      gamePhase: phase
    }))
  }, [])

  // Computed values
  const currentCardSection = getCardSection(gameState.turn)
  const covenantAchievementCount = countCovenantAchievements(gameState.covenantAchievements)
  const mercantileIncome = Math.floor(gameState.covenant.mercantilePileCount / 2)

  return {
    // State
    gameState,
    currentCardSection,
    covenantAchievementCount,
    mercantileIncome,

    // Game control
    initializeGame,
    resetGame,
    incrementTurn,
    setGamePhase,

    // Covenant resources
    setCovenantCoins,
    addCovenantCoins,
    setCovenantWood,
    addCovenantWood,
    convertWoodToCoins,
    setCovenantDamage,
    addCovenantDamage,
    setShipUpgrades,
    addShipUpgrade,

    // Advancement piles
    setPiratePileCount,
    setMercantilePileCount,

    // Achievements
    updateCovenantAchievements,
    setPlayerAchievementCount
  }
}
