import React from 'react'
import { Navigate } from 'react-router-dom'

const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

const PrivateRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  return isAuthenticated() ? <Component /> : <Navigate to="/login" />
}

export default PrivateRoute
