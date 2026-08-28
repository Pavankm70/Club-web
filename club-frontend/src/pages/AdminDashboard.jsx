import { useState, useEffect } from 'react'
import { getMembers, createMember, updateMember, deleteMember } from '../services/api'
import MemberForm from '../components/MemberForm'
import './AdminDashboard.css'

function AdminDashboard() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [viewingMember, setViewingMember] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

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
      setError('Failed to load members.')
    } finally {
      setLoading(false)
    }
  }

  const showSuccess = (msg) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleAddMember = () => {
    setEditingMember(null)
    setShowForm(true)
  }

  const handleEditMember = (member) => {
    setEditingMember(member)
    setShowForm(true)
  }

  const handleFormSubmit = async (data) => {
    setActionLoading(true)
    try {
      if (editingMember) {
        await updateMember(editingMember.id, data)
        showSuccess('Member updated successfully!')
      } else {
        await createMember(data)
        showSuccess('Member added successfully!')
      }
      setShowForm(false)
      setEditingMember(null)
      fetchMembers()
    } catch (err) {
      throw err
    } finally {
      setActionLoading(false)
    }
  }

  const handleDeleteClick = (member) => {
    setDeleteConfirm(member)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return
    setActionLoading(true)
    try {
      await deleteMember(deleteConfirm.id)
      showSuccess('Member deleted successfully!')
      setDeleteConfirm(null)
      fetchMembers()
    } catch (err) {
      setError('Failed to delete member.')
    } finally {
      setActionLoading(false)
    }
  }

  const handleViewMember = (member) => {
    setViewingMember(member)
  }

  const closeModals = () => {
    setShowForm(false)
    setEditingMember(null)
    setViewingMember(null)
    setDeleteConfirm(null)
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage all club members</p>
        </div>
        <button className="btn-add" onClick={handleAddMember}>
          + Add New Member
        </button>
      </div>

      {successMessage && (
        <div className="success-banner">{successMessage}</div>
      )}

      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading members...</p>
        </div>
      )}

      {error && !loading && (
        <div className="error-banner">{error}</div>
      )}

      {!loading && !error && (
        <>
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-number">{members.length}</span>
              <span className="stat-label">Total Members</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                {members.filter((m) => m.role === 'ADMIN').length}
              </span>
              <span className="stat-label">Admins</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">
                {members.filter((m) => m.role === 'MEMBER').length}
              </span>
              <span className="stat-label">Members</span>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-row">No members found.</td>
                  </tr>
                ) : (
                  members.map((member) => (
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
                      <td className="actions-cell">
                        <button
                          className="action-btn view"
                          onClick={() => handleViewMember(member)}
                          title="View"
                        >
                          View
                        </button>
                        <button
                          className="action-btn edit"
                          onClick={() => handleEditMember(member)}
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDeleteClick(member)}
                          title="Delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingMember ? 'Edit Member' : 'Add New Member'}</h2>
              <button className="modal-close" onClick={closeModals}>
                &times;
              </button>
            </div>
            <MemberForm
              initialData={editingMember}
              onSubmit={handleFormSubmit}
              isEdit={!!editingMember}
            />
          </div>
        </div>
      )}

      {viewingMember && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content modal-view" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Member Details</h2>
              <button className="modal-close" onClick={closeModals}>
                &times;
              </button>
            </div>
            <div className="view-details">
              <div className="detail-row">
                <span className="detail-label">ID</span>
                <span className="detail-value">{viewingMember.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Name</span>
                <span className="detail-value">{viewingMember.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">{viewingMember.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{viewingMember.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Role</span>
                <span className="detail-value">
                  <span className={`role-badge ${viewingMember.role?.toLowerCase()}`}>
                    {viewingMember.role}
                  </span>
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Joined</span>
                <span className="detail-value">
                  {viewingMember.createdAt
                    ? new Date(viewingMember.createdAt).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={closeModals}>
          <div className="modal-content modal-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="modal-close" onClick={closeModals}>
                &times;
              </button>
            </div>
            <div className="confirm-body">
              <p>
                Are you sure you want to delete <strong>{deleteConfirm.name}</strong>?
                This action cannot be undone.
              </p>
              <div className="confirm-actions">
                <button className="btn-cancel" onClick={closeModals} disabled={actionLoading}>
                  Cancel
                </button>
                <button
                  className="btn-delete-confirm"
                  onClick={handleDeleteConfirm}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
