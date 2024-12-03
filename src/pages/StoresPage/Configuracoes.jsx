import React from 'react';
import styles from './stores.module.css';

const ConfiguracoesContent = () => (
  <div>
    <h2>Configurações da Loja</h2>
    <div className={styles.settingsForm}>
      <label>Nome da Loja</label>
      <input type="text" defaultValue="Loja Mercado Livre" />
      
      <label>Descrição</label>
      <textarea defaultValue="Loja oficial de produtos eletrônicos"></textarea>
    </div>
  </div>
);

export default ConfiguracoesContent;
