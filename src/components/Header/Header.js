import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './header.module.css';
import Tokens from '../Tokens/Tokens';
import { useNavigate } from 'react-router-dom';
import UserLevel from '../UserLevel/UserLevel';

function Header({ username, userEmail, userPhoto, logout }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const tokenCount = 150;

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTokensClick = () => {
    navigate('/comprar-tokens');
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
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

        <button className={styles.themeToggleBtn} onClick={toggleTheme}>
          {theme === 'light' ? '🌞 Light' : '🌜 Dark'}
        </button>

        <button className={styles.menuButton} onClick={toggleMenu}>
          ☰ {/* Ícone de menu */}
        </button>

        {/* Menu único, ajustado para mobile e desktop */}
        <div className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`}>
          <button className={styles.closeMenuButton} onClick={toggleMenu}>
            ✖️ {/* Ícone para fechar o menu */}
          </button>
          <div className={styles.userInfo}>
            <img
              src={userPhoto || "https://via.placeholder.com/80"}
              alt="Foto do usuário"
              className={styles.profileImage}
            />
            <div className={styles.userDetails}>
              <span className={styles.username}>{username}</span>
              <p className={styles.userEmail}>{userEmail || "Nothing@gmail.com"}</p>
              <UserLevel />
              <p className={styles.tokenCount}>{tokenCount} Tokens</p>
            </div>
          </div>
          <ul className={styles.menuList}>
            <li onClick={() => navigateTo('/dashboard')}>Dashboard</li>
            <li onClick={() => navigateTo('/vendas')}>Vendas</li>
            <li onClick={() => navigateTo('/produtos')}>Produtos</li>
            <li onClick={() => navigateTo('/anuncios')}>Anúncios</li>
            <li onClick={() => navigateTo('/configuracoes')}>Configurações</li>
            <li onClick={() => navigateTo('/perfil')}>Perfil</li>
            <li onClick={() => navigateTo('/lojas')}>Lojas</li>
            <li onClick={() => navigateTo('/mensagens')}>Mensagens</li>
            <li onClick={() => navigateTo('/ferramentas-ia')}>Ferramentas IA</li>
          </ul>
          <button className={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
