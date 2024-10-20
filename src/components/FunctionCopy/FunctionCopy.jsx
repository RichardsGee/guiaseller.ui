import React from 'react';
import styles from '../../pages/TittleGenerator/TittleGenerator.module.css'; // Importando o CSS de TittleGenerator

const FunctionCopy = ({ title, onCopy, copied, onTitleClick }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(title)
      .then(() => onCopy()) // Aciona a função onCopy quando copiado com sucesso
      .catch(err => console.error('Erro ao copiar o título: ', err));
  };

  return (
    <div 
      className={`${styles.titleItem} ${copied ? styles.copied : styles.faded}`} 
      onClick={() => {
        copyToClipboard(); // Copia o título ao clicar
        onTitleClick(title); // Atualiza o input com o título
      }}
    >
      {title} <span className={styles.characterCount}>({title.length}/60)</span>
      {copied && <span className={styles.copiedTag}>Copiado!</span>}
    </div>
  );
};

export default FunctionCopy;
