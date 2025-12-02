import './Card.css'

export interface CardProps {
  name: string
  image: string
  description: string
  onClick: () => void
}

function Card({ name, image, description, onClick }: CardProps) {
  return (
    <article className="card" onClick={onClick} role="button" tabIndex={0}>
      <div className="card-image-container">
        <img src={image} alt={name} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{description}</p>
      </div>
    </article>
  )
}

export default Card
