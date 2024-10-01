// src/components/TopBar.js
import React from 'react';

function TopBar() {
  return (
    <header className="top-bar">
      <div className="top-bar-item">
        <div className="top-bar-content">
          <h3>Faturamento</h3>
          <p id="faturamento-value">R$ 50,000</p>
        </div>
        <div className="top-bar-icon"><span className="material-icons">attach_money</span></div>
      </div>
      <div className="top-bar-item">
        <div className="top-bar-content">
          <h3>Vendas</h3>
          <p id="vendas-value">120</p>
        </div>
        <div className="top-bar-icon"><span className="material-icons">shopping_cart</span></div>
      </div>
      <div className="top-bar-item">
        <div className="top-bar-content">
          <h3>Lucro</h3>
          <p id="lucro-value">R$ 15,000</p>
        </div>
        <div className="top-bar-icon"><span className="material-icons">trending_up</span></div>
      </div>
      <div className="top-bar-item">
        <div className="top-bar-content">
          <h3>Publicidade</h3>
          <p id="publicidade-value">R$ 5,000</p>
        </div>
        <div className="top-bar-icon"><span className="material-icons">campaign</span></div>
      </div>
    </header>
  );
}

export default TopBar;
