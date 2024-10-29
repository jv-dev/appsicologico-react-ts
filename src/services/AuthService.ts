import Psychologist from '../interfaces/Psychologist'
import { AuthRepository } from '../repositories/AuthRepository'

const AuthService = {
  login: async (email: string, password: string): Promise<string> => {
    const token = await AuthRepository.login(email, password)
    return token
  },
  register: async (psychologist: Psychologist): Promise<void> => {
    await AuthRepository.register(psychologist)
  },
  getPsychologistDetails: async (): Promise<Psychologist> => {
    const psychologist = await AuthRepository.fetchPsychologistDetails();
    return psychologist;
  },
  updatePsychologist: async (psychologist: any): Promise<void> => {
    const sanitizedPsychologist = {
      ...psychologist,
      cpf: psychologist.cpf.replace(/[.\-/]/g, ''),
    };

    await AuthRepository.updatePsychologist(sanitizedPsychologist);
  },
}

export default AuthService