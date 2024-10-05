import React from 'react';
import styles from './topbar.module.css'; // Certifique-se de que o caminho do CSS Module está correto

function TopBar() {
  return (
    <header className={styles.topBar}>
      <div className={styles.topBarItem}>
        <div className={styles.topBarContent}>
          <h3>Faturamento</h3>
          <p id="faturamento-value">R$ 50,000</p>
        </div>
        <div className={styles.topBarIcon}>
          <span className={`material-icons ${styles.icon}`}>attach_money</span>
        </div>
      </div>
      <div className={styles.topBarItem}>
        <div className={styles.topBarContent}>
          <h3>Vendas</h3>
          <p id="vendas-value">120</p>
        </div>
        <div className={styles.topBarIcon}>
          <span className={`material-icons ${styles.icon}`}>shopping_cart</span>
        </div>
      </div>
      <div className={styles.topBarItem}>
        <div className={styles.topBarContent}>
          <h3>Custo</h3>
          <p id="custo-value">R$ 20,000</p>
        </div>
        <div className={styles.topBarIcon}>
          <span className={`material-icons ${styles.icon}`}>money_off</span>
        </div>
      </div>
      <div className={styles.topBarItem}>
        <div className={styles.topBarContent}>
          <h3>Lucro</h3>
          <p id="lucro-value">R$ 15,000</p>
        </div>
        <div className={styles.topBarIcon}>
          <span className={`material-icons ${styles.icon}`}>trending_up</span>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
