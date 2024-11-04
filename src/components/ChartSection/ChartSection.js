import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, Filler, PointElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from './ChartSection.module.css'; // Importando os estilos
import ChartFilter from './ChartFilter';
import { getChartData } from './ChartData'; 

// Definindo o plugin para desenhar a linha horizontal
const horizontalLinePlugin = {
    id: 'horizontalLine',
    afterDatasetsDraw: (chart) => {
        const { ctx, chartArea, scales } = chart;
        ctx.save();
        ctx.strokeStyle = 'red'; // Cor da linha
        ctx.lineWidth = 2; // Espessura da linha

        const value = chart.options.lineValue; // Valor que você deseja marcar
        const y = scales.y.getPixelForValue(value); // Posição Y da linha

        ctx.beginPath();
        ctx.moveTo(chartArea.left, y); // Começa na borda esquerda do gráfico
        ctx.lineTo(chartArea.right, y); // Termina na borda direita do gráfico
        ctx.stroke();
        ctx.restore();
    }
};

// Registrar os componentes do Chart.js, incluindo ChartDataLabels
ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, Filler, PointElement, ChartDataLabels, horizontalLinePlugin);

const ChartSection = ({ salesData, dateRange, onDateRangeChange }) => {
    const { dataVendas, dataFaturamento, dataComparacao } = getChartData(salesData, dateRange); 

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
                    padding: 50, // Aumentar o espaço antes do label
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
            datalabels: {
                anchor: 'end',
                align: 'end',
                color: 'white',
                font: {
                    size: 12,
                    weight: 'bold',
                    family: 'Poppins, sans-serif',
                },
                formatter: (value) => {
                    return value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
                },
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
                    {dataVendas && <Bar data={dataVendas} options={options} plugins={[ChartDataLabels]} />}
                </div>
                <div className={styles.chartWrapper}>
                    <h3>Faturamento</h3>
                    {dataFaturamento && <Bar data={dataFaturamento} options={options} plugins={[ChartDataLabels]} />}
                </div>
                <div className={styles.chartWrapper}>
                    <h3>Comparação de Vendas</h3>
                    {dataComparacao && <Bar data={dataComparacao} options={options} plugins={[ChartDataLabels]} />}
                </div>
            </div>
        </div>
    );
};

export default ChartSection;
