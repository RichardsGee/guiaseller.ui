import React from 'react';
import styles from './EbooksList.module.css';
import { Lock, LockOpen } from '@mui/icons-material';
import favoriteOn from '../../assets/favoriteon.png'; 
import favoriteOff from '../../assets/favoriteoff.png';

const EbooksList = ({ ebooks, favoritos, adquiridos, handleCompraEbook, handleBaixarEbook, handleToggleFavorito }) => {
  const [hovered, setHovered] = React.useState(null);

  return (
    <div className={styles.toolsGrid}>
      {ebooks.map((ebook, index) => (
        <div 
          key={index} 
          className={`${styles.toolCard} ${!ebook.ativo ? styles.inactive : ''}`}
        >
          {/* Barra com a imagem no topo do card */}
          <div className={styles.ebookImageContainer}>
            <img src={ebook.image} alt={ebook.nome} className={styles.ebookImage} />
          </div>

          <h3 className={styles.toolName}>{ebook.nome}</h3>
          <p className={styles.toolDesc}>{ebook.descricao}</p>

          {/* Exibindo o nome do autor do ebook */}
          <div className={styles.toolOwnerContainer}>
            <p className={styles.toolOwner}>Por: {ebook.dono}</p>
          </div>

          <div className={styles.bottomSection}>
            {/* Botão de Favorito à direita */}
            {ebook.ativo && (
              <button 
                onClick={() => handleToggleFavorito(ebook.nome)} 
                className={styles.favoritoButton}
              >
                <img 
                  src={favoritos.includes(ebook.nome) ? favoriteOn : favoriteOff} 
                  alt="Favorito" 
                  className={styles.favoritoIcon} 
                />
              </button>
            )}

            {!ebook.ativo && (
              <div className={styles.lockIcon}>
                {hovered === index ? <LockOpen className={styles.iconInativo} /> : <Lock className={styles.iconInativo} />}
              </div>
            )}

            <button 
              className={ebook.ativo && adquiridos.includes(ebook.nome) ? styles.adquiridoButton : styles.assinarButton}
              onClick={() => 
                ebook.ativo && (adquiridos.includes(ebook.nome) ? handleBaixarEbook(ebook.route) : handleCompraEbook(ebook))
              }
              onMouseEnter={() => setHovered(index)} 
              onMouseLeave={() => setHovered(null)}
            >
              {adquiridos.includes(ebook.nome) ? 'Download' : 'Comprar'}
              {!adquiridos.includes(ebook.nome) && (
                <span className={styles.custoDentro}>{ebook.custo}</span>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EbooksList;
