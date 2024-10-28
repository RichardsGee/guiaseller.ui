import React from 'react';
import styles from './IAButton.module.css'; // Verifique se o nome do arquivo está correto
import { Button } from '@mui/material'; // Importando o componente Button do MUI
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // Importando o ícone do WhatsApp

function IAButton() {
  const handleClick = () => {
    alert('Ferramentas IA clicadas!'); // Ação ao clicar no botão
  };

  return (
    <div className={styles.iaButtonContainer}>
      <div className={styles.buttonWrapper}>
        <Button 
          variant="contained" 
          className={styles.iaButton} // Estilo do botão "IA"
          onClick={handleClick}
        >
          IA {/* Texto para indicar a função do botão */}
        </Button>
      </div>
      <div className={styles.buttonWrapper}>
        <Button 
          variant="contained" 
          className={styles.whatsappButton} // Estilo do botão do WhatsApp
          onClick={() => alert('WhatsApp clicado!')} // Ação ao clicar no WhatsApp
        >
          <WhatsAppIcon className={styles.whatsappIcon} /> {/* Ícone do WhatsApp */}
        </Button>
      </div>
    </div>
  );
}

export default IAButton;
