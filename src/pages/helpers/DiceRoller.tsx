import { useState } from 'react'
import PageContainer from '../../components/PageContainer'
import HelperHeader from '../../components/HelperHeader'
import './DiceRoller.css'

function DiceRoller() {
  const [result, setResult] = useState<number | null>(null)
  const [isRolling, setIsRolling] = useState(false)

  const rollDice = () => {
    setIsRolling(true)
    setResult(null)

    // Simulate rolling animation
    let count = 0
    const interval = setInterval(() => {
      setResult(Math.floor(Math.random() * 6) + 1)
      count++
      if (count >= 10) {
        clearInterval(interval)
        const finalRoll = Math.floor(Math.random() * 6) + 1
        setResult(finalRoll)
        setIsRolling(false)
      }
    }, 100)
  }

  const getDiceFace = (num: number) => {
    const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
    return faces[num - 1] || '🎲'
  }

  return (
    <PageContainer maxWidth="md">
      <HelperHeader
        title="Dice Roller"
        description="Roll a six-sided die for your board games. Perfect for when you've lost the dice or need a quick random number."
        imageSrc={`${import.meta.env.BASE_URL}images/default_image.png`}
        imageAlt="Dice Roller"
      />

      <div className="dice-roller-container">
        <div className="dice-display-area">
          {result !== null ? (
            <div className={`dice-result ${isRolling ? 'rolling' : 'landed'}`}>
              <div className="dice-face">
                {getDiceFace(result)}
              </div>
              {!isRolling && (
                <div className="dice-number">{result}</div>
              )}
            </div>
          ) : (
            <div className="dice-placeholder">
              <div className="dice-icon">🎲</div>
              <p>Ready to roll</p>
            </div>
          )}
        </div>

        <button
          onClick={rollDice}
          disabled={isRolling}
          className={`roll-button ${isRolling ? 'rolling' : ''}`}
        >
          {isRolling ? 'Rolling...' : result !== null ? 'Roll Again' : 'Roll Dice'}
        </button>

        <div className="dice-stats">
          <div className="stat-card">
            <div className="stat-label">Last Roll</div>
            <div className="stat-value">{result || '—'}</div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default DiceRoller
