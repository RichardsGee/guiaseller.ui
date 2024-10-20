// Importando o CSS global
import '../../styles/styles.css'; // Ajuste o caminho conforme necessário
import React from 'react';
import styles from './topbar.module.css';


function TopBar() {
  return (
    <header className={styles.topBar}>
      <div className={styles.topBarItem}>
        <div className={styles.topBarContent}>
          <h3 className={styles.title}>Faturamento</h3>
          <p className={styles.value} id="faturamento-value">R$ 50,000</p>
        </div>
        <div className={styles.topBarIcon}>
          <span className={`material-icons ${styles.icon}`}>monetization_on</span> {/* Ícone atualizado */}
        </div>
      </div>
      <div className={styles.topBarItem}>
        <div className={styles.topBarContent}>
          <h3 className={styles.title}>Vendas</h3>
          <p className={styles.value} id="vendas-value">120</p>
        </div>
        <div className={styles.topBarIcon}>
          <span className={`material-icons ${styles.icon}`}>sell</span> {/* Ícone atualizado */}
        </div>
      </div>
      <div className={styles.topBarItem}>
        <div className={styles.topBarContent}>
          <h3 className={styles.title}>Custo</h3>
          <p className={styles.value} id="custo-value">R$ 20,000</p>
        </div>
        <div className={styles.topBarIcon}>
          <span className={`material-icons ${styles.icon}`}>attach_money</span> {/* Ícone atualizado */}
        </div>
      </div>
      <div className={styles.topBarItem}>
        <div className={styles.topBarContent}>
          <h3 className={styles.title}>Lucro</h3>
          <p className={styles.value} id="lucro-value">R$ 15,000</p>
        </div>
        <div className={styles.topBarIcon}>
          <span className={`material-icons ${styles.icon}`}>trending_up</span> {/* Ícone atualizado */}
        </div>
      </div>
    </header>
  );
}

export default TopBar;
