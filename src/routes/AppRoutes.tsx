import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Home from '../components/Home/Home';
import CreatePatientPage from '../components/Patients/CreatePatientPage';
import EditPatientPage from '../components/Patients/EditPatientPage';
import PatientsRecordPage from '../components/Patients/PatientsRecordPage';
import PrivateRoute from './PrivateRoute';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/home" element={<PrivateRoute component={Home} />} />

        <Route path="/patients/create" element={<PrivateRoute component={CreatePatientPage} />} />
        <Route path="/patients/edit/:id" element={<PrivateRoute component={EditPatientPage} />} /> 
        <Route path="/patients/record/:id" element={<PrivateRoute component={PatientsRecordPage} />} /> 

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
