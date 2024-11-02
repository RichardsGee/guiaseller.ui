import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import styles from './topbar.module.css';

function TopBar({ items }) {
  const [faturamento, setFaturamento] = useState('R$ 0,00');

  useEffect(() => {
    // Recuperar o totalVendasMesAtual do localStorage
    const storedTotal = localStorage.getItem('totalVendasMesAtual');
    if (storedTotal) {
      const totalFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(storedTotal));
      setFaturamento(totalFormatted);
    }
  }, []);

  return (
    <header className={styles.topBar}>
      {items.map((item, index) => (
        <div key={index} className={styles.topBarItem}>
          <div className={styles.topBarContent}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.value} id={`${item.id}-value`}>
              {item.id === 'faturamento' ? faturamento : item.value}
            </p>
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
