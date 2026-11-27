
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import BrowseItems from './pages/BrowseItems'
import ReportItem from './pages/ReportItem'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'
import MyReports from './pages/MyReports'
import MyClaims from './pages/MyClaims'
import ItemDetails from './pages/ItemDetails'
import ClaimSubmission from './pages/ClaimSubmission'
import EditReport from './pages/EditReport'
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<BrowseItems />} />
          <Route path="/report" element={<ReportItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-reports" element={<MyReports />} />
          <Route path="/my-claims" element={<MyClaims />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/claim" element={<ClaimSubmission />} />
          <Route path="/edit-report" element={<EditReport />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
