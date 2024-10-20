import { Link } from 'react-router-dom'; 
import styles from './sidebar.module.css'; 
import React, { useState } from 'react';
import UserLevel from '../UserLevel/UserLevel';

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
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/vendas">Vendas</Link></li>
          <li><Link to="/produtos">Produtos</Link></li>
          <li><Link to="/anuncios">Anúncios</Link></li>
          <li>
            <Link to="/configuracoes">
              Configurações
              {!isComplete && <span className={styles.completeAlert}>⚠️</span>}
            </Link>
          </li>
          <li><Link to="/perfil">Perfil</Link></li>
          <li><Link to="/integrações">Integrações</Link></li>
          <li><Link to="/mensagens">Mensagens</Link></li>
          <li>
            <Link to="/ferramentas-ia" className={styles.ferramentasIa}>
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
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/vendas">Vendas</Link></li>
            <li><Link to="/produtos">Produtos</Link></li>
            <li><Link to="/anuncios">Anúncios</Link></li>
            <li>
              <Link to="/configuracoes">
                Configurações
                {!isComplete && <span className={styles.completeAlert}>⚠️</span>}
              </Link>
            </li>
            <li><Link to="/perfil">Perfil</Link></li>
            <li><Link to="/integrações">Integrações</Link></li>
            <li><Link to="/mensagens">Mensagens</Link></li>
            <li>
              <Link to="/ferramentas-ia" className={styles.ferramentasIa}>
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
