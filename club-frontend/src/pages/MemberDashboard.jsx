import { useState, useEffect } from 'react'
import { getMyDetails } from '../services/api'
import { useAuth } from '../context/AuthContext'
import './MemberDashboard.css'

function MemberDashboard() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getMyDetails()
      setProfile(response.data)
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setProfile({
          name: user?.name || 'N/A',
          email: user?.email || 'N/A',
          phone: 'N/A',
          role: user?.role || 'MEMBER',
          createdAt: null,
        })
      } else {
        setError('Failed to load profile details.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="member-dashboard">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <p>Welcome back, {user?.name || user?.email}!</p>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your profile...</p>
        </div>
      )}

      {error && <div className="error-banner">{error}</div>}

      {!loading && !error && profile && (
        <div className="profile-section">
          <div className="profile-card">
            <div className="profile-avatar">
              {profile.name
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </div>
            <h2>{profile.name}</h2>
            <span className={`role-badge ${profile.role?.toLowerCase()}`}>
              {profile.role}
            </span>

            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-icon">&#9993;</span>
                <div>
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{profile.email}</span>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">&#9742;</span>
                <div>
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{profile.phone || 'Not provided'}</span>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">&#9881;</span>
                <div>
                  <span className="detail-label">Role</span>
                  <span className="detail-value">{profile.role}</span>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">&#128197;</span>
                <div>
                  <span className="detail-label">Member Since</span>
                  <span className="detail-value">
                    {profile.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MemberDashboard
