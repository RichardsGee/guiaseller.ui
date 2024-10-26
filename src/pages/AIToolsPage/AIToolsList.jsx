// AIToolsList.jsx
import React from 'react';
import styles from './AIToolsList.module.css';
import { Lock, LockOpen } from '@mui/icons-material';
import favoriteOn from '../../assets/favoriteon.png'; 
import favoriteOff from '../../assets/favoriteoff.png';

const AIToolsList = ({ ferramentas, favoritos, handleUseTool, handleToggleFavorito }) => {
  const [hovered, setHovered] = React.useState(null);

  return (
    <div className={styles.toolsGrid}>
      {ferramentas.map((ferramenta, index) => (
        <div 
          key={index} 
          className={`${styles.toolCard} ${ferramenta.status === 'desativado' ? styles.inactive : ''}`}
        >
          <div className={styles.toolImageContainer}>
            <img src={ferramenta.image} alt={ferramenta.nome} className={styles.toolImage} />
          </div>

          <h3 className={styles.toolName}>{ferramenta.nome}</h3>
          <p className={styles.toolDesc}>{ferramenta.descricao}</p>

          <div className={styles.bottomSection}>
            {ferramenta.status === 'ativo' && (
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

            {!ferramenta.status === 'ativo' && (
              <div className={styles.lockIcon}>
                {hovered === index ? <LockOpen className={styles.iconInativo} /> : <Lock className={styles.iconInativo} />}
              </div>
            )}

            <button 
              className={
                ferramenta.status === 'ativo' 
                  ? styles.buttonUsar 
                  : ferramenta.status === 'emBreve' 
                    ? styles.buttonEmBreve 
                    : styles.buttonAdquirir
              }
              onClick={() => ferramenta.status === 'ativo' && handleUseTool(ferramenta.route)}
              onMouseEnter={() => setHovered(index)} 
              onMouseLeave={() => setHovered(null)}
            >
              {ferramenta.status === 'ativo' ? 'Usar' : ferramenta.status === 'emBreve' ? 'Em Breve' : 'Adquirir'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AIToolsList;
