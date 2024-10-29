// Importando o CSS global
import '../../styles/styles.css';
import React from 'react';
import styles from './topbar.module.css';

function TopBar({ items }) {
  return (
    <header className={styles.topBar}>
      {items.map((item, index) => (
        <div key={index} className={styles.topBarItem}>
          <div className={styles.topBarContent}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.value} id={`${item.id}-value`}>{item.value}</p>
          </div>
          <div className={styles.topBarIcon}>
            <span className={`material-icons ${styles.icon}`}>{item.icon}</span>
          </div>
        </div>
      ))}
    </header>
  );
}

export default TopBar;
