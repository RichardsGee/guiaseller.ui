import React from 'react';
import styles from './TokensList.module.css'; // Estilos locais

const TokensList = ({ selectedQuantity }) => {
  const tokenPrice = 4.99; // Preço por token

  // Exemplo de opções de compra com preços e horas de uso por plano
  const purchaseOptions = [
    { id: 1, quantity: 10, discount: 0, hours: { Pro: 0.5, Premium: 0.5, Fundador: 0.5 } },
    { id: 2, quantity: 25, discount: 0, hours: { Pro: 1, Premium: 1, Fundador: 1 } },
    { id: 3, quantity: 50, discount: 10, hours: { Pro: 2, Premium: 2, Fundador: 2 }, popular: true },
    { id: 4, quantity: 100, discount: 15, hours: { Pro: 4, Premium: 4, Fundador: 4 } },
    { id: 5, quantity: 200, discount: 20, hours: { Pro: 12, Premium: 12, Fundador: 12 } }
  ];

  // Obtém a opção de compra selecionada com base na quantidade
  const selectedOption = purchaseOptions.find(option => option.quantity === selectedQuantity);

  // Cálculo do preço com e sem desconto
  const originalPrice = tokenPrice * selectedOption.quantity;
  const discountedPrice = originalPrice * (1 - selectedOption.discount / 100);

  return (
    <ul className={styles.tokensList}>
      <li className={`${styles.tokenItem} ${selectedOption.popular ? styles.popular : ''}`}>
        <h2 className={styles.tokenName}>{selectedOption.quantity} Tokens</h2>

        {/* Exibição do preço original e o preço com desconto */}
        <p className={styles.tokenPrice}>
          {selectedOption.discount > 0 ? (
            <>
              <span className={styles.originalPrice}>R$ {originalPrice.toFixed(2)}</span>
              <span className={styles.discountedPrice}> R$ {discountedPrice.toFixed(2)}</span>
            </>
          ) : (
            <>R$ {originalPrice.toFixed(2)}</>
          )}
        </p>

        {/* Desconto - Agora fica abaixo do preço */}
        {selectedOption.discount > 0 && (
          <p className={styles.discountTag}>Desconto de {selectedOption.discount}%</p>
        )}

        {/* Informações sobre Benefícios */}
        <div className={styles.usageInfo}>
          <h4>Benefícios:</h4>
          <ul>
            <li>Utilização de ferramentas IA</li>
            <li>Compra de eBooks com tokens</li>
          </ul>
        </div>

        {/* Botão de Compra */}
        <button className={styles.buyButton}>Comprar</button>

        {/* Tag Popular */}
        {selectedOption.popular && <span className={styles.popularTag}>Popular</span>}
      </li>
    </ul>
  );
};

export default TokensList;
