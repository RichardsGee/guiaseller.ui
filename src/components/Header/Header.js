import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext'; // Importando o contexto de tema
import styles from './header.module.css'; // Importando o CSS Module
import Tokens from '../Tokens/Tokens'; // Caminho correto do componente Tokens
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação

function Header({ username, logout }) {
  const { theme, toggleTheme } = useContext(ThemeContext); // Obtendo o tema atual e a função de alternância
  const tokenCount = 150; // Simulação da quantidade de tokens
  const navigate = useNavigate(); // Instanciando o hook useNavigate
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu

  // Função para redirecionar para a página de compra de tokens
  const handleTokensClick = () => {
    navigate('/comprar-tokens'); // Caminho para a página TokensBuy
  };

  // Alterna a exibição do menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerLogo}>
        <img src="logo.png" alt="Logo" />
        <span className={styles.slogan}>alpha version</span>
      </div>

      <div className={styles.headerActions}>
        <div onClick={handleTokensClick} style={{ cursor: 'pointer' }}>
          <Tokens count={tokenCount} />
        </div>

        {/* Exibindo o nome de usuário apenas na versão desktop */}
        <span className={styles.username}>{username}</span>

        {/* Botão de tema visível em ambas as versões */}
        <button className={styles.themeToggleBtn} onClick={toggleTheme}>
          {theme === 'light' ? '🌞 Light' : '🌜 Dark'}
        </button>

        {/* Botão de menu (apenas em mobile) */}
        <button className={styles.menuButton} onClick={toggleMenu}>
          ☰ {/* Ícone de menu */}
        </button>

        {/* Menu (apenas em mobile) */}
        {isMenuOpen && (
          <div className={styles.menu}>
            {/* Nome do usuário apenas no menu mobile */}
            <span className={styles.username}>{username}</span>
            <button className={styles.logoutBtn} onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
