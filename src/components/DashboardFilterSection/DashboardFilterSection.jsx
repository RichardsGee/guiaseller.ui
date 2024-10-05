import React from 'react';
import styles from './dashboardFilterSection.module.css'; // Importando o CSS específico para o Dashboard

function DashboardFilterSection() {
  return (
    <div className={styles.filterSection}>
      <label htmlFor="dateFilter">Filtrar por data:</label>
      <select id="dateFilter" className={styles.filterSelect}>
        <option value="today">Hoje</option>
        <option value="last7days">Últimos 7 dias</option>
        <option value="last30days">Últimos 30 dias</option>
        <option value="custom">Personalizado</option>
      </select>

      {/* Adicione outros filtros ou botões conforme necessário */}
      <button className={styles.filterButton}>Aplicar Filtros</button>
    </div>
  );
}

export default DashboardFilterSection;
