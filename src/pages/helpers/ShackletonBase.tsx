import { useState } from 'react'

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
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '0.75rem 1rem',
        borderRadius: '6px',
        marginBottom: '0.75rem'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#4a9eff', fontSize: '1rem' }}>{title}</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {corpNames.map((corpName, index) => (
            <li key={index} style={{ marginBottom: '0.5rem' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '0.1rem' }}>
                {corpName}
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem' }}>
                {getCorporationDescription(corpName)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div style={{ padding: '1rem', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '0.25rem', fontSize: '1.75rem' }}>Shackleton Base</h1>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '1rem',
        fontSize: '1rem',
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: 'normal'
      }}>
        Corporation Setup Randomizer
      </h2>

      <p style={{
        textAlign: 'center',
        marginBottom: '1.5rem',
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '0.9rem'
      }}>
        Use these corporation combinations for your first three games, or generate a random selection.
      </p>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Preset Games</h2>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          fontSize: '0.9rem'
        }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>1st game:</strong> {presetGames.game1.join(' + ')}
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>2nd game:</strong> {presetGames.game2.join(' + ')}
          </div>
          <div>
            <strong>3rd game:</strong> {presetGames.game3.join(' + ')}
          </div>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Random Selection</h2>
        <button
          onClick={getRandomCorporations}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: '0.75rem',
            width: '100%',
            backgroundColor: '#4a9eff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold'
          }}
        >
          {randomSelection.length === 0 ? 'Generate Random Selection' : 'Re-roll'}
        </button>

        {randomSelection.length > 0 && renderCorporationList(randomSelection, 'Your Random Corporations')}
      </section>
    </div>
  )
}

export default ShackletonBase
