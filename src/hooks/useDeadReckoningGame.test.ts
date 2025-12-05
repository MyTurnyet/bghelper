import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDeadReckoningGame } from './useDeadReckoningGame'

describe('useDeadReckoningGame', () => {
  describe('Initialization', () => {
    it('initializes with setup phase', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      expect(result.current.gameState.gamePhase).toBe('setup')
    })

    it('initializes on turn 0', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      expect(result.current.gameState.turn).toBe(0)
    })

    it('initializes with 15 coins', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      expect(result.current.gameState.covenant.coins).toBe(15)
    })

    it('shows "Setup" as current card section', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      expect(result.current.currentCardSection).toBe('Setup')
    })

    it('starts with 0 covenant achievements', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      expect(result.current.covenantAchievementCount).toBe(0)
    })
  })

  describe('Game Control', () => {
    it('initializeGame sets game to active phase', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.initializeGame()
      })

      expect(result.current.gameState.gamePhase).toBe('active')
    })

    it('initializeGame sets difficulty to normal by default', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.initializeGame()
      })

      expect(result.current.gameState.difficulty).toBe('normal')
    })

    it('initializeGame can set difficulty to expert', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.initializeGame('expert')
      })

      expect(result.current.gameState.difficulty).toBe('expert')
    })

    it('resetGame returns to setup phase', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.initializeGame()
        result.current.incrementTurn()
      })

      expect(result.current.gameState.turn).toBe(1)

      act(() => {
        result.current.resetGame()
      })

      expect(result.current.gameState.gamePhase).toBe('setup')
      expect(result.current.gameState.turn).toBe(0)
    })

    it('incrementTurn increases turn counter', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.initializeGame()
        result.current.incrementTurn()
      })

      expect(result.current.gameState.turn).toBe(1)
    })

    it('incrementTurn updates card section', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.initializeGame()
        result.current.incrementTurn()
      })

      expect(result.current.currentCardSection).toBe('A')
    })
  })

  describe('Covenant Coins', () => {
    it('setCovenantCoins updates coin amount', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setCovenantCoins(30)
      })

      expect(result.current.gameState.covenant.coins).toBe(30)
    })

    it('setCovenantCoins prevents negative coins', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setCovenantCoins(-5)
      })

      expect(result.current.gameState.covenant.coins).toBe(0)
    })

    it('setCovenantCoins awards Capitalist at 30 coins', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setCovenantCoins(30)
      })

      expect(result.current.gameState.covenantAchievements.capitalist).toBe(true)
    })

    it('addCovenantCoins increases coins', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.addCovenantCoins(10)
      })

      expect(result.current.gameState.covenant.coins).toBe(25)
    })

    it('addCovenantCoins can decrease coins with negative amount', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.addCovenantCoins(-5)
      })

      expect(result.current.gameState.covenant.coins).toBe(10)
    })

    it('addCovenantCoins awards Capitalist when reaching 30', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.addCovenantCoins(15) // Total: 30
      })

      expect(result.current.gameState.covenantAchievements.capitalist).toBe(true)
    })
  })

  describe('Covenant Wood', () => {
    it('setCovenantWood updates wood amount', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setCovenantWood(9)
      })

      expect(result.current.gameState.covenant.wood).toBe(9)
    })

    it('setCovenantWood prevents negative wood', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setCovenantWood(-3)
      })

      expect(result.current.gameState.covenant.wood).toBe(0)
    })

    it('addCovenantWood increases wood', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.addCovenantWood(6)
      })

      expect(result.current.gameState.covenant.wood).toBe(6)
    })

    it('convertWoodToCoins converts 3 wood to 1 coin', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setCovenantWood(3)
        result.current.convertWoodToCoins()
      })

      expect(result.current.gameState.covenant.wood).toBe(0)
      expect(result.current.gameState.covenant.coins).toBe(16)
    })

    it('convertWoodToCoins leaves remainder wood', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setCovenantWood(10)
        result.current.convertWoodToCoins()
      })

      expect(result.current.gameState.covenant.wood).toBe(1)
      expect(result.current.gameState.covenant.coins).toBe(18) // 15 + 3
    })

    it('convertWoodToCoins does nothing with less than 3 wood', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setCovenantWood(2)
        result.current.convertWoodToCoins()
      })

      expect(result.current.gameState.covenant.wood).toBe(2)
      expect(result.current.gameState.covenant.coins).toBe(15)
    })

    it('incrementTurn auto-converts wood to coins', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.initializeGame()
        result.current.setCovenantWood(9)
        result.current.incrementTurn()
      })

      expect(result.current.gameState.covenant.wood).toBe(0)
      expect(result.current.gameState.covenant.coins).toBe(18)
    })
  })

  describe('Covenant Damage', () => {
    it('setCovenantDamage updates damage', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setCovenantDamage(3)
      })

      expect(result.current.gameState.covenant.damage).toBe(3)
    })

    it('setCovenantDamage caps damage at 5', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setCovenantDamage(10)
      })

      expect(result.current.gameState.covenant.damage).toBe(5)
    })

    it('setCovenantDamage prevents negative damage', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setCovenantDamage(-1)
      })

      expect(result.current.gameState.covenant.damage).toBe(0)
    })

    it('addCovenantDamage increases damage', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setCovenantDamage(2)
        result.current.addCovenantDamage(1)
      })

      expect(result.current.gameState.covenant.damage).toBe(3)
    })

    it('addCovenantDamage caps at 5', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setCovenantDamage(4)
        result.current.addCovenantDamage(3)
      })

      expect(result.current.gameState.covenant.damage).toBe(5)
    })
  })

  describe('Ship Upgrades', () => {
    it('setShipUpgrades updates upgrade count', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setShipUpgrades(2)
      })

      expect(result.current.gameState.covenant.shipUpgrades).toBe(2)
    })

    it('setShipUpgrades caps at 4', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setShipUpgrades(10)
      })

      expect(result.current.gameState.covenant.shipUpgrades).toBe(4)
    })

    it('setShipUpgrades awards Elite Vessel at 4', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setShipUpgrades(4)
      })

      expect(result.current.gameState.covenantAchievements.eliteVessel).toBe(true)
    })

    it('addShipUpgrade increases upgrade count', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.addShipUpgrade()
      })

      expect(result.current.gameState.covenant.shipUpgrades).toBe(1)
    })

    it('addShipUpgrade caps at 4', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setShipUpgrades(4)
        result.current.addShipUpgrade()
      })

      expect(result.current.gameState.covenant.shipUpgrades).toBe(4)
    })

    it('addShipUpgrade awards Elite Vessel when reaching 4', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setShipUpgrades(3)
        result.current.addShipUpgrade()
      })

      expect(result.current.gameState.covenantAchievements.eliteVessel).toBe(true)
    })
  })

  describe('Advancement Piles', () => {
    it('setPiratePileCount updates Pirate pile', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setPiratePileCount(5)
      })

      expect(result.current.gameState.covenant.piratePileCount).toBe(5)
    })

    it('setPiratePileCount prevents negative count', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setPiratePileCount(-2)
      })

      expect(result.current.gameState.covenant.piratePileCount).toBe(0)
    })

    it('setMercantilePileCount updates Mercantile pile', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setMercantilePileCount(8)
      })

      expect(result.current.gameState.covenant.mercantilePileCount).toBe(8)
    })

    it('setMercantilePileCount prevents negative count', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setMercantilePileCount(-3)
      })

      expect(result.current.gameState.covenant.mercantilePileCount).toBe(0)
    })

    it('calculates mercantileIncome correctly', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setMercantilePileCount(7)
      })

      expect(result.current.mercantileIncome).toBe(3)
    })

    it('rounds down mercantileIncome', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setMercantilePileCount(5)
      })

      expect(result.current.mercantileIncome).toBe(2)
    })
  })

  describe('Achievements', () => {
    it('updateCovenantAchievements updates specific achievements', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.updateCovenantAchievements({ legendary: 2, terrorOfTheSea: true })
      })

      expect(result.current.gameState.covenantAchievements.legendary).toBe(2)
      expect(result.current.gameState.covenantAchievements.terrorOfTheSea).toBe(true)
    })

    it('covenantAchievementCount reflects total achievements', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.updateCovenantAchievements({
          legendary: 4,
          terrorOfTheSea: true,
          expertSailors: 3
        })
      })

      expect(result.current.covenantAchievementCount).toBe(3)
    })

    it('setPlayerAchievementCount updates player achievements', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setPlayerAchievementCount(2)
      })

      expect(result.current.gameState.playerAchievementCount).toBe(2)
    })

    it('setPlayerAchievementCount prevents negative count', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.setPlayerAchievementCount(-1)
      })

      expect(result.current.gameState.playerAchievementCount).toBe(0)
    })
  })

  describe('Game End Detection', () => {
    it('sets gamePhase to ended when Covenant reaches 4 achievements', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.initializeGame()
        result.current.updateCovenantAchievements({
          legendary: 4,
          terrorOfTheSea: true,
          expertSailors: 3,
          capitalist: true
        })
        result.current.incrementTurn()
      })

      expect(result.current.gameState.gamePhase).toBe('ended')
    })

    it('sets gamePhase to ended when player reaches 4 achievements', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.initializeGame()
        result.current.setPlayerAchievementCount(4)
        result.current.incrementTurn()
      })

      expect(result.current.gameState.gamePhase).toBe('ended')
    })

    it('remains active when neither player has 4 achievements', () => {
      const { result } = renderHook(() => useDeadReckoningGame())

      act(() => {
        result.current.initializeGame()
        result.current.updateCovenantAchievements({ legendary: 4, terrorOfTheSea: true })
        result.current.setPlayerAchievementCount(3)
        result.current.incrementTurn()
      })

      expect(result.current.gameState.gamePhase).toBe('active')
    })
  })
})
