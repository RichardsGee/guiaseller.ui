// src/pages/VendasPage.js
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import styles from '../styles/vendas.module.css'; // Importando o CSS Module

function VendasPage() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const vendasData = [
      { id: 1, produto: 'Produto A', cliente: 'Cliente 1', valor: 'R$ 100,00', data: '01/10/2024' },
      { id: 2, produto: 'Produto B', cliente: 'Cliente 2', valor: 'R$ 200,00', data: '02/10/2024' },
    ];
    setVendas(vendasData);
  }, []);

  return (
    <DashboardLayout>
      <div className={styles.vendasContainer}>
        <h1 className={styles.vendasTitle}>Lista de Vendas</h1>
        <table className={styles.vendasTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Cliente</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <tr key={venda.id}>
                <td>{venda.id}</td>
                <td>{venda.produto}</td>
                <td>{venda.cliente}</td>
                <td>{venda.valor}</td>
                <td>{venda.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default VendasPage;
