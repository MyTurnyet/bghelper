import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import Navigation from './Navigation'

describe('Navigation', () => {
  const renderWithRouter = () => {
    return render(
      <HashRouter>
        <Navigation />
      </HashRouter>
    )
  }

  it('renders navigation links', () => {
    renderWithRouter()

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
  })

  it('home link has correct href', () => {
    renderWithRouter()

    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toHaveAttribute('href', '#/')
  })

  it('about link has correct href', () => {
    renderWithRouter()

    const aboutLink = screen.getByRole('link', { name: /about/i })
    expect(aboutLink).toHaveAttribute('href', '#/about')
  })

  it('renders as a nav element', () => {
    renderWithRouter()

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })
})
