import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUser, faCalendarAlt, faMailBulk, faIdBadge, faPrescriptionBottleAlt } from '@fortawesome/free-solid-svg-icons';
import '../../styles/PatientRecordPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import PatientService from '../../services/PatientService';
import ReportService from '../../services/ReportService';

interface Patient {
  id: number;
  name: string;
  email: string;
  cpf: string;
  birth_date: Date;
  rg: string;
}

const PatientRecordPage: React.FC = () => {
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
        calculateAge()
        formatCPF()
        setLoading(false);
      } catch (err) {
        setError('Falha ao buscar detalhes do paciente.');
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  function calculateAge() {
    const today = new Date();
    const birth = new Date(patient!.birth_date);
    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birth.getDate()))  age--

    return age
  }

  function formatCPF() {
    let cpf = patient!.cpf.replace(/\D/g, '');

    if (cpf.length !== 11) throw new Error("Invalid CPF. It must contain 11 digits.");

    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    return cpf
  }

  const handleGenerateReport = async () => {
    try {
      await ReportService.generateMedicalLeave({patient_id: id!.toString()});
    } catch (error) {
      console.error('Erro ao gerar relatorio', error);
    }
  };

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div className="patient-record-page">
      <aside className="sidebar">
        <button className="back-button" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Voltar
        </button>
        <p className="patient-name">{patient?.name}</p>
      </aside>
      
      <main className="record-content">
        <h1>Prontuário do paciente</h1>
        <div className="patient-data-cards">
          <div className="patient-data-card">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Idade</span>
            <strong>{patient?.birth_date ? calculateAge() : ''}</strong>
          </div>
          <div className="patient-data-card">
            <FontAwesomeIcon icon={faMailBulk} />
            <span>Email de contato</span>
            <strong>{patient?.email}</strong>
          </div>
          <div className="patient-data-card">
            <FontAwesomeIcon icon={faIdBadge} />
            <span>CPF</span>
            <strong>{patient?.cpf ? formatCPF() : ''}</strong>
          </div>
        </div>
        
        <div className="reports">
          <h2>Relatórios</h2>
          <div className="button-container">
            <button className="report-button" onClick={handleGenerateReport}>
                <FontAwesomeIcon icon={faPrescriptionBottleAlt} /> Gerar atestado
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientRecordPage;