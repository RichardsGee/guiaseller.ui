import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header/Header';  
import Sidebar from '../../components/Sidebar/Sidebar';  
import Footer from '../../components/Footer/Footer';  
import MainContent from '../../components/MainContent/MainContent'; 
import { AuthContext } from '../../context/AuthContext';  
import styles from './produtos.module.css';  
import ProductsForm from '../../components/ProductsForm/ProductsForm'; 
import { useNavigate } from 'react-router-dom'; 
import '../../styles/styles.css'; 

function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProdutoId, setExpandedProdutoId] = useState(null); // Estado para armazenar o ID do produto expandido
  const [showProductsModal, setShowProductsModal] = useState(false); 
  const navigate = useNavigate(); 
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
        comprimento: '30cm',
        custo: 'R$ 50,00',
        estoque: '100'
      },
      {
        id: 2,
        imagem: 'img_url_2',
        nome: 'Produto B',
        sku: 'SKU456',
        ean: '9876543210987',
        altura: '15cm',
        largura: '25cm',
        comprimento: '35cm',
        custo: 'R$ 75,00',
        estoque: '50'
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

  const handleCloseProductsModal = () => setShowProductsModal(false);
  const handleOpenProductsModal = () => setShowProductsModal(true);

  // Função para alternar a expansão de um produto
  const toggleExpandProduto = (id) => {
    setExpandedProdutoId(expandedProdutoId === id ? null : id); // Alterna entre expandido e contraído
  };

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <div className="contentContainer">
          <div className={styles.produtosContainer}>
            <h1 className="title">Meus Produtos</h1>

            <div className={styles.buttonContainer}>
              <button className={styles.addProductButton} onClick={handleOpenProductsModal}>
                Adicionar Produto
              </button>
              <button className={styles.addKitButton} onClick={() => navigate('/kits')}>
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
                  <th>Custo</th>
                  <th>Estoque</th>
                  <th>EAN</th>
                  <th>Altura</th>
                  <th>Largura</th>
                  <th>Comprimento</th>
                </tr>
              </thead>
              <tbody>
                {filteredProdutos.map((produto) => (
                  <React.Fragment key={produto.id}>
                    <tr 
                      onClick={() => toggleExpandProduto(produto.id)} 
                      className={styles.produtoRow}
                    >
                      <td><img src={produto.imagem} alt="Produto" className={styles.produtoImage} /></td>
                      <td>{produto.nome}</td>
                      <td>{produto.sku}</td>
                      <td>{produto.custo}</td>
                      <td>{produto.estoque}</td>
                      <td>{produto.ean}</td>
                      <td>{produto.altura}</td>
                      <td>{produto.largura}</td>
                      <td>{produto.comprimento}</td>
                    </tr>
                    {expandedProdutoId === produto.id && (
                      <tr className={styles.produtoDetails}>
                        <td colSpan="9">
                          <div className={styles.detailsContainer}>
                            <p><strong>Nome:</strong> {produto.nome}</p>
                            <p><strong>SKU:</strong> {produto.sku}</p>
                            <p><strong>EAN:</strong> {produto.ean}</p>
                            <p><strong>Dimensões:</strong> {produto.altura} x {produto.largura} x {produto.comprimento}</p>
                            <p><strong>Custo:</strong> {produto.custo}</p>
                            <p><strong>Estoque:</strong> {produto.estoque}</p>
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
      </div>

      {showProductsModal && (
        <ProductsForm onSaveProduct={(newProduct) => setProdutos([...produtos, newProduct])} onClose={handleCloseProductsModal} />
      )}

      <Footer />
    </MainContent>
  );
}

export default ProdutosPage;
