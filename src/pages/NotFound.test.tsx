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

    expect(screen.getByRole('heading', { name: /404.*page not found/i })).toBeInTheDocument()
  })

  it('displays error message', () => {
    renderWithRouter()

    expect(screen.getByText(/page you are looking for does not exist/i)).toBeInTheDocument()
  })

  it('contains link back to home', () => {
    renderWithRouter()

    const homeLink = screen.getByRole('link', { name: /go back to home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '#/')
  })
})
