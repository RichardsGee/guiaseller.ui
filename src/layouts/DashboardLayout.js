// src/layouts/DashboardLayout.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/dashboardLayout.module.css';
import { useUser } from '../context/UserContext';

function DashboardLayout({ children }) {
  const { user } = useUser();

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
          <div className={styles.fixedContainer}> {/* Container fixo centralizado */}
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;
