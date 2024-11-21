import { Link } from 'react-router-dom'; 
import styles from './AdminSidebar.module.css'; 
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Importando o hook para acessar o contexto
import UserLevel from '../UserLevel/UserLevel';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import WidgetsIcon from '@mui/icons-material/Widgets';
import BookIcon from '@mui/icons-material/MenuBook'; // Ícone para Ebooks
import IntegrationsIcon from '@mui/icons-material/Api'; // Ícone de Integrações

function AdminSidebar({ userPhoto, username, userEmail, isComplete }) {
  const { userLevel, isAlphaUser } = useAuth(); // Acessando o userLevel e isAlphaUser do contexto
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

      {/* Admin Sidebar visível em dispositivos desktop */}
      <nav className={`${styles.sidebar} non-interactive`}>
      <div className={styles.userInfo}>
  <img
    src={userPhoto || "https://via.placeholder.com/80"}
    alt="Foto do usuário"
    className={styles.profileImage}
  />
<div className={styles.usernameClass}>{username}</div>
<p>{userEmail || "Nothing@gmail.com"}</p>
  
  {/* Exibindo o UserLevel e o ícone de Alpha, se aplicável */}
  <div className={styles.userLevelWrapper}>
    <UserLevel />
    {isAlphaUser && (
      <div className={styles.alphaContainer}>
        <img 
          src="/alpha.png" 
          alt="Alpha" 
          className={styles.alphaIcon} 
          title="Membro Alpha"  // Exibe a dica de ferramenta quando passar o mouse
        />
              </div>
            )}
          </div>
        </div>

        <ul>
          {/* Seção de Admin, visível apenas para Admin */}
          {userLevel === 'Admin' && (
            <>
              
              <li className={styles.menuCategoryTitle}>Admin</li>
              <li><Link to="/admin/dashboard"><DashboardIcon className={styles.sidebarIcon} />Admin Dashboard</Link></li>
              <li><Link to="/admin/users"><AccountCircleIcon className={styles.sidebarIcon} />Gerenciar Usuários</Link></li>
              <li><Link to="/admin/settings"><SettingsIcon className={styles.sidebarIcon} />Configurações Avançadas</Link></li>
              <hr />
            </>
          )}

          {/* Seção de Gestão */}
          <li className={styles.menuCategoryTitle}>Gestão</li>
          <li><Link to="/admin/logcobrancas"><ShoppingCartIcon className={styles.sidebarIcon} />Log de Cobranças</Link></li>
          <li><Link to="/admin/logmercadolivre"><InventoryIcon className={styles.sidebarIcon} />Log Mercado Livre</Link></li>
          <li><Link to="/admin/log3"><AnnouncementIcon className={styles.sidebarIcon} />Log 3</Link></li>
          
          {/* Linha separadora */}
          <hr /> 

          {/* Seção de Relatórios */}
          <li className={styles.menuCategoryTitle}>Relatórios</li>
          <li><Link to="/admin/sales-report"><WidgetsIcon className={styles.sidebarIcon} />Relatório de Vendas</Link></li>
          <li><Link to="/admin/user-report"><BookIcon className={styles.sidebarIcon} />Relatório de Usuários</Link></li>

          {/* Linha separadora */}
          <hr />

          {/* Configurações */}
          <li className={styles.menuCategoryTitle}>Configurações</li>
          <li>
            <Link to="/admin/integrations">
              <IntegrationsIcon className={styles.sidebarIcon} />
              Integrações
            </Link>
          </li>
          <li>
            <Link to="/admin/settings">
              <SettingsIcon className={styles.sidebarIcon} />
              Configurações Gerais
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
            {isAlphaUser && (
              <div className={styles.alphaContainer}>
                <img src="/public/alpha.png" alt="Alpha" className={styles.alphaIcon} />
              </div>
            )}
          </div>
          
          <ul>
            {/* Seção de Admin */}
            {userLevel === 'Admin' && (
              <>
                <hr />
                <li className={styles.menuCategoryTitle}>Admin</li>
                <li><Link to="/admin/dashboard"><DashboardIcon className={styles.sidebarIcon} />Admin Dashboard</Link></li>
                <li><Link to="/admin/users"><AccountCircleIcon className={styles.sidebarIcon} />Gerenciar Usuários</Link></li>
                <li><Link to="/admin/settings"><SettingsIcon className={styles.sidebarIcon} />Configurações Avançadas</Link></li>
                <hr />
              </>
            )}

            {/* Seção de Gestão */}
            <li className={styles.menuCategoryTitle}>Gestão</li>
            <li><Link to="/admin/orders"><ShoppingCartIcon className={styles.sidebarIcon} />Pedidos</Link></li>
            <li><Link to="/admin/products"><InventoryIcon className={styles.sidebarIcon} />Produtos</Link></li>
            <li><Link to="/admin/announcements"><AnnouncementIcon className={styles.sidebarIcon} />Anúncios</Link></li>
            
            {/* Linha separadora */}
            <hr />

            {/* Seção de Relatórios */}
            <li className={styles.menuCategoryTitle}>Relatórios</li>
            <li><Link to="/admin/sales-report"><WidgetsIcon className={styles.sidebarIcon} />Relatório de Vendas</Link></li>
            <li><Link to="/admin/user-report"><BookIcon className={styles.sidebarIcon} />Relatório de Usuários</Link></li>

            {/* Linha separadora */}
            <hr />

            {/* Configurações */}
            <li className={styles.menuCategoryTitle}>Configurações</li>
            <li>
              <Link to="/admin/integrations">
                <IntegrationsIcon className={styles.sidebarIcon} />
                Integrações
              </Link>
            </li>
            <li>
              <Link to="/admin/settings">
                <SettingsIcon className={styles.sidebarIcon} />
                Configurações Gerais
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default AdminSidebar;
