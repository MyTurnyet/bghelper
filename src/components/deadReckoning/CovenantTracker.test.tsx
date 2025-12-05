import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CovenantTracker from './CovenantTracker'
import type { CovenantState } from '../../types/deadReckoning'

describe('CovenantTracker', () => {
  const mockCovenantState: CovenantState = {
    coins: 10,
    wood: 5,
    damage: 2,
    shipUpgrades: 1,
    piratePileCount: 0,
    mercantilePileCount: 0
  }

  const mockCallbacks = {
    onCoinsChange: vi.fn(),
    onWoodChange: vi.fn(),
    onDamageChange: vi.fn(),
    onShipUpgradesChange: vi.fn(),
    onConvertWood: vi.fn()
  }

  describe('Component Rendering', () => {
    it('renders the section heading', () => {
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      expect(screen.getByRole('heading', { name: /covenant resources/i })).toBeInTheDocument()
    })

    it('renders all four resource sections', () => {
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      expect(screen.getByText(/^coins$/i)).toBeInTheDocument()
      expect(screen.getByText(/^wood$/i)).toBeInTheDocument()
      expect(screen.getByText(/^damage$/i)).toBeInTheDocument()
      expect(screen.getByText(/^ship upgrades$/i)).toBeInTheDocument()
    })

    it('displays current coin value', () => {
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const coinsSection = screen.getByText(/^coins$/i).closest('div')?.parentElement
      expect(coinsSection?.textContent).toContain('10')
    })

    it('displays current wood value', () => {
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const woodSection = screen.getByText(/^wood$/i).closest('div')?.parentElement
      expect(woodSection?.textContent).toContain('5')
    })

    it('displays current damage value', () => {
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const damageSection = screen.getByText(/^damage$/i).closest('div')?.parentElement
      expect(damageSection?.textContent).toContain('2')
    })

    it('displays current ship upgrades value', () => {
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const upgradesSection = screen.getByText(/^ship upgrades$/i).closest('div')?.parentElement
      expect(upgradesSection?.textContent).toContain('1')
    })
  })

  describe('Coins Section', () => {
    it('renders increment and decrement buttons for coins', () => {
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const buttons = screen.getAllByRole('button')
      const coinButtons = buttons.filter(btn =>
        btn.getAttribute('aria-label')?.includes('coins')
      )
      expect(coinButtons).toHaveLength(2)
    })

    it('calls onCoinsChange with incremented value when + button clicked', async () => {
      const user = userEvent.setup()
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const incrementButton = screen.getByRole('button', { name: /increase coins/i })
      await user.click(incrementButton)

      expect(mockCallbacks.onCoinsChange).toHaveBeenCalledWith(11)
    })

    it('calls onCoinsChange with decremented value when - button clicked', async () => {
      const user = userEvent.setup()
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const decrementButton = screen.getByRole('button', { name: /decrease coins/i })
      await user.click(decrementButton)

      expect(mockCallbacks.onCoinsChange).toHaveBeenCalledWith(9)
    })

    it('does not show Capitalist achievement when coins < 30', () => {
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      expect(screen.queryByText(/capitalist achieved/i)).not.toBeInTheDocument()
    })

    it('shows Capitalist achievement when coins >= 30', () => {
      const highCoins = { ...mockCovenantState, coins: 30 }
      render(<CovenantTracker covenant={highCoins} {...mockCallbacks} />)

      expect(screen.getByText(/capitalist achieved/i)).toBeInTheDocument()
    })

    it('shows Capitalist achievement when coins > 30', () => {
      const highCoins = { ...mockCovenantState, coins: 35 }
      render(<CovenantTracker covenant={highCoins} {...mockCallbacks} />)

      expect(screen.getByText(/capitalist achieved/i)).toBeInTheDocument()
    })
  })

  describe('Wood Section', () => {
    it('renders increment and decrement buttons for wood', () => {
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const buttons = screen.getAllByRole('button')
      const woodButtons = buttons.filter(btn =>
        btn.getAttribute('aria-label')?.includes('wood')
      )
      expect(woodButtons).toHaveLength(2)
    })

    it('calls onWoodChange with incremented value when + button clicked', async () => {
      const user = userEvent.setup()
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const incrementButton = screen.getByRole('button', { name: /increase wood/i })
      await user.click(incrementButton)

      expect(mockCallbacks.onWoodChange).toHaveBeenCalledWith(6)
    })

    it('calls onWoodChange with decremented value when - button clicked', async () => {
      const user = userEvent.setup()
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const decrementButton = screen.getByRole('button', { name: /decrease wood/i })
      await user.click(decrementButton)

      expect(mockCallbacks.onWoodChange).toHaveBeenCalledWith(4)
    })

    it('renders convert to coins button', () => {
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      expect(screen.getByRole('button', { name: /convert to coins \(3:1\)/i })).toBeInTheDocument()
    })

    it('enables convert button when wood >= 3', () => {
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const convertButton = screen.getByRole('button', { name: /convert to coins \(3:1\)/i })
      expect(convertButton).not.toBeDisabled()
    })

    it('disables convert button when wood < 3', () => {
      const lowWood = { ...mockCovenantState, wood: 2 }
      render(<CovenantTracker covenant={lowWood} {...mockCallbacks} />)

      const convertButton = screen.getByRole('button', { name: /convert to coins \(3:1\)/i })
      expect(convertButton).toBeDisabled()
    })

    it('calls onConvertWood when convert button clicked', async () => {
      const user = userEvent.setup()
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const convertButton = screen.getByRole('button', { name: /convert to coins \(3:1\)/i })
      await user.click(convertButton)

      expect(mockCallbacks.onConvertWood).toHaveBeenCalledTimes(1)
    })
  })

  describe('Damage Section', () => {
    it('renders increment and decrement buttons for damage', () => {
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const buttons = screen.getAllByRole('button')
      const damageButtons = buttons.filter(btn =>
        btn.getAttribute('aria-label')?.includes('damage')
      )
      expect(damageButtons).toHaveLength(2)
    })

    it('calls onDamageChange with incremented value when + button clicked', async () => {
      const user = userEvent.setup()
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const incrementButton = screen.getByRole('button', { name: /increase damage/i })
      await user.click(incrementButton)

      expect(mockCallbacks.onDamageChange).toHaveBeenCalledWith(3)
    })

    it('calls onDamageChange with decremented value when - button clicked', async () => {
      const user = userEvent.setup()
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const decrementButton = screen.getByRole('button', { name: /decrease damage/i })
      await user.click(decrementButton)

      expect(mockCallbacks.onDamageChange).toHaveBeenCalledWith(1)
    })

    it('does not show ship sunk warning when damage < 5', () => {
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      expect(screen.queryByText(/ship sunk/i)).not.toBeInTheDocument()
    })

    it('shows ship sunk warning when damage >= 5', () => {
      const highDamage = { ...mockCovenantState, damage: 5 }
      render(<CovenantTracker covenant={highDamage} {...mockCallbacks} />)

      expect(screen.getByText(/ship sunk/i)).toBeInTheDocument()
    })

    it('shows ship sunk warning when damage > 5', () => {
      const highDamage = { ...mockCovenantState, damage: 6 }
      render(<CovenantTracker covenant={highDamage} {...mockCallbacks} />)

      expect(screen.getByText(/ship sunk/i)).toBeInTheDocument()
    })
  })

  describe('Ship Upgrades Section', () => {
    it('renders increment and decrement buttons for ship upgrades', () => {
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const buttons = screen.getAllByRole('button')
      const upgradeButtons = buttons.filter(btn =>
        btn.getAttribute('aria-label')?.includes('ship upgrades')
      )
      expect(upgradeButtons).toHaveLength(2)
    })

    it('calls onShipUpgradesChange with incremented value when + button clicked', async () => {
      const user = userEvent.setup()
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const incrementButton = screen.getByRole('button', { name: /increase ship upgrades/i })
      await user.click(incrementButton)

      expect(mockCallbacks.onShipUpgradesChange).toHaveBeenCalledWith(2)
    })

    it('calls onShipUpgradesChange with decremented value when - button clicked', async () => {
      const user = userEvent.setup()
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      const decrementButton = screen.getByRole('button', { name: /decrease ship upgrades/i })
      await user.click(decrementButton)

      expect(mockCallbacks.onShipUpgradesChange).toHaveBeenCalledWith(0)
    })

    it('does not show Elite Vessel achievement when upgrades < 4', () => {
      render(<CovenantTracker covenant={mockCovenantState} {...mockCallbacks} />)

      expect(screen.queryByText(/elite vessel achieved/i)).not.toBeInTheDocument()
    })

    it('shows Elite Vessel achievement when upgrades >= 4', () => {
      const maxUpgrades = { ...mockCovenantState, shipUpgrades: 4 }
      render(<CovenantTracker covenant={maxUpgrades} {...mockCallbacks} />)

      expect(screen.getByText(/elite vessel achieved/i)).toBeInTheDocument()
    })

    it('shows Elite Vessel achievement when upgrades > 4', () => {
      const maxUpgrades = { ...mockCovenantState, shipUpgrades: 5 }
      render(<CovenantTracker covenant={maxUpgrades} {...mockCallbacks} />)

      expect(screen.getByText(/elite vessel achieved/i)).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles zero values correctly', () => {
      const zeroState: CovenantState = {
        coins: 0,
        wood: 0,
        damage: 0,
        shipUpgrades: 0,
        piratePileCount: 0,
        mercantilePileCount: 0
      }
      render(<CovenantTracker covenant={zeroState} {...mockCallbacks} />)

      expect(screen.getAllByText('0')).toHaveLength(4)
    })

    it('handles large values correctly', () => {
      const largeState: CovenantState = {
        coins: 100,
        wood: 50,
        damage: 8,
        shipUpgrades: 7,
        piratePileCount: 0,
        mercantilePileCount: 0
      }
      render(<CovenantTracker covenant={largeState} {...mockCallbacks} />)

      expect(screen.getByText('100')).toBeInTheDocument()
      expect(screen.getByText('50')).toBeInTheDocument()
      expect(screen.getByText('8')).toBeInTheDocument()
      expect(screen.getByText('7')).toBeInTheDocument()
    })

    it('handles exactly 3 wood (minimum for conversion)', () => {
      const exactWood = { ...mockCovenantState, wood: 3 }
      render(<CovenantTracker covenant={exactWood} {...mockCallbacks} />)

      const convertButton = screen.getByRole('button', { name: /convert to coins \(3:1\)/i })
      expect(convertButton).not.toBeDisabled()
    })

    it('handles exactly 29 coins (just below Capitalist)', () => {
      const nearCapitalist = { ...mockCovenantState, coins: 29 }
      render(<CovenantTracker covenant={nearCapitalist} {...mockCallbacks} />)

      expect(screen.queryByText(/capitalist achieved/i)).not.toBeInTheDocument()
    })

    it('handles exactly 4 damage (just below sunk)', () => {
      const nearSunk = { ...mockCovenantState, damage: 4 }
      render(<CovenantTracker covenant={nearSunk} {...mockCallbacks} />)

      expect(screen.queryByText(/ship sunk/i)).not.toBeInTheDocument()
    })

    it('handles exactly 3 upgrades (just below Elite Vessel)', () => {
      const nearElite = { ...mockCovenantState, shipUpgrades: 3 }
      render(<CovenantTracker covenant={nearElite} {...mockCallbacks} />)

      expect(screen.queryByText(/elite vessel achieved/i)).not.toBeInTheDocument()
    })
  })

  describe('Multiple Indicators', () => {
    it('shows both achievement indicators when both conditions met', () => {
      const achievedState: CovenantState = {
        coins: 30,
        wood: 0,
        damage: 0,
        shipUpgrades: 4,
        piratePileCount: 0,
        mercantilePileCount: 0
      }
      render(<CovenantTracker covenant={achievedState} {...mockCallbacks} />)

      expect(screen.getByText(/capitalist achieved/i)).toBeInTheDocument()
      expect(screen.getByText(/elite vessel achieved/i)).toBeInTheDocument()
    })

    it('shows achievement and warning simultaneously', () => {
      const mixedState: CovenantState = {
        coins: 30,
        wood: 0,
        damage: 5,
        shipUpgrades: 0,
        piratePileCount: 0,
        mercantilePileCount: 0
      }
      render(<CovenantTracker covenant={mixedState} {...mockCallbacks} />)

      expect(screen.getByText(/capitalist achieved/i)).toBeInTheDocument()
      expect(screen.getByText(/ship sunk/i)).toBeInTheDocument()
    })
  })
})
