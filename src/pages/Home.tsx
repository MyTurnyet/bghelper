import { useNavigate } from 'react-router-dom'
import CardGrid from '../components/CardGrid'
import Card from '../components/Card'

interface Helper {
  id: string
  name: string
  image: string
  description: string
  path: string
}

const helpers: Helper[] = [
  {
    id: 'dice-roller',
    name: 'Dice Roller',
    image: '/images/default_image.png',
    description: 'Roll dice for your board games. Supports standard six-sided dice.',
    path: '/helpers/dice-roller'
  },
  {
    id: 'shackleton-base',
    name: 'Shackleton Base',
    image: '/images/default_image.png',
    description: 'Corporation setup randomizer for Shackleton Base. Includes preset games and random selection.',
    path: '/helpers/shackleton-base'
  }
]

function Home() {
  const navigate = useNavigate()

  const handleCardClick = (path: string) => {
    navigate(path)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Board Game Helpers</h1>
      <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'rgba(255, 255, 255, 0.6)' }}>
        Select a helper tool to get started
      </p>

      <CardGrid>
        {helpers.map((helper) => (
          <Card
            key={helper.id}
            name={helper.name}
            image={helper.image}
            description={helper.description}
            onClick={() => handleCardClick(helper.path)}
          />
        ))}
      </CardGrid>
    </div>
  )
}

export default Home
