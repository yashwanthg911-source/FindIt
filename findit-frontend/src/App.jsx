
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import BrowseItems from './pages/BrowseItems'
import ReportItem from './pages/ReportItem'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<BrowseItems />} />
          <Route path="/report" element={<ReportItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
