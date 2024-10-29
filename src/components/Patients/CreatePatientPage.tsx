import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/CreatePatientPage.css';
import PatientService from '../../services/PatientService';
import { toast } from 'react-toastify';
import TextInputMask from '../textInputMask/textInputMask';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { currentTarget: { name: string; value: string } }) => {
    const { name, value } = e.currentTarget;
    setPatient({ ...patient!, [name]: value });
  };  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await PatientService.createPatient(patient);
      navigate('/home');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };
   
  return (
    <div className="create-patient-container">
      <h1 className="page-title">Criar novo paciente</h1>
      {error && <p>{error}</p>}
      <form className="create-patient-form" onSubmit={handleSubmit}>
        <label>Nome:</label>
        <input type="text" name="name" value={patient.name} onChange={handleInputChange} required />
        
        <label>Email:</label>
        <input type="email" name="email" value={patient.email} onChange={handleInputChange} required />
        
        <label>CPF:</label>
        <TextInputMask placeholder="000.000.0000-00" maskType="cpf" name="cpf" onChange={handleInputChange} value={patient.cpf}/>

        <label>RG:</label>
        <TextInputMask placeholder="99.999.999-X" maskType="rg" name="rg" onChange={handleInputChange} value={patient.rg}/>

        <label>Data de nascimento:</label>
        <input type="date" name="birth_date" value={patient.birth_date} onChange={handleInputChange} required />

        <button type="submit">Criar Paciente</button>
        <button onClick={handleBack} className="back-button">Voltar</button>
      </form>
    </div>
  );
};

export default CreatePatientPage;
