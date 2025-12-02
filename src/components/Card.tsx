import { useState } from 'react'
import './Card.css'

export interface CardProps {
  name: string
  image: string
  description: string
  onClick: () => void
}

const FALLBACK_IMAGE = '/images/placeholder.svg'

function Card({ name, image, description, onClick }: CardProps) {
  const [imgSrc, setImgSrc] = useState(image)

  const handleImageError = () => {
    setImgSrc(FALLBACK_IMAGE)
  }

  return (
    <article className="card" onClick={onClick} role="button" tabIndex={0}>
      <div className="card-image-container">
        <img
          src={imgSrc}
          alt={name}
          className="card-image"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{description}</p>
      </div>
    </article>
  )
}

export default Card
