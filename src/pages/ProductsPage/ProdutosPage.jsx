import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header/Header';  
import Sidebar from '../../components/Sidebar/Sidebar';  
import TopBar from '../../components/TopBar/TopBar';  
import Footer from '../../components/Footer/Footer';  
import MainContent from '../../components/MainContent/MainContent';  // Adicionando o MainContent
import { AuthContext } from '../../context/AuthContext';  
import styles from './produtos.module.css';  
import ProductsForm from '../../components/ProductsForm/ProductsForm'; // Importando o formulário de Produto Simples
import KitsForm from '../../components/ProductsForm/KitsForm';

function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca
  const [showProductsModal, setShowProductsModal] = useState(false); // Estado para controlar o modal de Produto Simples
  const [showKitsModal, setShowKitsModal] = useState(false); // Estado para controlar o modal de Kit

  // Utilizando o contexto de autenticação para pegar informações do usuário
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  useEffect(() => {
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProdutos = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    produto.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produto.ean.includes(searchTerm)
  );

  // Funções para controlar a exibição dos modais
  const handleCloseProductsModal = () => setShowProductsModal(false);
  const handleOpenProductsModal = () => setShowProductsModal(true);

  const handleCloseKitsModal = () => setShowKitsModal(false);
  const handleOpenKitsModal = () => setShowKitsModal(true);

  // Função para salvar um novo produto
  const handleSaveProduct = (newProduct) => {
    setProdutos([...produtos, newProduct]);
  };

  // Função para salvar um novo kit
  const handleSaveKit = (newKit) => {
    setProdutos([...produtos, newKit]); // Mesma lógica para salvar kits
  };

  return (
    <MainContent> {/* Envolvendo o conteúdo com MainContent */}
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />
        <div className={styles.produtosContainer}>
          <h1 className={styles.produtosTitle}>Meus Produtos</h1>

          {/* Dois botões para Adicionar Produto Simples e Adicionar Kit */}
          <div className={styles.buttonContainer}>
            <button className={styles.addProductButton} onClick={handleOpenProductsModal}>
              Adicionar Produto
            </button>
            <button className={styles.addKitButton} onClick={handleOpenKitsModal}>
              Adicionar Kit
            </button>
          </div>

          <div className={styles.filterSection}>
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

      {/* Exibindo o modal de adicionar produto simples */}
      {showProductsModal && (
        <ProductsForm onSaveProduct={handleSaveProduct} onClose={handleCloseProductsModal} />
      )}

      {/* Exibindo o modal de adicionar kit */}
      {showKitsModal && (
        <KitsForm onSaveKit={handleSaveKit} onClose={handleCloseKitsModal} />
      )}

      <Footer />
    </MainContent>
  );
}

export default ProdutosPage;
