import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMembers } from '../services/api'
import { useAuth } from '../context/AuthContext'
import './Members.css'

function Members() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getMembers()
      setMembers(response.data)
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Please log in to view members.')
      } else {
        setError('Failed to load members. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="members-page">
      <div className="members-header">
        <h1>Our Members</h1>
        <p>Meet the amazing people who make our community great.</p>
      </div>

      <div className="members-content">
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading members...</p>
          </div>
        )}

        {error && (
          <div className="members-error">
            <p>{error}</p>
            {!isAuthenticated() && (
              <Link to="/login" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                Log In
              </Link>
            )}
          </div>
        )}

        {!loading && !error && members.length === 0 && (
          <div className="members-empty">
            <p>No members found.</p>
          </div>
        )}

        {!loading && !error && members.length > 0 && (
          <div className="members-table-wrapper">
            <table className="members-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.phone}</td>
                    <td>
                      <span className={`role-badge ${member.role?.toLowerCase()}`}>
                        {member.role}
                      </span>
                    </td>
                    <td>
                      {member.createdAt
                        ? new Date(member.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && members.length > 0 && (
          <div className="members-card-grid">
            {members.map((member) => (
              <div className="member-card" key={member.id}>
                <div className="member-card-avatar">
                  {member.name?.split(' ').map((n) => n[0]).join('').toUpperCase()}
                </div>
                <h3>{member.name}</h3>
                <p className="member-card-email">{member.email}</p>
                <p className="member-card-phone">{member.phone}</p>
                <span className={`role-badge ${member.role?.toLowerCase()}`}>
                  {member.role}
                </span>
                <p className="member-card-date">
                  Joined: {member.createdAt ? new Date(member.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Members
