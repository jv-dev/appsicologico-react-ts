import api from '../api/api'
import Psychologist from '../interfaces/Psychologist'

const getToken = () => {
  return localStorage.getItem('token');
};

export const AuthRepository = {
  login: async (email: string, password: string): Promise<string> => {
    const response = await api.post(`/auth/login`, { email, password });
    return response.data.access_token;
  },

  register: async (psicologo: {
    name: string;
    email: string;
    password: string;
    phone: string;
    crp: string;
  }): Promise<void> => {
    await api.post(`/psicologo`, psicologo);
  },

  fetchPsychologistDetails: async (): Promise<Psychologist> => {
    try {
      const response = await api.get(`/psicologo/detalhe`, {
        headers: { 'Authorization': `Bearer ${getToken()}` },
      });
      return response.data;
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao buscar psicologo');
    }
  },

  updatePsychologist: async (psychologist: Psychologist): Promise<void> => {
    try {
      const response = await api.put(`/psicologo/editar`, psychologist, {
        headers: { 'Authorization': `Bearer ${getToken()}` },
      });
      return response.data; 
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.msg) {
        console.error("Error details:", error.response.data);
        throw new Error(error.response.data.msg);
      } else {
        console.error("Unexpected error:", error);
        throw new Error('Erro ao editar');
      }
    }
  }
};
