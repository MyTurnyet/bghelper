/**
 * Advancement Piles Component
 *
 * Tracks the Pirate and Mercantile advancement piles for the Wayward Covenant.
 * - Pirate Pile: Combat-focused advancements (+1 cannon per 2)
 * - Mercantile Pile: All other advancements (provides income)
 * - Mercantile Income: floor(Mercantile Pile / 2) coins per turn
 * - Merchant Ship Flip: Random event that adds to piles
 */

import { useState } from 'react'

interface AdvancementPilesProps {
  piratePileCount: number
  mercantilePileCount: number
  onPiratePileChange: (count: number) => void
  onMercantilePileChange: (count: number) => void
  onCollectIncome: (coins: number) => void
  onAddLegendaryCube?: () => void
}

function AdvancementPiles({
  piratePileCount,
  mercantilePileCount,
  onPiratePileChange,
  onMercantilePileChange,
  onCollectIncome,
  onAddLegendaryCube
}: AdvancementPilesProps) {
  const [showFlipResult, setShowFlipResult] = useState(false)
  const [flipResult, setFlipResult] = useState<'heads' | 'tails'>('heads')

  // Calculate mercantile income
  const mercantileIncome = Math.floor(mercantilePileCount / 2)

  const handleCollectIncome = () => {
    if (mercantileIncome > 0) {
      onCollectIncome(mercantileIncome)
    }
  }

  const handleMerchantShipFlip = () => {
    // Random coin flip
    const result = Math.random() < 0.5 ? 'heads' : 'tails'
    setFlipResult(result)
    setShowFlipResult(true)
  }

  const handleConfirmFlip = () => {
    if (flipResult === 'heads') {
      // Heads: Add to Legendary achievement AND Mercantile Pile
      if (onAddLegendaryCube) {
        onAddLegendaryCube()
      }
      onMercantilePileChange(mercantilePileCount + 1)
    } else {
      // Tails: Add to Mercantile Pile only
      onMercantilePileChange(mercantilePileCount + 1)
    }
    setShowFlipResult(false)
  }

  const handleCancelFlip = () => {
    setShowFlipResult(false)
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
        Advancement Piles
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {/* Pirate Pile */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '8px',
          border: '1px solid var(--border-light)'
        }}>
          <h3 style={{
            marginTop: 0,
            marginBottom: '0.75rem',
            fontSize: '1rem',
            color: 'var(--text-primary)'
          }}>
            Pirate Pile
          </h3>
          <p style={{
            margin: '0 0 1rem',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.4'
          }}>
            Combat advancements (+1 cannon per 2)
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}>
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
              aria-label="Decrease pirate pile"
            >
              -
            </button>
            <span style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              minWidth: '60px',
              textAlign: 'center',
              color: 'var(--accent-primary)'
            }}>
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
              aria-label="Increase pirate pile"
            >
              +
            </button>
          </div>
        </div>

        {/* Mercantile Pile */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: '8px',
          border: '1px solid var(--border-light)'
        }}>
          <h3 style={{
            marginTop: 0,
            marginBottom: '0.75rem',
            fontSize: '1rem',
            color: 'var(--text-primary)'
          }}>
            Mercantile Pile
          </h3>
          <p style={{
            margin: '0 0 1rem',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.4'
          }}>
            All other advancements
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={() => onMercantilePileChange(Math.max(0, mercantilePileCount - 1))}
              disabled={mercantilePileCount === 0}
              style={{
                width: '40px',
                height: '40px',
                fontSize: '1.5rem',
                cursor: mercantilePileCount === 0 ? 'not-allowed' : 'pointer',
                backgroundColor: 'var(--accent-primary)',
                color: 'var(--text-primary)',
                border: 'none',
                borderRadius: '4px',
                opacity: mercantilePileCount === 0 ? 0.5 : 1
              }}
              aria-label="Decrease mercantile pile"
            >
              -
            </button>
            <span style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              minWidth: '60px',
              textAlign: 'center',
              color: 'var(--accent-secondary)'
            }}>
              {mercantilePileCount}
            </span>
            <button
              onClick={() => onMercantilePileChange(mercantilePileCount + 1)}
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
              aria-label="Increase mercantile pile"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Mercantile Income */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        border: '1px solid var(--border-light)'
      }}>
        <h3 style={{
          marginTop: 0,
          marginBottom: '0.75rem',
          fontSize: '1rem',
          color: 'var(--text-primary)'
        }}>
          Mercantile Income
        </h3>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div>
            <p style={{
              margin: 0,
              fontSize: '0.85rem',
              color: 'var(--text-secondary)'
            }}>
              Income per turn: <span style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: 'var(--accent-secondary)'
              }}>
                {mercantileIncome} coins
              </span>
            </p>
            <p style={{
              margin: '0.25rem 0 0',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              fontStyle: 'italic'
            }}>
              (Floor of Mercantile Pile ÷ 2)
            </p>
          </div>
          <button
            onClick={handleCollectIncome}
            disabled={mercantileIncome === 0}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: mercantileIncome === 0 ? 'not-allowed' : 'pointer',
              backgroundColor: mercantileIncome === 0 ? 'var(--bg-secondary)' : 'var(--accent-secondary)',
              color: mercantileIncome === 0 ? 'var(--text-secondary)' : 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              opacity: mercantileIncome === 0 ? 0.5 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            Collect Income
          </button>
        </div>
      </div>

      {/* Merchant Ship Flip */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid var(--border-light)'
      }}>
        <h3 style={{
          marginTop: 0,
          marginBottom: '0.75rem',
          fontSize: '1rem',
          color: 'var(--text-primary)'
        }}>
          Merchant Ship Encounter
        </h3>
        <p style={{
          margin: '0 0 1rem',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.5'
        }}>
          Flip a coin when encountering a Merchant Ship
        </p>

        {!showFlipResult && (
          <button
            onClick={handleMerchantShipFlip}
            style={{
              width: '100%',
              padding: '0.75rem 1.5rem',
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
            🪙 Flip for Merchant Ship
          </button>
        )}

        {showFlipResult && (
          <div style={{
            backgroundColor: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '2px solid var(--accent-primary)',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>
              {flipResult === 'heads' ? '👑' : '🌊'}
            </div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--accent-primary)',
              marginBottom: '0.5rem',
              textTransform: 'uppercase'
            }}>
              {flipResult === 'heads' ? 'Heads!' : 'Tails!'}
            </div>
            <div style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
              lineHeight: '1.5'
            }}>
              {flipResult === 'heads' ? (
                <>
                  Add advancement to <strong>Legendary achievement</strong> AND <strong>Mercantile Pile</strong>
                </>
              ) : (
                <>
                  Add advancement to <strong>Mercantile Pile</strong> only
                </>
              )}
            </div>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center'
            }}>
              <button
                onClick={handleCancelFlip}
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
                onClick={handleConfirmFlip}
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
      </div>
    </section>
  )
}

export default AdvancementPiles
