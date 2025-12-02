import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DiceRoller from './DiceRoller'

describe('DiceRoller', () => {
  it('renders the dice roller heading', () => {
    render(<DiceRoller />)

    expect(screen.getByRole('heading', { name: /dice roller/i })).toBeInTheDocument()
  })

  it('displays description text', () => {
    render(<DiceRoller />)

    expect(screen.getByText(/roll a six-sided die for your board game/i)).toBeInTheDocument()
  })

  it('renders roll dice button', () => {
    render(<DiceRoller />)

    expect(screen.getByRole('button', { name: /roll dice/i })).toBeInTheDocument()
  })

  it('does not show result initially', () => {
    render(<DiceRoller />)

    const resultText = screen.queryByText(/🎲/)
    expect(resultText).not.toBeInTheDocument()
  })

  it('displays result after rolling dice', async () => {
    const user = userEvent.setup()
    render(<DiceRoller />)

    const button = screen.getByRole('button', { name: /roll dice/i })
    await user.click(button)

    const result = screen.getByText(/🎲/)
    expect(result).toBeInTheDocument()
  })

  it('result is between 1 and 6', async () => {
    const user = userEvent.setup()
    render(<DiceRoller />)

    const button = screen.getByRole('button', { name: /roll dice/i })

    for (let i = 0; i < 10; i++) {
      await user.click(button)

      const resultElement = screen.getByText(/🎲/)
      const resultText = resultElement.textContent
      const number = parseInt(resultText?.replace('🎲 ', '') || '0')

      expect(number).toBeGreaterThanOrEqual(1)
      expect(number).toBeLessThanOrEqual(6)
    }
  })

  it('changes result on multiple rolls', async () => {
    const user = userEvent.setup()
    render(<DiceRoller />)

    const button = screen.getByRole('button', { name: /roll dice/i })

    const results = new Set<string>()

    for (let i = 0; i < 20; i++) {
      await user.click(button)
      const resultElement = screen.getByText(/🎲/)
      results.add(resultElement.textContent || '')
    }

    expect(results.size).toBeGreaterThan(1)
  })
})
