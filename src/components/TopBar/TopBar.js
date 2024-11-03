import '../../styles/styles.css';
import React, { useEffect, useState } from 'react';
import styles from './topbar.module.css';

function TopBar({ items, salesData, dateRange }) {
  const [faturamentoAtual, setFaturamentoAtual] = useState('R$ 0,00');
  const [quantidadeVendasAtual, setQuantidadeVendasAtual] = useState(0);
  const [faturamentoAnterior, setFaturamentoAnterior] = useState('R$ 0,00');
  const [quantidadeVendasAnterior, setQuantidadeVendasAnterior] = useState(0);
  const [diferencaPercentualFaturamento, setDiferencaPercentualFaturamento] = useState(0);
  const [diferencaPercentualVendas, setDiferencaPercentualVendas] = useState(0);

  useEffect(() => {
    const today = new Date();

    // Função para calcular os totais com base no intervalo selecionado
    const calculateTotals = (days, isCurrent) => {
      const startDate = new Date();
      startDate.setDate(today.getDate() - days);
      let totalFaturamento = 0;
      let totalVendas = 0;

      salesData.forEach(sale => {
        const dateCreated = new Date(sale.date_created);
        if (isCurrent ? dateCreated.toDateString() === today.toDateString() : dateCreated >= startDate && dateCreated < today) {
          totalFaturamento += sale.total_amount || 0;
          totalVendas += 1;
        }
      });

      return { totalFaturamento, totalVendas };
    };

    // Resumos para o período atual e anterior com base no filtro
    const currentSummary = dateRange === '1d' ? calculateTotals(1, true) : calculateTotals(dateRange === '7d' ? 7 : (dateRange === '15d' ? 15 : 30), false);
    const previousSummary = dateRange === '1d' ? calculateTotals(1, false) : calculateTotals(dateRange === '7d' ? 14 : (dateRange === '15d' ? 30 : 60), false);

    // Atualiza os estados com os valores calculados
    setFaturamentoAtual(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentSummary.totalFaturamento));
    setQuantidadeVendasAtual(currentSummary.totalVendas);
    setFaturamentoAnterior(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(previousSummary.totalFaturamento));
    setQuantidadeVendasAnterior(previousSummary.totalVendas);

    // Calcular diferença percentual de faturamento
    if (previousSummary.totalFaturamento > 0) {
      const diferencaFaturamento = ((currentSummary.totalFaturamento - previousSummary.totalFaturamento) / previousSummary.totalFaturamento) * 100;
      setDiferencaPercentualFaturamento(diferencaFaturamento);
    } else {
      setDiferencaPercentualFaturamento(currentSummary.totalFaturamento > 0 ? 100 : 0);
    }

    // Calcular diferença percentual de vendas
    if (previousSummary.totalVendas > 0) {
      const diferencaVendas = ((currentSummary.totalVendas - previousSummary.totalVendas) / previousSummary.totalVendas) * 100;
      setDiferencaPercentualVendas(diferencaVendas);
    } else {
      setDiferencaPercentualVendas(currentSummary.totalVendas > 0 ? 100 : 0);
    }

  }, [salesData, dateRange]); // Atualiza sempre que salesData ou dateRange mudar

  return (
    <header className={styles.topBar}>
      {items.map((item, index) => (
        <div key={index} className={styles.topBarItem}>
          <div className={styles.topBarContent}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.value} id={`${item.id}-value`}>
              {item.id === 'faturamento' ? (
                <>
                  <span className={styles.period}></span>
                  <span className={styles.valueToday}>{faturamentoAtual}</span><br />
                  <span className={styles.period}></span>
                  <span className={styles.valueCompare}>{faturamentoAnterior}</span>
                </>
              ) : item.id === 'vendas' ? (
                <>
                  <span className={styles.period}></span>
                  <span className={styles.valueToday}>{quantidadeVendasAtual}</span><br />
                  <span className={styles.period}></span>
                  <span className={styles.valueCompare}>{quantidadeVendasAnterior}</span>
                </>
              ) : item.value}
            </p>
          </div>
          <div className={styles.topBarIcon}>
            <span className={`material-icons ${styles.icon}`}>{item.icon}</span>
            <span className={diferencaPercentualFaturamento > 0 ? styles.positivo : styles.negativo}>
              {item.id === 'faturamento' ? (
                <>
                  {diferencaPercentualFaturamento > 0 ? '↑' : '↓'} {Math.abs(diferencaPercentualFaturamento).toFixed(2)}%
                </>
              ) : item.id === 'vendas' ? (
                <>
                  {diferencaPercentualVendas > 0 ? '↑' : '↓'} {Math.abs(diferencaPercentualVendas).toFixed(2)}%
                </>
              ) : null}
            </span>
          </div>
        </div>
      ))}
    </header>
  );
}

export default TopBar;
