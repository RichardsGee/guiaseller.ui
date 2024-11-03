import React from 'react';
import styles from './ChartFilter.module.css';

const ChartFilter = ({ dateRange, onDateRangeChange }) => {
  return (
    <div className={styles.filterContainer}>
      <h3>Filtrar por Período:</h3>
      <select onChange={(e) => onDateRangeChange(e.target.value)} value={dateRange}>
        <option value="30d">Últimos 30 dias</option>
        <option value="15d">Últimos 15 dias</option>
        <option value="7d">Últimos 7 dias</option>
        <option value="1d">Hoje</option>
      </select>
    </div>
  );
};

export default ChartFilter;
