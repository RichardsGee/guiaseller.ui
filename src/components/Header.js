// src/components/Header.js
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // Importando o contexto de tema

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext); // Obtendo o tema atual e a função de alternância

  return (
    <header className="main-header">
      <div className="header-logo">
        <img src="logo.png" alt="Logo" />
        <span className="slogan">Avance com IA</span>
      </div>
      <div className="header-actions">
        <span className="credits">
          <span className="material-icons credits-icon">monetization_on</span>
          Tokens: 150
        </span>
        <span className="username">Fulano de Tal</span>
        <button className="logout-btn">Logout</button>
        {/* Adicionando o botão de alternância de tema */}
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌞 Light' : '🌜 Dark'}
        </button>
      </div>
    </header>
  );
}

export default Header;
