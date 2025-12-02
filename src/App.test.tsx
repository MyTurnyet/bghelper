import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the app with Vite and React logos', () => {
    render(<App />)

    expect(screen.getByAltText('Vite logo')).toBeInTheDocument()
    expect(screen.getByAltText('React logo')).toBeInTheDocument()
  })

  it('displays the main heading', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /vite \+ react/i })).toBeInTheDocument()
  })

  it('initializes counter at 0', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: /count is 0/i })).toBeInTheDocument()
  })

  it('increments counter when button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const button = screen.getByRole('button', { name: /count is 0/i })

    await user.click(button)
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()

    await user.click(button)
    expect(screen.getByRole('button', { name: /count is 2/i })).toBeInTheDocument()
  })

  it('contains links to Vite and React documentation', () => {
    render(<App />)

    const viteLink = screen.getByRole('link', { name: /vite logo/i })
    const reactLink = screen.getByRole('link', { name: /react logo/i })

    expect(viteLink).toHaveAttribute('href', 'https://vite.dev')
    expect(reactLink).toHaveAttribute('href', 'https://react.dev')
  })
})
