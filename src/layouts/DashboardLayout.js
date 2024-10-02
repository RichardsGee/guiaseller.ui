// src/layouts/DashboardLayout.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/dashboardLayout.module.css';
import { useUser } from '../context/UserContext'; // Importando o hook do contexto

function DashboardLayout({ children }) {
  const { user } = useUser(); // Obtendo os dados do usuário do contexto

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar 
        userPhoto={user.photo}
        username={user.username}
        userEmail={user.email}
        userLevel={user.level} 
      />
      <div className={styles.content}>
        <Header username={user.username} />
        <div className={styles.mainContent}>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;
