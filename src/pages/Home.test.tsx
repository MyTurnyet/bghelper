import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HashRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Home from './Home'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('Home', () => {
  const renderWithRouter = () => {
    return render(
      <HashRouter>
        <Home />
      </HashRouter>
    )
  }

  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('displays the main heading', () => {
    renderWithRouter()

    expect(screen.getByRole('heading', { name: /board game helpers/i })).toBeInTheDocument()
  })

  it('displays helper description text', () => {
    renderWithRouter()

    expect(screen.getByText(/select a helper tool to get started/i)).toBeInTheDocument()
  })

  it('renders helper cards in a grid', () => {
    renderWithRouter()

    expect(screen.getByText('Dice Roller')).toBeInTheDocument()
    expect(screen.getByText(/roll dice for your board games/i)).toBeInTheDocument()
  })

  it('renders card with correct image', () => {
    renderWithRouter()

    const image = screen.getByAltText('Dice Roller') as HTMLImageElement
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/bghelper/images/default_image.png')
  })

  it('navigates to dice roller when card is clicked', async () => {
    const user = userEvent.setup()
    renderWithRouter()

    const card = screen.getByRole('button', { name: /dice roller/i })
    await user.click(card)

    expect(mockNavigate).toHaveBeenCalledWith('/helpers/dice-roller')
    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })

  it('renders CardGrid component', () => {
    renderWithRouter()

    const grid = document.querySelector('.card-grid')
    expect(grid).toBeInTheDocument()
  })

  it('renders Card components with correct structure', () => {
    renderWithRouter()

    const card = screen.getByRole('button', { name: /dice roller/i })
    expect(card).toHaveClass('card')

    const imageContainer = card.querySelector('.card-image-container')
    expect(imageContainer).toBeInTheDocument()

    const content = card.querySelector('.card-content')
    expect(content).toBeInTheDocument()
  })
})
