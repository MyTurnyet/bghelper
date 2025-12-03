import PageContainer from '../components/PageContainer'
import './About.css'

function About() {
  return (
    <PageContainer maxWidth="md">
      <div className="about-page">
        <h1 className="about-title">About Board Game Helpers</h1>

        <div className="about-section">
          <h2>What is this?</h2>
          <p>
            Board Game Helpers is a collection of digital tools designed to enhance your
            tabletop gaming experience. From dice rollers to game setup randomizers,
            we provide utilities that make playing board games easier and more fun.
          </p>
        </div>

        <div className="about-section">
          <h2>Features</h2>
          <ul className="feature-list">
            <li>
              <span className="feature-icon">🎲</span>
              <div>
                <strong>Dice Roller</strong>
                <p>Roll virtual dice with smooth animations and instant results</p>
              </div>
            </li>
            <li>
              <span className="feature-icon">🚀</span>
              <div>
                <strong>Shackleton Base Helper</strong>
                <p>Randomize corporation setups for balanced gameplay</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Technology</h2>
          <p>
            This application is built with modern web technologies including React,
            TypeScript, and Vite. It features client-side routing with React Router
            and is deployed to GitHub Pages.
          </p>
        </div>

        <div className="about-footer">
          <p>Made with ❤️ for board game enthusiasts</p>
        </div>
      </div>
    </PageContainer>
  )
}

export default About
