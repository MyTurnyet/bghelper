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

  it('shows ready to roll message initially', () => {
    render(<DiceRoller />)

    expect(screen.getByText(/ready to roll/i)).toBeInTheDocument()
  })

  it('button text changes when rolling', async () => {
    const user = userEvent.setup()
    render(<DiceRoller />)

    const button = screen.getByRole('button', { name: /roll dice/i })
    await user.click(button)

    // During or after animation, button should change text
    expect(
      screen.queryByRole('button', { name: /rolling/i }) ||
      screen.queryByRole('button', { name: /roll again/i })
    ).toBeInTheDocument()
  })

  it('displays last roll stat', () => {
    render(<DiceRoller />)

    expect(screen.getByText(/last roll/i)).toBeInTheDocument()
    // Initially shows em dash
    const statCard = screen.getByText(/last roll/i).closest('.stat-card')
    const statValue = statCard?.querySelector('.stat-value')
    expect(statValue?.textContent).toBe('—')
  })

  it('has interactive dice display area', () => {
    render(<DiceRoller />)

    const placeholder = screen.getByText(/ready to roll/i)
    expect(placeholder).toBeInTheDocument()
  })
})
