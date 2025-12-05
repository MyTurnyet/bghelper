import { describe, it, expect } from 'vitest'
import {
  createInitialGameState,
  getCardSection,
  countCovenantAchievements,
  shouldGameEnd,
  type AchievementProgress
} from './deadReckoning'

describe('deadReckoning types', () => {
  describe('createInitialGameState', () => {
    it('creates initial state with correct defaults', () => {
      const state = createInitialGameState()

      expect(state.turn).toBe(0)
      expect(state.difficulty).toBe('normal')
      expect(state.gamePhase).toBe('setup')
      expect(state.playerAchievementCount).toBe(0)
    })

    it('initializes Covenant with 15 coins', () => {
      const state = createInitialGameState()

      expect(state.covenant.coins).toBe(15)
    })

    it('initializes Covenant with 0 wood', () => {
      const state = createInitialGameState()

      expect(state.covenant.wood).toBe(0)
    })

    it('initializes Covenant with 0 damage', () => {
      const state = createInitialGameState()

      expect(state.covenant.damage).toBe(0)
    })

    it('initializes Covenant with 0 ship upgrades', () => {
      const state = createInitialGameState()

      expect(state.covenant.shipUpgrades).toBe(0)
    })

    it('initializes both advancement piles at 0', () => {
      const state = createInitialGameState()

      expect(state.covenant.piratePileCount).toBe(0)
      expect(state.covenant.mercantilePileCount).toBe(0)
    })

    it('initializes all achievements at 0 or false', () => {
      const state = createInitialGameState()
      const achievements = state.covenantAchievements

      expect(achievements.legendary).toBe(0)
      expect(achievements.terrorOfTheSea).toBe(false)
      expect(achievements.expertSailors).toBe(0)
      expect(achievements.eliteVessel).toBe(false)
      expect(achievements.explorer).toBe(0)
      expect(achievements.builder).toBe(0)
      expect(achievements.settler).toEqual({})
      expect(achievements.capitalist).toBe(false)
    })
  })

  describe('getCardSection', () => {
    it('returns "Setup" for turn 0', () => {
      expect(getCardSection(0)).toBe('Setup')
    })

    it('returns "A" for turns 1-3', () => {
      expect(getCardSection(1)).toBe('A')
      expect(getCardSection(2)).toBe('A')
      expect(getCardSection(3)).toBe('A')
    })

    it('returns "B" for turns 4-6', () => {
      expect(getCardSection(4)).toBe('B')
      expect(getCardSection(5)).toBe('B')
      expect(getCardSection(6)).toBe('B')
    })

    it('returns "C" for turns 7-9', () => {
      expect(getCardSection(7)).toBe('C')
      expect(getCardSection(8)).toBe('C')
      expect(getCardSection(9)).toBe('C')
    })

    it('returns "D" for turns 10-12', () => {
      expect(getCardSection(10)).toBe('D')
      expect(getCardSection(11)).toBe('D')
      expect(getCardSection(12)).toBe('D')
    })

    it('continues pattern for higher turns', () => {
      expect(getCardSection(13)).toBe('E')
      expect(getCardSection(19)).toBe('G')
      expect(getCardSection(25)).toBe('I')
    })
  })

  describe('countCovenantAchievements', () => {
    const baseAchievements: AchievementProgress = {
      legendary: 0,
      terrorOfTheSea: false,
      expertSailors: 0,
      eliteVessel: false,
      explorer: 0,
      builder: 0,
      settler: {},
      capitalist: false
    }

    it('returns 0 for initial state', () => {
      expect(countCovenantAchievements(baseAchievements)).toBe(0)
    })

    it('counts Legendary when 4 cubes earned', () => {
      const achievements = { ...baseAchievements, legendary: 4 }
      expect(countCovenantAchievements(achievements)).toBe(1)
    })

    it('does not count Legendary when less than 4 cubes', () => {
      const achievements = { ...baseAchievements, legendary: 3 }
      expect(countCovenantAchievements(achievements)).toBe(0)
    })

    it('counts Terror of the Sea when true', () => {
      const achievements = { ...baseAchievements, terrorOfTheSea: true }
      expect(countCovenantAchievements(achievements)).toBe(1)
    })

    it('counts Expert Sailors when 3 cubes earned', () => {
      const achievements = { ...baseAchievements, expertSailors: 3 }
      expect(countCovenantAchievements(achievements)).toBe(1)
    })

    it('does not count Expert Sailors when less than 3 cubes', () => {
      const achievements = { ...baseAchievements, expertSailors: 2 }
      expect(countCovenantAchievements(achievements)).toBe(0)
    })

    it('counts Elite Vessel when true', () => {
      const achievements = { ...baseAchievements, eliteVessel: true }
      expect(countCovenantAchievements(achievements)).toBe(1)
    })

    it('counts Explorer when 5 boards explored', () => {
      const achievements = { ...baseAchievements, explorer: 5 }
      expect(countCovenantAchievements(achievements)).toBe(1)
    })

    it('does not count Explorer when less than 5 boards', () => {
      const achievements = { ...baseAchievements, explorer: 4 }
      expect(countCovenantAchievements(achievements)).toBe(0)
    })

    it('counts Builder when 5 or more buildings', () => {
      const achievements = { ...baseAchievements, builder: 5 }
      expect(countCovenantAchievements(achievements)).toBe(1)
    })

    it('counts Builder when more than 5 buildings', () => {
      const achievements = { ...baseAchievements, builder: 7 }
      expect(countCovenantAchievements(achievements)).toBe(1)
    })

    it('does not count Builder when less than 5 buildings', () => {
      const achievements = { ...baseAchievements, builder: 4 }
      expect(countCovenantAchievements(achievements)).toBe(0)
    })

    it('counts Settler when all islands have 6+ cubes', () => {
      const achievements = {
        ...baseAchievements,
        settler: { island1: 6, island2: 7, island3: 6 }
      }
      expect(countCovenantAchievements(achievements)).toBe(1)
    })

    it('does not count Settler when any island has less than 6 cubes', () => {
      const achievements = {
        ...baseAchievements,
        settler: { island1: 6, island2: 5, island3: 6 }
      }
      expect(countCovenantAchievements(achievements)).toBe(0)
    })

    it('does not count Settler when settler object is empty', () => {
      const achievements = { ...baseAchievements, settler: {} }
      expect(countCovenantAchievements(achievements)).toBe(0)
    })

    it('counts Capitalist when true', () => {
      const achievements = { ...baseAchievements, capitalist: true }
      expect(countCovenantAchievements(achievements)).toBe(1)
    })

    it('counts multiple achievements correctly', () => {
      const achievements = {
        ...baseAchievements,
        legendary: 4,
        terrorOfTheSea: true,
        expertSailors: 3,
        capitalist: true
      }
      expect(countCovenantAchievements(achievements)).toBe(4)
    })

    it('can reach maximum of 8 achievements', () => {
      const achievements: AchievementProgress = {
        legendary: 4,
        terrorOfTheSea: true,
        expertSailors: 3,
        eliteVessel: true,
        explorer: 5,
        builder: 5,
        settler: { island1: 6, island2: 6 },
        capitalist: true
      }
      expect(countCovenantAchievements(achievements)).toBe(8)
    })
  })

  describe('shouldGameEnd', () => {
    const baseAchievements: AchievementProgress = {
      legendary: 0,
      terrorOfTheSea: false,
      expertSailors: 0,
      eliteVessel: false,
      explorer: 0,
      builder: 0,
      settler: {},
      capitalist: false
    }

    it('returns false when neither player has 4 achievements', () => {
      expect(shouldGameEnd(baseAchievements, 0)).toBe(false)
      expect(shouldGameEnd(baseAchievements, 3)).toBe(false)
    })

    it('returns true when Covenant has 4 achievements', () => {
      const achievements = {
        ...baseAchievements,
        legendary: 4,
        terrorOfTheSea: true,
        expertSailors: 3,
        capitalist: true
      }
      expect(shouldGameEnd(achievements, 0)).toBe(true)
    })

    it('returns true when player has 4 achievements', () => {
      expect(shouldGameEnd(baseAchievements, 4)).toBe(true)
    })

    it('returns true when both have 4 achievements', () => {
      const achievements = {
        ...baseAchievements,
        legendary: 4,
        terrorOfTheSea: true,
        expertSailors: 3,
        capitalist: true
      }
      expect(shouldGameEnd(achievements, 4)).toBe(true)
    })

    it('returns true when Covenant has more than 4 achievements', () => {
      const achievements: AchievementProgress = {
        legendary: 4,
        terrorOfTheSea: true,
        expertSailors: 3,
        eliteVessel: true,
        explorer: 5,
        builder: 0,
        settler: {},
        capitalist: false
      }
      expect(shouldGameEnd(achievements, 0)).toBe(true)
    })

    it('returns true when player has more than 4 achievements', () => {
      expect(shouldGameEnd(baseAchievements, 5)).toBe(true)
    })
  })
})
