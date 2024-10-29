import api from '../api/api';

const API_URL = 'http://localhost:5000';

const getToken = () => {
  return localStorage.getItem('token');
};

const PatientService = {
  getAllPatients: async (page = 1, perPage = 10) => {
    const token = getToken();
    const response = await api.get(`/paciente/listar`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        per_page: perPage,
      },
    });
    return response.data;
  },

  getPatientById: async (id: string) => {
    try {
      const response = await api.get(`/paciente/buscar/${id}`, {
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
        const formData = new FormData();
        
        Object.keys(patientData).forEach((key) => {
            formData.append(key, patientData[key]);
        });

        const response = await api.post(`/paciente/criar`, formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.msg) {
            throw new Error(error.response.data.msg);
        } else {
            throw new Error('Erro ao criar paciente');
        }
    }
  },

  updatePatient: async (id: string, patientData: any) => {
    try {
      const response = await api.put(`/paciente/${id}`, patientData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.msg) {
        throw new Error(error.response.data.msg);
      } else {
        throw new Error('Erro ao criar paciente');
      }
    }
  },

  deletePatient: async (id: string) => {
    try {
      const response = await api.delete(`/paciente/${id}`, {
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