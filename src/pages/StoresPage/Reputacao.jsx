import React from 'react';
import styles from './Reputacao.module.css'; // Importando o CSS específico

const ReputacaoContent = ({ storeDetails, reputationData }) => {
  // Dividindo o levelId em número e cor (ex: 5_green)
  const [levelNumber, levelColor] = storeDetails?.levelId?.split('_') || ['0', ''];

  // Função para obter a cor correspondente ao nível
  const getLevelColor = (levelColor) => {
    switch (levelColor) {
      case "green":
        return "#2ecc71"; // Verde claro
      case "darkgreen":
        return "#27ae60"; // Verde escuro
      case "yellow":
        return "#f1c40f"; // Amarelo
      case "orange":
        return "#f39c12"; // Laranja
      case "red":
        return "#e74c3c"; // Vermelho
      case "blue":
        return "#3498db"; // Azul
      default:
        return "#bdc3c7"; // Cinza
    }
  };

  // Cor da barra baseada no levelColor
  const barColor = getLevelColor(levelColor);

  // Função para determinar a visibilidade das barras
  const getBarOpacity = (level) => {
    return level === levelNumber ? 1 : 0.5; // 100% para o nível ativo, 50% para os outros
  };

  // Função para arredondar as porcentagens
  const formatPercentage = (rate) => (rate * 100).toFixed(2) + '%';

  return (
    <div>
      <h2>Reputação da Loja</h2>

      {/* Card de Status de Reputação */}
      <div className={styles.reputationContainer}>
        <div className={styles.reputationCard}>
          <h4>Status Mercado Livre</h4>
          <p>{storeDetails.powerSellerStatus || 'Dados não disponíveis'}</p>
        </div>

        {/* Card de Total de Vendas */}
        <div className={styles.reputationCard}>
          <h4>Total de Vendas</h4>
          <p>{storeDetails.totalSales || 'Dados não disponíveis'}</p>
        </div>

        {/* Card de Nível de Vendedor */}
        <div className={styles.reputationCard}>
          <h4>Nível do Vendedor</h4>
          
          {/* Barra de Nível com 5 níveis lado a lado */}
          <div className={styles.levelBarContainer}>
            <div
              className={`${styles.levelProgress} ${levelNumber === "1" ? styles.active : ""}`}
              style={{
                backgroundColor: "#e74c3c", // Vermelho
                opacity: getBarOpacity(1),
              }}
            />
            <div
              className={`${styles.levelProgress} ${levelNumber === "2" ? styles.active : ""}`}
              style={{
                backgroundColor: "#f39c12", // Laranja
                opacity: getBarOpacity(2),
              }}
            />
            <div
              className={`${styles.levelProgress} ${levelNumber === "3" ? styles.active : ""}`}
              style={{
                backgroundColor: "#f1c40f", // Amarelo
                opacity: getBarOpacity(3),
              }}
            />
            <div
              className={`${styles.levelProgress} ${levelNumber === "4" ? styles.active : ""}`}
              style={{
                backgroundColor: "#2ecc71", // Verde claro
                opacity: getBarOpacity(4),
              }}
            />
            <div
              className={`${styles.levelProgress} ${levelNumber === "5" ? styles.active : ""}`}
              style={{
                backgroundColor: "#27ae60", // Verde escuro
                opacity: getBarOpacity(5),
              }}
            />
          </div>
          
          <p>{`${levelNumber} - ${levelColor.charAt(0).toUpperCase() + levelColor.slice(1)}`}</p>
        </div>
        
        {/* Campos de Cancelamento, Mediação, Atrasos */}
        <div className={styles.reputationCard}>
          <h4>Cancelamentos</h4>
          <p>{reputationData?.cancellations || 'Dados não disponíveis'}</p>
          <p>Taxa de Cancelamento: {formatPercentage(reputationData?.cancellationsRate)}</p>
        </div>
        
        <div className={styles.reputationCard}>
          <h4>Mediação</h4>
          <p>{reputationData?.mediation || 'Dados não disponíveis'}</p>
          <p>Taxa de Mediação: {formatPercentage(reputationData?.mediationRate)}</p>
        </div>
        
        <div className={styles.reputationCard}>
          <h4>Atrasos</h4>
          <p>{reputationData?.delays || 'Dados não disponíveis'}</p>
          <p>Taxa de Atraso: {formatPercentage(reputationData?.delaysRate)}</p>
        </div>

        <div className={styles.reputationCard}>
          <h4>Vendas Completadas (60 dias)</h4>
          <p>{reputationData?.salesCompleted || 'Dados não disponíveis'}</p>
        </div>
      </div>
    </div>
  );
};

export default ReputacaoContent;
