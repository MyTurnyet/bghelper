import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import DiceRoller from './pages/helpers/DiceRoller'
import './App.css'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/helpers/dice-roller" element={<DiceRoller />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
