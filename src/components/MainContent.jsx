import React from 'react';
import styles from '../styles/maincontent.module.css';

function MainContent({ children, isSidebarOpen }) {
  return (
    <div className={`${styles.mainContent} ${!isSidebarOpen ? styles.expanded : ''}`}>
      {children}
    </div>
  );
}

export default MainContent;
