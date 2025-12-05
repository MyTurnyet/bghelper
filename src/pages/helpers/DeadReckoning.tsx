/**
 * Dead Reckoning Solo Helper - Main Page Component
 *
 * Manages the Wayward Covenant AI opponent's state for Dead Reckoning's solo mode.
 */

import { useState } from 'react'
import PageContainer from '../../components/PageContainer'
import HelperHeader from '../../components/HelperHeader'
import CovenantTracker from '../../components/deadReckoning/CovenantTracker'
import AchievementTracker from '../../components/deadReckoning/AchievementTracker'
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
    convertWoodToCoins,
    updateCovenantAchievements,
    setPlayerAchievementCount
  } = useDeadReckoningGame()

  const [showSetup, setShowSetup] = useState(true)
  const [turnHistory, setTurnHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)

  const handleStartGame = (difficulty: Difficulty) => {
    initializeGame(difficulty)
    setShowSetup(false)
    setTurnHistory([])
  }

  const handleResetGame = () => {
    if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
      resetGame()
      setShowSetup(true)
      setTurnHistory([])
    }
  }

  const handleEndTurn = () => {
    // Prompt for resource collection from controlled islands
    const collectResources = confirm(
      'The Covenant collects resources from controlled islands.\n\n' +
      'Did the Covenant collect any wood or coins this turn?\n\n' +
      'Click OK to add resources, or Cancel to skip.'
    )

    if (collectResources) {
      const woodInput = prompt('How much wood did the Covenant collect? (Enter 0 if none)')
      const wood = woodInput ? parseInt(woodInput, 10) : 0

      if (!isNaN(wood) && wood > 0) {
        setCovenantWood(gameState.covenant.wood + wood)
      }

      const coinsInput = prompt('How many coins did the Covenant collect? (Enter 0 if none)')
      const coins = coinsInput ? parseInt(coinsInput, 10) : 0

      if (!isNaN(coins) && coins > 0) {
        setCovenantCoins(gameState.covenant.coins + coins)
      }
    }

    // Increment turn (this triggers automatic wood-to-coin conversion)
    incrementTurn()

    // Add to turn history
    const newTurn = `Turn ${gameState.turn + 1} completed`
    setTurnHistory(prev => {
      const updated = [...prev, newTurn]
      // Keep only last 5 turns
      return updated.slice(-5)
    })

    // Check for game end after turn
    if (covenantAchievementCount >= 4 || gameState.playerAchievementCount >= 4) {
      setTimeout(() => {
        alert(
          `Game Over!\n\n` +
          `${covenantAchievementCount >= 4 ? 'The Covenant' : 'You'} reached 4 achievements!\n\n` +
          `Final Scores:\n` +
          `Covenant: ${covenantAchievementCount} achievements\n` +
          `Player: ${gameState.playerAchievementCount} achievements`
        )
      }, 100)
    }
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

      {/* Turn History */}
      {turnHistory.length > 0 && (
        <section style={{
          backgroundColor: 'var(--bg-card)',
          padding: '1rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-color)'
        }}>
          <button
            onClick={() => setShowHistory(!showHistory)}
            style={{
              width: '100%',
              padding: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              border: 'none',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            aria-label={showHistory ? 'Hide turn history' : 'Show turn history'}
          >
            <span>Turn History ({turnHistory.length})</span>
            <span style={{ fontSize: '1.2rem' }}>{showHistory ? '▼' : '▶'}</span>
          </button>
          {showHistory && (
            <div style={{
              marginTop: '0.75rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border-color)'
            }}>
              {turnHistory.map((entry, index) => (
                <div
                  key={index}
                  style={{
                    padding: '0.5rem',
                    marginBottom: '0.25rem',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {entry}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

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

      {/* Achievement Tracking */}
      <AchievementTracker
        achievements={gameState.covenantAchievements}
        onUpdateAchievements={updateCovenantAchievements}
        playerAchievementCount={gameState.playerAchievementCount}
        onPlayerAchievementChange={setPlayerAchievementCount}
        eliteVesselAchieved={gameState.covenant.shipUpgrades >= 4}
        capitalistAchieved={gameState.covenant.coins >= 30}
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
          Battle calculator and advancement piles will be added in the next sprint.
        </p>
      </section>
    </PageContainer>
  )
}

export default DeadReckoning
