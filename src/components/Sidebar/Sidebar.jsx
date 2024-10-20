import { Link } from 'react-router-dom'; 
import styles from './sidebar.module.css'; 
import React, { useState } from 'react';
import UserLevel from '../UserLevel/UserLevel';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import MessageIcon from '@mui/icons-material/Message';
import WidgetsIcon from '@mui/icons-material/Widgets';

function Sidebar({ userPhoto, username, userEmail, isComplete }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Botão para abrir/fechar o menu em dispositivos móveis */}
      <button className={styles.menuButton} onClick={toggleMenu}>
        {isMenuOpen ? '✖️' : '☰'} {/* Ícone do menu */}
      </button>

      {/* Sidebar visível em dispositivos desktop */}
      <nav className={styles.sidebar}>
        <div className={styles.userInfo}>
          <img
            src={userPhoto || "https://via.placeholder.com/80"}
            alt="Foto do usuário"
            className={styles.profileImage}
          />
          <h2>{username}</h2>
          <p>{userEmail || "Nothing@gmail.com"}</p>
          <UserLevel />
        </div>
        
        <ul>
          <li><Link to="/dashboard"><DashboardIcon className={styles.sidebarIcon} />Dashboard</Link></li>
          <li><Link to="/vendas"><ShoppingCartIcon className={styles.sidebarIcon} />Vendas</Link></li>
          <li><Link to="/produtos"><InventoryIcon className={styles.sidebarIcon} />Produtos</Link></li>
          <li><Link to="/anuncios"><AnnouncementIcon className={styles.sidebarIcon} />Anúncios</Link></li>
          <li>
            <Link to="/configuracoes">
              <SettingsIcon className={styles.sidebarIcon} />
              Configurações
              {!isComplete && <span className={styles.completeAlert}>⚠️</span>}
            </Link>
          </li>
          <li><Link to="/perfil"><AccountCircleIcon className={styles.sidebarIcon} />Perfil</Link></li>
          <li><Link to="/lojas"><StoreIcon className={styles.sidebarIcon} />Lojas</Link></li>
          <li><Link to="/mensagens"><MessageIcon className={styles.sidebarIcon} />Mensagens</Link></li>
          <li>
            <Link to="/ferramentas-ia" className={styles.ferramentasIa}>
              <WidgetsIcon className={styles.sidebarIcon} />
              Ferramentas IA
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mostra o menu apenas se estiver aberto em dispositivos móveis */}
      {isMenuOpen && (
        <div className={styles.menu}>
          <div className={styles.userInfo}>
            <img
              src={userPhoto || "https://via.placeholder.com/80"}
              alt="Foto do usuário"
              className={styles.profileImage}
            />
            <h2>{username}</h2>
            <p>{userEmail || "Nothing@gmail.com"}</p>
            <UserLevel />
          </div>
          
          <ul>
            <li><Link to="/dashboard"><DashboardIcon className={styles.sidebarIcon} />Dashboard</Link></li>
            <li><Link to="/vendas"><ShoppingCartIcon className={styles.sidebarIcon} />Vendas</Link></li>
            <li><Link to="/produtos"><InventoryIcon className={styles.sidebarIcon} />Produtos</Link></li>
            <li><Link to="/anuncios"><AnnouncementIcon className={styles.sidebarIcon} />Anúncios</Link></li>
            <li>
              <Link to="/configuracoes">
                <SettingsIcon className={styles.sidebarIcon} />
                Configurações
                {!isComplete && <span className={styles.completeAlert}>⚠️</span>}
              </Link>
            </li>
            <li><Link to="/perfil"><AccountCircleIcon className={styles.sidebarIcon} />Perfil</Link></li>
            <li><Link to="/lojas"><StoreIcon className={styles.sidebarIcon} />Lojas</Link></li>
            <li><Link to="/mensagens"><MessageIcon className={styles.sidebarIcon} />Mensagens</Link></li>
            <li>
              <Link to="/ferramentas-ia" className={styles.ferramentasIa}>
                <WidgetsIcon className={styles.sidebarIcon} />
                Ferramentas IA
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Sidebar;
