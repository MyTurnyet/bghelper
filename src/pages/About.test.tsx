import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import About from './About'

describe('About', () => {
  it('renders the about heading', () => {
    render(<About />)

    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument()
  })

  it('displays project description', () => {
    render(<About />)

    expect(screen.getByText(/multi-page react application/i)).toBeInTheDocument()
    expect(screen.getByText(/built with vite/i)).toBeInTheDocument()
    expect(screen.getByText(/deployed to github pages/i)).toBeInTheDocument()
  })

  it('mentions testing libraries', () => {
    render(<About />)

    expect(screen.getByText(/vitest/i)).toBeInTheDocument()
    expect(screen.getByText(/react testing library/i)).toBeInTheDocument()
  })

  it('mentions client-side routing', () => {
    render(<About />)

    expect(screen.getByText(/client-side routing/i)).toBeInTheDocument()
    expect(screen.getByText(/react router/i)).toBeInTheDocument()
  })
})
