import React from 'react';
import styles from './ErrorPage.module.css'; 

const ErrorPage = () => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorMessage}>Oops! Essa página não existe no GuiaSeller.</h2>
        <p className={styles.errorDescription}>
          Não é o fim da linha, você ainda pode voltar para o dashboard.
        </p>
        <div className={styles.buttonContainer}>
          <a href="/dashboard" className={styles.homeButton}>Retornar para dashboard</a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
