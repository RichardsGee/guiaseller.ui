// src/components/ChartSection.jsx
import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Filler,
    PointElement
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from './ChartSection.module.css';
import ChartFilter from './ChartFilter';
import { getChartData } from './ChartData';
import { ThemeContext } from '../../context/ThemeContext';

const horizontalLinePlugin = {
    id: 'horizontalLine',
    afterDatasetsDraw: (chart) => {
        const { ctx, chartArea, scales } = chart;
        ctx.save();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;

        const value = chart.options.lineValue;
        const y = scales.y.getPixelForValue(value);

        ctx.beginPath();
        ctx.moveTo(chartArea.left, y);
        ctx.lineTo(chartArea.right, y);
        ctx.stroke();
        ctx.restore();
    }
};

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, Filler, PointElement, ChartDataLabels, horizontalLinePlugin);

const ChartSection = ({ salesData, dateRange, onDateRangeChange, blurChart }) => {
    const { theme } = useContext(ThemeContext);

    const { dataVendas, dataFaturamento, dataComparacao } = getChartData(salesData, dateRange);

    const textColor = theme === 'dark' ? '#ffffff' : '#333333';
    const tooltipBackgroundColor = theme === 'dark' ? 'rgba(50, 50, 50, 0.8)' : 'rgba(255, 255, 255, 0.9)';

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    lineWidth: 1,
                },
                ticks: {
                    color: textColor,
                    font: { size: 12 },
                    padding: 40,
                },
            },
            y: {
                ticks: {
                    color: textColor,
                    font: { size: 14 },
                },
            },
        },
        plugins: {
            legend: { labels: { color: textColor } },
            tooltip: {
                backgroundColor: tooltipBackgroundColor,
                titleColor: textColor,
                bodyColor: textColor,
            },
            datalabels: {
                anchor: 'end',
                align: 'end',
                color: textColor,
                font: { size: 14, weight: 'bold', family: 'Poppins, sans-serif' },
                formatter: (value) => value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
            },
        },
    };

    return (
        <div className={`${styles.chartSection} ${blurChart ? styles.blurred : ''}`}>
            <center><h2 className={styles.chartTitle}>Dashboard</h2></center>
            <ChartFilter dateRange={dateRange} onDateRangeChange={onDateRangeChange} />
            <div className={styles.chartContainer}>
                <div className={styles.chartWrapper}>
                    <h3>Quantidade de Vendas</h3>
                    {dataVendas && <Bar data={dataVendas} options={options} plugins={[ChartDataLabels]} />}
                </div>
                <div className={styles.chartWrapper}>
                    <h3>Faturamento</h3>
                    {dataFaturamento && <Bar data={dataFaturamento} options={options} plugins={[ChartDataLabels]} />}
                </div>
                <div className={styles.chartWrapper}>
                    <h3>Comparação</h3>
                    {dataComparacao && <Bar data={dataComparacao} options={options} plugins={[ChartDataLabels]} />}
                </div>
            </div>
        </div>
    );
};

export default ChartSection;
