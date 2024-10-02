// src/pages/VendasPage.js
import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout'; 
import styles from '../styles/VendasPage.module.css';

const VendasPage = () => {
  const vendasData = [
    {
      numero: '9811',
      imagem: 'https://via.placeholder.com/80',
      sku: 'JARR027',
      marketplace: 'Kwai / Kwai',
      nome: 'Gislene Machado',
      venda: 'R$ 109.90',
      custo: 'R$ 10.99',
      imposto: 'R$ 8.79',
      lucro: 'R$ 90.12',
      margem: '82.00%',
      status: 'Aguardando Pagamento'
    },
    // Adicione mais itens conforme necessário
  ];

  return (
    <DashboardLayout>
      <div className={styles.vendasContainer}>
        <h1 className={styles.title}>Meus Pedidos</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Número</th>
              <th>Imagem</th>
              <th>SKU</th>
              <th>Marketplace/Envio</th>
              <th>Nome</th>
              <th>Venda</th>
              <th>Custo</th>
              <th>Imposto</th>
              <th>Lucro</th>
              <th>Margem</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {vendasData.map((venda, index) => (
              <tr key={index}>
                <td>{venda.numero}</td>
                <td><img src={venda.imagem} alt="Produto" className={styles.productImage} /></td>
                <td>{venda.sku}</td>
                <td>{venda.marketplace}</td>
                <td>{venda.nome}</td>
                <td>{venda.venda}</td>
                <td>{venda.custo}</td>
                <td>{venda.imposto}</td>
                <td>{venda.lucro}</td>
                <td>{venda.margem}</td>
                <td>{venda.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default VendasPage;
