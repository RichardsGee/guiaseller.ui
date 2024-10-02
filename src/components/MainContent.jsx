import React from 'react';
import styles from '../styles/maincontent.module.css'; // Importando o CSS Module

function MainContent({ children }) {
  return (
    <div className={styles.mainContent}> {/* Aplicando o estilo correto para o conteúdo principal */}
      {children}
    </div>
  );
}

export default MainContent;
