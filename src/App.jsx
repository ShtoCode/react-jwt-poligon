import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import StockChart from './pages/StockChart'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/stockchart" element={<StockChart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    
  )
}

export default App
