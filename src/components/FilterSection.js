// src/components/FilterSection.js
import React, { useState } from 'react';

function FilterSection() {
  const [showCustomDate, setShowCustomDate] = useState(false);

  const handleSelectChange = (event) => {
    setShowCustomDate(event.target.value === 'personalizado');
  };

  return (
    <div className="filter-section">
      <label htmlFor="filterSelect">Filtro:</label>
      <select id="filterSelect" onChange={handleSelectChange}>
        <option value="hoje">Hoje</option>
        <option value="7dias">Últimos 7 Dias</option>
        <option value="15dias">Últimos 15 Dias</option>
        <option value="30dias">Últimos 30 Dias</option>
        <option value="personalizado">Personalizado</option>
      </select>

      {showCustomDate && (
        <div id="customDateInputs">
          <label htmlFor="startDate">Data Início:</label>
          <input type="date" id="startDate" />
          <label htmlFor="endDate">Data Fim:</label>
          <input type="date" id="endDate" />
        </div>
      )}
      <button id="filterBtn">Filtrar</button>
    </div>
  );
}

export default FilterSection;
