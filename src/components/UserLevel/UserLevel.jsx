import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './UserLevel.module.css';
import { Person, AdminPanelSettings, Diamond, Grade } from '@mui/icons-material';

const UserLevel = () => {
  const { userLevel: contextUserLevel } = useContext(AuthContext); // Valor do contexto
  const [userLevel, setUserLevel] = useState(() => {
    // Inicializa o estado com o valor armazenado ou do contexto
    return localStorage.getItem('userLevel') || contextUserLevel;
  });

  useEffect(() => {
    // Atualiza o localStorage e o estado apenas na primeira vez
    if (!localStorage.getItem('userLevel')) {
      localStorage.setItem('userLevel', contextUserLevel);
      setUserLevel(contextUserLevel);
    }
  }, [contextUserLevel]);

  // Determina a classe de cor baseada no nível do usuário
  const userLevelClass = (() => {
    switch (userLevel) {
      case 'Admin':
        return styles.adminLevel;
      case 'basic':
        return styles.basicLevel;
      case 'pro':
        return styles.proLevel;
      case 'premium':
        return styles.premiumLevel;
      case 'Founder':
        return styles.founderLevel;
      default:
        return styles.defaultLevel;
    }
  })();

  // Função para determinar o ícone baseado no nível do usuário
  const getUserLevelIcon = () => {
    const iconStyle = {
      width: '20px',
      height: '20px',
      marginRight: '6px',
      alignSelf: 'center',
    };

    switch (userLevel) {
      case 'Admin':
        return <AdminPanelSettings style={iconStyle} />;
      case 'basic':
        return <Person style={iconStyle} />;
      case 'pro':
        return <Grade style={iconStyle} />;
      case 'premium':
        return <Diamond style={iconStyle} />;
      case 'Founder':
        return <Grade style={iconStyle} />;
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.userLevelContainer} ${userLevelClass}`}>
      {getUserLevelIcon()}
      <span className={styles.userLevel}>
        {userLevel ? userLevel.toUpperCase() : 'NADA'}
      </span>
    </div>
  );
};

export default UserLevel;
