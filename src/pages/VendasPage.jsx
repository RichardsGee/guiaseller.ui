import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/vendas.module.css'; // Importando o CSS Module
import filterStyles from '../styles/filter.module.css';
import { ArrowUpward, ArrowDownward, AttachMoney, PriceCheck, LocalShipping, Person, Store, Tag } from '@mui/icons-material'; // Ícones

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
        venda: 109.90, // Como número
        custo: 10.99,
        imposto: 8.79,
        lucro: 90.12,
        margem: '82,00%',
        status: 'Aguardando Pagamento',
      },
      {
        id: 9810,
        imagem: 'img_url_2',
        sku: 'CO691486',
        marketplaceEnvio: 'Magalu / Coleta',
        nome: 'Rosany Vescovi',
        venda: 29.93,
        custo: 16.99,
        imposto: 2.39,
        lucro: 10.55,
        margem: '35,29%',
        status: 'Aguardando Pagamento',
      },
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
    const numberValue = parseFloat(value); // Converte o valor para número
    if (isNaN(numberValue)) {
      return 'R$ 0,00'; // Se não for um número, retorna 0
    }
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numberValue);
  };

  // Função para determinar o tipo de ícone com base no campo filtrado
  const getSearchIcon = () => {
    if (filteredVendas.some(venda => venda.nome.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return <Person className={filterStyles.searchResultsIcon} />;
    }
    if (filteredVendas.some(venda => venda.marketplaceEnvio.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return <Store className={filterStyles.searchResultsIcon} />;
    }
    if (filteredVendas.some(venda => venda.sku.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return <Tag className={filterStyles.searchResultsIcon} />;
    }
    return null; // Sem ícone se nenhum critério for atendido
  };

  return (
    <div className="container">
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />
        <div className={styles.vendasContainer}>
          <h1 className={styles.vendasTitle}>Meus Pedidos</h1>

          {/* Filtro de busca e resultados dentro do mesmo container */}
          <div className={filterStyles.filterWrapper}>
            <div className={filterStyles.filterSection}>
              <label htmlFor="search"></label>
              <input
                id="search"
                type="text"
                placeholder="Digite o nome, SKU ou marketplace..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            {/* Exibindo o termo de busca e a quantidade de resultados */}
            <div className={`${filterStyles.searchResults} ${searchTerm ? filterStyles.active : ''}`}>
              {getSearchIcon()}
              <p><strong>Busca:</strong> {searchTerm || 'N/A'}</p>
              <p><strong>Resultado:</strong> {filteredVendas.length}</p>
            </div>
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
