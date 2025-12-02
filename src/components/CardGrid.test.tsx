import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import CardGrid from './CardGrid'
import Card from './Card'

describe('CardGrid', () => {
  it('renders the grid container', () => {
    render(<CardGrid><div>Test content</div></CardGrid>)

    const grid = document.querySelector('.card-grid')
    expect(grid).toBeInTheDocument()
  })

  it('renders children correctly', () => {
    render(
      <CardGrid>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </CardGrid>
    )

    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
    expect(screen.getByText('Child 3')).toBeInTheDocument()
  })

  it('renders multiple Card components', () => {
    const mockOnClick = vi.fn()

    render(
      <CardGrid>
        <Card
          name="Card 1"
          image="https://example.com/img1.jpg"
          description="Description 1"
          onClick={mockOnClick}
        />
        <Card
          name="Card 2"
          image="https://example.com/img2.jpg"
          description="Description 2"
          onClick={mockOnClick}
        />
        <Card
          name="Card 3"
          image="https://example.com/img3.jpg"
          description="Description 3"
          onClick={mockOnClick}
        />
      </CardGrid>
    )

    expect(screen.getByText('Card 1')).toBeInTheDocument()
    expect(screen.getByText('Card 2')).toBeInTheDocument()
    expect(screen.getByText('Card 3')).toBeInTheDocument()
  })

  it('applies correct CSS class', () => {
    render(<CardGrid><div>Test</div></CardGrid>)

    const grid = document.querySelector('.card-grid')
    expect(grid).toHaveClass('card-grid')
  })

  it('renders with no children', () => {
    render(<CardGrid>{null}</CardGrid>)

    const grid = document.querySelector('.card-grid')
    expect(grid).toBeInTheDocument()
    expect(grid?.childNodes.length).toBe(0)
  })

  it('renders with a single child', () => {
    render(
      <CardGrid>
        <div>Single child</div>
      </CardGrid>
    )

    expect(screen.getByText('Single child')).toBeInTheDocument()
  })

  it('renders with many children', () => {
    const children = Array.from({ length: 12 }, (_, i) => (
      <div key={i}>Item {i + 1}</div>
    ))

    render(<CardGrid>{children}</CardGrid>)

    for (let i = 1; i <= 12; i++) {
      expect(screen.getByText(`Item ${i}`)).toBeInTheDocument()
    }
  })

  it('maintains proper DOM structure', () => {
    render(
      <CardGrid>
        <div className="test-child">Test</div>
      </CardGrid>
    )

    const grid = document.querySelector('.card-grid')
    const child = document.querySelector('.test-child')

    expect(grid).toBeInTheDocument()
    expect(child).toBeInTheDocument()
    expect(grid?.contains(child!)).toBe(true)
  })

  it('renders with mixed content types', () => {
    const mockOnClick = vi.fn()

    render(
      <CardGrid>
        <Card
          name="Test Card"
          image="https://example.com/img.jpg"
          description="Test description"
          onClick={mockOnClick}
        />
        <div>Regular div</div>
        <span>Span element</span>
      </CardGrid>
    )

    expect(screen.getByText('Test Card')).toBeInTheDocument()
    expect(screen.getByText('Regular div')).toBeInTheDocument()
    expect(screen.getByText('Span element')).toBeInTheDocument()
  })

  it('has grid container as direct parent of children', () => {
    render(
      <CardGrid>
        <div data-testid="child-1">Test 1</div>
        <div data-testid="child-2">Test 2</div>
      </CardGrid>
    )

    const grid = document.querySelector('.card-grid')
    const child1 = screen.getByTestId('child-1')
    const child2 = screen.getByTestId('child-2')

    expect(child1.parentElement).toBe(grid)
    expect(child2.parentElement).toBe(grid)
  })
})
