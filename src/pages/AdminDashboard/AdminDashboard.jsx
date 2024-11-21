import React, { useContext } from 'react';
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';  // Importando o Sidebar Admin
import Header from '../../components/Header/Header';  // Importando o Header
import Footer from '../../components/Footer/Footer';  // Importando o Footer
import MainContent from '../../components/MainContent/MainContent';  // Importando o MainContent

import '../../styles/styles.css';  // Importando o CSS global
import { AuthContext } from '../../context/AuthContext';  // Importando o contexto para pegar os dados do usuário

const AdminDashboard = () => {
  const { user, signOut } = useContext(AuthContext);  // Usando o contexto de autenticação para pegar os dados do usuário
  
  const username = user ? user.displayName || user.email : "Admin";
  const userPhoto = user ? user.photoURL : "https://via.placeholder.com/80";  // Foto do usuário
  const userEmail = user ? user.email : "admin@admin.com";  // Email do usuário

  return (
    <MainContent>
      {/* Header */}
      <Header username={username} userPhoto={userPhoto} userEmail={userEmail} logout={signOut} />
      
      {/* Sidebar Admin */}
      <AdminSidebar userPhoto={userPhoto} username={username} userEmail={userEmail} isComplete={true} />
      
      <div className="main-content">
        <div className="contentContainer">
          {/* Conteúdo Principal */}
          <h1 className="title">Admin Dashboard</h1>
          <p>Bem-vindo ao Dashboard Admin. Esta página será preenchida com funcionalidades administrativas futuramente.</p>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </MainContent>
  );
};

export default AdminDashboard;
