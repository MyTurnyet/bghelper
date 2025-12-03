import { Link } from 'react-router-dom'
import PageContainer from '../components/PageContainer'
import './NotFound.css'

function NotFound() {
  return (
    <PageContainer maxWidth="md" centered>
      <div className="not-found-page">
        <div className="not-found-icon">🎲</div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          Oops! Looks like you rolled a critical fail. The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="not-found-button">
          <span>🏠</span> Return to Home
        </Link>
      </div>
    </PageContainer>
  )
}

export default NotFound
