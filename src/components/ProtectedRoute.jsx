import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ClipLoader } from 'react-spinners'; // Importando o spinner

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader color="#a020f0" size={50} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />; 
  }

  return children;
};

export default ProtectedRoute;
