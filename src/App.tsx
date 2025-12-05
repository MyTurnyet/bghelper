import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import DiceRoller from './pages/helpers/DiceRoller'
import ShackletonBase from './pages/helpers/ShackletonBase'
import DeadReckoning from './pages/helpers/DeadReckoning'
import './App.css'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/helpers/dice-roller" element={<DiceRoller />} />
        <Route path="/helpers/shackleton-base" element={<ShackletonBase />} />
        <Route path="/helpers/dead-reckoning" element={<DeadReckoning />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
