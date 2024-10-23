import axios from 'axios'

const API_URL = 'http://localhost:5000'

export const AuthRepository = {
  login: async (email: string, password: string): Promise<string> => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password })
    return response.data.access_token
  },
  register: async (psicologo: {
    name: string
    email: string
    password: string
    phone: string
    crp: string
  }): Promise<void> => {
    await axios.post(`${API_URL}/psicologo`, psicologo)
  }
}