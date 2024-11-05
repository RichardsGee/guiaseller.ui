import React from 'react';
import styles from './IAButton.module.css'; // Verifique se o nome do arquivo está correto
import { Button } from '@mui/material'; // Importando o componente Button do MUI
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // Importando o ícone do WhatsApp

function IAButton() {
  const handleClickIA = () => {
    alert('Ferramentas IA clicadas!'); // Ação ao clicar no botão IA
  };

  const handleClickWhatsApp = () => {
    window.open(
      'https://wa.me/5514981914741?text=Olá%2C%20sou%20cliente%20do%20GuiaSeller%20e%20tenho%20algumas%20dúvidas%2C%20a%20equipe%20de%20vocês%20poderia%20me%20auxiliar%3F',
      '_blank'
    );
  };

  return (
    <div className={styles.IAButtonContainer}>
      <div className={styles.buttonWrapper}>
        <Button 
          variant="contained" 
          className={styles.IAButton} // Estilo do botão "IA"
          onClick={handleClickIA}
        >
          IA {/* Texto para indicar a função do botão */}
        </Button>
      </div>
      <div className={styles.buttonWrapper}>
        <Button 
          variant="contained" 
          className={styles.whatsappButton} // Estilo do botão do WhatsApp
          onClick={handleClickWhatsApp}
        >
          <WhatsAppIcon className={styles.whatsappIcon} /> {/* Ícone do WhatsApp */}
        </Button>
      </div>
    </div>
  );
}

export default IAButton;
