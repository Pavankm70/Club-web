import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const saved = localStorage.getItem('clubUser')
    if (saved) {
      try {
        const user = JSON.parse(saved)
        if (user.token) {
          config.headers.Authorization = `Bearer ${user.token}`
        }
      } catch {
        // ignore
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('clubUser')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export function login(email, password) {
  return api.post('/auth/login', { email, password })
}

export function getMembers() {
  return api.get('/members')
}

export function getMemberById(id) {
  return api.get(`/members/${id}`)
}

export function getMemberByEmail(email) {
  return api.get(`/members/email/${email}`)
}

export function createMember(data) {
  return api.post('/members', data)
}

export function updateMember(id, data) {
  return api.put(`/members/${id}`, data)
}

export function deleteMember(id) {
  return api.delete(`/members/${id}`)
}

export function getMyDetails() {
  return api.get('/members/me')
}

export default api
