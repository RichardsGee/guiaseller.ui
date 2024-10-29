import React from 'react';
import styles from './ErrorPage.module.css';
import FallingLeaves from '../../components/FallingLeaves/FallingLeaves'; // Importe o FallingLeaves

const ErrorPage = () => {
  return (
    <div className={styles.errorContainer}>
      {/* Componente de folhas caindo */}
      <FallingLeaves />

      <div className={styles.errorContent}>
        <div className={styles.iconContainer}>
          <div className={styles.warningIcon}>404</div>
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.errorTitle}>PÁGINA NÃO ENCONTRADA</h1>
          <p className={styles.errorMessage}>
            Desculpe, a página que você está procurando não existe no Guia Seller. 
            Volte ao dashboard.
          </p>
          <a href="/dashboard" className={styles.homeButton}>Retornar ao Dashboard</a>
        </div>
      </div>
      <div className={styles.topBanner}>Guia Seller - Alpha Version</div>
    </div>
  );
};

export default ErrorPage;
