import React, { useState } from 'react';
import productsList from './ProductsList'; // Importando a lista de produtos
import styles from './KitsForm.module.css';
import { AiOutlineClose } from 'react-icons/ai'; // Ícone de "X" para remover

const KitsForm = ({ onSaveKit, onClose }) => {
  const [kitItems, setKitItems] = useState([]);
  const [skuSearch, setSkuSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsList);
  const [quantities, setQuantities] = useState({}); // Estado para armazenar as quantidades individualmente
  const [formData, setFormData] = useState({ nome: '', sku: '', quantidade: '' }); // Estado para armazenar Nome, SKU e Quantidade do produto

  // Filtrar produtos existentes com base na busca
  const handleSkuSearch = (e) => {
    const searchTerm = e.target.value;
    setSkuSearch(searchTerm);

    // Filtra os produtos de ProductsList com base no nome ou SKU
    const filtered = productsList.filter(product =>
      product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Lidar com a alteração de quantidade individual para cada produto
  const handleQuantityChange = (sku, e) => {
    const value = e.target.value;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [sku]: value
    }));
  };

  // Atualizar os campos Nome, SKU e Quantidade no formulário
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Adicionar SKU ao kit
  const handleSelectSKU = (product) => {
    const quantity = quantities[product.sku] || 1; // Se não houver quantidade definida, assume 1
    setKitItems([...kitItems, { sku: product.sku, quantidade: quantity, nome: product.nome, imagem: product.imagem }]);
    setSkuSearch(''); // Limpa a busca
    setQuantities((prev) => ({ ...prev, [product.sku]: '' })); // Reseta a quantidade após adicionar
  };

  // Remover produto do kit
  const handleRemoveProduct = (sku) => {
    setKitItems(kitItems.filter((item) => item.sku !== sku));
  };

  // Salvar o Kit
  const handleSaveKit = () => {
    onSaveKit(kitItems);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        
        {/* Seção de formulário à esquerda */}
        <div className={styles.formSection}>
          <h2 className={`${styles.Title} ${styles.addKitTitle}`}>Adicionar Kit</h2>

          {/* Campo de busca de SKU */}
          <input
            type="text"
            placeholder="Buscar SKU ou nome do produto"
            value={skuSearch}
            onChange={handleSkuSearch}
            className={styles.skuSearchInput}
          />

          {/* Campos de Nome, SKU e Quantidade */}
          <div className={styles.inputGroup}>
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

          {/* Produtos selecionados */}
          <div className={styles.selectedProductsContainer}>
            <h3 className={`${styles.Title} ${styles.selectedProductsTitle}`}>Produtos no Kit</h3>
            <div className={styles.addedProductsContainer}>
              {kitItems.map((item, index) => (
                <React.Fragment key={index}>
                  {/* Produto adicionado */}
                  <div className={styles.kitItem}>
                    <img src={item.imagem} alt={item.nome} className={styles.kitItemImage} />
                    <div className={styles.kitItemInfo}>
                      <h4>{item.nome}</h4>
                      <p>SKU: {item.sku}</p>
                      <p>{item.quantidade} UN.</p>
                    </div>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveProduct(item.sku)}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Botões de Salvar e Cancelar */}
          <div className={styles.buttonGroup}>
            <button className={styles.saveProductButton} onClick={handleSaveKit}>
              Salvar Kit
            </button>
            <button className={styles.closeButton} onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>

        {/* Galeria de produtos à direita */}
        <div className={styles.galleryContainer}>
          {filteredProducts.map((product) => (
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
          ))}
        </div>

      </div>
    </div>
  );
};

export default KitsForm;
