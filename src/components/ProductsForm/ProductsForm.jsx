import React, { useState } from 'react';
import styles from './ProductsForm.module.css';

const ProductsForm = ({ onSaveProduct, onClose }) => {
  const [newProduct, setNewProduct] = useState({
    sku: '',
    nome: '',
    descricao: '',
    marca: '',
    ean: '',
    ncm: '',
    largura: '',
    altura: '',
    comprimento: '',
    peso: '',
    precoCusto: '',
    estoque: '',
    imagens: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProduct = () => {
    onSaveProduct(newProduct);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Adicionar Produto</h2>

        <div className={styles.horizontalForm}>
          <div className={styles.formRow}>
            <label>SKU</label>
            <input name="sku" value={newProduct.sku} onChange={handleInputChange} />
          </div>
          <div className={styles.formRow}>
            <label>Nome</label>
            <input name="nome" value={newProduct.nome} onChange={handleInputChange} />
          </div>
          {/* Adicione os outros campos conforme necessário */}
        </div>

        <button className={styles.saveProductButton} onClick={handleSaveProduct}>
          Salvar Produto
        </button>
        <button className={styles.closeButton} onClick={onClose}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ProductsForm;
