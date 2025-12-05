/**
 * Achievement Tracker Component
 *
 * Displays and manages both Covenant and Player achievements.
 * Tracks 8 different Covenant achievements with various progress types:
 * - Cube-based: Legendary (4), Expert Sailors (3), Explorer (5)
 * - Boolean: Terror of the Sea, Settler
 * - Counter: Builder (target 5+)
 * - Automatic: Elite Vessel (from upgrades), Capitalist (from coins)
 */

import type { AchievementProgress } from '../../types/deadReckoning'

interface AchievementTrackerProps {
  achievements: AchievementProgress
  onUpdateAchievements: (updates: Partial<AchievementProgress>) => void
  playerAchievementCount: number
  onPlayerAchievementChange: (count: number) => void
  eliteVesselAchieved: boolean
  capitalistAchieved: boolean
}

interface AchievementCardProps {
  title: string
  description: string
  isAchieved: boolean
  isAutomatic?: boolean
  children: React.ReactNode
}

function AchievementCard({ title, description, isAchieved, isAutomatic, children }: AchievementCardProps) {
  return (
    <div style={{
      padding: '1rem',
      backgroundColor: isAchieved ? 'rgba(40, 167, 69, 0.1)' : 'var(--bg-secondary)',
      borderRadius: '8px',
      border: isAchieved ? '2px solid #28a745' : '1px solid var(--border-color)',
      position: 'relative'
    }}>
      {isAchieved && (
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          fontSize: '1.5rem'
        }}>
          ✓
        </div>
      )}
      <h3 style={{
        fontSize: '1rem',
        marginTop: 0,
        marginBottom: '0.5rem',
        color: 'var(--accent-secondary)',
        paddingRight: isAchieved ? '2rem' : 0
      }}>
        {title}
        {isAutomatic && <span style={{ fontSize: '0.7rem', marginLeft: '0.5rem', opacity: 0.7 }}>(Auto)</span>}
      </h3>
      <p style={{
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        marginTop: 0,
        marginBottom: '1rem'
      }}>
        {description}
      </p>
      {children}
    </div>
  )
}

interface CubeProgressProps {
  current: number
  max: number
}

function CubeProgress({ current, max }: CubeProgressProps) {
  return (
    <div style={{
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '0.75rem'
    }}>
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: i < current ? 'var(--accent-primary)' : 'transparent',
            border: '2px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: i < current ? 'var(--text-primary)' : 'var(--text-secondary)'
          }}
          aria-label={`Cube ${i + 1} ${i < current ? 'earned' : 'not earned'}`}
        >
          {i < current ? '●' : '○'}
        </div>
      ))}
    </div>
  )
}

function AchievementTracker({
  achievements,
  onUpdateAchievements,
  playerAchievementCount,
  onPlayerAchievementChange,
  eliteVesselAchieved,
  capitalistAchieved
}: AchievementTrackerProps) {
  const handleAddCube = (field: 'legendary' | 'expertSailors' | 'explorer', max: number) => {
    const current = achievements[field] as number
    if (current < max) {
      onUpdateAchievements({ [field]: current + 1 })
    }
  }

  const handleRemoveCube = (field: 'legendary' | 'expertSailors' | 'explorer') => {
    const current = achievements[field] as number
    if (current > 0) {
      onUpdateAchievements({ [field]: current - 1 })
    }
  }

  return (
    <section style={{
      backgroundColor: 'var(--bg-card)',
      padding: '1.5rem',
      borderRadius: '12px',
      marginBottom: '1.5rem',
      border: '1px solid var(--border-color)'
    }}>
      <h2 style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--accent-secondary)' }}>
        Covenant Achievements
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {/* Legendary */}
        <AchievementCard
          title="Legendary"
          description="Earn cubes by sinking the Covenant (max 4)"
          isAchieved={achievements.legendary >= 4}
        >
          <CubeProgress current={achievements.legendary} max={4} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => handleRemoveCube('legendary')}
              disabled={achievements.legendary === 0}
              style={{
                flex: 1,
                padding: '0.5rem',
                fontSize: '0.9rem',
                cursor: achievements.legendary === 0 ? 'not-allowed' : 'pointer',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '4px',
                opacity: achievements.legendary === 0 ? 0.5 : 1
              }}
              aria-label="Remove Legendary cube"
            >
              Remove Cube
            </button>
            <button
              onClick={() => handleAddCube('legendary', 4)}
              disabled={achievements.legendary >= 4}
              style={{
                flex: 1,
                padding: '0.5rem',
                fontSize: '0.9rem',
                cursor: achievements.legendary >= 4 ? 'not-allowed' : 'pointer',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '4px',
                opacity: achievements.legendary >= 4 ? 0.5 : 1
              }}
              aria-label="Add Legendary cube"
            >
              Add Cube
            </button>
          </div>
        </AchievementCard>

        {/* Terror of the Sea */}
        <AchievementCard
          title="Terror of the Sea"
          description="Covenant sank your ship"
          isAchieved={achievements.terrorOfTheSea}
        >
          <button
            onClick={() => onUpdateAchievements({ terrorOfTheSea: !achievements.terrorOfTheSea })}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '0.9rem',
              cursor: 'pointer',
              backgroundColor: achievements.terrorOfTheSea ? '#dc3545' : 'var(--accent-primary)',
              color: 'var(--text-primary)',
              border: 'none',
              borderRadius: '4px'
            }}
            aria-label={achievements.terrorOfTheSea ? 'Unmark Terror of the Sea' : 'Mark Terror of the Sea'}
          >
            {achievements.terrorOfTheSea ? 'Achieved ✓' : 'Mark as Achieved'}
          </button>
        </AchievementCard>

        {/* Expert Sailors */}
        <AchievementCard
          title="Expert Sailors"
          description="Earn cubes from card effects (max 3)"
          isAchieved={achievements.expertSailors >= 3}
        >
          <CubeProgress current={achievements.expertSailors} max={3} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => handleRemoveCube('expertSailors')}
              disabled={achievements.expertSailors === 0}
              style={{
                flex: 1,
                padding: '0.5rem',
                fontSize: '0.9rem',
                cursor: achievements.expertSailors === 0 ? 'not-allowed' : 'pointer',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '4px',
                opacity: achievements.expertSailors === 0 ? 0.5 : 1
              }}
              aria-label="Remove Expert Sailors cube"
            >
              Remove Cube
            </button>
            <button
              onClick={() => handleAddCube('expertSailors', 3)}
              disabled={achievements.expertSailors >= 3}
              style={{
                flex: 1,
                padding: '0.5rem',
                fontSize: '0.9rem',
                cursor: achievements.expertSailors >= 3 ? 'not-allowed' : 'pointer',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '4px',
                opacity: achievements.expertSailors >= 3 ? 0.5 : 1
              }}
              aria-label="Add Expert Sailors cube"
            >
              Add Cube
            </button>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontStyle: 'italic' }}>
            From card effects only
          </div>
        </AchievementCard>

        {/* Elite Vessel */}
        <AchievementCard
          title="Elite Vessel"
          description="Covenant has 4 ship upgrades"
          isAchieved={eliteVesselAchieved}
          isAutomatic
        >
          <div style={{
            padding: '0.75rem',
            textAlign: 'center',
            backgroundColor: eliteVesselAchieved ? 'rgba(40, 167, 69, 0.2)' : 'var(--bg-card)',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            fontSize: '0.9rem',
            color: eliteVesselAchieved ? '#28a745' : 'var(--text-secondary)'
          }}>
            {eliteVesselAchieved ? '✓ Achieved' : 'Not yet achieved'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontStyle: 'italic' }}>
            Automatically tracked from ship upgrades
          </div>
        </AchievementCard>

        {/* Explorer */}
        <AchievementCard
          title="Explorer"
          description="Covenant explored 5+ boards"
          isAchieved={achievements.explorer >= 5}
        >
          <CubeProgress current={achievements.explorer} max={5} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => handleRemoveCube('explorer')}
              disabled={achievements.explorer === 0}
              style={{
                flex: 1,
                padding: '0.5rem',
                fontSize: '0.9rem',
                cursor: achievements.explorer === 0 ? 'not-allowed' : 'pointer',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '4px',
                opacity: achievements.explorer === 0 ? 0.5 : 1
              }}
              aria-label="Remove Explorer board"
            >
              Remove
            </button>
            <button
              onClick={() => handleAddCube('explorer', 5)}
              disabled={achievements.explorer >= 5}
              style={{
                flex: 1,
                padding: '0.5rem',
                fontSize: '0.9rem',
                cursor: achievements.explorer >= 5 ? 'not-allowed' : 'pointer',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '4px',
                opacity: achievements.explorer >= 5 ? 0.5 : 1
              }}
              aria-label="Mark board explored"
            >
              Mark Explored
            </button>
          </div>
        </AchievementCard>

        {/* Builder */}
        <AchievementCard
          title="Builder"
          description="Covenant has 5+ buildings"
          isAchieved={achievements.builder >= 5}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '0.75rem'
          }}>
            <button
              onClick={() => onUpdateAchievements({ builder: Math.max(0, achievements.builder - 1) })}
              style={{
                width: '40px',
                height: '40px',
                fontSize: '1.5rem',
                cursor: 'pointer',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '4px'
              }}
              aria-label="Decrease building count"
            >
              -
            </button>
            <span style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              minWidth: '60px',
              textAlign: 'center',
              color: achievements.builder >= 5 ? '#28a745' : 'inherit'
            }}>
              {achievements.builder}
            </span>
            <button
              onClick={() => onUpdateAchievements({ builder: achievements.builder + 1 })}
              style={{
                width: '40px',
                height: '40px',
                fontSize: '1.5rem',
                cursor: 'pointer',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '4px'
              }}
              aria-label="Increase building count"
            >
              +
            </button>
          </div>
          {achievements.builder >= 5 && (
            <div style={{ fontSize: '0.8rem', color: '#28a745', textAlign: 'center', fontWeight: 'bold' }}>
              Target reached!
            </div>
          )}
        </AchievementCard>

        {/* Settler */}
        <AchievementCard
          title="Settler"
          description="Covenant has majority on 3 islands"
          isAchieved={achievements.settler && Object.values(achievements.settler).filter(v => v >= 3).length >= 3}
        >
          <button
            onClick={() => {
              // Simple toggle for now - future: per-island tracking
              const currentAchieved = Object.values(achievements.settler).filter(v => v >= 3).length >= 3
              onUpdateAchievements({
                settler: currentAchieved
                  ? {}
                  : { island1: 3, island2: 3, island3: 3 }
              })
            }}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '0.9rem',
              cursor: 'pointer',
              backgroundColor: (achievements.settler && Object.values(achievements.settler).filter(v => v >= 3).length >= 3)
                ? '#dc3545'
                : 'var(--accent-primary)',
              color: 'var(--text-primary)',
              border: 'none',
              borderRadius: '4px'
            }}
            aria-label="Toggle Settler achievement"
          >
            {(achievements.settler && Object.values(achievements.settler).filter(v => v >= 3).length >= 3)
              ? 'Achieved ✓'
              : 'Mark as Achieved'}
          </button>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontStyle: 'italic' }}>
            Track manually during gameplay
          </div>
        </AchievementCard>

        {/* Capitalist */}
        <AchievementCard
          title="Capitalist"
          description="Covenant has 30+ coins"
          isAchieved={capitalistAchieved}
          isAutomatic
        >
          <div style={{
            padding: '0.75rem',
            textAlign: 'center',
            backgroundColor: capitalistAchieved ? 'rgba(40, 167, 69, 0.2)' : 'var(--bg-card)',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            fontSize: '0.9rem',
            color: capitalistAchieved ? '#28a745' : 'var(--text-secondary)'
          }}>
            {capitalistAchieved ? '✓ Achieved' : 'Not yet achieved'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontStyle: 'italic' }}>
            Automatically tracked from coin count
          </div>
        </AchievementCard>
      </div>

      {/* Player Achievement Counter */}
      <div style={{
        padding: '1rem',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '8px',
        border: '1px solid var(--border-color)'
      }}>
        <h3 style={{
          fontSize: '1rem',
          marginTop: 0,
          marginBottom: '1rem',
          color: 'var(--accent-secondary)'
        }}>
          Player Achievement Count
        </h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <button
            onClick={() => onPlayerAchievementChange(Math.max(0, playerAchievementCount - 1))}
            disabled={playerAchievementCount === 0}
            style={{
              width: '40px',
              height: '40px',
              fontSize: '1.5rem',
              cursor: playerAchievementCount === 0 ? 'not-allowed' : 'pointer',
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--text-primary)',
              border: 'none',
              borderRadius: '4px',
              opacity: playerAchievementCount === 0 ? 0.5 : 1
            }}
            aria-label="Decrease player achievement count"
          >
            -
          </button>
          <span style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            minWidth: '60px',
            textAlign: 'center',
            color: playerAchievementCount >= 4 ? '#28a745' : 'inherit'
          }}>
            {playerAchievementCount}
          </span>
          <button
            onClick={() => onPlayerAchievementChange(playerAchievementCount + 1)}
            style={{
              width: '40px',
              height: '40px',
              fontSize: '1.5rem',
              cursor: 'pointer',
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--text-primary)',
              border: 'none',
              borderRadius: '4px'
            }}
            aria-label="Increase player achievement count"
          >
            +
          </button>
        </div>
        {playerAchievementCount >= 4 && (
          <div style={{
            fontSize: '0.8rem',
            color: '#28a745',
            marginTop: '0.75rem',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            ⚠️ Game End Condition Met!
          </div>
        )}
      </div>
    </section>
  )
}

export default AchievementTracker
