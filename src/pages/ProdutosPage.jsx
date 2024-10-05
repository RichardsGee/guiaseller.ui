import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import TopBar from '../components/TopBar/TopBar';
import Footer from '../components/Footer/Footer';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/produtos.module.css';
import filterStyles from '../styles/filter.module.css';

function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca

  // Utilizando o contexto de autenticação para pegar informações do usuário
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  useEffect(() => {
    // Exemplo de dados de produtos
    const produtosData = [
      {
        id: 1,
        imagem: 'img_url_1',
        nome: 'Produto A',
        sku: 'SKU123',
        ean: '1234567890123',
        altura: '10cm',
        largura: '20cm',
        comprimento: '30cm'
      },
      {
        id: 2,
        imagem: 'img_url_2',
        nome: 'Produto B',
        sku: 'SKU456',
        ean: '9876543210987',
        altura: '15cm',
        largura: '25cm',
        comprimento: '35cm'
      }
    ];
    setProdutos(produtosData);
  }, []);

  // Função para lidar com a alteração no campo de busca
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar os produtos com base no termo de busca
  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    produto.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.ean.includes(searchTerm)
  );

  return (
    <div className="container">
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />
        <div className={styles.produtosContainer}>
          <h1 className={styles.produtosTitle}>Meus Produtos</h1>
          
          {/* Campo de pesquisa dentro da seção de filtro */}
          <div className={filterStyles.filterSection}>
            <label htmlFor="search"></label>
            <input
              id="search"
              type="text"
              placeholder="Digite o nome, SKU ou EAN..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            </div>

          <table className={styles.produtosTable}>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>SKU</th>
                <th>EAN</th>
                <th>Altura</th>
                <th>Largura</th>
                <th>Comprimento</th>
              </tr>
            </thead>
            <tbody>
              {filteredProdutos.map((produto) => (
                <tr key={produto.id}>
                  <td><img src={produto.imagem} alt="Produto" className={styles.produtoImage} /></td>
                  <td>{produto.nome}</td>
                  <td>{produto.sku}</td>
                  <td>{produto.ean}</td>
                  <td>{produto.altura}</td>
                  <td>{produto.largura}</td>
                  <td>{produto.comprimento}</td>
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

export default ProdutosPage;
