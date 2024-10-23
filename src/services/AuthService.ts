import Psychologist from '../interfaces/Psychologist'
import { AuthRepository } from '../repositories/AuthRepository'

const AuthService = {
  login: async (email: string, password: string): Promise<string> => {
    const token = await AuthRepository.login(email, password)
    return token
  },
  register: async (psychologist: Psychologist): Promise<void> => {
    await AuthRepository.register(psychologist)
  }
}

export default AuthService