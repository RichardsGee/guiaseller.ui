import React from 'react';
import styles from './IAButton.module.css'; // Certifique-se de que o nome do arquivo está correto
import { Button } from '@mui/material'; // Importando o componente Button do MUI
import WidgetsIcon from '@mui/icons-material/Widgets'; // Ícone para Ferramentas IA

function IAButton() {
  const handleClick = () => {
    alert('Ferramentas IA clicadas!'); // Ação ao clicar no botão
  };

  return (
    <div className={styles.iaButtonContainer}>
      <Button 
        variant="contained" 
        color="primary" 
        className={styles.iaButton}
        onClick={handleClick}
      >
        <WidgetsIcon />
      </Button>
    </div>
  );
}

export default IAButton;
