import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Card from './Card'

describe('Card', () => {
  const defaultProps = {
    name: 'Test Game Helper',
    image: 'https://example.com/test-image.jpg',
    description: 'This is a test description for the game helper.',
    onClick: vi.fn(),
  }

  it('renders card with all content', () => {
    render(<Card {...defaultProps} />)

    expect(screen.getByText('Test Game Helper')).toBeInTheDocument()
    expect(screen.getByText('This is a test description for the game helper.')).toBeInTheDocument()
    expect(screen.getByAltText('Test Game Helper')).toBeInTheDocument()
  })

  it('renders card as article element', () => {
    render(<Card {...defaultProps} />)

    const card = screen.getByRole('button')
    expect(card.tagName).toBe('ARTICLE')
  })

  it('renders image with correct src and alt attributes', () => {
    render(<Card {...defaultProps} />)

    const image = screen.getByAltText('Test Game Helper') as HTMLImageElement
    expect(image).toHaveAttribute('src', 'https://example.com/test-image.jpg')
    expect(image).toHaveAttribute('alt', 'Test Game Helper')
  })

  it('renders title as h3 element', () => {
    render(<Card {...defaultProps} />)

    const title = screen.getByText('Test Game Helper')
    expect(title.tagName).toBe('H3')
  })

  it('renders description as paragraph element', () => {
    render(<Card {...defaultProps} />)

    const description = screen.getByText('This is a test description for the game helper.')
    expect(description.tagName).toBe('P')
  })

  it('calls onClick when card is clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Card {...defaultProps} onClick={handleClick} />)

    const card = screen.getByRole('button')
    await user.click(card)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is keyboard accessible with tabIndex', () => {
    render(<Card {...defaultProps} />)

    const card = screen.getByRole('button')
    expect(card).toHaveAttribute('tabIndex', '0')
  })

  it('has correct CSS classes', () => {
    render(<Card {...defaultProps} />)

    const card = screen.getByRole('button')
    expect(card).toHaveClass('card')

    const imageContainer = card.querySelector('.card-image-container')
    expect(imageContainer).toBeInTheDocument()

    const image = screen.getByAltText('Test Game Helper')
    expect(image).toHaveClass('card-image')

    const content = card.querySelector('.card-content')
    expect(content).toBeInTheDocument()

    const title = screen.getByText('Test Game Helper')
    expect(title).toHaveClass('card-title')

    const description = screen.getByText('This is a test description for the game helper.')
    expect(description).toHaveClass('card-description')
  })

  it('renders correctly with different props', () => {
    const customProps = {
      name: 'Another Helper',
      image: 'https://example.com/another-image.jpg',
      description: 'A different description.',
      onClick: vi.fn(),
    }

    render(<Card {...customProps} />)

    expect(screen.getByText('Another Helper')).toBeInTheDocument()
    expect(screen.getByText('A different description.')).toBeInTheDocument()
    expect(screen.getByAltText('Another Helper')).toHaveAttribute('src', 'https://example.com/another-image.jpg')
  })

  it('handles empty description', () => {
    const propsWithEmptyDescription = {
      ...defaultProps,
      description: '',
    }

    render(<Card {...propsWithEmptyDescription} />)

    const card = screen.getByRole('button')
    const description = card.querySelector('.card-description')
    expect(description).toBeInTheDocument()
    expect(description?.tagName).toBe('P')
    expect(description?.textContent).toBe('')
  })

  it('handles long description', () => {
    const longDescription = 'This is a very long description that might wrap to multiple lines. '.repeat(10)
    const propsWithLongDescription = {
      ...defaultProps,
      description: longDescription,
    }

    render(<Card {...propsWithLongDescription} />)

    const card = screen.getByRole('button')
    const description = card.querySelector('.card-description')
    expect(description).toBeInTheDocument()
    expect(description?.textContent).toBe(longDescription)
  })

  it('handles multiple clicks', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Card {...defaultProps} onClick={handleClick} />)

    const card = screen.getByRole('button')
    await user.click(card)
    await user.click(card)
    await user.click(card)

    expect(handleClick).toHaveBeenCalledTimes(3)
  })
})
