import axios from 'axios'

export const isAuthenticated = async () => {
  try {
    const res = await axios.get('/api/me') // uses token from cookies
    return res.status === 200
  } catch {
    return false
  }
}