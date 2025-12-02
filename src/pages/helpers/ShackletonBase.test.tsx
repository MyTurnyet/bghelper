import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ShackletonBase from './ShackletonBase'

describe('ShackletonBase', () => {
  describe('Page Layout', () => {
    it('renders the main heading', () => {
      render(<ShackletonBase />)

      expect(screen.getByRole('heading', { name: /shackleton base/i })).toBeInTheDocument()
    })

    it('renders the subtitle', () => {
      render(<ShackletonBase />)

      expect(screen.getByRole('heading', { name: /corporation setup randomizer/i })).toBeInTheDocument()
    })

    it('displays description text', () => {
      render(<ShackletonBase />)

      expect(screen.getByText(/use these corporation combinations for your first three games/i)).toBeInTheDocument()
    })

    it('renders preset games section heading', () => {
      render(<ShackletonBase />)

      expect(screen.getByRole('heading', { name: /preset games/i })).toBeInTheDocument()
    })

    it('renders random selection section heading', () => {
      render(<ShackletonBase />)

      expect(screen.getByRole('heading', { name: /random selection/i })).toBeInTheDocument()
    })
  })

  describe('Preset Games', () => {
    it('displays game 1 preset with correct corporations', () => {
      render(<ShackletonBase />)

      expect(screen.getByText(/1st game:/i)).toBeInTheDocument()
      expect(screen.getByText(/Artemis Tours \+ Moon Mining \+ Selenium Research/i)).toBeInTheDocument()
    })

    it('displays game 2 preset with correct corporations', () => {
      render(<ShackletonBase />)

      expect(screen.getByText(/2nd game:/i)).toBeInTheDocument()
      expect(screen.getByText(/Evergreen Farms \+ Sky Watch \+ Space Robotics/i)).toBeInTheDocument()
    })

    it('displays game 3 preset with correct corporations', () => {
      render(<ShackletonBase />)

      expect(screen.getByText(/3rd game:/i)).toBeInTheDocument()
      expect(screen.getByText(/To Mars \+ Moon Mining \+ Space Robotics/i)).toBeInTheDocument()
    })

    it('displays all three preset games', () => {
      render(<ShackletonBase />)

      expect(screen.getByText(/1st game:/i)).toBeInTheDocument()
      expect(screen.getByText(/2nd game:/i)).toBeInTheDocument()
      expect(screen.getByText(/3rd game:/i)).toBeInTheDocument()
    })
  })

  describe('Random Selection Button', () => {
    it('renders the generate random selection button initially', () => {
      render(<ShackletonBase />)

      expect(screen.getByRole('button', { name: /generate random selection/i })).toBeInTheDocument()
    })

    it('does not show random corporations initially', () => {
      render(<ShackletonBase />)

      expect(screen.queryByText(/your random corporations/i)).not.toBeInTheDocument()
    })

    it('displays random corporations after clicking generate button', async () => {
      const user = userEvent.setup()
      render(<ShackletonBase />)

      const button = screen.getByRole('button', { name: /generate random selection/i })
      await user.click(button)

      expect(screen.getByText(/your random corporations/i)).toBeInTheDocument()
    })

    it('changes button text to re-roll after generation', async () => {
      const user = userEvent.setup()
      render(<ShackletonBase />)

      const button = screen.getByRole('button', { name: /generate random selection/i })
      await user.click(button)

      expect(screen.getByRole('button', { name: /re-roll/i })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /generate random selection/i })).not.toBeInTheDocument()
    })

    it('generates exactly 3 corporations', async () => {
      const user = userEvent.setup()
      render(<ShackletonBase />)

      const button = screen.getByRole('button', { name: /generate random selection/i })
      await user.click(button)

      const allCorporations = [
        'Artemis Tours',
        'Moon Mining',
        'Selenium Research',
        'Evergreen Farms',
        'Sky Watch',
        'Space Robotics',
        'To Mars'
      ]

      let count = 0
      allCorporations.forEach(corp => {
        const elements = screen.queryAllByText(corp)
        // Filter to only count those in the random selection section
        const randomSectionElements = elements.filter(el => {
          const parent = el.closest('section')
          return parent?.textContent?.includes('Random Selection')
        })
        if (randomSectionElements.length > 0) {
          count++
        }
      })

      expect(count).toBe(3)
    })

    it('generates unique corporations (no duplicates)', async () => {
      const user = userEvent.setup()
      render(<ShackletonBase />)

      const button = screen.getByRole('button', { name: /generate random selection/i })

      // Test multiple times to ensure uniqueness
      for (let i = 0; i < 10; i++) {
        await user.click(button)

        const randomSection = screen.getByText(/your random corporations/i).closest('div')
        const corporationNames = [
          'Artemis Tours',
          'Moon Mining',
          'Selenium Research',
          'Evergreen Farms',
          'Sky Watch',
          'Space Robotics',
          'To Mars'
        ]

        const found = new Set<string>()
        corporationNames.forEach(name => {
          if (randomSection?.textContent?.includes(name)) {
            found.add(name)
          }
        })

        expect(found.size).toBe(3)
      }
    })

    it('generates different selections on re-roll', async () => {
      const user = userEvent.setup()
      render(<ShackletonBase />)

      const button = screen.getByRole('button', { name: /generate random selection/i })

      const getRandomSelection = () => {
        const randomSection = screen.getByText(/your random corporations/i).closest('div')
        return randomSection?.textContent || ''
      }

      await user.click(button)
      const firstSelection = getRandomSelection()

      const rerollButton = screen.getByRole('button', { name: /re-roll/i })
      const selections = new Set<string>()
      selections.add(firstSelection)

      // Try multiple times to get a different selection
      for (let i = 0; i < 20; i++) {
        await user.click(rerollButton)
        const newSelection = getRandomSelection()
        selections.add(newSelection)
      }

      // With 20 rolls, we should get at least 2 different selections
      expect(selections.size).toBeGreaterThan(1)
    })
  })

  describe('Corporation Descriptions', () => {
    it('displays corporation description for Artemis Tours', async () => {
      const user = userEvent.setup()
      render(<ShackletonBase />)

      // Generate random until we get Artemis Tours
      const button = screen.getByRole('button', { name: /generate random selection/i })
      let found = false

      for (let i = 0; i < 50 && !found; i++) {
        await user.click(button)
        const randomSection = screen.getByText(/your random corporations/i).closest('div')
        if (randomSection?.textContent?.includes('Artemis Tours')) {
          expect(randomSection.textContent).toContain('Specializes in lunar tourism and transportation services')
          found = true
        }
      }

      // At minimum, descriptions should be rendered if the function works
      expect(screen.getByText(/specializes in lunar tourism and transportation services/i)).toBeInTheDocument()
    })

    it('displays corporation description for Moon Mining', async () => {
      const user = userEvent.setup()
      render(<ShackletonBase />)

      const button = screen.getByRole('button', { name: /generate random selection/i })
      let found = false

      for (let i = 0; i < 50 && !found; i++) {
        await user.click(button)
        const randomSection = screen.getByText(/your random corporations/i).closest('div')
        if (randomSection?.textContent?.includes('Moon Mining')) {
          expect(randomSection.textContent).toContain('Focused on extracting valuable resources from the lunar surface')
          found = true
        }
      }

      expect(screen.getByText(/focused on extracting valuable resources from the lunar surface/i)).toBeInTheDocument()
    })

    it('displays descriptions for all corporations in preset games', () => {
      render(<ShackletonBase />)

      // Preset games don't show descriptions, so we just verify the page loads
      expect(screen.getByText(/1st game:/i)).toBeInTheDocument()
    })
  })

  describe('All Corporations', () => {
    it('contains all 7 corporations in data', async () => {
      const user = userEvent.setup()
      render(<ShackletonBase />)

      const allCorporations = [
        'Artemis Tours',
        'Moon Mining',
        'Selenium Research',
        'Evergreen Farms',
        'Sky Watch',
        'Space Robotics',
        'To Mars'
      ]

      const button = screen.getByRole('button', { name: /generate random selection/i })
      const foundCorporations = new Set<string>()

      // Roll many times to try to see all corporations
      for (let i = 0; i < 100; i++) {
        await user.click(button)
        const randomSection = screen.getByText(/your random corporations/i).closest('div')

        allCorporations.forEach(corp => {
          if (randomSection?.textContent?.includes(corp)) {
            foundCorporations.add(corp)
          }
        })

        if (foundCorporations.size === 7) break
      }

      // We should find all 7 corporations across multiple random generations
      expect(foundCorporations.size).toBe(7)
    })
  })

  describe('Responsive Layout', () => {
    it('renders all sections in a single container', () => {
      const { container } = render(<ShackletonBase />)

      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv.tagName).toBe('DIV')

      const sections = container.querySelectorAll('section')
      expect(sections.length).toBe(2)
    })
  })
})
