import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientsPage from '../Patients/PatientsPage';
import '../../styles/Home.css';
import EditPsychologistModal from './EditPsychologistModal';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddPatient = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/patients/create');
  };

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleEditPsychologist = () => {
    setModalOpen(true);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>APPSICOLÓGICO</h1>
      </header>
      <div className="button-container">
        <button className="add-patient-button" onClick={handleAddPatient}>
          Adicionar paciente
        </button>
        <button className="edit-psychologist-button" onClick={handleEditPsychologist}>
          Editar Psicólogo
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </div>
      <div className="tab-content">
        <PatientsPage />
      </div>
      {isModalOpen && <EditPsychologistModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Home;
