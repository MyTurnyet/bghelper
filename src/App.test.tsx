import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HashRouter } from 'react-router-dom'
import App from './App'

describe('App', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<HashRouter>{component}</HashRouter>)
  }

  it('renders navigation menu', () => {
    renderWithRouter(<App />)

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
  })

  it('renders home page by default', () => {
    renderWithRouter(<App />)

    expect(screen.getByRole('heading', { name: /vite \+ react/i })).toBeInTheDocument()
    expect(screen.getByAltText('Vite logo')).toBeInTheDocument()
    expect(screen.getByAltText('React logo')).toBeInTheDocument()
  })

  it('navigates to about page when about link is clicked', async () => {
    const user = userEvent.setup()
    renderWithRouter(<App />)

    const aboutLink = screen.getByRole('link', { name: /about/i })
    await user.click(aboutLink)

    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByText(/multi-page react application/i)).toBeInTheDocument()
  })

  it('navigates back to home when home link is clicked', async () => {
    const user = userEvent.setup()
    renderWithRouter(<App />)

    const aboutLink = screen.getByRole('link', { name: /about/i })
    await user.click(aboutLink)

    const homeLink = screen.getByRole('link', { name: /home/i })
    await user.click(homeLink)

    expect(screen.getByRole('heading', { name: /vite \+ react/i })).toBeInTheDocument()
  })
})
