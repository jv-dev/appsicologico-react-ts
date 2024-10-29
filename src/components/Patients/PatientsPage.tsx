import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faFileMedical } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchPatients = async (selectedPage = 1) => {
    try {
      const response = await PatientService.getAllPatients(selectedPage, 10);
      setPatients(response.patients);
      setTotalPages(response.pages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Erro ao carregar pacientes', error);
    }
  };

  useEffect(() => {
    fetchPatients(page);
  }, [page]);

  const handlePageClick = (data: { selected: number }) => {
    setPage(data.selected + 1);
  };

  const handleEdit = (id: number) => {
    navigate(`/patients/edit/${id}`);
  };

  const handleRecord = (id: number) => {
    navigate(`/patients/record/${id}`);
  };

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

  return (
    <div className="patients-page">
      <h1>Lista de Pacientes</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <table className="patients-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
                <th>Data de Nascimento</th>
                <th>RG</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.cpf}</td>
                  <td>{patient.birth_date}</td>
                  <td>{patient.rg}</td>
                  <td className="actions">
                    <button className="record-btn" onClick={() => handleRecord(patient.id)}>
                      <FontAwesomeIcon icon={faFileMedical} /> Prontuário
                    </button>
                    <button className="edit-btn" onClick={() => handleEdit(patient.id)}>
                      <FontAwesomeIcon icon={faEdit} /> Editar
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(patient.id)}>
                      <FontAwesomeIcon icon={faTrash} /> Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Próximo"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </>
      )}
    </div>
  );
};

export default PatientsPage;
