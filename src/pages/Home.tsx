import { useNavigate } from 'react-router-dom'
import PageContainer from '../components/PageContainer'
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
    image: '/bghelper/images/default_image.png',
    description: 'Roll dice for your board games. Supports standard six-sided dice.',
    path: '/helpers/dice-roller'
  },
  {
    id: 'shackleton-base',
    name: 'Shackleton Base',
    image: '/bghelper/images/default_image.png',
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
    <PageContainer maxWidth="xl">
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Board Game Helpers</h1>
      <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
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
    </PageContainer>
  )
}

export default Home
