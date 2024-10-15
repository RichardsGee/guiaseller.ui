import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Importa o AuthContext
import styles from './UserLevel.module.css'; // Importa os estilos específicos para o UserLevel

const UserLevel = () => {
  const { userLevel } = useContext(AuthContext); // Pega o nível do usuário do contexto

  // Determina a classe de cor baseada no nível do usuário
  const userLevelClass = (() => {
    switch(userLevel) {
      case 'Admin':
        return styles.adminLevel; // Classe para admin
      case 'basic':
        return styles.userLevel; // Classe para usuário
      case 'pro':
        return styles.proLevel; // Classe para pro
      case 'premium':
        return styles.premiumLevel; // Classe para premium
      case 'Founder':
        return styles.founderLevel; // Classe para founder
      default:
        return styles.defaultLevel; // Classe padrão
    }
  })();

  return (
    <span className={`${styles.userLevel} ${userLevelClass}`}>
      {userLevel || "Nada"}
    </span>
  );
};

export default UserLevel;
