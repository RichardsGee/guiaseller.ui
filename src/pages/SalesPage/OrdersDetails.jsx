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

  // Passos do termômetro de envio
  const shippingSteps = [
    { step: "1. Em Preparação", status: venda.status_detail === "in_packing_list" || venda.status === "ready_to_ship" },
    { step: "2. Pronto para Enviar", status: venda.status_detail === "ready_to_print" },
    { step: "3. Enviado", status: venda.status_detail === "out_for_delivery" || venda.status_detail === "shipment_paid" },
    { step: "4. Entregue", status: venda.status_detail === "delivered" }
  ];

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

      {/* Termômetro de Envio */}
      <div className={styles.shippingStepsContainer}>
        <div className={styles.shippingSteps}>
          {shippingSteps.map((step, index) => (
            <React.Fragment key={index}>
              <div className={`${styles.step} ${step.status ? styles.activeStep : ''}`}>
                {step.step}
              </div>
              {index < shippingSteps.length - 1 && <span className={styles.arrow}> ⇾ </span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersDetails;
