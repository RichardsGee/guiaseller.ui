import React from 'react';
import styles from './AlphaScreen.module.css';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AlphaAccess = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const logout = () => {
    signOut();
    navigate('/');
  }

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
          <button className={styles.logoutButton} onClick={logout}>Logout</button>
        </div>
      </div>
      <div className={styles.topBanner}>Guia Seller - Alpha Version</div> {/* Banner agora na parte de baixo */}
    </div>
  );
};

export default AlphaAccess;
