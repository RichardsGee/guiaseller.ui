import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, Filler, PointElement } from 'chart.js';
import styles from './ChartSection.module.css';
import ChartFilter from './ChartFilter';
import { getChartData } from './ChartData'; // Importa a nova função

// Registrar os componentes do Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, Filler, PointElement);

const ChartSection = ({ salesData, dateRange, onDateRangeChange }) => {
    const { dataVendas, dataFaturamento, dataComparacao } = getChartData(salesData, dateRange); // Usa a nova função para obter os dados

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    lineWidth: 1,
                },
                ticks: {
                    color: '#333',
                    font: {
                        size: 14,
                    },
                },
            },
            y: {
                ticks: {
                    color: '#333',
                    font: {
                        size: 14,
                    },
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: '#333',
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
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
                <div className={styles.chartWrapper}>
                    <h3>Comparação de Vendas</h3>
                    <Bar data={dataComparacao} options={options} />
                </div>
            </div>
        </div>
    );
};

export default ChartSection;
