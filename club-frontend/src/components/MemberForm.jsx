import { useState, useEffect } from 'react'

function MemberForm({ initialData, onSubmit, isEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'MEMBER',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (initialData && isEdit) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        role: initialData.role || 'MEMBER',
        password: '',
      })
    }
  }, [initialData, isEdit])

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!isEdit && !formData.password) newErrors.password = 'Password is required'
    if (!isEdit && formData.password && formData.password.length < 4)
      newErrors.password = 'Password must be at least 4 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      const submitData = { ...formData }
      if (isEdit && !submitData.password) {
        delete submitData.password
      }
      await onSubmit(submitData)
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Something went wrong' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="member-form" onSubmit={handleSubmit}>
      {errors.submit && <div className="form-error-global">{errors.submit}</div>}

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className={errors.phone ? 'input-error' : ''}
        />
        {errors.phone && <span className="field-error">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={formData.role} onChange={handleChange}>
          <option value="MEMBER">Member</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="password">
          Password {isEdit && <span className="optional-label">(optional)</span>}
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={isEdit ? 'Leave blank to keep current' : 'Enter password'}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <span className="field-error">{errors.password}</span>}
      </div>

      <button type="submit" className="form-submit-btn" disabled={submitting}>
        {submitting ? 'Saving...' : isEdit ? 'Update Member' : 'Add Member'}
      </button>
    </form>
  )
}

export default MemberForm
