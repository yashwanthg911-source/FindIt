
import { useState } from 'react'
import {
  MapPin,
  Search,
  House,
  PencilLine,
  LogIn,
  UserRoundPlus,
  Menu,
  X
} from 'lucide-react'

import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">

      {/* Logo */}
      <a href="#home" className="navbar-logo">
        <MapPin size={42} strokeWidth={3} />
        <span>FindIt.</span>
      </a>

      {/* Mobile Menu Button */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Navigation */}
      <nav className={`navbar-links ${menuOpen ? 'active' : ''}`}>

        <a href="#home" className="nav-link active">
          <House size={21} />
          <span>Home</span>
        </a>

        <a href="#explore" className="nav-link">
          <Search size={22} />
          <span>Explore Items</span>
        </a>

        <a href="#report" className="nav-link">
          <PencilLine size={22} />
          <span>Report Item</span>
        </a>

        <div className="navbar-auth">

          <a href="#login" className="login-btn">
            <LogIn size={21} />
            <span>Login</span>
          </a>

          <a href="#register" className="register-btn">
            <UserRoundPlus size={21} />
            <span>Register</span>
          </a>

        </div>

      </nav>

    </header>
  )
}

export default Navbar
