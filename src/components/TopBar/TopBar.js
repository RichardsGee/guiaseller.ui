import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import styles from './topbar.module.css';

function TopBar({ items }) {
  const [faturamento, setFaturamento] = useState('R$ 0,00');
  const [totalVendasUltimoMes, setTotalVendasUltimoMes] = useState(0);
  const [diferencaPercentual, setDiferencaPercentual] = useState(0);

  useEffect(() => {
    // Recuperar o totalVendasMesAtual e totalVendasUltimoMes do localStorage
    const storedTotalAtual = localStorage.getItem('totalVendasMesAtual');
    const storedTotalUltimo = localStorage.getItem('totalVendasUltimoMes');

    if (storedTotalAtual) {
      const totalFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(storedTotalAtual));
      setFaturamento(totalFormatted);
    }

    if (storedTotalUltimo) {
      setTotalVendasUltimoMes(Number(storedTotalUltimo)); // Convertendo para número
      // Calcular a diferença percentual
      if (storedTotalAtual) {
        const diferenca = ((storedTotalAtual - storedTotalUltimo) / storedTotalUltimo) * 100;
        setDiferencaPercentual(diferenca);
      }
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
            {item.id === 'faturamento' && (
              <div>
                <span>{diferencaPercentual > 0 ? '↑' : '↓'}</span>
                <span>{Math.abs(diferencaPercentual).toFixed(2)}%</span>
              </div>
            )}
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
