import React, { useState } from 'react';
import PatientsPage from '../Patients/PatientsPage'; // Supondo que a página de pacientes já exista
import '../../styles/Home.css'

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('patients');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'patients':
        return <PatientsPage />;
      case 'reports':
        return <div>Relatórios serão exibidos aqui</div>;
      default:
        return null;
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>APPSICOLÓGICO</h1>
      </header>
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'patients' ? 'active' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          Pacientes
        </button>
        <button
          className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Relatórios
        </button>
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Home;