// src/components/AdditionalInfo.js
import React from 'react';

function AdditionalInfo() {
  return (
    <section className="additional-info">
      <div className="info-item">
        <h3>Mais Vendidos</h3>
        <ul>
          <li>Produto A</li>
          <li>Produto B</li>
          <li>Produto C</li>
        </ul>
      </div>
      <div className="info-item">
        <h3>Mais Vendidos em Cada Marketplace</h3>
        <ul>
          <li>Mercado Livre: Produto X</li>
          <li>Shopee: Produto Y</li>
          <li>Magalu: Produto Z</li>
        </ul>
      </div>
    </section>
  );
}

export default AdditionalInfo;
