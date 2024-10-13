import { Link } from 'react-router-dom'; 
import styles from './sidebar.module.css'; 
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Importar o AuthContext

function Sidebar({ userPhoto, username, userEmail, isComplete }) {
  const { userLevel } = useContext(AuthContext); // Consome o userLevel do contexto

  console.log("Sidebar User Level:", userLevel); // Adicionando log para verificar o valor do userLevel
  
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
        <span className={styles.userLevel}>{userLevel || "Nada"}</span> {/* Exibe o userLevel do contexto */}
      </div>
      <ul>
        <li><Link to="/dashboard"><span className={`material-icons ${styles.sidebarIcon}`}>dashboard</span>Dashboard</Link></li>
        <li><Link to="/vendas"><span className={`material-icons ${styles.sidebarIcon}`}>shopping_bag</span>Vendas</Link></li>
        <li><Link to="/produtos"><span className={`material-icons ${styles.sidebarIcon}`}>inventory_2</span>Produtos</Link></li>
        <li><Link to="/anuncios"><span className={`material-icons ${styles.sidebarIcon}`}>campaign</span>Anúncios</Link></li>
        
        <li>
          <Link to="/configuracoes">
            <span className={`material-icons ${styles.sidebarIcon}`}>settings</span>
            Configurações
            {!isComplete && <span className={styles.completeAlert}>⚠️</span>}
          </Link>
        </li>
        
        <li><Link to="/perfil"><span className={`material-icons ${styles.sidebarIcon}`}>person</span>Perfil</Link></li>
        <li><Link to="/integrações"><span className={`material-icons ${styles.sidebarIcon}`}>store</span>Integrações</Link></li>
        <li><Link to="/mensagens"><span className={`material-icons ${styles.sidebarIcon}`}>notifications</span>Mensagens</Link></li>
        <li>
          <Link to="/ferramentas-ia" className={styles.ferramentasIa}>
            <span className={`material-icons ${styles.sidebarIcon}`}>smart_toy</span> {/* Ícone de ferramenta */}
            Ferramentas IA
            <img 
              src="ai.png" 
              alt="IA Icon" 
              className={styles.sidebarIconIA} 
            /> {/* Imagem PNG para IA */}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
