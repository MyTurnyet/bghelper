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

    expect(screen.getByText(/collection of digital tools/i)).toBeInTheDocument()
    expect(screen.getByText(/enhance your tabletop gaming experience/i)).toBeInTheDocument()
    expect(screen.getByText(/deployed to github pages/i)).toBeInTheDocument()
  })

  it('mentions technology stack', () => {
    render(<About />)

    expect(screen.getByText(/react/i)).toBeInTheDocument()
    expect(screen.getByText(/typescript/i)).toBeInTheDocument()
    expect(screen.getByText(/vite/i)).toBeInTheDocument()
  })

  it('mentions client-side routing', () => {
    render(<About />)

    expect(screen.getByText(/client-side routing/i)).toBeInTheDocument()
    expect(screen.getByText(/react router/i)).toBeInTheDocument()
  })
})
