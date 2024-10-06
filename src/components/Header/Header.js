// src/components/Header.js
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext'; // Importando o contexto de tema
import styles from './header.module.css'; // Importando o CSS Module
import Tokens from '../Tokens/Tokens'; // Caminho correto do componente Tokens

function Header({ username, logout }) {
  const { theme, toggleTheme } = useContext(ThemeContext); // Obtendo o tema atual e a função de alternância
  const tokenCount = 150; // Simulação da quantidade de tokens, ajuste conforme necessário

  return (
    <header className="main-header">
      <div className="header-logo">
        <img src="logo.png" alt="Logo" />
        <span className="slogan">Avance com IA</span>
      </div>
      <div className="header-actions">
        {/* Usando o componente Tokens */}
        <Tokens count={tokenCount} />
        <span className="username">{username}</span>
        <button className="logout-btn" onClick={logout}>Logout</button>
        {/* Adicionando o botão de alternância de tema */}
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌞 Light' : '🌜 Dark'}
        </button>
      </div>
    </header>
  );
}

export default Header;
