import axios from 'axios'

// In production (Vercel/Netlify), set VITE_API_URL to your backend URL.
// Falls back to Railway URL if the env var is not set.
export const ROOT_URL = import.meta.env.VITE_API_URL || 'https://vision-oa-production.up.railway.app'

const api = axios.create({
  baseURL: `${ROOT_URL}/api`,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
