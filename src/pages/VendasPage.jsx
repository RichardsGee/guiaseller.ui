import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/vendas.module.css'; // Importando o CSS Module
import filterStyles from '../styles/filter.module.css'; // Importando o CSS do filtro
import { ArrowUpward, ArrowDownward, AttachMoney, PriceCheck, LocalShipping } from '@mui/icons-material'; // Ícones

const VendasPage = () => {
  const [vendas, setVendas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedVendaId, setExpandedVendaId] = useState(null); // Estado para armazenar o ID da venda expandida

  // Utilizando o contexto de autenticação para pegar informações do usuário
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null; 
  const userEmail = user ? user.email : null;

  useEffect(() => {
    const vendasData = [
      {
        id: 9811,
        imagem: 'img_url_1',
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

  // Função para alternar a expansão de uma venda
  const toggleExpandVenda = (id) => {
    setExpandedVendaId(expandedVendaId === id ? null : id);
  };

  // Função para filtrar as vendas com base no termo de busca
  const filteredVendas = vendas.filter(venda =>
    venda.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    venda.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venda.marketplaceEnvio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Formatação para valores financeiros
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

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
            <label htmlFor="search"></label>
            <input
              id="search"
              type="text"
              placeholder="Digite o nome, SKU ou marketplace..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="button">Buscar Venda</button>
          </div>

          <table className={styles.vendasTable}>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>SKU</th>
                <th>Marketplace/Envio</th>
                <th>Nome</th>
                <th>Venda</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendas.map((venda) => (
                <React.Fragment key={venda.id}>
                  <tr onClick={() => toggleExpandVenda(venda.id)} className={styles.vendaRow}>
                    <td><img src={venda.imagem} alt="Produto" className={styles.vendaImage} /></td>
                    <td>{venda.sku}</td>
                    <td>{venda.marketplaceEnvio}</td>
                    <td>{venda.nome}</td>
                    <td>{formatCurrency(venda.venda)}</td>
                  </tr>
                  {expandedVendaId === venda.id && (
                    <tr className={styles.vendaDetails}>
                      <td colSpan="5">
                        <div className={styles.detailsContainer}>
                          <p>
                            <PriceCheck className={styles.icon} />
                            <strong>Custo:</strong> {formatCurrency(venda.custo)}
                          </p>
                          <p>
                            <LocalShipping className={styles.icon} />
                            <strong>Imposto:</strong> {formatCurrency(venda.imposto)}
                          </p>
                          <p className={venda.lucro > 0 ? styles.lucroPositivo : styles.lucroNegativo}>
                            {venda.lucro > 0 ? <ArrowUpward className={styles.iconPositive} /> : <ArrowDownward className={styles.iconNegative} />}
                            <strong>Lucro:</strong> {formatCurrency(venda.lucro)}
                          </p>
                          <p>
                            <AttachMoney className={styles.icon} />
                            <strong>Margem:</strong> {venda.margem}
                          </p>
                          <p>
                            <strong>Status:</strong> {venda.status}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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
