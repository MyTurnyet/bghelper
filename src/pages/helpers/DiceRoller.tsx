import { useState } from 'react'

function DiceRoller() {
  const [result, setResult] = useState<number | null>(null)

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1
    setResult(roll)
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Dice Roller</h1>
      <p>Roll a six-sided die for your board game.</p>

      <button
        onClick={rollDice}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.2rem',
          cursor: 'pointer',
          marginTop: '2rem'
        }}
      >
        Roll Dice
      </button>

      {result !== null && (
        <div style={{ marginTop: '2rem', fontSize: '3rem' }}>
          🎲 {result}
        </div>
      )}
    </div>
  )
}

export default DiceRoller
