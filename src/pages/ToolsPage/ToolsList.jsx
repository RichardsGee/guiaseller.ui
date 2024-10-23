// ToolsList.jsx
import React from 'react';
import styles from './ToolsList.module.css'; // Importando o CSS específico para a lista de ferramentas
import { Lock, LockOpen } from '@mui/icons-material';
import favoriteOn from '../../assets/favoriteon.png'; 
import favoriteOff from '../../assets/favoriteoff.png';

const ToolsList = ({ ferramentas, favoritos, adquiridos, handleUseTool, handleToggleFavorito }) => {
  const [hovered, setHovered] = React.useState(null);

  return (
    <div className={styles.toolsGrid}>
      {ferramentas.map((ferramenta, index) => (
        <div 
          key={index} 
          className={`${styles.toolCard} ${!ferramenta.ativo ? styles.inactive : ''}`}
        >
          <div className={styles.toolImageContainer}>
            <img src={ferramenta.image} alt={ferramenta.nome} className={styles.toolImage} />
          </div>

          <h3 className={styles.toolName}>{ferramenta.nome}</h3>
          <p className={styles.toolDesc}>{ferramenta.descricao}</p>

          <div className={styles.bottomSection}>
            {ferramenta.ativo && (
              <button 
                onClick={() => handleToggleFavorito(ferramenta.nome)} 
                className={styles.favoritoButton}
              >
                <img 
                  src={favoritos.includes(ferramenta.nome) ? favoriteOn : favoriteOff} 
                  alt="Favorito" 
                  className={styles.favoritoIcon} 
                />
              </button>
            )}

            {!ferramenta.ativo && (
              <div className={styles.lockIcon}>
                {hovered === index ? <LockOpen className={styles.iconInativo} /> : <Lock className={styles.iconInativo} />}
              </div>
            )}

            <button 
              className={ferramenta.ativo ? styles.adquiridoButton : styles.assinarButton}
              onClick={() => ferramenta.ativo && handleUseTool(ferramenta.route)}
              onMouseEnter={() => setHovered(index)} 
              onMouseLeave={() => setHovered(null)}
            >
              {ferramenta.ativo ? `Ativo ${ferramenta.restante}` : 'Ativar'} 
              {!ferramenta.ativo && (
                <span className={styles.custoDentro}>{ferramenta.custo}</span>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToolsList;
