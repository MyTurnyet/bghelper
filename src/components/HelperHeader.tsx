import { type ReactNode } from 'react'
import './HelperHeader.css'

interface HelperHeaderProps {
  title: string
  description: string | ReactNode
  imageSrc: string
  imageAlt: string
}

function HelperHeader({ title, description, imageSrc, imageAlt }: HelperHeaderProps) {
  return (
    <div className="helper-header">
      <div className="helper-header-image">
        <img src={imageSrc} alt={imageAlt} />
      </div>
      <div className="helper-header-content">
        <h1 className="helper-header-title">{title}</h1>
        <div className="helper-header-description">{description}</div>
      </div>
    </div>
  )
}

export default HelperHeader
