import { useState } from 'react'
import PageContainer from '../../components/PageContainer'

interface Corporation {
  name: string
  description: string
}

const corporations: Corporation[] = [
  {
    name: 'Artemis Tours',
    description: 'Specializes in lunar tourism and transportation services'
  },
  {
    name: 'Moon Mining',
    description: 'Focused on extracting valuable resources from the lunar surface'
  },
  {
    name: 'Selenium Research',
    description: 'Conducts scientific research and experimentation on the moon'
  },
  {
    name: 'Evergreen Farms',
    description: 'Develops sustainable agriculture and food production systems'
  },
  {
    name: 'Sky Watch',
    description: 'Operates observation and communication systems'
  },
  {
    name: 'Space Robotics',
    description: 'Designs and manufactures automated systems and robots'
  },
  {
    name: 'To Mars',
    description: 'Prepares technology and infrastructure for Mars missions'
  }
]

const presetGames = {
  game1: ['Artemis Tours', 'Moon Mining', 'Selenium Research'],
  game2: ['Evergreen Farms', 'Sky Watch', 'Space Robotics'],
  game3: ['To Mars', 'Moon Mining', 'Space Robotics']
}

function ShackletonBase() {
  const [randomSelection, setRandomSelection] = useState<string[]>([])

  const getRandomCorporations = () => {
    const shuffled = [...corporations].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, 3).map(corp => corp.name)
    setRandomSelection(selected)
  }

  const getCorporationDescription = (name: string): string => {
    return corporations.find(corp => corp.name === name)?.description || ''
  }

  const renderCorporationList = (corpNames: string[], title: string) => {
    return (
      <div style={{
        backgroundColor: 'var(--bg-card)',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        marginBottom: '0.75rem',
        border: '1px solid var(--border-color)'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: 'var(--accent-secondary)', fontSize: '1rem' }}>{title}</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {corpNames.map((corpName, index) => (
            <li key={index} style={{ marginBottom: '0.5rem' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '0.1rem', color: 'var(--text-primary)' }}>
                {corpName}
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                {getCorporationDescription(corpName)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <PageContainer maxWidth="md">
      <h1 style={{ textAlign: 'center', marginBottom: '0.25rem', fontSize: '1.75rem' }}>Shackleton Base</h1>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '1rem',
        fontSize: '1rem',
        color: 'var(--text-secondary)',
        fontWeight: 'normal'
      }}>
        Corporation Setup Randomizer
      </h2>

      <p style={{
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem'
      }}>
        Use these corporation combinations for your first three games, or generate a random selection.
      </p>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginBottom: '0.75rem', fontSize: '1.25rem', color: 'var(--accent-primary)' }}>Preset Games</h2>
        <div style={{
          backgroundColor: 'var(--bg-card)',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          fontSize: '0.9rem',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong style={{ color: 'var(--accent-secondary)' }}>1st game:</strong> {presetGames.game1.join(' + ')}
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong style={{ color: 'var(--accent-secondary)' }}>2nd game:</strong> {presetGames.game2.join(' + ')}
          </div>
          <div>
            <strong style={{ color: 'var(--accent-secondary)' }}>3rd game:</strong> {presetGames.game3.join(' + ')}
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '0.75rem', fontSize: '1.25rem', color: 'var(--accent-primary)' }}>Random Selection</h2>
        <button
          onClick={getRandomCorporations}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: '0.75rem',
            width: '100%',
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-hover)'
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 160, 133, 0.3)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-primary)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {randomSelection.length === 0 ? 'Generate Random Selection' : 'Re-roll'}
        </button>

        {randomSelection.length > 0 && renderCorporationList(randomSelection, 'Your Random Corporations')}
      </section>
    </PageContainer>
  )
}

export default ShackletonBase
