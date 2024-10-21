import React from 'react';
import styles from './AlphaScreen.module.css';

const AlphaAccess = () => {
  return (
    <div className={styles.alphaAccessContainer}>
      <div className={styles.alphaAccessContent}>
        <div className={styles.iconContainer}>
          <div className={styles.warningIcon}>!</div>
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.alphaAccessTitle}>ACESSO RESTRITO</h1>
          <p className={styles.alphaAccessMessage}>
            Desculpe, ainda estamos em acesso alpha. Se você já garantiu o seu acesso e está vendo esta tela, entre em contato conosco.
          </p>
          <button className={styles.contactButton}>Entrar em Contato</button> {/* Botão adicionado */}
        </div>
      </div>
      <div className={styles.topBanner}>Guia Seller - Alpha Version</div> {/* Banner agora na parte de baixo */}
    </div>
  );
};

export default AlphaAccess;
