import React from 'react';
import styles from './AlphaScreen.module.css';

const AlphaAccess = () => {
  return (
    <div className={styles.alphaAccessContainer}>
      <div className={styles.alphaAccessContent}>
        <h1 className={styles.alphaAccessTitle}>Acesso Restrito</h1>
        <p className={styles.alphaAccessMessage}>
          Desculpe, ainda estamos em acesso alpha. Se você já garantiu o seu acesso e está vendo esta tela, entre em contato conosco.
        </p>
        <button className={styles.alphaAccessButton}>Fale Conosco</button>
      </div>
    </div>
  );
};

export default AlphaAccess;
