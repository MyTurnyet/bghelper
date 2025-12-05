/**
 * Dead Reckoning Solo Helper - Main Page Component
 *
 * Manages the Wayward Covenant AI opponent's state for Dead Reckoning's solo mode.
 */

import { useState } from 'react'
import PageContainer from '../../components/PageContainer'
import HelperHeader from '../../components/HelperHeader'
import CovenantTracker from '../../components/deadReckoning/CovenantTracker'
import { useDeadReckoningGame } from '../../hooks/useDeadReckoningGame'
import type { Difficulty } from '../../types/deadReckoning'

function DeadReckoning() {
  const {
    gameState,
    currentCardSection,
    covenantAchievementCount,
    initializeGame,
    resetGame,
    incrementTurn,
    setCovenantCoins,
    setCovenantWood,
    setCovenantDamage,
    setShipUpgrades,
    convertWoodToCoins
  } = useDeadReckoningGame()

  const [showSetup, setShowSetup] = useState(true)

  const handleStartGame = (difficulty: Difficulty) => {
    initializeGame(difficulty)
    setShowSetup(false)
  }

  const handleResetGame = () => {
    if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
      resetGame()
      setShowSetup(true)
    }
  }

  const handleEndTurn = () => {
    incrementTurn()
  }

  // Setup screen
  if (showSetup) {
    return (
      <PageContainer maxWidth="md">
        <HelperHeader
          title="Dead Reckoning"
          description="Solo mode helper for managing the Wayward Covenant AI opponent. Track resources, achievements, and battles."
          imageSrc={`${import.meta.env.BASE_URL}images/default_image.png`}
          imageAlt="Dead Reckoning - A Game of Swashbuckling and Scheming"
        />

        <div style={{
          backgroundColor: 'var(--bg-card)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--accent-primary)' }}>
            Select Difficulty
          </h2>
          <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
            Choose your challenge level to begin
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <button
              onClick={() => handleStartGame('normal')}
              style={{
                padding: '1.5rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-primary)',
                border: '2px solid var(--border-color)',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-hover)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Normal
              <div style={{ fontSize: '0.85rem', fontWeight: 'normal', marginTop: '0.5rem' }}>
                All Covenant cards use blue (Normal) side
              </div>
            </button>

            <button
              onClick={() => handleStartGame('expert')}
              style={{
                padding: '1.5rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: 'var(--accent-secondary)',
                color: 'var(--text-primary)',
                border: '2px solid var(--border-color)',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#8e44ad'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-secondary)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Expert
              <div style={{ fontSize: '0.85rem', fontWeight: 'normal', marginTop: '0.5rem' }}>
                All Covenant cards use red (Hard) side
              </div>
            </button>
          </div>
        </div>
      </PageContainer>
    )
  }

  // Main game screen
  return (
    <PageContainer maxWidth="lg">
      <HelperHeader
        title="Dead Reckoning"
        description={`Playing on ${gameState.difficulty === 'normal' ? 'Normal' : 'Expert'} difficulty`}
        imageSrc={`${import.meta.env.BASE_URL}images/default_image.png`}
        imageAlt="Dead Reckoning - A Game of Swashbuckling and Scheming"
      />

      {/* Turn Counter */}
      <section style={{
        backgroundColor: 'var(--bg-card)',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        border: '2px solid var(--accent-primary)',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: 'var(--accent-primary)',
          marginBottom: '0.5rem'
        }}>
          Turn {gameState.turn}
        </div>
        <div style={{
          fontSize: '1.2rem',
          color: 'var(--text-secondary)'
        }}>
          Card Section: {currentCardSection}
        </div>
        <div style={{
          marginTop: '1rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleEndTurn}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-hover)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-primary)'
            }}
          >
            End Turn
          </button>
          <button
            onClick={handleResetGame}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              cursor: 'pointer',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--border-color)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
            }}
          >
            New Game
          </button>
        </div>
      </section>

      {/* Achievement Warning */}
      {(covenantAchievementCount >= 4 || gameState.playerAchievementCount >= 4) && (
        <section style={{
          backgroundColor: '#fef3cd',
          color: '#856404',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          border: '2px solid #ffc107',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          ⚠️ Game End Triggered! {covenantAchievementCount >= 4 ? 'Covenant' : 'Player'} has reached 4 achievements. Complete final turn.
        </section>
      )}

      {/* Covenant Resources */}
      <CovenantTracker
        covenant={gameState.covenant}
        onCoinsChange={setCovenantCoins}
        onWoodChange={setCovenantWood}
        onDamageChange={setCovenantDamage}
        onShipUpgradesChange={setShipUpgrades}
        onConvertWood={convertWoodToCoins}
      />

      {/* Placeholder for future components */}
      <section style={{
        backgroundColor: 'var(--bg-card)',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        textAlign: 'center'
      }}>
        <h3 style={{ color: 'var(--text-secondary)' }}>More features coming soon...</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Achievement tracking, battle calculator, and advancement piles will be added in the next sprint.
        </p>
      </section>
    </PageContainer>
  )
}

export default DeadReckoning
