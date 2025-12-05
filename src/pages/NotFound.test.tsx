import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import NotFound from './NotFound'

describe('NotFound', () => {
  const renderWithRouter = () => {
    return render(
      <HashRouter>
        <NotFound />
      </HashRouter>
    )
  }

  it('renders 404 heading', () => {
    renderWithRouter()

    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument()
  })

  it('displays error message', () => {
    renderWithRouter()

    expect(screen.getByText(/the page you're looking for doesn't exist/i)).toBeInTheDocument()
  })

  it('contains link back to home', () => {
    renderWithRouter()

    const homeLink = screen.getByRole('link', { name: /return to home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '#/')
  })
})
