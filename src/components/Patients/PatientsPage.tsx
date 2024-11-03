import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faFileMedical } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../../styles/PatientsPage.css';
import PatientService from '../../services/PatientService';
import { toast } from 'react-toastify';

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
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({
    name: '',
    email: '',
    cpf: '',
    birth_date: '',
    rg: ''
  });

  const navigate = useNavigate();

  const fetchPatients = async (selectedPage = 1) => {
    try {
      const response = await PatientService.getAllPatients(selectedPage);
      console.log(response)

      setPatients(response.patients);
      setFilteredPatients(response.patients);
      setTotalPages(response.totalPages);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch patients');
      setLoading(false);
    }
  };

  const filterPatients = () => {
    const isAnyFilterApplied = Object.values(filters).some(value => value.trim() !== '');
    if (isAnyFilterApplied) {
      const filtered = patients.filter((patient) =>
        Object.keys(filters).every((key) =>
          filters[key] === ''
            ? true
            : patient[key as keyof Patient].toString().toLowerCase().includes(filters[key].toLowerCase())
        )
      );
      setFilteredPatients(filtered);
    } else {
      console.log('filtrei')
      setFilteredPatients(patients);
    }
  };

  useEffect(() => {
    fetchPatients(page);
  }, [page]);

  useEffect(() => {
    filterPatients();
  }, [filters, patients]);

  const handleSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (sortConfig !== null) {
      const { key, direction } = sortConfig;
      if (a[key as keyof Patient] < b[key as keyof Patient]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key as keyof Patient] > b[key as keyof Patient]) {
        return direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleDelete = async (id: number) => {
    try {
      await PatientService.deletePatient(id!.toString());
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
    } catch (error: any) {
      toast.error(error.message) 
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/patients/edit/${id}`);
  };

  const handleRecord = (id: number) => {
    navigate(`/patients/record/${id}`);
  };

  const handlePageClick = (data: { selected: number }) => {
    setPage(data.selected + 1);
  };

  return (
    <div className="patients-page">
      <h1>Lista de Pacientes</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="patients-table">
        <thead>
          <tr>
            {['id', 'name', 'email', 'cpf', 'birth_date', 'rg'].map((key) => (
              <th key={key} onClick={() => handleSort(key)}>
                {key.toUpperCase()}
                {sortConfig?.key === key && (sortConfig.direction === 'ascending' ? ' ↑' : ' ↓')}
                <input
                  type="text"
                  name={key}
                  placeholder={`Filtrar ${key}`}
                  value={filters[key]}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.cpf}</td>
              <td>{patient.birth_date}</td>
              <td>{patient.rg}</td>
              <td className="actions">
                <button onClick={() => handleRecord(patient.id)} className="record-btn">
                  <FontAwesomeIcon icon={faFileMedical} /> Prontuário
                </button>
                <button onClick={() => handleEdit(patient.id)} className="edit-btn">
                  <FontAwesomeIcon icon={faEdit} /> Editar
                </button>
                <button onClick={() => handleDelete(patient.id)} className="delete-btn">
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
    </div>
  );
};

export default PatientsPage;
