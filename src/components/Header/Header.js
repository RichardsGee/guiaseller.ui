import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext'; // Importando AuthContext
import styles from './header.module.css';
import Tokens from '../Tokens/Tokens';
import { useNavigate } from 'react-router-dom';
import UserLevel from '../UserLevel/UserLevel';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import MessageIcon from '@mui/icons-material/Message';
import BuildIcon from '@mui/icons-material/Build';

function Header({ logout }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, loading, userLevel } = useContext(AuthContext); // Usando o AuthContext
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

  if (loading) return <div>Loading...</div>; // Carregando...

  return (
    <header className={`${styles.mainHeader} non-interactive`}>
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
              src={user?.photoURL || "https://via.placeholder.com/80"} // Usando user.photoURL diretamente
              alt="Foto do usuário"
              className={styles.profileImage}
            />
            <div className={styles.userDetails}>
              <span className={styles.username}>{user?.displayName || ''}</span>
              <p className={styles.userEmail}>{user?.email || "Nothing@gmail.com"}</p> {/* Usando user.email diretamente */}
              <UserLevel level={userLevel} />
              <p className={styles.tokenCount}>{tokenCount} Tokens</p>
            </div>
          </div>
          <ul className={styles.menuList}>
            <li onClick={() => navigateTo('/dashboard')}>
              <DashboardIcon className={styles.menuIcon} /> Dashboard
            </li>
            <li onClick={() => navigateTo('/vendas')}>
              <MonetizationOnIcon className={styles.menuIcon} /> Vendas
            </li>
            <li onClick={() => navigateTo('/produtos')}>
              <ShoppingCartIcon className={styles.menuIcon} /> Produtos
            </li>
            <li onClick={() => navigateTo('/anuncios')}>
              <AnnouncementIcon className={styles.menuIcon} /> Anúncios
            </li>
            <li onClick={() => navigateTo('/configuracoes')}>
              <SettingsIcon className={styles.menuIcon} /> Configurações
            </li>
            <li onClick={() => navigateTo('/perfil')}>
              <PersonIcon className={styles.menuIcon} /> Perfil
            </li>
            <li onClick={() => navigateTo('/lojas')}>
              <StoreIcon className={styles.menuIcon} /> Lojas
            </li>
            <li onClick={() => navigateTo('/mensagens')}>
              <MessageIcon className={styles.menuIcon} /> Mensagens
            </li>
            <li onClick={() => navigateTo('/ferramentas-ia')}>
              <BuildIcon className={styles.menuIcon} /> Ferramentas IA
            </li>
          </ul>
          <button className={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
