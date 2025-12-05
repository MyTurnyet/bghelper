/**
 * Game Over Modal Component
 *
 * Modal dialog displayed when the game ends (either side reaches 4 achievements).
 * Shows final scores and winner.
 */

interface GameOverModalProps {
  isOpen: boolean
  onClose: () => void
  covenantAchievements: number
  playerAchievements: number
}

function GameOverModal({
  isOpen,
  onClose,
  covenantAchievements,
  playerAchievements
}: GameOverModalProps) {
  if (!isOpen) return null

  const winner = covenantAchievements >= 4 ? 'The Covenant' : 'You'

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          border: '2px solid var(--border-color)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{
          marginTop: 0,
          marginBottom: '1rem',
          color: 'var(--accent-secondary)',
          fontSize: '2rem'
        }}>
          Game Over!
        </h2>

        <div style={{
          fontSize: '1.2rem',
          marginBottom: '1.5rem',
          color: 'var(--text-primary)',
          fontWeight: 'bold'
        }}>
          {winner} {winner === 'You' ? 'win' : 'wins'}!
        </div>

        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{
            marginTop: 0,
            marginBottom: '1rem',
            color: 'var(--accent-primary)',
            fontSize: '1.1rem'
          }}>
            Final Scores
          </h3>

          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            gap: '2rem'
          }}>
            <div>
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem'
              }}>
                Covenant
              </div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: covenantAchievements >= 4 ? '#28a745' : 'var(--text-primary)'
              }}>
                {covenantAchievements}
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}>
                achievements
              </div>
            </div>

            <div>
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                marginBottom: '0.5rem'
              }}>
                Player
              </div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: playerAchievements >= 4 ? '#28a745' : 'var(--text-primary)'
              }}>
                {playerAchievements}
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}>
                achievements
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
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
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default GameOverModal
