// src/components/FilterSection.js
import React, { useState } from 'react';
import styles from '../styles/filter.module.css'; // Importando o CSS Module

function FilterSection() {
  const [showCustomDate, setShowCustomDate] = useState(false);

  const handleSelectChange = (event) => {
    setShowCustomDate(event.target.value === 'personalizado');
  };

  return (
    <div className={styles.filterSection}>
      <label htmlFor="filterSelect">Filtro:</label>
      <select id="filterSelect" onChange={handleSelectChange}>
        <option value="hoje">Hoje</option>
        <option value="7dias">Últimos 7 Dias</option>
        <option value="15dias">Últimos 15 Dias</option>
        <option value="30dias">Últimos 30 Dias</option>
        <option value="personalizado">Personalizado</option>
      </select>

      {showCustomDate && (
        <div id="customDateInputs" className={styles.customDateInputs}>
          <label htmlFor="startDate">Data Início:</label>
          <input type="date" id="startDate" />
          <label htmlFor="endDate">Data Fim:</label>
          <input type="date" id="endDate" />
        </div>
      )}
      <button id="filterBtn" className={styles.filterButton}>Filtrar</button>
    </div>
  );
}

export default FilterSection;
