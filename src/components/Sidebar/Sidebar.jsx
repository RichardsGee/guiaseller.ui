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
import BookIcon from '@mui/icons-material/MenuBook'; // Ícone para Ebooks
import IntegrationsIcon from '@mui/icons-material/Api'; // Ícone de Integrações

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
      <nav className={`${styles.sidebar} non-interactive`}>
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
          {/* Seção de Gerenciamento */}
          <li className={styles.menuCategoryTitle}>Gerenciamento</li>
          <li><Link to="/dashboard"><DashboardIcon className={styles.sidebarIcon} />Dashboard</Link></li>
          <li><Link to="/vendas"><ShoppingCartIcon className={styles.sidebarIcon} />Vendas</Link></li>
          <li><Link to="/produtos"><InventoryIcon className={styles.sidebarIcon} />Produtos</Link></li>
          <li><Link to="/anuncios"><AnnouncementIcon className={styles.sidebarIcon} />Anúncios</Link></li>
          <li>
            <span className={styles.disabledLink}>
              <MessageIcon className={styles.sidebarIcon} />
              Mensagens <span className={styles.pendingMessage}>(Em breve)</span>
            </span>
          </li>

          {/* Linha separadora */}
          <hr /> 

          {/* Seção de Ajustes */}
          <li className={styles.menuCategoryTitle}>Ajustes</li>
          <li>
            <Link to="/integracoes">
              <IntegrationsIcon className={styles.sidebarIcon} />
              Integrações
            </Link>
          </li>
          <li>
            <Link to="/configuracoes">
              <SettingsIcon className={styles.sidebarIcon} />
              Configurações
              {!isComplete && <span className={styles.completeAlert}>⚠️</span>}
            </Link>
          </li>
          <li>
            <span className={styles.disabledLink}>
              <AccountCircleIcon className={styles.sidebarIcon} />
              Perfil <span className={styles.pendingMessage}>(Em breve)</span>
            </span>
          </li>
          <li><Link to="/lojas"><StoreIcon className={styles.sidebarIcon} />Lojas</Link></li>

          {/* Linha separadora */}
          <hr /> 

          {/* Categoria Conteúdos */}
          <li className={styles.menuCategoryTitle}>Conteúdos</li>
          <li><Link to="/ferramentas"><WidgetsIcon className={styles.sidebarIcon} />Ferramentas</Link></li>
          <li>
            <span className={styles.disabledLink}>
              <BookIcon className={styles.sidebarIcon} />
              Ebooks <span className={styles.pendingMessage}>(Em breve)</span>
            </span>
          </li>
          <li>
            <Link to="/ferramentas-ia" className={styles.ferramentasIa}>
              <WidgetsIcon className={styles.sidebarIcon} /> 
              Ferramentas <span className={styles.iaHighlight}>IA</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mostra o menu apenas se estiver aberto em dispositivos móveis */}
      {isMenuOpen && (
        <div className={`${styles.menu} non-interactive`}>
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
            {/* Seção de Gerenciamento */}
            <li className={styles.menuCategoryTitle}>Gerenciamento</li>
            <li><Link to="/dashboard"><DashboardIcon className={styles.sidebarIcon} />Dashboard</Link></li>
            <li><Link to="/vendas"><ShoppingCartIcon className={styles.sidebarIcon} />Vendas</Link></li>
            <li><Link to="/produtos"><InventoryIcon className={styles.sidebarIcon} />Produtos</Link></li>
            <li><Link to="/anuncios"><AnnouncementIcon className={styles.sidebarIcon} />Anúncios</Link></li>
            <li>
              <span className={styles.disabledLink}>
                <MessageIcon className={styles.sidebarIcon} />
                Mensagens <span className={styles.pendingMessage}>(Em breve)</span>
              </span>
            </li>

            {/* Linha separadora */}
            <hr /> 

            {/* Seção de Ajustes */}
            <li className={styles.menuCategoryTitle}>Ajustes</li>
            <li>
              <Link to="/integracoes">
                <IntegrationsIcon className={styles.sidebarIcon} />
                Integrações
              </Link>
            </li>
            <li>
              <Link to="/configuracoes">
                <SettingsIcon className={styles.sidebarIcon} />
                Configurações
                {!isComplete && <span className={styles.completeAlert}>⚠️</span>}
              </Link>
            </li>
            <li>
              <span className={styles.disabledLink}>
                <AccountCircleIcon className={styles.sidebarIcon} />
                Perfil <span className={styles.pendingMessage}>(Em breve)</span>
              </span>
            </li>
            <li><Link to="/lojas"><StoreIcon className={styles.sidebarIcon} />Lojas</Link></li>

            {/* Linha separadora */}
            <hr /> 

            {/* Categoria Conteúdos */}
            <li className={styles.menuCategoryTitle}>Conteúdos</li>
            <li><Link to="/ferramentas"><WidgetsIcon className={styles.sidebarIcon} />Ferramentas</Link></li>
            <li>
              <span className={styles.disabledLink}>
                <BookIcon className={styles.sidebarIcon} />
                Ebooks <span className={styles.pendingMessage}>(Em breve)</span>
              </span>
            </li>
            <li>
              <Link to="/ferramentas-ia" className={styles.ferramentasIa}>
                <WidgetsIcon className={styles.sidebarIcon} /> 
                Ferramentas IA <span className={styles.iaHighlight}>IA</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Sidebar;
