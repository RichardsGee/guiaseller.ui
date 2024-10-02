import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/vendas.module.css'; // Importando o CSS Module

function VendasPage() {
  const [vendas, setVendas] = useState([]);

  // Utilizando o contexto de autenticação para pegar informações do usuário
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null; 
  const userEmail = user ? user.email : null;

  useEffect(() => {
    const vendasData = [
      {
        id: 9811,
        imagem: 'img_url_1', // URL da imagem do produto
        sku: 'JARR027',
        marketplaceEnvio: 'Kwai / Kwai',
        nome: 'Gislene Machado',
        venda: 'R$ 109,90',
        custo: 'R$ 10,99',
        imposto: 'R$ 8,79',
        lucro: 'R$ 90,12',
        margem: '82,00%',
        status: 'Aguardando Pagamento',
      },
      {
        id: 9810,
        imagem: 'img_url_2',
        sku: 'CO691486',
        marketplaceEnvio: 'Magalu / Coleta',
        nome: 'Rosany Vescovi',
        venda: 'R$ 29,93',
        custo: 'R$ 16,99',
        imposto: 'R$ 2,39',
        lucro: 'R$ 10,55',
        margem: '35,29%',
        status: 'Aguardando Pagamento',
      },
      // Adicione mais vendas conforme necessário
    ];
    setVendas(vendasData);
  }, []);

  return (
    <div className="container">
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />
        <div className={styles.vendasContainer}>
          <h1 className={styles.vendasTitle}>Meus Pedidos</h1>
          <table className={styles.vendasTable}>
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
              {vendas.map((venda) => (
                <tr key={venda.id}>
                  <td>{venda.id}</td>
                  <td><img src={venda.imagem} alt="Produto" className={styles.vendaImage}/></td>
                  <td>{venda.sku}</td>
                  <td>{venda.marketplaceEnvio}</td>
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
      </div>
      <Footer />
    </div>
  );
}

export default VendasPage;
