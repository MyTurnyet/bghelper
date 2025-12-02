import { ReactNode } from 'react'
import './CardGrid.css'

export interface CardGridProps {
  children: ReactNode
}

function CardGrid({ children }: CardGridProps) {
  return (
    <div className="card-grid">
      {children}
    </div>
  )
}

export default CardGrid
