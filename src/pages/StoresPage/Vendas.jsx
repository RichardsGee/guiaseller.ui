import React from 'react';
import styles from './stores.module.css';

const VendasContent = () => (
  <div>
    <h2>Vendas Recentes</h2>
    <table className={styles.salesTable}>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Valor</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Smartphone X</td>
          <td>2</td>
          <td>R$ 3.999,00</td>
          <td>10/12/2024</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default VendasContent;
