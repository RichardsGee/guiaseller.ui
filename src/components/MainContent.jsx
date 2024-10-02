import React from 'react';
import styles from '../styles/maincontent.module.css'; // Importando o CSS Module

function MainContent({ children }) {
  return (
    <div className={styles.mainBackground}>
      {children}
    </div>
  );
}

export default MainContent;
