// src/components/Tokens/Tokens.jsx
import React from 'react';
import styles from './Tokens.module.css'; // Importando o CSS Module para Tokens
import tokenIcon from '../../assets/tokens.png'; // Importando o arquivo PNG

const Tokens = ({ count }) => {
  return (
    <div className={styles.tokensContainer}>
      {/* Usando a imagem PNG em vez do ícone Material */}
      <img src={tokenIcon} alt="Tokens" className={styles.tokenIcon} />
      <span className={styles.tokenText}>Tokens: {count}</span>
    </div>
  );
};

export default Tokens;
