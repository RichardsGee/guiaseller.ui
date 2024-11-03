import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import styles from './ChartSection.module.css';
import ChartFilter from './ChartFilter';

// Registrar os componentes do Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ChartSection = ({ salesData, dateRange, onDateRangeChange }) => {
  const today = new Date();

  // Função para calcular resumo para os últimos X dias
  const calculateSummary = (days) => {
    const startDate = new Date();
    startDate.setDate(today.getDate() - days);

    let totalSales = 0;
    let totalRevenue = 0;

    salesData.forEach(sale => {
      const dateCreated = new Date(sale.date_created);
      if (dateCreated >= startDate && dateCreated <= today) {
        totalSales += 1;
        totalRevenue += sale.total_amount || 0;
      }
    });

    return { totalSales, totalRevenue };
  };

  // Resumos individuais
  const summary7d = calculateSummary(7);
  const summary15d = calculateSummary(15);
  const summary30d = calculateSummary(30);

  // Resumos para comparação
  const calculateComparison = (days) => {
    const startDate = new Date();
    startDate.setDate(today.getDate() - (days + 7)); // Para os dias anteriores

    let totalSales = 0;
    let totalRevenue = 0;

    salesData.forEach(sale => {
      const dateCreated = new Date(sale.date_created);
      if (dateCreated >= startDate && dateCreated < today) {
        totalSales += 1;
        totalRevenue += sale.total_amount || 0;
      }
    });

    return { totalSales, totalRevenue };
  };

  const comparison7d = calculateComparison(7);
  const comparison1d = calculateComparison(1); // Comparação de Hoje com Ontem

  // Dados para o gráfico
  let dataVendas, dataFaturamento;

  if (dateRange === '7d') {
    dataVendas = {
      labels: ['7 Dias Anteriores', 'Últimos 7 Dias'],
      datasets: [
        {
          label: 'Quantidade de Vendas',
          data: [comparison7d.totalSales, summary7d.totalSales],
          backgroundColor: ['rgba(75, 192, 192, 0.4)', 'rgba(75, 192, 192, 0.6)'],
          borderColor: ['rgba(75, 192, 192, 0.7)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1,
        },
      ],
    };

    dataFaturamento = {
      labels: ['7 Dias Anteriores', 'Últimos 7 Dias'],
      datasets: [
        {
          label: 'Faturamento',
          data: [comparison7d.totalRevenue, summary7d.totalRevenue],
          backgroundColor: ['rgba(255, 99, 132, 0.4)', 'rgba(255, 99, 132, 0.6)'],
          borderColor: ['rgba(255, 99, 132, 0.7)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    };
  } else if (dateRange === '1d') {
    const todaySales = salesData.filter(sale => new Date(sale.date_created).toDateString() === today.toDateString());
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdaySales = salesData.filter(sale => new Date(sale.date_created).toDateString() === yesterday.toDateString());

    dataVendas = {
      labels: ['Ontem', 'Hoje'],
      datasets: [
        {
          label: 'Quantidade de Vendas',
          data: [yesterdaySales.length, todaySales.length],
          backgroundColor: ['rgba(75, 192, 192, 0.4)', 'rgba(75, 192, 192, 0.6)'],
          borderColor: ['rgba(75, 192, 192, 0.7)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1,
        },
      ],
    };

    dataFaturamento = {
      labels: ['Ontem', 'Hoje'],
      datasets: [
        {
          label: 'Faturamento',
          data: [
            yesterdaySales.reduce((acc, sale) => acc + (sale.total_amount || 0), 0),
            todaySales.reduce((acc, sale) => acc + (sale.total_amount || 0), 0),
          ],
          backgroundColor: ['rgba(255, 99, 132, 0.4)', 'rgba(255, 99, 132, 0.6)'],
          borderColor: ['rgba(255, 99, 132, 0.7)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    };
  } else {
    // Para outros períodos, mantenha os dados simples
    const labels = dateRange === '15d' ? ['15 Dias Anteriores', 'Últimos 15 Dias'] : ['30 Dias Anteriores', 'Últimos 30 Dias'];

    dataVendas = {
      labels: labels,
      datasets: [
        {
          label: 'Quantidade de Vendas',
          data: [
            dateRange === '15d' ? calculateComparison(15).totalSales : calculateComparison(30).totalSales,
            dateRange === '15d' ? summary15d.totalSales : summary30d.totalSales,
          ],
          backgroundColor: ['rgba(75, 192, 192, 0.4)', 'rgba(75, 192, 192, 0.6)'],
          borderColor: ['rgba(75, 192, 192, 0.7)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1,
        },
      ],
    };

    dataFaturamento = {
      labels: labels,
      datasets: [
        {
          label: 'Faturamento',
          data: [
            dateRange === '15d' ? calculateComparison(15).totalRevenue : calculateComparison(30).totalRevenue,
            dateRange === '15d' ? summary15d.totalRevenue : summary30d.totalRevenue,
          ],
          backgroundColor: ['rgba(255, 99, 132, 0.4)', 'rgba(255, 99, 132, 0.6)'],
          borderColor: ['rgba(255, 99, 132, 0.7)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    };
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.chartSection}>
      <h2 className={styles.chartTitle}>Gráficos de Vendas e Faturamento</h2>
      <ChartFilter dateRange={dateRange} onDateRangeChange={onDateRangeChange} />
      <div className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          <h3>Total de Vendas</h3>
          <Bar data={dataVendas} options={options} />
        </div>
        <div className={styles.chartWrapper}>
          <h3>Faturamento</h3>
          <Bar data={dataFaturamento} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
