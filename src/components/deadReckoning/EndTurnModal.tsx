/**
 * End Turn Modal Component
 *
 * Modal dialog for end-of-turn resource collection from controlled islands.
 * Allows player to input wood and coins collected by the Covenant.
 */

import { useState } from 'react'

interface EndTurnModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (wood: number, coins: number) => void
}

function EndTurnModal({ isOpen, onClose, onConfirm }: EndTurnModalProps) {
  const [wood, setWood] = useState(0)
  const [coins, setCoins] = useState(0)

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm(wood, coins)
    // Reset values for next time
    setWood(0)
    setCoins(0)
  }

  const handleSkip = () => {
    onClose()
    // Reset values for next time
    setWood(0)
    setCoins(0)
  }

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
      onClick={handleSkip}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          border: '2px solid var(--border-color)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{
          marginTop: 0,
          marginBottom: '1rem',
          color: 'var(--accent-secondary)',
          fontSize: '1.5rem'
        }}>
          End of Turn
        </h2>

        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: '1.5rem',
          lineHeight: '1.5'
        }}>
          The Covenant collects resources from controlled islands.
          <br />
          Enter any wood or coins collected this turn:
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          {/* Wood Input */}
          <div>
            <label
              htmlFor="wood-input"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                fontSize: '0.95rem'
              }}
            >
              Wood Collected:
            </label>
            <input
              id="wood-input"
              type="number"
              min="0"
              value={wood}
              onChange={(e) => setWood(Math.max(0, parseInt(e.target.value, 10) || 0))}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)'
              }}
            />
          </div>

          {/* Coins Input */}
          <div>
            <label
              htmlFor="coins-input"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                fontSize: '0.95rem'
              }}
            >
              Coins Collected:
            </label>
            <input
              id="coins-input"
              type="number"
              min="0"
              value={coins}
              onChange={(e) => setCoins(Math.max(0, parseInt(e.target.value, 10) || 0))}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={handleSkip}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            Skip
          </button>
          <button
            onClick={handleConfirm}
            style={{
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
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default EndTurnModal
