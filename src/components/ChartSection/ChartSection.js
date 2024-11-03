import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
import styles from './ChartSection.module.css'; // Importando o CSS

// Registrar os componentes do Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement);

const ChartSection = () => {
  // Dados fictícios para os últimos 12 meses
  const mockDataVendas = [
    { month: 'Janeiro', quantidade: 60 },
    { month: 'Fevereiro', quantidade: 50 },
    { month: 'Março', quantidade: 80 },
    { month: 'Abril', quantidade: 40 },
    { month: 'Maio', quantidade: 70 },
    { month: 'Junho', quantidade: 30 },
    { month: 'Julho', quantidade: 90 },
    { month: 'Agosto', quantidade: 20 },
    { month: 'Setembro', quantidade: 100 },
    { month: 'Outubro', quantidade: 75 },
    { month: 'Novembro', quantidade: 34 },
    { month: 'Dezembro', quantidade: 80 },
  ];

  const mockDataFaturamento = [
    { month: 'Janeiro', faturamento: 6000 },
    { month: 'Fevereiro', faturamento: 5000 },
    { month: 'Março', faturamento: 8000 },
    { month: 'Abril', faturamento: 4000 },
    { month: 'Maio', faturamento: 7000 },
    { month: 'Junho', faturamento: 3000 },
    { month: 'Julho', faturamento: 9000 },
    { month: 'Agosto', faturamento: 2000 },
    { month: 'Setembro', faturamento: 10000 },
    { month: 'Outubro', faturamento: 7500 },
    { month: 'Novembro', faturamento: 3400 },
    { month: 'Dezembro', faturamento: 8000 },
  ];

  const dataVendas = {
    labels: mockDataVendas.map(item => item.month),
    datasets: [
      {
        label: 'Quantidade de Vendas',
        data: mockDataVendas.map(item => item.quantidade),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        type: 'bar',
      },
      {
        label: 'Linha de Tendência de Vendas',
        data: mockDataVendas.map(item => item.quantidade),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false, // Não preencher a área sob a linha
        type: 'line', // Define o tipo de gráfico como linha
      },
    ],
  };

  const dataFaturamento = {
    labels: mockDataFaturamento.map(item => item.month),
    datasets: [
      {
        label: 'Faturamento',
        data: mockDataFaturamento.map(item => item.faturamento),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        type: 'bar',
      },
      {
        label: 'Linha de Tendência de Faturamento',
        data: mockDataFaturamento.map(item => item.faturamento),
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false, // Não preencher a área sob a linha
        type: 'line', // Define o tipo de gráfico como linha
      },
    ],
  };

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
      <h2 className={styles.chartTitle}>Gráficos de Vendas e Faturamento (Últimos 12 Meses)</h2>
      <div className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          <h3>Gráfico de Vendas</h3>
          <Bar className={styles.chart} data={dataVendas} options={options} />
        </div>
        <div className={styles.chartWrapper}>
          <h3>Gráfico de Faturamento</h3>
          <Bar className={styles.chart} data={dataFaturamento} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
