import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/EditPatientPage.css';
import PatientService from '../../services/PatientService';

interface Patient {
  name: string;
  email: string;
  cpf: string;
  birth_date: string;
  rg: string;
}

const EditPatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        // Usando o service para buscar o paciente por ID
        const patientData = await PatientService.getPatientById(id!);
        setPatient(patientData);
        setLoading(false);
      } catch (err) {
        setError('Falha ao buscar detalhes do paciente.');
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient({ ...patient!, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await PatientService.updatePatient(id!.toString(), patient);
      navigate('/home'); // Redireciona após atualizar
    } catch (error) {
      console.error('Erro ao atualizar paciente', error);
    }
  };

  return (
    <div className="edit-patient-container">
      <h1>Editar paciente</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        patient && (
          <form className="edit-patient-form" onSubmit={handleSubmit}>
            <label>Nome:</label>
            <input type="text" name="name" value={patient.name} onChange={handleInputChange} />

            <label>Email:</label>
            <input type="email" name="email" value={patient.email} onChange={handleInputChange} />

            <label>CPF:</label>
            <input type="text" name="cpf" value={patient.cpf} onChange={handleInputChange} />

            <label>Data de nascimento:</label>
            <input type="date" name="birth_date" value={patient.birth_date} onChange={handleInputChange} />

            <label>RG:</label>
            <input type="text" name="rg" value={patient.rg} onChange={handleInputChange} />

            <button type="submit">Salvar mudanças</button>
            <button onClick={() => navigate(-1)} className="back-button">Voltar</button>
          </form>
        )
      )}
    </div>
  );
};

export default EditPatientPage;
