import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/PatientsPage.css'
import PatientService from '../../services/PatientService';

interface Patient {
  id: number;
  name: string;
  email: string;
  cpf: string;
  birth_date: string;
  rg: string;
}

const PatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await PatientService.getAllPatients();
        setPatients(data);
        console.log(patients)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Erro ao carregar pacientes', error);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/patients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatients(patients.filter((patient) => patient.id !== id));
    } catch (error) {
      setError('Failed to delete patient.');
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/patients/edit/${id}`);
  };

  const handleCreate = () => {
    navigate(`/patients/create`);
  };

  return (
    <div className="patients-container">
      <div className="patients-header">
        <h1>Pacientes</h1>
        <button onClick={handleCreate}>Criar novo paciente</button>
      </div>

      {loading ? (
        <p>Carregando pacientes...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Data de nascimento</th>
              <th>RG</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.cpf}</td>
                <td>{new Date(patient.birth_date).toLocaleDateString()}</td>
                <td>{patient.rg}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(patient.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(patient.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientsPage;
