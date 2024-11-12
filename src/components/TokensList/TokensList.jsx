import React from 'react';
import styles from './TokensList.module.css'; // Estilos locais

const TokensList = ({ selectedQuantity }) => {
  const tokenPrice = 4.99; // Preço por token

  // Exemplo de opções de compra com preços e horas de uso por plano
  const purchaseOptions = [
    { id: 1, quantity: 10, hours: { Pro: 0.5, Premium: 0.5, Fundador: 0.5 } },
    { id: 2, quantity: 25, hours: { Pro: 1, Premium: 1, Fundador: 1 } },
    { id: 3, quantity: 50, hours: { Pro: 2, Premium: 2, Fundador: 2 }, popular: true },
    { id: 4, quantity: 100, hours: { Pro: 4, Premium: 4, Fundador: 4 } },
    { id: 5, quantity: 200, hours: { Pro: 12, Premium: 12, Fundador: 12 } }
  ];

  // Obtém a opção de compra selecionada com base na quantidade
  const selectedOption = purchaseOptions.find(option => option.quantity === selectedQuantity);

  return (
    <ul className={styles.tokensList}>
      <li className={`${styles.tokenItem} ${selectedOption.popular ? styles.popular : ''}`}>
        <h2 className={styles.tokenName}>{selectedOption.quantity} Tokens</h2>
        <p className={styles.tokenPrice}>
          R$ {(tokenPrice * selectedOption.quantity).toFixed(2)}
        </p>

        {/* Informações sobre Usos e Benefícios */}
        <div className={styles.usageInfo}>
          <h4>Benefícios:</h4>
          <ul>
            <li>Utilização de ferramentas IA</li>
            <li>Compra de eBooks com tokens</li>
          </ul>
          <h4>Estimativa de Uso:</h4>
          <p>Pro: {selectedOption.hours.Pro} hora{selectedOption.hours.Pro > 1 ? 's' : ''}</p>
          <p>Premium: {selectedOption.hours.Premium} hora{selectedOption.hours.Premium > 1 ? 's' : ''}</p>
          <p>Fundador: {selectedOption.hours.Fundador} hora{selectedOption.hours.Fundador > 1 ? 's' : ''}</p>
        </div>

        <button className={styles.buyButton}>Comprar</button>
        {selectedOption.popular && <span className={styles.popularTag}>Popular</span>} {/* Tag Popular */}
      </li>
    </ul>
  );
};

export default TokensList;
