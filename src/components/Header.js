// src/components/Header.js
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Importando o contexto de tema
import styles from '../styles/header.module.css'; // Importando o CSS module

function Header({ username, logout }) {
  const { theme, toggleTheme } = useContext(ThemeContext); // Obtendo o tema atual e a função de alternância

  return (
    <header className={styles.header}>
      <div className={styles.headerLogo}>
        <img src="logo.png" alt="Logo" />
        <span className={styles.slogan}>Avance com IA</span>
      </div>
      <div className={styles.headerActions}>
        <span className={styles.credits}>
          <span className={`material-icons ${styles.creditsIcon}`}>monetization_on</span>
          Tokens: 150
        </span>
        <span className={styles.username}>{username}</span>
        <button className={styles.logoutBtn} onClick={logout}>Logout</button>
        {/* Adicionando o botão de alternância de tema */}
        <button className={styles.themeToggleBtn} onClick={toggleTheme}>
          {theme === 'light' ? '🌞 Light' : '🌜 Dark'}
        </button>
      </div>
    </header>
  );
}

export default Header;
