/**
 * Unit tests for BattleCalculator component
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BattleCalculator from './BattleCalculator'

describe('BattleCalculator', () => {
  const mockOnCoinsChange = vi.fn()
  const mockOnWoodChange = vi.fn()
  const mockOnDamageChange = vi.fn()
  const mockOnPiratePileChange = vi.fn()

  const defaultProps = {
    shipUpgrades: 2,
    piratePileCount: 4,
    onCoinsChange: mockOnCoinsChange,
    onWoodChange: mockOnWoodChange,
    onDamageChange: mockOnDamageChange,
    onPiratePileChange: mockOnPiratePileChange
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('renders the component with heading', () => {
      render(<BattleCalculator {...defaultProps} />)
      expect(screen.getByText('Battle Calculator')).toBeInTheDocument()
    })

    it('displays the cannon strength section', () => {
      render(<BattleCalculator {...defaultProps} />)
      expect(screen.getByText('Covenant Cannon Strength')).toBeInTheDocument()
    })

    it('displays all cannon breakdown rows', () => {
      render(<BattleCalculator {...defaultProps} />)
      expect(screen.getByText(/Base Cannons:/)).toBeInTheDocument()
      expect(screen.getByText(/Ship Upgrades/)).toBeInTheDocument()
      expect(screen.getByText(/Pirate Pile \(\+1 per 2\):/)).toBeInTheDocument()
      expect(screen.getByText(/Harbor Defense:/)).toBeInTheDocument()
      expect(screen.getByText(/Buildings on Space:/)).toBeInTheDocument()
    })

    it('displays total cannons label', () => {
      render(<BattleCalculator {...defaultProps} />)
      expect(screen.getByText('Total Cannons')).toBeInTheDocument()
    })

    it('displays manual input labels', () => {
      render(<BattleCalculator {...defaultProps} />)
      expect(screen.getByText('Pirate Pile Advancements')).toBeInTheDocument()
      expect(screen.getByText('Defending in Harbor')).toBeInTheDocument()
      expect(screen.getByText(/Buildings on Space \(0-3\)/)).toBeInTheDocument()
    })

    it('displays battle outcome buttons initially', () => {
      render(<BattleCalculator {...defaultProps} />)
      expect(screen.getByRole('button', { name: /Covenant Won/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Player Won/i })).toBeInTheDocument()
    })
  })

  describe('Cannon Calculation', () => {
    it('calculates total cannons with base only', () => {
      render(<BattleCalculator {...defaultProps} shipUpgrades={0} piratePileCount={0} />)
      // Base = 1, Ship = 0, Pirate = 0, Harbor = 0, Buildings = 0 → Total = 1
      expect(screen.getByText('+1')).toBeInTheDocument() // Base cannons
      expect(screen.getByText('1')).toBeInTheDocument() // Total (there will be multiple, but at least one)
    })

    it('calculates total cannons with ship upgrades', () => {
      render(<BattleCalculator {...defaultProps} shipUpgrades={3} piratePileCount={0} />)
      // Base = 1, Ship = 3, Pirate = 0, Harbor = 0, Buildings = 0 → Total = 4
      const section = screen.getByText('Covenant Cannon Strength').closest('div')
      expect(section?.textContent).toContain('+3') // Ship upgrades
      expect(section?.textContent).toContain('4') // Total
    })

    it('calculates pirate pile cannons correctly (floor division by 2)', () => {
      render(<BattleCalculator {...defaultProps} shipUpgrades={0} piratePileCount={5} />)
      // Base = 1, Ship = 0, Pirate = floor(5/2) = 2, Harbor = 0, Buildings = 0 → Total = 3
      const section = screen.getByText('Covenant Cannon Strength').closest('div')
      expect(section?.textContent).toContain('+2') // Pirate pile cannons
      expect(section?.textContent).toContain('3') // Total
    })

    it('calculates pirate pile with even numbers', () => {
      render(<BattleCalculator {...defaultProps} shipUpgrades={0} piratePileCount={6} />)
      // Pirate = floor(6/2) = 3
      const section = screen.getByText('Covenant Cannon Strength').closest('div')
      expect(section?.textContent).toContain('+3') // Pirate pile cannons
    })

    it('calculates pirate pile with odd numbers', () => {
      render(<BattleCalculator {...defaultProps} shipUpgrades={0} piratePileCount={7} />)
      // Pirate = floor(7/2) = 3
      const section = screen.getByText('Covenant Cannon Strength').closest('div')
      expect(section?.textContent).toContain('+3') // Pirate pile cannons
    })

    it('includes harbor defense when enabled', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} shipUpgrades={0} piratePileCount={0} />)

      const harborButton = screen.getByRole('button', { name: /Not in Harbor/i })
      await user.click(harborButton)

      // Base = 1, Harbor = 4 → Total = 5
      const section = screen.getByText('Covenant Cannon Strength').closest('div')
      expect(section?.textContent).toContain('+4') // Harbor cannons
      expect(section?.textContent).toContain('5') // Total
    })

    it('calculates complex scenario with all modifiers', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} shipUpgrades={2} piratePileCount={4} />)

      // Enable harbor
      const harborButton = screen.getByRole('button', { name: /Not in Harbor/i })
      await user.click(harborButton)

      // Add buildings
      const buildingsButtons = screen.getAllByRole('button', { name: /Increase buildings/i })
      await user.click(buildingsButtons[0])
      await user.click(buildingsButtons[0])

      // Base = 1, Ship = 2, Pirate = floor(4/2) = 2, Harbor = 4, Buildings = 2 → Total = 11
      const section = screen.getByText('Covenant Cannon Strength').closest('div')
      expect(section?.textContent).toContain('11') // Total
    })
  })

  describe('Pirate Pile Input', () => {
    it('displays current pirate pile count', () => {
      render(<BattleCalculator {...defaultProps} piratePileCount={4} />)
      const section = screen.getByText('Pirate Pile Advancements').closest('div')
      expect(section?.textContent).toContain('4')
    })

    it('increases pirate pile count when + button clicked', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} piratePileCount={4} />)

      const increaseButton = screen.getByLabelText('Increase pirate pile count')
      await user.click(increaseButton)

      expect(mockOnPiratePileChange).toHaveBeenCalledWith(5)
    })

    it('decreases pirate pile count when - button clicked', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} piratePileCount={4} />)

      const decreaseButton = screen.getByLabelText('Decrease pirate pile count')
      await user.click(decreaseButton)

      expect(mockOnPiratePileChange).toHaveBeenCalledWith(3)
    })

    it('disables decrease button at 0', () => {
      render(<BattleCalculator {...defaultProps} piratePileCount={0} />)

      const decreaseButton = screen.getByLabelText('Decrease pirate pile count')
      expect(decreaseButton).toBeDisabled()
    })

    it('does not go below 0', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} piratePileCount={0} />)

      const decreaseButton = screen.getByLabelText('Decrease pirate pile count')
      await user.click(decreaseButton)

      expect(mockOnPiratePileChange).not.toHaveBeenCalled()
    })

    it('updates cannon calculation when pirate pile changes', async () => {
      const user = userEvent.setup()
      const { rerender } = render(<BattleCalculator {...defaultProps} shipUpgrades={0} piratePileCount={0} />)

      // Initial: Base = 1 → Total = 1
      let section = screen.getByText('Covenant Cannon Strength').closest('div')
      expect(section?.textContent).toContain('1')

      // Increase to 4 → Pirate = 2 → Total = 3
      const increaseButton = screen.getByLabelText('Increase pirate pile count')
      await user.click(increaseButton)

      rerender(<BattleCalculator {...defaultProps} shipUpgrades={0} piratePileCount={4} />)

      section = screen.getByText('Covenant Cannon Strength').closest('div')
      expect(section?.textContent).toContain('3')
    })
  })

  describe('Harbor Defense Toggle', () => {
    it('displays "Not in Harbor" initially', () => {
      render(<BattleCalculator {...defaultProps} />)
      expect(screen.getByRole('button', { name: /Not in Harbor/i })).toBeInTheDocument()
    })

    it('toggles to "In Harbor" when clicked', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      const harborButton = screen.getByRole('button', { name: /Not in Harbor/i })
      await user.click(harborButton)

      expect(screen.getByRole('button', { name: /✓ In Harbor \(\+4\)/i })).toBeInTheDocument()
    })

    it('toggles back to "Not in Harbor" when clicked again', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      const harborButton = screen.getByRole('button', { name: /Not in Harbor/i })
      await user.click(harborButton)
      await user.click(screen.getByRole('button', { name: /✓ In Harbor \(\+4\)/i }))

      expect(screen.getByRole('button', { name: /Not in Harbor/i })).toBeInTheDocument()
    })

    it('adds +4 cannons when harbor is enabled', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} shipUpgrades={0} piratePileCount={0} />)

      const harborButton = screen.getByRole('button', { name: /Not in Harbor/i })
      await user.click(harborButton)

      const section = screen.getByText('Covenant Cannon Strength').closest('div')
      expect(section?.textContent).toContain('+4')
    })
  })

  describe('Buildings on Space Input', () => {
    it('displays initial buildings count of 0', () => {
      render(<BattleCalculator {...defaultProps} />)
      const section = screen.getByText(/Buildings on Space \(0-3\)/).closest('div')
      expect(section?.textContent).toContain('0')
    })

    it('increases buildings count when + button clicked', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      const increaseButton = screen.getByLabelText('Increase buildings on space')
      await user.click(increaseButton)

      const section = screen.getByText(/Buildings on Space \(0-3\)/).closest('div')
      expect(section?.textContent).toContain('1')
    })

    it('decreases buildings count when - button clicked', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      const increaseButton = screen.getByLabelText('Increase buildings on space')
      await user.click(increaseButton)

      const decreaseButton = screen.getByLabelText('Decrease buildings on space')
      await user.click(decreaseButton)

      const section = screen.getByText(/Buildings on Space \(0-3\)/).closest('div')
      expect(section?.textContent).toContain('0')
    })

    it('disables decrease button at 0', () => {
      render(<BattleCalculator {...defaultProps} />)

      const decreaseButton = screen.getByLabelText('Decrease buildings on space')
      expect(decreaseButton).toBeDisabled()
    })

    it('disables increase button at 3', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      const increaseButton = screen.getByLabelText('Increase buildings on space')
      await user.click(increaseButton)
      await user.click(increaseButton)
      await user.click(increaseButton)

      expect(increaseButton).toBeDisabled()
    })

    it('does not go above 3', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      const increaseButton = screen.getByLabelText('Increase buildings on space')
      await user.click(increaseButton)
      await user.click(increaseButton)
      await user.click(increaseButton)
      await user.click(increaseButton) // This should not increase

      const section = screen.getByText(/Buildings on Space \(0-3\)/).closest('div')
      expect(section?.textContent).toContain('3')
    })

    it('adds to cannon calculation', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} shipUpgrades={0} piratePileCount={0} />)

      const increaseButton = screen.getByLabelText('Increase buildings on space')
      await user.click(increaseButton)
      await user.click(increaseButton)

      // Base = 1, Buildings = 2 → Total = 3
      const section = screen.getByText('Covenant Cannon Strength').closest('div')
      expect(section?.textContent).toContain('3')
    })
  })

  describe('Battle Outcome - Covenant Won', () => {
    it('shows outcome form when "Covenant Won" clicked', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      const covenantWonButton = screen.getByRole('button', { name: /Covenant Won/i })
      await user.click(covenantWonButton)

      expect(screen.getByText('Record Battle Outcome')).toBeInTheDocument()
    })

    it('displays wood input field', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      expect(screen.getByLabelText(/Covenant Wood Gained:/i)).toBeInTheDocument()
    })

    it('displays coins input field', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      expect(screen.getByLabelText(/Covenant Coins Gained:/i)).toBeInTheDocument()
    })

    it('displays damage input field', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      expect(screen.getByLabelText(/Damage Dealt to Covenant:/i)).toBeInTheDocument()
    })

    it('allows entering wood value', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      const woodInput = screen.getByLabelText(/Covenant Wood Gained:/i)
      await user.clear(woodInput)
      await user.type(woodInput, '5')

      expect(woodInput).toHaveValue(5)
    })

    it('allows entering coins value', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      const coinsInput = screen.getByLabelText(/Covenant Coins Gained:/i)
      await user.clear(coinsInput)
      await user.type(coinsInput, '3')

      expect(coinsInput).toHaveValue(3)
    })

    it('calls onWoodChange and onCoinsChange when confirmed with wood and coins', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      const woodInput = screen.getByLabelText(/Covenant Wood Gained:/i)
      const coinsInput = screen.getByLabelText(/Covenant Coins Gained:/i)

      await user.clear(woodInput)
      await user.type(woodInput, '5')
      await user.clear(coinsInput)
      await user.type(coinsInput, '3')

      const confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      expect(mockOnWoodChange).toHaveBeenCalledWith(5)
      expect(mockOnCoinsChange).toHaveBeenCalledWith(3)
    })

    it('does not call callbacks when wood/coins are 0', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      const confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      expect(mockOnWoodChange).not.toHaveBeenCalled()
      expect(mockOnCoinsChange).not.toHaveBeenCalled()
    })

    it('hides outcome form after confirmation', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      const woodInput = screen.getByLabelText(/Covenant Wood Gained:/i)
      await user.clear(woodInput)
      await user.type(woodInput, '5')

      const confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      expect(screen.queryByText('Record Battle Outcome')).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Covenant Won/i })).toBeInTheDocument()
    })

    it('resets battle inputs after confirmation', async () => {
      const user = userEvent.setup()
      const { rerender } = render(<BattleCalculator {...defaultProps} piratePileCount={4} />)

      // Enable harbor
      await user.click(screen.getByRole('button', { name: /Not in Harbor/i }))

      // Add buildings
      const increaseButton = screen.getByLabelText('Increase buildings on space')
      await user.click(increaseButton)

      // Open and confirm battle
      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))
      const woodInput = screen.getByLabelText(/Covenant Wood Gained:/i)
      await user.clear(woodInput)
      await user.type(woodInput, '5')
      await user.click(screen.getByRole('button', { name: /Confirm/i }))

      // Rerender to get fresh state
      rerender(<BattleCalculator {...defaultProps} piratePileCount={4} />)

      // Check harbor is reset
      expect(screen.getByRole('button', { name: /Not in Harbor/i })).toBeInTheDocument()

      // Check buildings are reset
      const section = screen.getByText(/Buildings on Space \(0-3\)/).closest('div')
      expect(section?.textContent).toContain('0')
    })
  })

  describe('Battle Outcome - Player Won', () => {
    it('shows outcome form when "Player Won" clicked', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      const playerWonButton = screen.getByRole('button', { name: /Player Won/i })
      await user.click(playerWonButton)

      expect(screen.getByText('Record Battle Outcome')).toBeInTheDocument()
    })

    it('allows entering damage value', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Player Won/i }))

      const damageInput = screen.getByLabelText(/Damage Dealt to Covenant:/i)
      await user.clear(damageInput)
      await user.type(damageInput, '2')

      expect(damageInput).toHaveValue(2)
    })

    it('calls onDamageChange when confirmed with damage', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Player Won/i }))

      const damageInput = screen.getByLabelText(/Damage Dealt to Covenant:/i)
      await user.clear(damageInput)
      await user.type(damageInput, '2')

      const confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      expect(mockOnDamageChange).toHaveBeenCalledWith(2)
    })

    it('does not call onDamageChange when damage is 0', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Player Won/i }))

      const confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      expect(mockOnDamageChange).not.toHaveBeenCalled()
    })

    it('hides outcome form after confirmation', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Player Won/i }))

      const damageInput = screen.getByLabelText(/Damage Dealt to Covenant:/i)
      await user.clear(damageInput)
      await user.type(damageInput, '2')

      const confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      expect(screen.queryByText('Record Battle Outcome')).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Player Won/i })).toBeInTheDocument()
    })
  })

  describe('Battle Outcome - Cancel', () => {
    it('displays cancel button', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument()
    })

    it('hides outcome form when cancel clicked', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      const cancelButton = screen.getByRole('button', { name: /Cancel/i })
      await user.click(cancelButton)

      expect(screen.queryByText('Record Battle Outcome')).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Covenant Won/i })).toBeInTheDocument()
    })

    it('resets input values when cancelled', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      const woodInput = screen.getByLabelText(/Covenant Wood Gained:/i)
      const coinsInput = screen.getByLabelText(/Covenant Coins Gained:/i)

      await user.clear(woodInput)
      await user.type(woodInput, '5')
      await user.clear(coinsInput)
      await user.type(coinsInput, '3')

      await user.click(screen.getByRole('button', { name: /Cancel/i }))

      // Open form again and check values are reset
      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      const newWoodInput = screen.getByLabelText(/Covenant Wood Gained:/i)
      const newCoinsInput = screen.getByLabelText(/Covenant Coins Gained:/i)

      expect(newWoodInput).toHaveValue(0)
      expect(newCoinsInput).toHaveValue(0)
    })

    it('does not call any callbacks when cancelled', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      const woodInput = screen.getByLabelText(/Covenant Wood Gained:/i)
      await user.clear(woodInput)
      await user.type(woodInput, '5')

      await user.click(screen.getByRole('button', { name: /Cancel/i }))

      expect(mockOnWoodChange).not.toHaveBeenCalled()
      expect(mockOnCoinsChange).not.toHaveBeenCalled()
      expect(mockOnDamageChange).not.toHaveBeenCalled()
    })
  })

  describe('Input Validation', () => {
    it('prevents negative wood values', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      const woodInput = screen.getByLabelText(/Covenant Wood Gained:/i) as HTMLInputElement
      await user.clear(woodInput)
      await user.type(woodInput, '-5')

      expect(woodInput.value).not.toContain('-')
    })

    it('prevents negative coins values', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      const coinsInput = screen.getByLabelText(/Covenant Coins Gained:/i) as HTMLInputElement
      await user.clear(coinsInput)
      await user.type(coinsInput, '-3')

      expect(coinsInput.value).not.toContain('-')
    })

    it('prevents negative damage values', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Player Won/i }))

      const damageInput = screen.getByLabelText(/Damage Dealt to Covenant:/i) as HTMLInputElement
      await user.clear(damageInput)
      await user.type(damageInput, '-2')

      expect(damageInput.value).not.toContain('-')
    })

    it('handles empty input gracefully', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      const woodInput = screen.getByLabelText(/Covenant Wood Gained:/i)
      await user.clear(woodInput)

      const confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      // Should not call callbacks with empty input
      expect(mockOnWoodChange).not.toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('handles zero ship upgrades', () => {
      render(<BattleCalculator {...defaultProps} shipUpgrades={0} piratePileCount={0} />)
      const section = screen.getByText('Covenant Cannon Strength').closest('div')
      expect(section?.textContent).toContain('+0') // Ship upgrades
    })

    it('handles zero pirate pile count', () => {
      render(<BattleCalculator {...defaultProps} shipUpgrades={0} piratePileCount={0} />)
      const section = screen.getByText('Covenant Cannon Strength').closest('div')
      expect(section?.textContent).toContain('+0') // Pirate pile
    })

    it('handles maximum buildings (3)', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} shipUpgrades={0} piratePileCount={0} />)

      const increaseButton = screen.getByLabelText('Increase buildings on space')
      await user.click(increaseButton)
      await user.click(increaseButton)
      await user.click(increaseButton)

      const section = screen.getByText('Covenant Cannon Strength').closest('div')
      expect(section?.textContent).toContain('+3') // Buildings
      expect(section?.textContent).toContain('4') // Total (base 1 + buildings 3)
    })

    it('handles large pirate pile counts', () => {
      render(<BattleCalculator {...defaultProps} shipUpgrades={0} piratePileCount={100} />)
      // floor(100/2) = 50
      const section = screen.getByText('Covenant Cannon Strength').closest('div')
      expect(section?.textContent).toContain('+50')
      expect(section?.textContent).toContain('51') // Total
    })

    it('recalculates when props change', () => {
      const { rerender } = render(<BattleCalculator {...defaultProps} shipUpgrades={2} piratePileCount={4} />)

      let section = screen.getByText('Covenant Cannon Strength').closest('div')
      // Base = 1, Ship = 2, Pirate = 2 → Total = 5
      expect(section?.textContent).toContain('5')

      rerender(<BattleCalculator {...defaultProps} shipUpgrades={4} piratePileCount={6} />)

      section = screen.getByText('Covenant Cannon Strength').closest('div')
      // Base = 1, Ship = 4, Pirate = 3 → Total = 8
      expect(section?.textContent).toContain('8')
    })

    it('confirms with only wood (no coins)', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      const woodInput = screen.getByLabelText(/Covenant Wood Gained:/i)
      await user.clear(woodInput)
      await user.type(woodInput, '5')

      await user.click(screen.getByRole('button', { name: /Confirm/i }))

      expect(mockOnWoodChange).toHaveBeenCalledWith(5)
      expect(mockOnCoinsChange).toHaveBeenCalledWith(0)
    })

    it('confirms with only coins (no wood)', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))

      const coinsInput = screen.getByLabelText(/Covenant Coins Gained:/i)
      await user.clear(coinsInput)
      await user.type(coinsInput, '3')

      await user.click(screen.getByRole('button', { name: /Confirm/i }))

      expect(mockOnCoinsChange).toHaveBeenCalledWith(3)
      expect(mockOnWoodChange).toHaveBeenCalledWith(0)
    })

    it('closes outcome form when confirming with all zeros', async () => {
      const user = userEvent.setup()
      render(<BattleCalculator {...defaultProps} />)

      await user.click(screen.getByRole('button', { name: /Covenant Won/i }))
      await user.click(screen.getByRole('button', { name: /Confirm/i }))

      expect(screen.queryByText('Record Battle Outcome')).not.toBeInTheDocument()
    })
  })
})
