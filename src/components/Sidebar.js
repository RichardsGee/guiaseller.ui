// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Importando o Link do react-router-dom
import styles from '../styles/sidebar.module.css'; // Certifique-se de importar corretamente

function Sidebar({ userPhoto, username, userEmail, userLevel }) {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.userInfo}>
        <img
          src={userPhoto || "https://via.placeholder.com/80"}
          alt="Foto do usuário"
          className={styles.profileImage}
        />
        <h2>{username}</h2>
        <p>{userEmail || "Nothing@gmail.com"}</p>
        <span className={styles.userLevel}>{userLevel || "Chief AI Officer"}</span>
      </div>
      <ul>
        <li><Link to="/dashboard"><span className={`material-icons ${styles.sidebarIcon}`}>dashboard</span>Dashboard</Link></li>
        <li><Link to="/vendas"><span className={`material-icons ${styles.sidebarIcon}`}>shopping_bag</span>Vendas</Link></li>
        <li><Link to="/produtos"><span className={`material-icons ${styles.sidebarIcon}`}>inventory_2</span>Produtos</Link></li>
        <li><Link to="/anuncios"><span className={`material-icons ${styles.sidebarIcon}`}>campaign</span>Anúncios</Link></li>
        <li><Link to="/configuracoes"><span className={`material-icons ${styles.sidebarIcon}`}>settings</span>Configurações</Link></li>
        <li><Link to="/perfil"><span className={`material-icons ${styles.sidebarIcon}`}>person</span>Perfil</Link></li>
        <li><Link to="/lojas"><span className={`material-icons ${styles.sidebarIcon}`}>store</span>Lojas</Link></li>
        <li><Link to="/mensagens"><span className={`material-icons ${styles.sidebarIcon}`}>notifications</span>Mensagens</Link></li>
        <li><Link to="/ferramentas-ia" className={styles.ferramentasIa}><span className={`material-icons ${styles.sidebarIcon}`}>smart_toy</span>Ferramentas IA</Link></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
