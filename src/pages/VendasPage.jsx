import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/vendas.module.css'; // Importando o CSS Module
import filterStyles from '../styles/filter.module.css'; // Importando o CSS do filtro

const VendasPage = () => {
  const [vendas, setVendas] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca

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

  // Função para lidar com a alteração no campo de busca
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Função para filtrar as vendas com base no termo de busca
  const filteredVendas = vendas.filter(venda =>
    venda.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    venda.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venda.marketplaceEnvio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />
        <div className={styles.vendasContainer}>
          <h1 className={styles.vendasTitle}>Meus Pedidos</h1>

          {/* Campo de busca dentro da seção de filtro */}
          <div className={filterStyles.filterSection}>
            <label htmlFor="search">Buscar Venda:</label>
            <input
              id="search"
              type="text"
              placeholder="Digite o nome, SKU ou marketplace/envio..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="button">Filtrar</button>
          </div>

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
              {filteredVendas.map((venda) => (
                <tr key={venda.id}>
                  <td>{venda.id}</td>
                  <td><img src={venda.imagem} alt="Produto" className={styles.vendaImage} /></td>
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
};

export default VendasPage;
