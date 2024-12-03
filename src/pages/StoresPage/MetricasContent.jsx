import React from 'react';
import styles from './Metricas.module.css'; // Importando o CSS específico

const MetricasContent = ({ storeDetails }) => (
  <div>
    <h2>Métricas Gerais</h2>

    {/* Card de Estatísticas totais de vendas */}
    <div className={styles.metricContainer}>
      <div className={styles.metricCard}>
        <h4>Estatísticas totais de vendas</h4>
        <div className={styles.item}>
          <span>Hoje / Ontem</span>
          <span>{storeDetails.todaySales || 'Dados não disponíveis'} / {storeDetails.yesterdaySales || 'Dados não disponíveis'}</span>
        </div>
        <div className={styles.item}>
          <span>Esta Semana / Semana Passada</span>
          <span>{storeDetails.thisWeekSales || 'Dados não disponíveis'} / {storeDetails.lastWeekSales || 'Dados não disponíveis'}</span>
        </div>
        <div className={styles.item}>
          <span>Este Mês / Mês Anterior</span>
          <span>{storeDetails.thisMonthSales || 'Dados não disponíveis'} / {storeDetails.lastMonthSales || 'Dados não disponíveis'}</span>
        </div>
        <div className={styles.item}>
          <span>Vendas Canceladas</span>
          <span>{storeDetails.cancelledSales || 'Dados não disponíveis'}</span>
        </div>
      </div>

      {/* Card de Estatísticas da Conta */}
      <div className={styles.metricCard}>
        <h4>Estatísticas da Conta</h4>
        <div className={styles.item}>
          <span>Visitas</span>
          <span>{storeDetails.visits || 'Dados não disponíveis'}</span>
        </div>
        <div className={styles.item}>
          <span>Conversão</span>
          <span>{storeDetails.conversion || 'Dados não disponíveis'}</span>
        </div>
        <div className={styles.item}>
          <span>Perguntas</span>
          <span>{storeDetails.questions || 'Dados não disponíveis'}</span>
        </div>
      </div>

      {/* Card de Envios */}
      <div className={styles.metricCard}>
        <h4>Envios</h4>
        <div className={styles.item}>
          <span>Flex Pendentes</span>
          <span>{storeDetails.pendingShipments || 'Dados não disponíveis'}</span>
        </div>
        <div className={styles.item}>
          <span>Etiquetas prontas</span>
          <span>{storeDetails.readyLabels || 'Dados não disponíveis'}</span>
        </div>
        <div className={styles.item}>
          <span>Entregas a Combinar</span>
          <span>{storeDetails.deliveriesToArrange || 'Dados não disponíveis'}</span>
        </div>
      </div>
    </div>
  </div>
);

export default MetricasContent;
