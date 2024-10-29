import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/EditPatientPage.css';
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

const EditPatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | { currentTarget: { name: string; value: string } }) => {
    const { name, value } = e.currentTarget;
    setPatient({ ...patient!, [name]: value });
  };  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await PatientService.updatePatient(id!.toString(), patient);
      navigate('/home');
    } catch (error: any) {
      toast.error(error.message) 
    }
  };

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1)
  };

  return (
    <div className="edit-patient-container">
      <h1 className='page-title'>Editar paciente</h1>
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
            <TextInputMask placeholder="000.000.0000-00" maskType="cpf" name="cpf" onChange={handleInputChange} value={patient.cpf}/>

            <label>RG:</label>
            <TextInputMask placeholder="99.999.999-X" maskType="rg" name="rg" onChange={handleInputChange} value={patient.rg}/>

            <label>Data de nascimento:</label>
            <input type="date" name="birth_date" value={patient.birth_date} onChange={handleInputChange} />

            <button type="submit">Salvar mudanças</button>
            <button onClick={handleBack} className="back-button">Voltar</button>
          </form>
        )
      )}
    </div>
  );
};

export default EditPatientPage;
