// src/components/Header.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext'; // Importando o contexto de tema
import styles from './header.module.css'; // Importando o CSS Module
import Tokens from '../Tokens/Tokens'; // Caminho correto do componente Tokens
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação

function Header({ username, logout }) {
  const { theme, toggleTheme } = useContext(ThemeContext); // Obtendo o tema atual e a função de alternância
  const tokenCount = 150; // Simulação da quantidade de tokens, ajuste conforme necessário
  const navigate = useNavigate(); // Instanciando o hook useNavigate

  // Função para redirecionar para a página de compra de tokens
  const handleTokensClick = () => {
    navigate('/comprar-tokens'); // Caminho para a página TokensBuy
  };

  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerLogo}>
        <img src="logo.png" alt="Logo" />
        <span className={styles.slogan}>alpha version</span>
      </div>
      <div className={styles.headerActions}>
        {/* Tornando o componente Tokens clicável */}
        <div onClick={handleTokensClick} style={{ cursor: 'pointer' }}>
          <Tokens count={tokenCount} />
        </div>
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
