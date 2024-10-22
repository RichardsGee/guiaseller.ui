import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header/Header';  
import Sidebar from '../../components/Sidebar/Sidebar';  
import Footer from '../../components/Footer/Footer';  
import MainContent from '../../components/MainContent/MainContent'; 
import { AuthContext } from '../../context/AuthContext';  
import styles from './produtos.module.css';  
import ProductsForm from '../../components/ProductsForm/ProductsForm'; 
import { useNavigate } from 'react-router-dom'; // Importando useNavigate
import '../../styles/styles.css'; 

function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductsModal, setShowProductsModal] = useState(false); 
  const navigate = useNavigate(); // Hook para navegação
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
  
  // Função para navegar para a página de Kits
  const handleOpenKitsPage = () => {
    navigate('/kits'); // Mudar para a rota correta de KitsPage
  };

  const handleSaveProduct = (newProduct) => {
    setProdutos([...produtos, newProduct]);
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
              <button className={styles.addKitButton} onClick={handleOpenKitsPage}>
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
                  <th>Custo</th> {/* Nova coluna de Custo */}
                  <th>Estoque</th> {/* Nova coluna de Estoque */}
                  <th>EAN</th> {/* Coluna a ser escondida no mobile */}
                  <th>Altura</th> {/* Coluna a ser escondida no mobile */}
                  <th>Largura</th> {/* Coluna a ser escondida no mobile */}
                  <th>Comprimento</th> {/* Coluna a ser escondida no mobile */}
                </tr>
              </thead>
              <tbody>
                {filteredProdutos.map((produto) => (
                  <tr key={produto.id}>
                    <td><img src={produto.imagem} alt="Produto" className={styles.produtoImage} /></td>
                    <td>{produto.nome}</td>
                    <td>{produto.sku}</td>
                    <td>{produto.custo}</td> {/* Nova coluna de Custo */}
                    <td>{produto.estoque}</td> {/* Nova coluna de Estoque */}
                    <td>{produto.ean}</td> {/* Coluna a ser escondida no mobile */}
                    <td>{produto.altura}</td> {/* Coluna a ser escondida no mobile */}
                    <td>{produto.largura}</td> {/* Coluna a ser escondida no mobile */}
                    <td>{produto.comprimento}</td> {/* Coluna a ser escondida no mobile */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showProductsModal && (
        <ProductsForm onSaveProduct={handleSaveProduct} onClose={handleCloseProductsModal} />
      )}

      <Footer />
    </MainContent>
  );
}

export default ProdutosPage;
