import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import clubIcon from '../images/WhatsApp Image 2026-09-02 at 5.23.39 PM.jpeg'
import './Navbar.css'

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
    setMenuOpen(false)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={clubIcon} alt="Datawitz logo" className="logo-icon" />
          Datawitz
        </NavLink>
      </div>
      <button
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/members" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
            Members
          </NavLink>
        </li>
        {!isAuthenticated() ? (
          <li>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
              Login
            </NavLink>
          </li>
        ) : (
          <>
            {user.role === 'ADMIN' && (
              <li>
                <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                  Admin Dashboard
                </NavLink>
              </li>
            )}
            {user.role === 'MEMBER' && (
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                  My Dashboard
                </NavLink>
              </li>
            )}
            {user.role === 'ADMIN' && (
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                  My Profile
                </NavLink>
              </li>
            )}
          </>
        )}
      </ul>
      <div className={`navbar-right ${menuOpen ? 'open' : ''}`}>
        {isAuthenticated() && (
          <div className="navbar-user">
            <span className="user-info">
              {user.name || user.email}
              <span className="user-role">{user.role}</span>
            </span>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
