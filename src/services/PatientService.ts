import axios from 'axios';

const API_URL = 'http://localhost:5000';

const getToken = () => {
  return localStorage.getItem('token');
};

const PatientService = {
  getAllPatients: async () => {
    try {
      const response = await axios.get(`${API_URL}/paciente/listar`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar pacientes');
    }
  },

  getPatientById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/paciente/buscar/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Erro ao buscar paciente');
    }
  },

  createPatient: async (patientData: any) => {
    try {
      const response = await axios.post(`${API_URL}/paciente/criar`, patientData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Erro ao criar paciente');
    }
  },

  updatePatient: async (id: string, patientData: any) => {
    try {
      const response = await axios.put(`${API_URL}/paciente/${id}`, patientData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Erro ao atualizar paciente');
    }
  },

  deletePatient: async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/paciente/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Erro ao deletar paciente');
    }
  },
};

export default PatientService;