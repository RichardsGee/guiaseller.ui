// src/components/AdditionalInfo/AdditionalInfo.jsx
import React from 'react';
import { Tag, Cancel } from '@mui/icons-material'; // Ícones de hashtag e cancelado
import styles from './AdditionalInfo.module.css';

function AdditionalInfo({ vendas }) {
  // Função para calcular os 3 produtos mais vendidos com contagem de "Catálogo", "Tradicional" e "Cancelados"
  const getTop3Products = () => {
    const productMap = {};

    vendas.forEach((venda) => {
      const isCatalog = venda.tags.includes("catalog");
      const isCancelled = venda.status === "cancelled"; // Checa se o pedido foi cancelado

      venda.order_items.forEach((item) => {
        const productName = item.item.title;
        const quantity = item.quantity;
        const totalAmount = item.unit_price * quantity;

        if (!productMap[productName]) {
          productMap[productName] = {
            totalQuantity: 0,
            catalogQuantity: 0,
            traditionalQuantity: 0,
            cancelledQuantity: 0,
            totalAmount: 0,
          };
        }

        productMap[productName].totalQuantity += quantity;
        productMap[productName].totalAmount += totalAmount;

        if (isCancelled) {
          productMap[productName].cancelledQuantity += quantity;
        } else if (isCatalog) {
          productMap[productName].catalogQuantity += quantity;
        } else {
          productMap[productName].traditionalQuantity += quantity;
        }
      });
    });

    // Converte o mapa em array, ordena por quantidade total e retorna os 3 primeiros
    return Object.entries(productMap)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 3);
  };

  const top3Products = getTop3Products();

  return (
    <section className={styles.additionalInfo}>
      <div className={styles.topSellersContainer}>
        <h3>Mais Vendidos</h3>
        <div className={styles.productList}>
          {top3Products.map((product, index) => (
            <div key={index} className={styles.productItem}>
              <div className={styles.productImage}>
                <span role="img" aria-label="product">📦</span>
              </div>
              <div className={styles.productDetails}>
                <span className={styles.productName}>{product.name}</span>
                <div className={styles.productInfo}>
                  <span className={styles.productQuantity}>Total: {product.totalQuantity}</span>
                  <span className={styles.productTotal}>
                    Valor Total: {product.totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
                <div className={styles.productTypeBreakdown}>
                  <span className={styles.catalogQuantity}>
                    <Tag className={styles.catalogIcon} /> {product.catalogQuantity} Vendas
                  </span>
                  <span className={styles.traditionalQuantity}>
                    <Tag className={styles.traditionalIcon} /> {product.traditionalQuantity} Vendas
                  </span>
                  <span className={styles.cancelledQuantity}>
                    <Cancel className={styles.cancelledIcon} /> {product.cancelledQuantity} Cancelados
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.marketplaceContainer}>
        <h3>Mais Vendidos em Cada Marketplace</h3>
        <p>Em Breve</p>
      </div>
    </section>
  );
}

export default AdditionalInfo;
