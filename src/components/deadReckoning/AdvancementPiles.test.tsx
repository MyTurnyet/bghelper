/**
 * Unit tests for AdvancementPiles component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdvancementPiles from './AdvancementPiles'

describe('AdvancementPiles', () => {
  const mockOnPiratePileChange = vi.fn()
  const mockOnMercantilePileChange = vi.fn()
  const mockOnCollectIncome = vi.fn()
  const mockOnAddLegendaryCube = vi.fn()

  const defaultProps = {
    piratePileCount: 4,
    mercantilePileCount: 6,
    onPiratePileChange: mockOnPiratePileChange,
    onMercantilePileChange: mockOnMercantilePileChange,
    onCollectIncome: mockOnCollectIncome,
    onAddLegendaryCube: mockOnAddLegendaryCube
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('renders the component with heading', () => {
      render(<AdvancementPiles {...defaultProps} />)
      expect(screen.getByText('Advancement Piles')).toBeInTheDocument()
    })

    it('displays pirate pile section', () => {
      render(<AdvancementPiles {...defaultProps} />)
      expect(screen.getByText('Pirate Pile')).toBeInTheDocument()
      expect(screen.getByText(/Combat advancements/)).toBeInTheDocument()
    })

    it('displays mercantile pile section', () => {
      render(<AdvancementPiles {...defaultProps} />)
      expect(screen.getByText('Mercantile Pile')).toBeInTheDocument()
      expect(screen.getByText(/All other advancements/)).toBeInTheDocument()
    })

    it('displays mercantile income section', () => {
      render(<AdvancementPiles {...defaultProps} />)
      expect(screen.getByText('Mercantile Income')).toBeInTheDocument()
    })

    it('displays merchant ship encounter section', () => {
      render(<AdvancementPiles {...defaultProps} />)
      expect(screen.getByText('Merchant Ship Encounter')).toBeInTheDocument()
    })
  })

  describe('Pirate Pile', () => {
    it('displays current pirate pile count', () => {
      render(<AdvancementPiles {...defaultProps} piratePileCount={4} />)
      const section = screen.getByText('Pirate Pile').closest('div')
      expect(section?.textContent).toContain('4')
    })

    it('increases pirate pile count when + button clicked', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} piratePileCount={4} />)

      const increaseButton = screen.getByLabelText('Increase pirate pile')
      await user.click(increaseButton)

      expect(mockOnPiratePileChange).toHaveBeenCalledWith(5)
    })

    it('decreases pirate pile count when - button clicked', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} piratePileCount={4} />)

      const decreaseButton = screen.getByLabelText('Decrease pirate pile')
      await user.click(decreaseButton)

      expect(mockOnPiratePileChange).toHaveBeenCalledWith(3)
    })

    it('disables decrease button at 0', () => {
      render(<AdvancementPiles {...defaultProps} piratePileCount={0} />)

      const decreaseButton = screen.getByLabelText('Decrease pirate pile')
      expect(decreaseButton).toBeDisabled()
    })

    it('does not go below 0', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} piratePileCount={0} />)

      const decreaseButton = screen.getByLabelText('Decrease pirate pile')
      await user.click(decreaseButton)

      expect(mockOnPiratePileChange).not.toHaveBeenCalled()
    })

    it('allows increasing from 0', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} piratePileCount={0} />)

      const increaseButton = screen.getByLabelText('Increase pirate pile')
      await user.click(increaseButton)

      expect(mockOnPiratePileChange).toHaveBeenCalledWith(1)
    })
  })

  describe('Mercantile Pile', () => {
    it('displays current mercantile pile count', () => {
      render(<AdvancementPiles {...defaultProps} mercantilePileCount={6} />)
      const section = screen.getByText('Mercantile Pile').closest('div')
      expect(section?.textContent).toContain('6')
    })

    it('increases mercantile pile count when + button clicked', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} mercantilePileCount={6} />)

      const increaseButton = screen.getByLabelText('Increase mercantile pile')
      await user.click(increaseButton)

      expect(mockOnMercantilePileChange).toHaveBeenCalledWith(7)
    })

    it('decreases mercantile pile count when - button clicked', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} mercantilePileCount={6} />)

      const decreaseButton = screen.getByLabelText('Decrease mercantile pile')
      await user.click(decreaseButton)

      expect(mockOnMercantilePileChange).toHaveBeenCalledWith(5)
    })

    it('disables decrease button at 0', () => {
      render(<AdvancementPiles {...defaultProps} mercantilePileCount={0} />)

      const decreaseButton = screen.getByLabelText('Decrease mercantile pile')
      expect(decreaseButton).toBeDisabled()
    })

    it('does not go below 0', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} mercantilePileCount={0} />)

      const decreaseButton = screen.getByLabelText('Decrease mercantile pile')
      await user.click(decreaseButton)

      expect(mockOnMercantilePileChange).not.toHaveBeenCalled()
    })

    it('allows increasing from 0', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} mercantilePileCount={0} />)

      const increaseButton = screen.getByLabelText('Increase mercantile pile')
      await user.click(increaseButton)

      expect(mockOnMercantilePileChange).toHaveBeenCalledWith(1)
    })
  })

  describe('Mercantile Income Calculation', () => {
    it('calculates income correctly (floor division by 2)', () => {
      render(<AdvancementPiles {...defaultProps} mercantilePileCount={6} />)
      // floor(6/2) = 3
      expect(screen.getByText(/3 coins/)).toBeInTheDocument()
    })

    it('calculates income with odd numbers correctly', () => {
      render(<AdvancementPiles {...defaultProps} mercantilePileCount={5} />)
      // floor(5/2) = 2
      expect(screen.getByText(/2 coins/)).toBeInTheDocument()
    })

    it('shows 0 income when pile is 0', () => {
      render(<AdvancementPiles {...defaultProps} mercantilePileCount={0} />)
      expect(screen.getByText(/0 coins/)).toBeInTheDocument()
    })

    it('shows 0 income when pile is 1', () => {
      render(<AdvancementPiles {...defaultProps} mercantilePileCount={1} />)
      // floor(1/2) = 0
      expect(screen.getByText(/0 coins/)).toBeInTheDocument()
    })

    it('displays income formula explanation', () => {
      render(<AdvancementPiles {...defaultProps} />)
      expect(screen.getByText(/Floor of Mercantile Pile ÷ 2/)).toBeInTheDocument()
    })

    it('updates income when mercantile pile changes', () => {
      const { rerender } = render(<AdvancementPiles {...defaultProps} mercantilePileCount={4} />)
      expect(screen.getByText(/2 coins/)).toBeInTheDocument()

      rerender(<AdvancementPiles {...defaultProps} mercantilePileCount={8} />)
      expect(screen.getByText(/4 coins/)).toBeInTheDocument()
    })
  })

  describe('Collect Income Button', () => {
    it('displays collect income button', () => {
      render(<AdvancementPiles {...defaultProps} />)
      expect(screen.getByRole('button', { name: /Collect Income/i })).toBeInTheDocument()
    })

    it('calls onCollectIncome with correct amount when clicked', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} mercantilePileCount={6} />)

      const collectButton = screen.getByRole('button', { name: /Collect Income/i })
      await user.click(collectButton)

      // floor(6/2) = 3
      expect(mockOnCollectIncome).toHaveBeenCalledWith(3)
    })

    it('is disabled when income is 0', () => {
      render(<AdvancementPiles {...defaultProps} mercantilePileCount={0} />)

      const collectButton = screen.getByRole('button', { name: /Collect Income/i })
      expect(collectButton).toBeDisabled()
    })

    it('does not call callback when disabled', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} mercantilePileCount={0} />)

      const collectButton = screen.getByRole('button', { name: /Collect Income/i })
      await user.click(collectButton)

      expect(mockOnCollectIncome).not.toHaveBeenCalled()
    })

    it('is enabled when income is greater than 0', () => {
      render(<AdvancementPiles {...defaultProps} mercantilePileCount={2} />)

      const collectButton = screen.getByRole('button', { name: /Collect Income/i })
      expect(collectButton).not.toBeDisabled()
    })

    it('collects correct income with large pile counts', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} mercantilePileCount={20} />)

      const collectButton = screen.getByRole('button', { name: /Collect Income/i })
      await user.click(collectButton)

      // floor(20/2) = 10
      expect(mockOnCollectIncome).toHaveBeenCalledWith(10)
    })
  })

  describe('Merchant Ship Flip', () => {
    it('displays flip button initially', () => {
      render(<AdvancementPiles {...defaultProps} />)
      expect(screen.getByRole('button', { name: /Flip for Merchant Ship/i })).toBeInTheDocument()
    })

    it('displays flip description', () => {
      render(<AdvancementPiles {...defaultProps} />)
      expect(screen.getByText(/Flip a coin when encountering a Merchant Ship/i)).toBeInTheDocument()
    })

    it('shows result modal when flip button clicked', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} />)

      const flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)

      // Should show either Heads or Tails
      expect(screen.getByText(/Heads!|Tails!/i)).toBeInTheDocument()
    })

    it('hides flip button when result is shown', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} />)

      const flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)

      expect(screen.queryByRole('button', { name: /Flip for Merchant Ship/i })).not.toBeInTheDocument()
    })

    it('displays Heads result with correct message', async () => {
      const user = userEvent.setup()
      vi.spyOn(Math, 'random').mockReturnValue(0.3) // Returns heads

      render(<AdvancementPiles {...defaultProps} />)

      const flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)

      expect(screen.getByText('Heads!')).toBeInTheDocument()
      // Check for unique text that confirms the heads message
      expect(screen.getByText(/Legendary achievement/)).toBeInTheDocument()
      expect(screen.getByText(/AND/)).toBeInTheDocument()

      vi.restoreAllMocks()
    })

    it('displays Tails result with correct message', async () => {
      const user = userEvent.setup()
      vi.spyOn(Math, 'random').mockReturnValue(0.7) // Returns tails

      render(<AdvancementPiles {...defaultProps} />)

      const flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)

      expect(screen.getByText('Tails!')).toBeInTheDocument()
      // Check for unique text that confirms the tails message (does not have legendary)
      expect(screen.getByText(/only/)).toBeInTheDocument()
      expect(screen.queryByText(/Legendary achievement/)).not.toBeInTheDocument()

      vi.restoreAllMocks()
    })

    it('displays cancel and confirm buttons in result modal', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} />)

      const flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)

      expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument()
    })

    it('hides result modal when cancel clicked', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} />)

      const flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)

      const cancelButton = screen.getByRole('button', { name: /Cancel/i })
      await user.click(cancelButton)

      expect(screen.queryByText(/Heads!|Tails!/i)).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Flip for Merchant Ship/i })).toBeInTheDocument()
    })

    it('does not call callbacks when cancel clicked', async () => {
      const user = userEvent.setup()
      render(<AdvancementPiles {...defaultProps} />)

      const flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)

      const cancelButton = screen.getByRole('button', { name: /Cancel/i })
      await user.click(cancelButton)

      expect(mockOnMercantilePileChange).not.toHaveBeenCalled()
      expect(mockOnAddLegendaryCube).not.toHaveBeenCalled()
    })
  })

  describe('Merchant Ship Flip - Heads Outcome', () => {
    it('adds to mercantile pile when heads confirmed', async () => {
      const user = userEvent.setup()
      vi.spyOn(Math, 'random').mockReturnValue(0.3) // Returns heads

      render(<AdvancementPiles {...defaultProps} mercantilePileCount={6} />)

      const flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)

      const confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      expect(mockOnMercantilePileChange).toHaveBeenCalledWith(7)

      vi.restoreAllMocks()
    })

    it('adds legendary cube when heads confirmed', async () => {
      const user = userEvent.setup()
      vi.spyOn(Math, 'random').mockReturnValue(0.3) // Returns heads

      render(<AdvancementPiles {...defaultProps} />)

      const flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)

      const confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      expect(mockOnAddLegendaryCube).toHaveBeenCalled()

      vi.restoreAllMocks()
    })

    it('hides result modal after heads confirmation', async () => {
      const user = userEvent.setup()
      vi.spyOn(Math, 'random').mockReturnValue(0.3) // Returns heads

      render(<AdvancementPiles {...defaultProps} />)

      const flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)

      const confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      expect(screen.queryByText('Heads!')).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Flip for Merchant Ship/i })).toBeInTheDocument()

      vi.restoreAllMocks()
    })
  })

  describe('Merchant Ship Flip - Tails Outcome', () => {
    it('adds to mercantile pile when tails confirmed', async () => {
      const user = userEvent.setup()
      vi.spyOn(Math, 'random').mockReturnValue(0.7) // Returns tails

      render(<AdvancementPiles {...defaultProps} mercantilePileCount={6} />)

      const flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)

      const confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      expect(mockOnMercantilePileChange).toHaveBeenCalledWith(7)

      vi.restoreAllMocks()
    })

    it('does not add legendary cube when tails confirmed', async () => {
      const user = userEvent.setup()
      vi.spyOn(Math, 'random').mockReturnValue(0.7) // Returns tails

      render(<AdvancementPiles {...defaultProps} />)

      const flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)

      const confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      expect(mockOnAddLegendaryCube).not.toHaveBeenCalled()

      vi.restoreAllMocks()
    })

    it('hides result modal after tails confirmation', async () => {
      const user = userEvent.setup()
      vi.spyOn(Math, 'random').mockReturnValue(0.7) // Returns tails

      render(<AdvancementPiles {...defaultProps} />)

      const flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)

      const confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      expect(screen.queryByText('Tails!')).not.toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Flip for Merchant Ship/i })).toBeInTheDocument()

      vi.restoreAllMocks()
    })
  })

  describe('Merchant Ship Flip - Without Legendary Handler', () => {
    it('does not crash when onAddLegendaryCube is undefined (heads)', async () => {
      const user = userEvent.setup()
      vi.spyOn(Math, 'random').mockReturnValue(0.3) // Returns heads

      const propsWithoutHandler = {
        ...defaultProps,
        onAddLegendaryCube: undefined
      }

      render(<AdvancementPiles {...propsWithoutHandler} />)

      const flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)

      const confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      // Should still add to mercantile pile
      expect(mockOnMercantilePileChange).toHaveBeenCalledWith(7)

      vi.restoreAllMocks()
    })
  })

  describe('Edge Cases', () => {
    it('handles very large pile counts', () => {
      render(<AdvancementPiles {...defaultProps} piratePileCount={100} mercantilePileCount={200} />)

      const pirateSection = screen.getByText('Pirate Pile').closest('div')
      expect(pirateSection?.textContent).toContain('100')

      const mercantileSection = screen.getByText('Mercantile Pile').closest('div')
      expect(mercantileSection?.textContent).toContain('200')

      // floor(200/2) = 100
      expect(screen.getByText(/100 coins/)).toBeInTheDocument()
    })

    it('handles pile count of 1 correctly', () => {
      render(<AdvancementPiles {...defaultProps} piratePileCount={1} mercantilePileCount={1} />)

      // floor(1/2) = 0
      expect(screen.getByText(/0 coins/)).toBeInTheDocument()
    })

    it('updates all values when props change', () => {
      const { rerender } = render(<AdvancementPiles {...defaultProps} piratePileCount={2} mercantilePileCount={4} />)

      expect(screen.getByText(/2 coins/)).toBeInTheDocument()

      rerender(<AdvancementPiles {...defaultProps} piratePileCount={10} mercantilePileCount={12} />)

      expect(screen.getByText(/6 coins/)).toBeInTheDocument()
    })

    it('can perform multiple flips in sequence', async () => {
      const user = userEvent.setup()

      render(<AdvancementPiles {...defaultProps} />)

      // First flip
      vi.spyOn(Math, 'random').mockReturnValueOnce(0.3) // Heads
      let flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)
      let confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      // Second flip
      vi.spyOn(Math, 'random').mockReturnValueOnce(0.7) // Tails
      flipButton = screen.getByRole('button', { name: /Flip for Merchant Ship/i })
      await user.click(flipButton)
      confirmButton = screen.getByRole('button', { name: /Confirm/i })
      await user.click(confirmButton)

      expect(mockOnMercantilePileChange).toHaveBeenCalledTimes(2)

      vi.restoreAllMocks()
    })
  })
})
