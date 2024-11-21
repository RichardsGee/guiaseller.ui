import { Link } from 'react-router-dom'; 
import styles from './sidebar.module.css'; 
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
import MessageIcon from '@mui/icons-material/Message';
import WidgetsIcon from '@mui/icons-material/Widgets';
import BookIcon from '@mui/icons-material/MenuBook'; // Ícone para Ebooks
import IntegrationsIcon from '@mui/icons-material/Api'; // Ícone de Integrações

function Sidebar({ userPhoto, username, userEmail, isComplete }) {
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

      {/* Sidebar visível em dispositivos desktop */}
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
              <hr />
            </>
          )}

          {/* Seção de Gerenciamento */}
          <li className={styles.menuCategoryTitle}>Gerenciamento</li>
          <li><Link to="/dashboard"><DashboardIcon className={styles.sidebarIcon} />Dashboard</Link></li>
          <li>
            {userLevel === 'basic' ? (
              <span className={styles.disabledLink}>
                <ShoppingCartIcon className={styles.sidebarIcon} />
                Vendas <span className={styles.pendingMessage}>Assinante</span>
              </span>
            ) : (
              <Link to="/vendas">
                <ShoppingCartIcon className={styles.sidebarIcon} />
                Vendas
              </Link>
            )}
          </li>
          <li>
            {userLevel === 'basic' ? (
              <span className={styles.disabledLink}>
                <InventoryIcon className={styles.sidebarIcon} />
                Produtos <span className={styles.pendingMessage}>Assinante</span>
              </span>
            ) : (
              <Link to="/produtos">
                <InventoryIcon className={styles.sidebarIcon} />
                Produtos
              </Link>
            )}
          </li>
          <li>
            {userLevel === 'basic' ? (
              <span className={styles.disabledLink}>
                <AnnouncementIcon className={styles.sidebarIcon} />
                Anúncios <span className={styles.pendingMessage}>Assinante</span>
              </span>
            ) : (
              <Link to="/anuncios">
                <AnnouncementIcon className={styles.sidebarIcon} />
                Anúncios
              </Link>
            )}
          </li>
          <li>
            {userLevel === 'basic' ? (
              <span className={styles.disabledLink}>
                <IntegrationsIcon className={styles.sidebarIcon} />
                Integrações <span className={styles.pendingMessage}>Assinante</span>
              </span>
            ) : (
              <Link to="/integracoes">
                <IntegrationsIcon className={styles.sidebarIcon} />
                Integrações
              </Link>
            )}
          </li>
          <li>
            {userLevel === 'basic' ? (
              <span className={styles.disabledLink}>
                <StoreIcon className={styles.sidebarIcon} />
                Lojas <span className={styles.pendingMessage}>Assinante</span>
              </span>
            ) : (
              <Link to="/lojas">
                <StoreIcon className={styles.sidebarIcon} />
                Lojas
              </Link>
            )}
          </li>
          <li>
            <Link to="/planos" className={styles.planosLink}>
              <WidgetsIcon className={styles.sidebarIcon} />
              Planos
              {userLevel === 'basic' && (
                <span className={styles.assineTag}>Assinar</span>
              )}
            </Link>
          </li>
          <li><Link to="/assinatura"><AccountCircleIcon className={styles.sidebarIcon} />Assinatura</Link></li>
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
          <li>
            {userLevel === 'basic' ? (
              <span className={styles.disabledLink}>
                <StoreIcon className={styles.sidebarIcon} />
                Lojas <span className={styles.pendingMessage}>Assinante</span>
              </span>
            ) : (
              <Link to="/lojas">
                <StoreIcon className={styles.sidebarIcon} />
                Lojas
              </Link>
            )}
          </li>

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
      </nav>
    </>
  );
}

export default Sidebar;
