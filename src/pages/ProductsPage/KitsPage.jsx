import React, { useContext, useState, useEffect } from 'react';
import Header from '../../components/Header/Header';  
import Sidebar from '../../components/Sidebar/Sidebar';  
import Footer from '../../components/Footer/Footer';  
import MainContent from '../../components/MainContent/MainContent';  
import { AuthContext } from '../../context/AuthContext';  
import productsList from '../../components/ProductsForm/ProductsList'; // Importando a lista de produtos
import styles from './KitsPage.module.css'; // Módulo de estilos
import { AiOutlineClose } from 'react-icons/ai'; // Ícone de "X" para remover

const KitsPage = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  const [kitItems, setKitItems] = useState([]); // Itens do kit
  const [skuSearch, setSkuSearch] = useState(''); // Campo de busca
  const [quantities, setQuantities] = useState({}); // Quantidades dos produtos
  const [filteredProducts, setFilteredProducts] = useState(productsList); // Lista filtrada de produtos
  const [formData, setFormData] = useState({ nome: '', sku: '', quantidade: '' }); // Dados do formulário
  const [selectedItem, setSelectedItem] = useState(null); // Item selecionado para cancelar

  // Função para filtrar produtos com base no SKU ou nome flexível
  useEffect(() => {
    const searchTerm = skuSearch.trim().toLowerCase();
    
    if (searchTerm === '') {
      setFilteredProducts(productsList); // Exibe todos os produtos se o campo de busca estiver vazio
    } else {
      const newFilteredProducts = productsList.filter(product => {
        const productName = product.nome.toLowerCase();
        const productSku = product.sku.toLowerCase();
        
        // Verifica se o termo de busca está contido no nome ou SKU
        return productName.includes(searchTerm) || productSku.includes(searchTerm);
      });

      setFilteredProducts(newFilteredProducts);
    }
    
    // Log para debugging
    console.log("Termo de busca:", searchTerm);
    console.log("Produtos filtrados:", filteredProducts);
  }, [skuSearch]);

  const handleSkuSearch = (e) => {
    setSkuSearch(e.target.value); // Atualiza o estado com o valor da busca
  };

  const handleQuantityChange = (sku, e) => {
    const value = e.target.value;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [sku]: value
    }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSelectSKU = (product) => {
    const quantity = quantities[product.sku] || 1; 
    setKitItems([...kitItems, { sku: product.sku, quantidade: quantity, nome: product.nome, imagem: product.imagem }]);
    setSelectedItem(product); // Armazena o item selecionado
    setSkuSearch(''); 
    setQuantities((prev) => ({ ...prev, [product.sku]: '' })); 
  };

  const handleRemoveProduct = (sku) => {
    setKitItems(kitItems.filter((item) => item.sku !== sku));
  };

  const handleSaveKit = () => {
    console.log('Kit Salvo:', kitItems); // Aqui você pode implementar a lógica de salvar o kit
  };

  const handleCancel = () => {
    if (selectedItem) {
        handleRemoveProduct(selectedItem.sku); // Remove o item selecionado
        setSelectedItem(null); // Limpa o item selecionado
    } else {
        // Limpa os campos do formulário
        setFormData({ nome: '', sku: '', quantidade: '' });
        setQuantities({});
        setSkuSearch('');
    }
};

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <div className="contentContainer">
          <h1 className="title">Adicionar Kit</h1>

          {/* Grupo de busca e campos de Nome, SKU e Quantidade */}
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Buscar SKU ou nome do produto"
              value={skuSearch}
              onChange={handleSkuSearch}
              className={styles.skuSearchInput}
            />
            {/* Contêiner para alinhar Nome, SKU e Quantidade */}
            <div className={styles.inlineFields}>
              <div className={styles.inputField}>
                <label htmlFor="nome">Nome</label>
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleFormChange}
                  className={styles.input}
                  placeholder="Digite o nome"
                />
              </div>
              <div className={styles.inputField}>
                <label htmlFor="sku">SKU</label>
                <input
                  id="sku"
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleFormChange}
                  className={styles.input}
                  placeholder="Digite o SKU"
                />
              </div>
              <div className={styles.inputField}>
                <label htmlFor="quantidade">Quantidade</label>
                <input
                  id="quantidade"
                  type="number"
                  name="quantidade"
                  min="1"
                  value={formData.quantidade}
                  onChange={handleFormChange}
                  className={styles.input}
                  placeholder="Quantidade"
                />
              </div>
            </div>
          </div>

          {/* Produtos selecionados */}
          <div className={styles.selectedProductsContainer}>
            <h3 className={`${styles.Title} ${styles.selectedProductsTitle}`}>Produtos no Kit</h3>
            <div className={styles.addedProductsContainer}>
              {kitItems.map((item, index) => (
                <div className={styles.kitItem} key={index}>
                  <img src={item.imagem} alt={item.nome} className={styles.kitItemImage} />
                  <div className={styles.kitItemInfo}>
                    <h4>{item.nome}</h4>
                    <p>SKU: {item.sku}</p>
                    <p>{item.quantidade} UN.</p>
                  </div>
                  <button className={styles.removeButton} onClick={() => handleRemoveProduct(item.sku)}>
                    <AiOutlineClose />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Botões de Salvar e Cancelar */}
          <div className={styles.buttonGroup}>
            <button className={styles.saveProductButton} onClick={handleSaveKit}>
              Salvar Kit
            </button>
            <button className={styles.closeButton} onClick={handleCancel}>
              Cancelar
            </button>
          </div>

          {/* Galeria de produtos à direita */}
          <div className={styles.galleryContainer}>
            {filteredProducts.length > 0 ? ( // Verifica se há produtos filtrados
              filteredProducts.map((product) => (
                <div key={product.sku} className={styles.galleryItem}>
                  <img src={product.imagem} alt={product.nome} className={styles.galleryItemImage} />
                  <div className={styles.productInfo}>
                    <h4>{product.nome}</h4>
                    <p>SKU: {product.sku}</p>
                  </div>

                  {/* Campo para preencher a quantidade individual */}
                  <input
                    type="number"
                    min="1"
                    value={quantities[product.sku] || ''}
                    onChange={(e) => handleQuantityChange(product.sku, e)}
                    className={styles.quantityInput}
                    placeholder="Quantidade"
                  />
                  <button className={styles.addButton} onClick={() => handleSelectSKU(product)}>
                    Adicionar
                  </button>
                </div>
              ))
            ) : (
              <p>Nenhum produto encontrado.</p> // Mensagem quando não há produtos correspondentes
            )}
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default KitsPage;
