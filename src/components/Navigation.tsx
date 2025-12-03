import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="navigation">
      <div className="navigation-container">
        <div className="navigation-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">🎲</span>
            <span className="brand-text">Board Game Helpers</span>
          </Link>
        </div>
        <ul className="navigation-links">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
