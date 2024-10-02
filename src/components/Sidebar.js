import React from 'react';
import styles from '../styles/sidebar.module.css'; // Certifique-se de importar corretamente

function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.userInfo}> {/* Certifique-se de que userInfo está sendo usado corretamente */}
        <img src="https://via.placeholder.com/80" alt="Foto do usuário" className={styles.profileImage} />
        <h2>Fulano de Tal</h2>
        <p>email@email.com</p>
      </div>
      <ul>
        <li><a href="#dashboard"><span className={`material-icons ${styles.sidebarIcon}`}>dashboard</span>Dashboard</a></li>
        <li><a href="#vendas"><span className={`material-icons ${styles.sidebarIcon}`}>shopping_bag</span>Vendas</a></li>
        <li><a href="#produtos"><span className={`material-icons ${styles.sidebarIcon}`}>inventory_2</span>Produtos</a></li>
        <li><a href="#anuncios"><span className={`material-icons ${styles.sidebarIcon}`}>campaign</span>Anúncios</a></li>
        <li><a href="#configuracoes"><span className={`material-icons ${styles.sidebarIcon}`}>settings</span>Configurações</a></li>
        <li><a href="#perfil"><span className={`material-icons ${styles.sidebarIcon}`}>person</span>Perfil</a></li>
        <li><a href="#lojas"><span className={`material-icons ${styles.sidebarIcon}`}>store</span>Lojas</a></li>
        <li><a href="#mensagens"><span className={`material-icons ${styles.sidebarIcon}`}>notifications</span>Mensagens</a></li>
        <li><a href="#ferramentas-ia" className={styles.ferramentasIa}><span className={`material-icons ${styles.sidebarIcon}`}>smart_toy</span>Ferramentas IA</a></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
