import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-logo">
          ClubHub
        </NavLink>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/members" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Members
          </NavLink>
        </li>
        {!isAuthenticated() ? (
          <li>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Login
            </NavLink>
          </li>
        ) : (
          <>
            {user.role === 'ADMIN' && (
              <li>
                <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  Admin Dashboard
                </NavLink>
              </li>
            )}
            {user.role === 'MEMBER' && (
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  My Dashboard
                </NavLink>
              </li>
            )}
            {user.role === 'ADMIN' && (
              <li>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  My Profile
                </NavLink>
              </li>
            )}
          </>
        )}
      </ul>
      <div className="navbar-right">
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
