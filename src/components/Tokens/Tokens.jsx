import React, { useState } from 'react';
import styles from './Tokens.module.css'; // Importando o CSS Module para Tokens
import tokenIcon from '../../assets/tokens.png'; // Importando o arquivo PNG

const Tokens = ({ count }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Função para alternar o estado de hover
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className={styles.tokensContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Removi o alert aqui
    >
      <img src={tokenIcon} alt="Tokens" className={styles.tokenIcon} />
      {/* Alteração de texto ao passar o mouse */}
      <span className={styles.tokenText}>
        {isHovered ? 'Comprar Tokens' : `Tokens: ${count}`}
      </span>
    </div>
  );
};

export default Tokens;
