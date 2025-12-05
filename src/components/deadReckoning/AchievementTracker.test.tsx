import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AchievementTracker from './AchievementTracker'
import type { AchievementProgress } from '../../types/deadReckoning'

describe('AchievementTracker', () => {
  const mockAchievements: AchievementProgress = {
    legendary: 0,
    terrorOfTheSea: false,
    expertSailors: 0,
    eliteVessel: false,
    explorer: 0,
    builder: 0,
    settler: {},
    capitalist: false
  }

  const mockProps = {
    achievements: mockAchievements,
    onUpdateAchievements: vi.fn(),
    playerAchievementCount: 0,
    onPlayerAchievementChange: vi.fn(),
    eliteVesselAchieved: false,
    capitalistAchieved: false
  }

  describe('Component Rendering', () => {
    it('renders the main section heading', () => {
      render(<AchievementTracker {...mockProps} />)

      expect(screen.getByRole('heading', { name: /covenant achievements/i })).toBeInTheDocument()
    })

    it('renders all 8 achievement cards', () => {
      render(<AchievementTracker {...mockProps} />)

      expect(screen.getByText(/^legendary$/i)).toBeInTheDocument()
      expect(screen.getByText(/^terror of the sea$/i)).toBeInTheDocument()
      expect(screen.getByText(/^expert sailors$/i)).toBeInTheDocument()
      expect(screen.getByText(/^elite vessel$/i)).toBeInTheDocument()
      expect(screen.getByText(/^explorer$/i)).toBeInTheDocument()
      expect(screen.getByText(/^builder$/i)).toBeInTheDocument()
      expect(screen.getByText(/^settler$/i)).toBeInTheDocument()
      expect(screen.getByText(/^capitalist$/i)).toBeInTheDocument()
    })

    it('renders player achievement counter section', () => {
      render(<AchievementTracker {...mockProps} />)

      expect(screen.getByRole('heading', { name: /player achievement count/i })).toBeInTheDocument()
    })
  })

  describe('Legendary Achievement', () => {
    it('displays 4 cube circles', () => {
      render(<AchievementTracker {...mockProps} />)

      const cubes = screen.getAllByLabelText(/cube \d+ (earned|not earned)/i)
      const legendaryCubes = cubes.slice(0, 4)
      expect(legendaryCubes).toHaveLength(4)
    })

    it('shows Add Cube and Remove Cube buttons', () => {
      render(<AchievementTracker {...mockProps} />)

      expect(screen.getByRole('button', { name: /add legendary cube/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /remove legendary cube/i })).toBeInTheDocument()
    })

    it('calls onUpdateAchievements when Add Cube clicked', async () => {
      const user = userEvent.setup()
      render(<AchievementTracker {...mockProps} />)

      const addButton = screen.getByRole('button', { name: /add legendary cube/i })
      await user.click(addButton)

      expect(mockProps.onUpdateAchievements).toHaveBeenCalledWith({ legendary: 1 })
    })

    it('calls onUpdateAchievements when Remove Cube clicked', async () => {
      const user = userEvent.setup()
      const props = { ...mockProps, achievements: { ...mockAchievements, legendary: 2 } }
      render(<AchievementTracker {...props} />)

      const removeButton = screen.getByRole('button', { name: /remove legendary cube/i })
      await user.click(removeButton)

      expect(mockProps.onUpdateAchievements).toHaveBeenCalledWith({ legendary: 1 })
    })

    it('disables Add Cube button when at max (4)', () => {
      const props = { ...mockProps, achievements: { ...mockAchievements, legendary: 4 } }
      render(<AchievementTracker {...props} />)

      const addButton = screen.getByRole('button', { name: /add legendary cube/i })
      expect(addButton).toBeDisabled()
    })

    it('disables Remove Cube button when at 0', () => {
      render(<AchievementTracker {...mockProps} />)

      const removeButton = screen.getByRole('button', { name: /remove legendary cube/i })
      expect(removeButton).toBeDisabled()
    })

    it('shows achievement indicator when 4 cubes earned', () => {
      const props = { ...mockProps, achievements: { ...mockAchievements, legendary: 4 } }
      render(<AchievementTracker {...props} />)

      const legendaryCard = screen.getByText(/^legendary$/i).closest('div')
      expect(legendaryCard?.textContent).toContain('✓')
    })
  })

  describe('Terror of the Sea Achievement', () => {
    it('shows toggle button', () => {
      render(<AchievementTracker {...mockProps} />)

      expect(screen.getByRole('button', { name: /mark terror of the sea/i })).toBeInTheDocument()
    })

    it('calls onUpdateAchievements when toggled', async () => {
      const user = userEvent.setup()
      render(<AchievementTracker {...mockProps} />)

      const toggleButton = screen.getByRole('button', { name: /mark terror of the sea/i })
      await user.click(toggleButton)

      expect(mockProps.onUpdateAchievements).toHaveBeenCalledWith({ terrorOfTheSea: true })
    })

    it('shows Achieved when true', () => {
      const props = { ...mockProps, achievements: { ...mockAchievements, terrorOfTheSea: true } }
      render(<AchievementTracker {...props} />)

      expect(screen.getByRole('button', { name: /unmark terror of the sea/i })).toHaveTextContent('Achieved ✓')
    })

    it('toggles off when clicked while achieved', async () => {
      const user = userEvent.setup()
      const props = { ...mockProps, achievements: { ...mockAchievements, terrorOfTheSea: true } }
      render(<AchievementTracker {...props} />)

      const toggleButton = screen.getByRole('button', { name: /unmark terror of the sea/i })
      await user.click(toggleButton)

      expect(mockProps.onUpdateAchievements).toHaveBeenCalledWith({ terrorOfTheSea: false })
    })
  })

  describe('Expert Sailors Achievement', () => {
    it('displays 3 cube circles', () => {
      render(<AchievementTracker {...mockProps} />)

      const cubes = screen.getAllByLabelText(/cube \d+ (earned|not earned)/i)
      // Expert Sailors cubes come after Legendary (4 cubes)
      const expertSailorsCubes = cubes.slice(4, 7)
      expect(expertSailorsCubes).toHaveLength(3)
    })

    it('shows note about card effects', () => {
      render(<AchievementTracker {...mockProps} />)

      expect(screen.getByText(/from card effects only/i)).toBeInTheDocument()
    })

    it('calls onUpdateAchievements when Add Cube clicked', async () => {
      const user = userEvent.setup()
      render(<AchievementTracker {...mockProps} />)

      const addButton = screen.getByRole('button', { name: /add expert sailors cube/i })
      await user.click(addButton)

      expect(mockProps.onUpdateAchievements).toHaveBeenCalledWith({ expertSailors: 1 })
    })

    it('disables Add Cube button when at max (3)', () => {
      const props = { ...mockProps, achievements: { ...mockAchievements, expertSailors: 3 } }
      render(<AchievementTracker {...props} />)

      const addButton = screen.getByRole('button', { name: /add expert sailors cube/i })
      expect(addButton).toBeDisabled()
    })
  })

  describe('Elite Vessel Achievement (Automatic)', () => {
    it('shows as automatic achievement', () => {
      render(<AchievementTracker {...mockProps} />)

      const eliteVesselCard = screen.getByText(/^elite vessel$/i).closest('div')
      expect(eliteVesselCard?.textContent).toContain('(Auto)')
    })

    it('shows not achieved when false', () => {
      render(<AchievementTracker {...mockProps} />)

      const eliteVesselCard = screen.getByText(/^elite vessel$/i).closest('div')
      expect(eliteVesselCard?.textContent).toContain('Not yet achieved')
    })

    it('shows achieved when true', () => {
      const props = { ...mockProps, eliteVesselAchieved: true }
      render(<AchievementTracker {...props} />)

      const eliteVesselCard = screen.getByText(/^elite vessel$/i).closest('div')
      expect(eliteVesselCard?.textContent).toContain('✓ Achieved')
    })

    it('shows note about automatic tracking', () => {
      render(<AchievementTracker {...mockProps} />)

      const eliteVesselCard = screen.getByText(/^elite vessel$/i).closest('div')
      expect(eliteVesselCard?.textContent).toContain('Automatically tracked from ship upgrades')
    })
  })

  describe('Explorer Achievement', () => {
    it('displays 5 cube circles', () => {
      render(<AchievementTracker {...mockProps} />)

      const cubes = screen.getAllByLabelText(/cube \d+ (earned|not earned)/i)
      // Explorer cubes come after Legendary (4) + Expert Sailors (3) = 7
      const explorerCubes = cubes.slice(7, 12)
      expect(explorerCubes).toHaveLength(5)
    })

    it('shows Mark Explored and Remove buttons', () => {
      render(<AchievementTracker {...mockProps} />)

      expect(screen.getByRole('button', { name: /mark board explored/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /remove explorer board/i })).toBeInTheDocument()
    })

    it('calls onUpdateAchievements when Mark Explored clicked', async () => {
      const user = userEvent.setup()
      render(<AchievementTracker {...mockProps} />)

      const markButton = screen.getByRole('button', { name: /mark board explored/i })
      await user.click(markButton)

      expect(mockProps.onUpdateAchievements).toHaveBeenCalledWith({ explorer: 1 })
    })

    it('disables Mark Explored button when at max (5)', () => {
      const props = { ...mockProps, achievements: { ...mockAchievements, explorer: 5 } }
      render(<AchievementTracker {...props} />)

      const markButton = screen.getByRole('button', { name: /mark board explored/i })
      expect(markButton).toBeDisabled()
    })
  })

  describe('Builder Achievement', () => {
    it('displays building count with +/- buttons', () => {
      render(<AchievementTracker {...mockProps} />)

      const builderCard = screen.getByText(/^builder$/i).closest('div')
      expect(builderCard?.textContent).toContain('0')
      expect(screen.getByRole('button', { name: /increase building count/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /decrease building count/i })).toBeInTheDocument()
    })

    it('calls onUpdateAchievements when + clicked', async () => {
      const user = userEvent.setup()
      render(<AchievementTracker {...mockProps} />)

      const incrementButton = screen.getByRole('button', { name: /increase building count/i })
      await user.click(incrementButton)

      expect(mockProps.onUpdateAchievements).toHaveBeenCalledWith({ builder: 1 })
    })

    it('calls onUpdateAchievements when - clicked', async () => {
      const user = userEvent.setup()
      const props = { ...mockProps, achievements: { ...mockAchievements, builder: 3 } }
      render(<AchievementTracker {...props} />)

      const decrementButton = screen.getByRole('button', { name: /decrease building count/i })
      await user.click(decrementButton)

      expect(mockProps.onUpdateAchievements).toHaveBeenCalledWith({ builder: 2 })
    })

    it('shows target reached message when >= 5', () => {
      const props = { ...mockProps, achievements: { ...mockAchievements, builder: 5 } }
      render(<AchievementTracker {...props} />)

      expect(screen.getByText(/target reached/i)).toBeInTheDocument()
    })

    it('prevents negative values', async () => {
      const user = userEvent.setup()
      render(<AchievementTracker {...mockProps} />)

      const decrementButton = screen.getByRole('button', { name: /decrease building count/i })
      await user.click(decrementButton)

      expect(mockProps.onUpdateAchievements).toHaveBeenCalledWith({ builder: 0 })
    })
  })

  describe('Settler Achievement', () => {
    it('shows toggle button', () => {
      render(<AchievementTracker {...mockProps} />)

      expect(screen.getByRole('button', { name: /toggle settler achievement/i })).toBeInTheDocument()
    })

    it('shows note about manual tracking', () => {
      render(<AchievementTracker {...mockProps} />)

      const settlerCard = screen.getByText(/^settler$/i).closest('div')
      expect(settlerCard?.textContent).toContain('Track manually during gameplay')
    })

    it('calls onUpdateAchievements when toggled on', async () => {
      const user = userEvent.setup()
      render(<AchievementTracker {...mockProps} />)

      const toggleButton = screen.getByRole('button', { name: /toggle settler achievement/i })
      await user.click(toggleButton)

      expect(mockProps.onUpdateAchievements).toHaveBeenCalledWith({
        settler: { island1: 3, island2: 3, island3: 3 }
      })
    })

    it('calls onUpdateAchievements when toggled off', async () => {
      const user = userEvent.setup()
      const props = {
        ...mockProps,
        achievements: { ...mockAchievements, settler: { island1: 3, island2: 3, island3: 3 } }
      }
      render(<AchievementTracker {...props} />)

      const toggleButton = screen.getByRole('button', { name: /toggle settler achievement/i })
      await user.click(toggleButton)

      expect(mockProps.onUpdateAchievements).toHaveBeenCalledWith({ settler: {} })
    })
  })

  describe('Capitalist Achievement (Automatic)', () => {
    it('shows as automatic achievement', () => {
      render(<AchievementTracker {...mockProps} />)

      const capitalistCard = screen.getByText(/^capitalist$/i).closest('div')
      expect(capitalistCard?.textContent).toContain('(Auto)')
    })

    it('shows not achieved when false', () => {
      render(<AchievementTracker {...mockProps} />)

      const capitalistCard = screen.getByText(/^capitalist$/i).closest('div')
      expect(capitalistCard?.textContent).toContain('Not yet achieved')
    })

    it('shows achieved when true', () => {
      const props = { ...mockProps, capitalistAchieved: true }
      render(<AchievementTracker {...props} />)

      const capitalistCard = screen.getByText(/^capitalist$/i).closest('div')
      expect(capitalistCard?.textContent).toContain('✓ Achieved')
    })

    it('shows note about automatic tracking', () => {
      render(<AchievementTracker {...mockProps} />)

      const capitalistCard = screen.getByText(/^capitalist$/i).closest('div')
      expect(capitalistCard?.textContent).toContain('Automatically tracked from coin count')
    })
  })

  describe('Player Achievement Counter', () => {
    it('displays player achievement count', () => {
      render(<AchievementTracker {...mockProps} />)

      const counterSection = screen.getByRole('heading', { name: /player achievement count/i }).closest('div')
      expect(counterSection?.textContent).toContain('0')
    })

    it('has +/- buttons', () => {
      render(<AchievementTracker {...mockProps} />)

      expect(screen.getByRole('button', { name: /increase player achievement count/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /decrease player achievement count/i })).toBeInTheDocument()
    })

    it('calls onPlayerAchievementChange when + clicked', async () => {
      const user = userEvent.setup()
      render(<AchievementTracker {...mockProps} />)

      const incrementButton = screen.getByRole('button', { name: /increase player achievement count/i })
      await user.click(incrementButton)

      expect(mockProps.onPlayerAchievementChange).toHaveBeenCalledWith(1)
    })

    it('calls onPlayerAchievementChange when - clicked', async () => {
      const user = userEvent.setup()
      const props = { ...mockProps, playerAchievementCount: 2 }
      render(<AchievementTracker {...props} />)

      const decrementButton = screen.getByRole('button', { name: /decrease player achievement count/i })
      await user.click(decrementButton)

      expect(mockProps.onPlayerAchievementChange).toHaveBeenCalledWith(1)
    })

    it('disables - button when count is 0', () => {
      render(<AchievementTracker {...mockProps} />)

      const decrementButton = screen.getByRole('button', { name: /decrease player achievement count/i })
      expect(decrementButton).toBeDisabled()
    })

    it('shows game end warning when count >= 4', () => {
      const props = { ...mockProps, playerAchievementCount: 4 }
      render(<AchievementTracker {...props} />)

      expect(screen.getByText(/game end condition met/i)).toBeInTheDocument()
    })

    it('does not show game end warning when count < 4', () => {
      const props = { ...mockProps, playerAchievementCount: 3 }
      render(<AchievementTracker {...props} />)

      expect(screen.queryByText(/game end condition met/i)).not.toBeInTheDocument()
    })
  })

  describe('Achievement Visual Indicators', () => {
    it('highlights achieved card with green border', () => {
      const props = { ...mockProps, achievements: { ...mockAchievements, terrorOfTheSea: true } }
      render(<AchievementTracker {...props} />)

      const terrorCard = screen.getByText(/^terror of the sea$/i).closest('div')
      // Border is set in inline styles, check for RGB equivalent of #28a745
      expect((terrorCard as HTMLElement)?.style.border).toMatch(/2px solid (rgb\(40, 167, 69\)|#28a745)/)
    })

    it('shows checkmark on achieved card', () => {
      const props = { ...mockProps, achievements: { ...mockAchievements, legendary: 4 } }
      render(<AchievementTracker {...props} />)

      const legendaryCard = screen.getByText(/^legendary$/i).closest('div')
      expect(legendaryCard?.textContent).toContain('✓')
    })
  })

  describe('Edge Cases', () => {
    it('handles maximum values correctly', () => {
      const maxAchievements: AchievementProgress = {
        legendary: 4,
        terrorOfTheSea: true,
        expertSailors: 3,
        eliteVessel: true,
        explorer: 5,
        builder: 10,
        settler: { island1: 3, island2: 3, island3: 3 },
        capitalist: true
      }
      const props = {
        ...mockProps,
        achievements: maxAchievements,
        eliteVesselAchieved: true,
        capitalistAchieved: true,
        playerAchievementCount: 8
      }
      render(<AchievementTracker {...props} />)

      // Check that builder count shows 10
      const builderCard = screen.getByText(/^builder$/i).closest('div')
      expect(builderCard?.textContent).toContain('10')

      // Check that player count shows 8
      const playerSection = screen.getByRole('heading', { name: /player achievement count/i }).closest('div')
      expect(playerSection?.textContent).toContain('8')
    })

    it('handles empty settler object', () => {
      render(<AchievementTracker {...mockProps} />)

      const settlerButton = screen.getByRole('button', { name: /toggle settler achievement/i })
      expect(settlerButton).toHaveTextContent('Mark as Achieved')
    })

    it('handles partial settler data', () => {
      const props = {
        ...mockProps,
        achievements: { ...mockAchievements, settler: { island1: 3, island2: 1 } }
      }
      render(<AchievementTracker {...props} />)

      const settlerButton = screen.getByRole('button', { name: /toggle settler achievement/i })
      // Only 1 island has 3+ cubes, so not achieved
      expect(settlerButton).toHaveTextContent('Mark as Achieved')
    })
  })
})
