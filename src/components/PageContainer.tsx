import { ReactNode } from 'react'
import './PageContainer.css'

interface PageContainerProps {
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
  centered?: boolean
}

function PageContainer({ children, maxWidth = 'lg', centered = false }: PageContainerProps) {
  return (
    <div className={`page-container ${centered ? 'centered' : ''}`}>
      <div className={`page-content page-content-${maxWidth}`}>
        {children}
      </div>
    </div>
  )
}

export default PageContainer
