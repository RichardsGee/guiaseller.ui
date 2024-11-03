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

  // Novas variáveis para armazenar os dados do mês atual e anterior
  const [faturamentoMesAtual, setFaturamentoMesAtual] = useState('R$ 0,00');
  const [quantidadeVendasMesAtual, setQuantidadeVendasMesAtual] = useState(0);
  const [faturamentoMesAnterior, setFaturamentoMesAnterior] = useState('R$ 0,00');
  const [quantidadeVendasMesAnterior, setQuantidadeVendasMesAnterior] = useState(0);
  
  // Novas variáveis para armazenar a diferença percentual do mês atual
  const [diferencaPercentualFaturamentoMes, setDiferencaPercentualFaturamentoMes] = useState(0);
  const [diferencaPercentualVendasMes, setDiferencaPercentualVendasMes] = useState(0);

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

    // Cálculo do faturamento e quantidade de vendas do mês atual e anterior
    const calculateMonthlyTotals = (isCurrent) => {
      const startDate = new Date();
      if (isCurrent) {
        startDate.setDate(1); // Primeiro dia do mês atual
      } else {
        startDate.setMonth(startDate.getMonth() - 1, 1); // Primeiro dia do mês anterior
      }
      const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // Último dia do mês

      let totalFaturamento = 0;
      let totalVendas = 0;

      salesData.forEach(sale => {
        const dateCreated = new Date(sale.date_created);
        if (dateCreated >= startDate && dateCreated <= endDate) {
          totalFaturamento += sale.total_amount || 0;
          totalVendas += 1;
        }
      });

      return { totalFaturamento, totalVendas };
    };

    const currentMonthSummary = calculateMonthlyTotals(true);
    const previousMonthSummary = calculateMonthlyTotals(false);

    // Atualiza os estados com os valores mensais
    setFaturamentoMesAtual(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(currentMonthSummary.totalFaturamento));
    setQuantidadeVendasMesAtual(currentMonthSummary.totalVendas);
    setFaturamentoMesAnterior(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(previousMonthSummary.totalFaturamento));
    setQuantidadeVendasMesAnterior(previousMonthSummary.totalVendas);

    // Calcular diferença percentual de faturamento mensal
    if (previousMonthSummary.totalFaturamento > 0) {
      const diferencaFaturamentoMes = ((currentMonthSummary.totalFaturamento - previousMonthSummary.totalFaturamento) / previousMonthSummary.totalFaturamento) * 100;
      setDiferencaPercentualFaturamentoMes(diferencaFaturamentoMes);
    } else {
      setDiferencaPercentualFaturamentoMes(currentMonthSummary.totalFaturamento > 0 ? 100 : 0);
    }

    // Calcular diferença percentual de vendas mensais
    if (previousMonthSummary.totalVendas > 0) {
      const diferencaVendasMes = ((currentMonthSummary.totalVendas - previousMonthSummary.totalVendas) / previousMonthSummary.totalVendas) * 100;
      setDiferencaPercentualVendasMes(diferencaVendasMes);
    } else {
      setDiferencaPercentualVendasMes(currentMonthSummary.totalVendas > 0 ? 100 : 0);
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
                  <span className={styles.valueToday}>{dateRange === 'currentMonth' ? faturamentoMesAtual : faturamentoAtual}</span><br />
                  <span className={styles.valueCompare}>{dateRange === 'currentMonth' ? faturamentoMesAnterior : faturamentoAnterior}</span><br />
                </>
              ) : item.id === 'vendas' ? (
                <>
                  <span className={styles.valueToday}>{dateRange === 'currentMonth' ? quantidadeVendasMesAtual : quantidadeVendasAtual}</span><br />
                  <span className={styles.valueCompare}>{dateRange === 'currentMonth' ? quantidadeVendasMesAnterior : quantidadeVendasAnterior}</span><br />
                </>
              ) : item.value}
            </p>
          </div>
          <div className={styles.topBarIcon}>
            <span className={`material-icons ${styles.icon}`}>{item.icon}</span>
            {/* Porcentagens do mês atual */}
            {item.id === 'faturamento' && dateRange === 'currentMonth' && (
              <span className={diferencaPercentualFaturamentoMes > 0 ? styles.positivo : styles.negativo}>
                {diferencaPercentualFaturamentoMes > 0 ? '↑' : '↓'} {Math.abs(diferencaPercentualFaturamentoMes).toFixed(2)}%
              </span>
            )}
            {item.id === 'vendas' && dateRange === 'currentMonth' && (
              <span className={diferencaPercentualVendasMes > 0 ? styles.positivo : styles.negativo}>
                {diferencaPercentualVendasMes > 0 ? '↑' : '↓'} {Math.abs(diferencaPercentualVendasMes).toFixed(2)}%
              </span>
            )}
            {/* Porcentagens para períodos anteriores */}
            {item.id === 'faturamento' && dateRange !== 'currentMonth' && (
              <span className={diferencaPercentualFaturamento > 0 ? styles.positivo : styles.negativo}>
                {diferencaPercentualFaturamento > 0 ? '↑' : '↓'} {Math.abs(diferencaPercentualFaturamento).toFixed(2)}%
              </span>
            )}
            {item.id === 'vendas' && dateRange !== 'currentMonth' && (
              <span className={diferencaPercentualVendas > 0 ? styles.positivo : styles.negativo}>
                {diferencaPercentualVendas > 0 ? '↑' : '↓'} {Math.abs(diferencaPercentualVendas).toFixed(2)}%
              </span>
            )}
          </div>
        </div>
      ))}
    </header>
  );
}

export default TopBar;
