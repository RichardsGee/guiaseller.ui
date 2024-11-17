import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Importa o AuthContext
import styles from './UserLevel.module.css'; // Importa os estilos específicos para o UserLevel
import { Person, AdminPanelSettings, Diamond, Grade } from '@mui/icons-material'; // Importa ícones do Material-UI

const UserLevel = () => {
  const { userLevel } = useContext(AuthContext); // Pega o nível do usuário do contexto
  
  console.log("UserLevel:", userLevel); // Log para verificar o valor de userLevel

  // Determina a classe de cor baseada no nível do usuário
  const userLevelClass = (() => {
    switch(userLevel) {
      case 'Admin':
        return styles.adminLevel; // Classe para admin
      case 'basic':
        return styles.basicLevel; // Classe para usuário básico
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

  // Função para determinar o ícone baseado no nível do usuário
  const getUserLevelIcon = () => {
    const iconStyle = {
      width: '20px', // Largura do ícone
      height: '20px', // Altura do ícone
      marginRight: '6px', // Espaço entre o ícone e o texto
      marginTop: '0px', // Ajusta a posição vertical do ícone
      alignSelf: 'center', // Alinha verticalmente
    };

    switch (userLevel) {
      case 'Admin':
        return <AdminPanelSettings style={iconStyle} />; // Ícone para admin
      case 'basic':
        return <Person style={iconStyle} />; // Ícone para usuário básico
      case 'pro':
        return <Grade style={iconStyle} />; // Ícone para pro
      case 'premium':
        return <Diamond style={iconStyle} />; // Ícone para premium
      case 'Founder':
        return <Grade style={iconStyle} />; // Usando o mesmo ícone ou outro para o fundador
      default:
        return null; // Nenhum ícone para níveis desconhecidos
    }
  };

  return (
    <div className={`${styles.userLevelContainer} ${userLevelClass}`}> {/* Container com classe do nível do usuário */}
      {getUserLevelIcon()} {/* Exibe o ícone correspondente */}
      <span className={styles.userLevel}>
        {userLevel ? userLevel.toUpperCase() : "NADA"} {/* Converte para maiúsculas */}
      </span>
    </div>
  );
};

export default UserLevel;
