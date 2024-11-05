// src/components/AdditionalInfo/AdditionalInfo.jsx
import React, { useState } from 'react';
import { Tag, Cancel } from '@mui/icons-material';
import styles from './AdditionalInfo.module.css';

function AdditionalInfo({ vendas }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  // Filtrar as vendas com base no mês selecionado
  const filteredVendas = vendas.filter((venda) => {
    const vendaDate = new Date(venda.date_created);
    return vendaDate.getMonth() + 1 === selectedMonth;
  });

  const getTop3Products = () => {
    const productMap = {};

    filteredVendas.forEach((venda) => {
      const isCatalog = venda.tags.includes("catalog");
      const isCancelled = venda.status === "cancelled";

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

    return Object.entries(productMap)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 3);
  };

  const top3Products = getTop3Products();

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  return (
    <section className={styles.additionalInfo}>
      <div className={styles.topSellersContainer}>
        <div className={styles.header}>
          <h3>Mais Vendidos em</h3>
          <select className={styles.monthFilter} value={selectedMonth} onChange={handleMonthChange}>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

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
