import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import styles from './topbar.module.css';

function TopBar({ items }) {
  const [faturamento, setFaturamento] = useState('R$ 0,00');
  const [quantidadeVendasUltimoMes, setQuantidadeVendasUltimoMes] = useState(0);
  const [quantidadeVendasMesAtual, setQuantidadeVendasMesAtual] = useState(0);
  const [diferencaPercentualFaturamento, setDiferencaPercentualFaturamento] = useState(0);
  const [diferencaPercentualVendas, setDiferencaPercentualVendas] = useState(0);

  useEffect(() => {
    // Recuperar dados do localStorage
    const storedTotalAtual = localStorage.getItem('totalVendasMesAtual');
    const storedTotalUltimo = localStorage.getItem('totalVendasUltimoMes');
    const storedQuantidadeAtual = localStorage.getItem('quantidadeVendasMesAtual');
    const storedQuantidadeUltimo = localStorage.getItem('quantidadeVendasUltimoMes');

    if (storedTotalAtual) {
      const totalFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(storedTotalAtual));
      setFaturamento(totalFormatted);
      if (storedTotalUltimo) {
        const diferenca = ((Number(storedTotalAtual) - Number(storedTotalUltimo)) / Number(storedTotalUltimo)) * 100;
        setDiferencaPercentualFaturamento(diferenca);
      }
    }

    if (storedQuantidadeUltimo) {
      setQuantidadeVendasUltimoMes(Number(storedQuantidadeUltimo));
      if (storedQuantidadeAtual) {
        const diferenca = ((Number(storedQuantidadeAtual) - Number(storedQuantidadeUltimo)) / Number(storedQuantidadeUltimo)) * 100;
        setDiferencaPercentualVendas(diferenca);
        setQuantidadeVendasMesAtual(Number(storedQuantidadeAtual));
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
              {item.id === 'faturamento' ? faturamento : item.id === 'vendas' ? quantidadeVendasMesAtual : item.value}
            </p>
            {item.id === 'faturamento' && (
              <div>
                <span className={diferencaPercentualFaturamento > 0 ? styles.positivo : styles.negativo}>
                  {diferencaPercentualFaturamento > 0 ? '↑' : '↓'}
                </span>
                <span className={diferencaPercentualFaturamento > 0 ? styles.porcentagemPositivo : styles.porcentagemNegativo}>
                  {Math.abs(diferencaPercentualFaturamento).toFixed(2)}%
                </span>
              </div>
            )}
            {item.id === 'vendas' && (
              <div>
                <span className={quantidadeVendasUltimoMes > quantidadeVendasMesAtual ? styles.negativo : styles.positivo}>
                  {quantidadeVendasUltimoMes > quantidadeVendasMesAtual ? '↓' : '↑'}
                </span>
                <span className={quantidadeVendasUltimoMes > quantidadeVendasMesAtual ? styles.porcentagemNegativo : styles.porcentagemPositivo}>
                  {Math.abs(diferencaPercentualVendas).toFixed(2)}%
                </span>
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
