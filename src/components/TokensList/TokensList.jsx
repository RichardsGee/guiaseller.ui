import React from 'react';
import styles from './TokensList.module.css'; // Estilos locais

const TokensList = ({ selectedPlan }) => {
  const tokenPrice = 4.99; // Preço por token

  // Exemplo de opções de compra
  const purchaseOptions = [
    { id: 1, quantity: 10, hours: { Pro: 0.5, Premium: 0.5, Fundador: 0.5 } }, // 0.5 horas
    { id: 2, quantity: 25, hours: { Pro: 1, Premium: 1, Fundador: 1 }, },   // 1 hora
    { id: 3, quantity: 50, hours: { Pro: 2, Premium: 2, Fundador: 2 }, popular: true }, // 2 horas (Pro)
    { id: 4, quantity: 100, hours: { Pro: 4, Premium: 4, Fundador: 4 } },  // 4 horas (Premium)
    { id: 5, quantity: 200, hours: { Pro: 12, Premium: 12, Fundador: 12 } }  // 12 horas (Fundador)
  ];

  return (
    <ul className={styles.tokensList}>
      {purchaseOptions.map(option => (
        <li key={option.id} className={`${styles.tokenItem} ${option.popular ? styles.popular : ''}`}>
          <h2 className={styles.tokenName}>{option.quantity} Tokens</h2>
          <p className={styles.tokenPrice}>
            R$ {(tokenPrice * option.quantity).toFixed(2)} 
            {selectedPlan > 1 && (
              <span className={styles.installmentText}>
                {' '}ou {((tokenPrice * option.quantity) / selectedPlan).toFixed(2)} por mês
              </span>
            )}
          </p>

          {/* Adicionando informações sobre usos e benefícios */}
          <div className={styles.usageInfo}>
            <h4>Benefícios:</h4>
            <ul>
              <li>Utilização de ferramentas IA</li>
              <li>Compra de eBooks com tokens</li>
            </ul>
            <h4>Estimativa de Uso:</h4>
            <p>Pro: {option.hours.Pro} hora{option.hours.Pro > 1 ? 's' : ''}</p>
            <p>Premium: {option.hours.Premium} hora{option.hours.Premium > 1 ? 's' : ''}</p>
            <p>Fundador: {option.hours.Fundador} hora{option.hours.Fundador > 1 ? 's' : ''}</p>
          </div>

          <button className={styles.buyButton}>Comprar</button>
          {option.popular && <span className={styles.popularTag}>Popular</span>} {/* Tag Popular */}
        </li>
      ))}
    </ul>
  );
};

export default TokensList;
