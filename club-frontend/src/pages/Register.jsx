import { useState } from 'react'
import { Link } from 'react-router-dom'
import { submitRegistration } from '../services/api'
import './Register.css'

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  year: '',
  branch: '',
  rollNo: '',
  github: '',
  whyJoin: '',
}

function Register() {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^[0-9]{10}$/.test(formData.phone.trim())) newErrors.phone = 'Enter a 10 digit phone number'
    if (!formData.year.trim()) newErrors.year = 'Year is required'
    if (!formData.branch.trim()) newErrors.branch = 'Branch is required'
    if (!formData.rollNo.trim()) newErrors.rollNo = 'Roll number is required'
    if (formData.github.trim() && /\s/.test(formData.github.trim()))
      newErrors.github = 'GitHub link cannot contain spaces'
    if (!formData.whyJoin.trim()) newErrors.whyJoin = 'Tell us why you want to join'
    else if (formData.whyJoin.trim().length < 20) newErrors.whyJoin = 'Please write at least 20 characters'
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
    setErrors({})
    try {
      const response = await submitRegistration({
        ...formData,
        phone: formData.phone.trim(),
      })
      setSuccess(response.data?.message || 'Registration received. We will get back to you soon.')
      setFormData(EMPTY_FORM)
    } catch (err) {
      const serverError =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.defaultMessage
      if (err.response?.status === 400) {
        setErrors({ submit: serverError || 'Please check the details you entered.' })
      } else {
        setErrors({ submit: serverError || 'Something went wrong. Please try again later.' })
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="register-page">
        <div className="register-card">
          <div className="register-header">
            <h1>Application Received</h1>
            <p>{success}</p>
          </div>
          <div className="register-success">
            <span className="register-success-icon">&#10003;</span>
            <p>
              Your details have been recorded. Keep an eye on your inbox, and make sure
              you are signed up for the club mailing list.
            </p>
          </div>
          <Link to="/" className="register-btn">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h1>Join the Club</h1>
          <p>Fill the form below and our team will get in touch</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit} noValidate>
          {errors.submit && <div className="register-error">{errors.submit}</div>}

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
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
                placeholder="Enter your email"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10 digit mobile number"
                maxLength={10}
                className={errors.phone ? 'input-error' : ''}
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="year">Year</label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className={errors.year ? 'input-error' : ''}
              >
                <option value="">Select year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="5th Year">5th Year</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Other">Other</option>
              </select>
              {errors.year && <span className="field-error">{errors.year}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
                className={errors.branch ? 'input-error' : ''}
              />
              {errors.branch && <span className="field-error">{errors.branch}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="rollNo">Roll Number</label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                placeholder="e.g. 21CS1042"
                className={errors.rollNo ? 'input-error' : ''}
              />
              {errors.rollNo && <span className="field-error">{errors.rollNo}</span>}
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="github">
                GitHub Profile <span className="optional-label">(optional)</span>
              </label>
              <input
                type="text"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/yourname"
                className={errors.github ? 'input-error' : ''}
              />
              {errors.github && <span className="field-error">{errors.github}</span>}
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="whyJoin">Why do you want to join?</label>
              <textarea
                id="whyJoin"
                name="whyJoin"
                value={formData.whyJoin}
                onChange={handleChange}
                rows={5}
                maxLength={1000}
                placeholder="Tell us what excites you about the club"
                className={errors.whyJoin ? 'input-error' : ''}
              ></textarea>
              {errors.whyJoin && <span className="field-error">{errors.whyJoin}</span>}
            </div>
          </div>

          <button type="submit" className="register-btn" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Register'}
          </button>

          <p className="register-switch">
            Already a member? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register