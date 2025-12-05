/**
 * Covenant Resource Tracker Component
 *
 * Displays and manages the Wayward Covenant AI's resources:
 * - Coins (with Capitalist achievement detection at 30+)
 * - Wood (with 3:1 conversion to coins)
 * - Damage (0-5, sunk at 5)
 * - Ship Upgrades (0-4, Elite Vessel at 4)
 */

import type { CovenantState } from '../../types/deadReckoning'

interface CovenantTrackerProps {
  covenant: CovenantState
  onCoinsChange: (coins: number) => void
  onWoodChange: (wood: number) => void
  onDamageChange: (damage: number) => void
  onShipUpgradesChange: (upgrades: number) => void
  onConvertWood: () => void
}

function CovenantTracker({
  covenant,
  onCoinsChange,
  onWoodChange,
  onDamageChange,
  onShipUpgradesChange,
  onConvertWood
}: CovenantTrackerProps) {
  const canConvertWood = covenant.wood >= 3

  return (
    <section style={{
      backgroundColor: 'var(--bg-card)',
      padding: '1.5rem',
      borderRadius: '12px',
      marginBottom: '1.5rem',
      border: '1px solid var(--border-color)'
    }}>
      <h2 style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--accent-secondary)' }}>
        Covenant Resources
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
      }}>
        {/* Coins */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Coins
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={() => onCoinsChange(covenant.coins - 1)}
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
              aria-label="Decrease coins"
            >
              -
            </button>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', minWidth: '60px' }}>
              {covenant.coins}
            </span>
            <button
              onClick={() => onCoinsChange(covenant.coins + 1)}
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
              aria-label="Increase coins"
            >
              +
            </button>
          </div>
          {covenant.coins >= 30 && (
            <div style={{ fontSize: '0.8rem', color: '#28a745', marginTop: '0.5rem', fontWeight: 'bold' }}>
              ✓ Capitalist Achieved!
            </div>
          )}
        </div>

        {/* Wood */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Wood
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={() => onWoodChange(covenant.wood - 1)}
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
              aria-label="Decrease wood"
            >
              -
            </button>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', minWidth: '60px' }}>
              {covenant.wood}
            </span>
            <button
              onClick={() => onWoodChange(covenant.wood + 1)}
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
              aria-label="Increase wood"
            >
              +
            </button>
          </div>
          <button
            onClick={onConvertWood}
            disabled={!canConvertWood}
            style={{
              marginTop: '0.75rem',
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              cursor: canConvertWood ? 'pointer' : 'not-allowed',
              backgroundColor: canConvertWood ? 'var(--accent-secondary)' : 'var(--bg-secondary)',
              color: canConvertWood ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              opacity: canConvertWood ? 1 : 0.5,
              transition: 'all 0.3s ease'
            }}
          >
            Convert to Coins (3:1)
          </button>
        </div>

        {/* Damage */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Damage
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={() => onDamageChange(covenant.damage - 1)}
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
              aria-label="Decrease damage"
            >
              -
            </button>
            <span style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              minWidth: '60px',
              color: covenant.damage >= 5 ? '#dc3545' : 'inherit'
            }}>
              {covenant.damage}
            </span>
            <button
              onClick={() => onDamageChange(covenant.damage + 1)}
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
              aria-label="Increase damage"
            >
              +
            </button>
          </div>
          {covenant.damage >= 5 && (
            <div style={{ fontSize: '0.8rem', color: '#dc3545', marginTop: '0.5rem', fontWeight: 'bold' }}>
              ⚠️ Ship Sunk!
            </div>
          )}
        </div>

        {/* Ship Upgrades */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Ship Upgrades
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={() => onShipUpgradesChange(covenant.shipUpgrades - 1)}
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
              aria-label="Decrease ship upgrades"
            >
              -
            </button>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', minWidth: '60px' }}>
              {covenant.shipUpgrades}
            </span>
            <button
              onClick={() => onShipUpgradesChange(covenant.shipUpgrades + 1)}
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
              aria-label="Increase ship upgrades"
            >
              +
            </button>
          </div>
          {covenant.shipUpgrades >= 4 && (
            <div style={{ fontSize: '0.8rem', color: '#28a745', marginTop: '0.5rem', fontWeight: 'bold' }}>
              ✓ Elite Vessel Achieved!
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default CovenantTracker
