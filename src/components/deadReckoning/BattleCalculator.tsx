/**
 * Battle Calculator Component
 *
 * Calculates the Covenant's cannon strength and records battle outcomes.
 * - Base cannons: 1
 * - Ship upgrades: +X
 * - Pirate pile: +1 per 2 advancements
 * - Harbor defense: +4 (toggle)
 * - Buildings on space: 0-3 (input)
 */

import { useState } from 'react'

interface BattleCalculatorProps {
  shipUpgrades: number
  piratePileCount: number
  onCoinsChange: (coins: number) => void
  onWoodChange: (wood: number) => void
  onDamageChange: (damage: number) => void
  onPiratePileChange: (count: number) => void
  onAddLegendaryCube?: () => void
}

function BattleCalculator({
  shipUpgrades,
  piratePileCount,
  onCoinsChange,
  onWoodChange,
  onDamageChange,
  onPiratePileChange,
  onAddLegendaryCube
}: BattleCalculatorProps) {
  const [defendingInHarbor, setDefendingInHarbor] = useState(false)
  const [buildingsOnSpace, setBuildingsOnSpace] = useState(0)
  const [showOutcome, setShowOutcome] = useState(false)
  const [covenantWoodGained, setCovenantWoodGained] = useState(0)
  const [covenantCoinsGained, setCovenantCoinsGained] = useState(0)
  const [damageDealt, setDamageDealt] = useState(0)

  // Calculate total cannons
  const baseCannons = 1
  const shipUpgradeCannons = shipUpgrades
  const piratePileCannons = Math.floor(piratePileCount / 2)
  const harborCannons = defendingInHarbor ? 4 : 0
  const buildingCannons = buildingsOnSpace
  const totalCannons = baseCannons + shipUpgradeCannons + piratePileCannons + harborCannons + buildingCannons

  const handleCovenantWon = () => {
    setShowOutcome(true)
  }

  const handlePlayerWon = () => {
    setShowOutcome(true)
  }

  const confirmCovenantWon = () => {
    // Add resources to Covenant
    onWoodChange(covenantWoodGained)
    onCoinsChange(covenantCoinsGained)

    // Reset and close
    setCovenantWoodGained(0)
    setCovenantCoinsGained(0)
    setShowOutcome(false)
    resetBattleInputs()
  }

  const confirmPlayerWon = () => {
    // Add damage to Covenant
    onDamageChange(damageDealt)

    // Check if Covenant was sunk (reaching 5+ damage)
    // This will be checked in the parent component based on current damage + dealt

    // Reset and close
    setDamageDealt(0)
    setShowOutcome(false)
    resetBattleInputs()
  }

  const resetBattleInputs = () => {
    setDefendingInHarbor(false)
    setBuildingsOnSpace(0)
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
        Battle Calculator
      </h2>

      {/* Cannon Calculation */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{
          marginTop: 0,
          marginBottom: '1rem',
          fontSize: '1.1rem',
          color: 'var(--text-primary)'
        }}>
          Covenant Cannon Strength
        </h3>

        {/* Breakdown */}
        <div style={{
          display: 'grid',
          gap: '0.75rem',
          marginBottom: '1rem',
          fontSize: '0.95rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span>Base Cannons:</span>
            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>+{baseCannons}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span>Ship Upgrades ({shipUpgrades}):</span>
            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>+{shipUpgradeCannons}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span>Pirate Pile (+1 per 2):</span>
            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>+{piratePileCannons}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span>Harbor Defense:</span>
            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>+{harborCannons}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span>Buildings on Space:</span>
            <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>+{buildingCannons}</span>
          </div>
        </div>

        {/* Total */}
        <div style={{
          borderTop: '2px solid var(--border-color)',
          paddingTop: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Total Cannons
          </div>
          <div style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'var(--accent-primary)'
          }}>
            {totalCannons}
          </div>
        </div>
      </div>

      {/* Manual Inputs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {/* Pirate Pile Count */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '8px'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>
            Pirate Pile Advancements
          </label>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={() => onPiratePileChange(Math.max(0, piratePileCount - 1))}
              disabled={piratePileCount === 0}
              style={{
                width: '40px',
                height: '40px',
                fontSize: '1.5rem',
                cursor: piratePileCount === 0 ? 'not-allowed' : 'pointer',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '4px',
                opacity: piratePileCount === 0 ? 0.5 : 1
              }}
              aria-label="Decrease pirate pile count"
            >
              -
            </button>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', minWidth: '60px', textAlign: 'center' }}>
              {piratePileCount}
            </span>
            <button
              onClick={() => onPiratePileChange(piratePileCount + 1)}
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
              aria-label="Increase pirate pile count"
            >
              +
            </button>
          </div>
        </div>

        {/* Harbor Defense */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '8px'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>
            Defending in Harbor
          </label>
          <button
            onClick={() => setDefendingInHarbor(!defendingInHarbor)}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: defendingInHarbor ? 'var(--accent-primary)' : 'var(--bg-card)',
              color: defendingInHarbor ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              transition: 'all 0.3s ease'
            }}
          >
            {defendingInHarbor ? '✓ In Harbor (+4)' : 'Not in Harbor'}
          </button>
        </div>

        {/* Buildings on Space */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '8px'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>
            Buildings on Space (0-3)
          </label>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={() => setBuildingsOnSpace(Math.max(0, buildingsOnSpace - 1))}
              disabled={buildingsOnSpace === 0}
              style={{
                width: '40px',
                height: '40px',
                fontSize: '1.5rem',
                cursor: buildingsOnSpace === 0 ? 'not-allowed' : 'pointer',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '4px',
                opacity: buildingsOnSpace === 0 ? 0.5 : 1
              }}
              aria-label="Decrease buildings on space"
            >
              -
            </button>
            <span style={{ fontSize: '2rem', fontWeight: 'bold', minWidth: '60px', textAlign: 'center' }}>
              {buildingsOnSpace}
            </span>
            <button
              onClick={() => setBuildingsOnSpace(Math.min(3, buildingsOnSpace + 1))}
              disabled={buildingsOnSpace >= 3}
              style={{
                width: '40px',
                height: '40px',
                fontSize: '1.5rem',
                cursor: buildingsOnSpace >= 3 ? 'not-allowed' : 'pointer',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '4px',
                opacity: buildingsOnSpace >= 3 ? 0.5 : 1
              }}
              aria-label="Increase buildings on space"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Battle Outcome */}
      {!showOutcome && (
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleCovenantWon}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            Covenant Won
          </button>
          <button
            onClick={handlePlayerWon}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            Player Won
          </button>
        </div>
      )}

      {/* Outcome Recording */}
      {showOutcome && (
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '2px solid var(--accent-primary)'
        }}>
          <h3 style={{
            marginTop: 0,
            marginBottom: '1rem',
            fontSize: '1.1rem',
            color: 'var(--text-primary)'
          }}>
            Record Battle Outcome
          </h3>

          {/* Covenant Won Form */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div>
                <label
                  htmlFor="covenant-wood-gained"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Covenant Wood Gained:
                </label>
                <input
                  id="covenant-wood-gained"
                  type="number"
                  min="0"
                  value={covenantWoodGained}
                  onChange={(e) => setCovenantWoodGained(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    fontSize: '1rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="covenant-coins-gained"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Covenant Coins Gained:
                </label>
                <input
                  id="covenant-coins-gained"
                  type="number"
                  min="0"
                  value={covenantCoinsGained}
                  onChange={(e) => setCovenantCoinsGained(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    fontSize: '1rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="damage-dealt"
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Damage Dealt to Covenant:
                </label>
                <input
                  id="damage-dealt"
                  type="number"
                  min="0"
                  value={damageDealt}
                  onChange={(e) => setDamageDealt(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    fontSize: '1rem',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={() => {
                setShowOutcome(false)
                setCovenantWoodGained(0)
                setCovenantCoinsGained(0)
                setDamageDealt(0)
              }}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                cursor: 'pointer',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px'
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (covenantWoodGained > 0 || covenantCoinsGained > 0) {
                  confirmCovenantWon()
                } else if (damageDealt > 0) {
                  confirmPlayerWon()
                } else {
                  setShowOutcome(false)
                }
              }}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '8px'
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default BattleCalculator
