import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ClipLoader } from 'react-spinners'; // Spinner para o carregamento

const ProtectedRoute = ({ children }) => {
  const { user, loading, canAccessApp } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader color="#a020f0" size={50} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/error" />; 
  }

  if (!canAccessApp) {
    return <Navigate to="/blocked" />;
  }

  return children; 
};

export default ProtectedRoute;
