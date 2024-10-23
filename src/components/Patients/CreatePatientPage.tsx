import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/CreatePatientPage.css'
import PatientService from '../../services/PatientService';

interface Patient {
  name: string;
  email: string;
  cpf: string;
  birth_date: string;
  rg: string;
}

const CreatePatientPage: React.FC = () => {
  const [patient, setPatient] = useState<Patient>({
    name: '',
    email: '',
    cpf: '',
    birth_date: '',
    rg: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await PatientService.createPatient(patient);
      navigate('/home');
    } catch (error) {
      console.error('Erro ao criar paciente', error);
    }
  };

  return (
    <div className="create-patient-container">
      <h1>Criar novo paciente</h1>
      {error && <p>{error}</p>}
      <form className="create-patient-form" onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" name="name" value={patient.name} onChange={handleInputChange} required />
        
        <label>Email:</label>
        <input type="email" name="email" value={patient.email} onChange={handleInputChange} required />
        
        <label>CPF:</label>
        <input type="text" name="cpf" value={patient.cpf} onChange={handleInputChange} required />
        
        <label>Data de nascimento:</label>
        <input type="date" name="birth_date" value={patient.birth_date} onChange={handleInputChange} required />
        
        <label>RG:</label>
        <input type="text" name="rg" value={patient.rg} onChange={handleInputChange} required />
        
        <button type="submit">Criar Paciente</button>
        <button onClick={() => navigate(-1)} className="back-button">Voltar</button>
      </form>
    </div>
  );
};

export default CreatePatientPage;
