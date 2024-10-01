// src/components/Sidebar.js
import React from 'react';

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="user-info">
        <img src="https://via.placeholder.com/80" alt="Foto do usuário" />
        <h2>Fulano de Tal</h2>
        <p>email@email.com</p>
      </div>
      <ul>
        <li><a href="#dashboard"><span className="sidebar-icon material-icons">dashboard</span>Dashboard</a></li>
        <li><a href="#vendas"><span className="sidebar-icon material-icons">shopping_bag</span>Vendas</a></li>
        <li><a href="#produtos"><span className="sidebar-icon material-icons">inventory_2</span>Produtos</a></li>
        <li><a href="#anuncios"><span className="sidebar-icon material-icons">campaign</span>Anúncios</a></li>
        <li><a href="#configuracoes"><span className="sidebar-icon material-icons">settings</span>Configurações</a></li>
        <li><a href="#perfil"><span className="sidebar-icon material-icons">person</span>Perfil</a></li>
        <li><a href="#lojas"><span className="sidebar-icon material-icons">store</span>Lojas</a></li>
        <li><a href="#mensagens"><span className="sidebar-icon material-icons">notifications</span>Mensagens</a></li>
        <li><a href="#ferramentas-ia" className="ferramentas-ia"><span className="sidebar-icon material-icons">smart_toy</span>Ferramentas IA</a></li>
      </ul>
    </nav>
  );
}

export default Sidebar;
