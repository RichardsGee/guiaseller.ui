// src/components/ChartFilter/ChartFilter.jsx
import React from 'react';
import styles from './ChartFilter.module.css';

const ChartFilter = ({ dateRange, onDateRangeChange }) => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterWrapper}>
        <label htmlFor="dateRangeSelect">Filtrar por Período:</label>
        <select
          id="dateRangeSelect"
          onChange={(e) => onDateRangeChange(e.target.value)}
          value={dateRange}
          className={styles.select}
        >
          <option value="currentMonth">Mês Atual</option>
          <option value="30d">Últimos 30 dias</option>
          <option value="15d">Últimos 15 dias</option>
          <option value="7d">Últimos 7 dias</option>
          <option value="1d">Hoje</option>
        </select>
      </div>
    </div>
  );
};

export default ChartFilter;
