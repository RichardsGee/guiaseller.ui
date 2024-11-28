import React from 'react';
import styles from './OrdersDetails.module.css'; // Caminho do CSS

const OrdersDetails = ({ venda }) => {
  const formatCurrency = (value) => {
    const numberValue = parseFloat(value);
    return isNaN(numberValue) ? 'R$ 0,00' : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numberValue);
  };

  // Calcula o repasse (valor pago - taxa marketplace)
  const valorPago = venda.payments?.total_paid_amount || venda.total_amount;
  const taxaMarketplace = venda.payments?.marketplace_fee || 0;
  const repasse = valorPago - taxaMarketplace;

  // Função para determinar a cor do valor (vermelho se negativo)
  const getValueColor = (value) => {
    return value < 0 ? styles.negativeValue : styles.positiveValue;
  };

  return (
    <div className={styles.detailsContainer}>
      {/* Exibindo as informações de forma organizada */}
      <div className={styles.detailsCard}>
        <p><strong>Anúncio:</strong> {venda.description || 'N/A'}</p> {/* Trocar "Descrição" por "Anúncio" */}
        <p><strong>Data:</strong> {venda.expiration_date ? new Date(venda.expiration_date).toLocaleDateString() : 'N/A'}</p> {/* Alterar "Data de Expiração" para "Data" */}
        <p><strong>Status Detalhado:</strong> {venda.status_detail || 'N/A'}</p>
      </div>

      <div className={styles.detailsCard}>
        <p><strong>Valor Pago:</strong> <span className={getValueColor(valorPago)}>{formatCurrency(valorPago)}</span></p>
        <p><strong>Taxa de Marketplace:</strong> <span className={getValueColor(-taxaMarketplace)}>{formatCurrency(taxaMarketplace)}</span></p> {/* Garantir que a Taxa de Marketplace negativa seja vermelha */}
        <p><strong>Repasse:</strong> <span className={getValueColor(repasse)}>{formatCurrency(repasse)}</span></p> {/* Calculando o Repasse */}
      </div>
    </div>
  );
};

export default OrdersDetails;
