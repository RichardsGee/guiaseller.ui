import React, { useState } from 'react';
import { Tag, Cancel, MonetizationOn, CheckCircle } from '@mui/icons-material';
import styles from './AdditionalInfo.module.css';

function AdditionalInfo({ vendas = [], blurAdditional }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const filteredVendas = vendas.filter((venda) => {
    const vendaDate = new Date(venda.date_created);
    return vendaDate.getMonth() + 1 === selectedMonth;
  });

  const getTop3Products = () => {
    const productMap = {};

    filteredVendas.forEach((venda) => {
      const isCatalog = venda.tags.includes("catalog");
      const isCancelled = venda.status === "cancelled";

      // Verifique se order_items é um objeto, caso contrário, atribua um array vazio.
      const orderItems = venda.order_items?.item ? [venda.order_items] : [];
      
      orderItems.forEach((item) => {
        const productName = item.item?.title; // Acessando o nome do produto
        const quantity = item.quantity;
        const totalAmount = item.unit_price * quantity;

        if (!productMap[productName]) {
          productMap[productName] = { totalQuantity: 0, catalogQuantity: 0, cancelledQuantity: 0, totalAmount: 0 };
        }

        productMap[productName].totalQuantity += quantity;
        productMap[productName].totalAmount += totalAmount;

        if (isCancelled) {
          productMap[productName].cancelledQuantity += quantity;
        } else if (isCatalog) {
          productMap[productName].catalogQuantity += quantity;
        }
      });
    });

    return Object.entries(productMap)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 3); // Pega os 3 produtos mais vendidos
  };

  const top3Products = getTop3Products();

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  return (
    <section className={`${styles.additionalInfo} ${blurAdditional ? styles.blurred : ''}`}>
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
                  <div className={styles.fixedContainerWithIcon}>
                    <CheckCircle className={styles.icon} />
                    <span>Vendas&nbsp;</span>
                    <span>{product.totalQuantity}</span>
                  </div>
                  <div className={styles.fixedContainerWithIcon}>
                    <MonetizationOn className={styles.icon} />
                    <span>Total&nbsp;</span>
                    <span>{product.totalAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                  <div className={styles.fixedContainerWithIcon}>
                    <Tag className={styles.catalogIcon} />
                    <span>Catálogo&nbsp;</span>
                    <span>{product.catalogQuantity}</span>
                  </div>
                  <div className={styles.fixedContainerWithIcon}>
                    <Cancel className={styles.cancelledIcon} />
                    <span>Cancelados&nbsp;</span>
                    <span>{product.cancelledQuantity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Container "Em Breve" */}
      <div className={styles.marketplaceContainer}>
        <h3>Em Breve</h3>
      </div>
    </section>
  );
}

export default AdditionalInfo;
