import React, { useState } from 'react';
import styles from './OrdersList.module.css';
import { LocalShippingOutlined, Tag, CheckCircle, Cancel, MoneyOff } from '@mui/icons-material';

const OrdersList = ({ vendas }) => {
  const [expandedVendaId, setExpandedVendaId] = useState(null);

  const toggleExpandVenda = (id) => setExpandedVendaId(expandedVendaId === id ? null : id);

  const formatCurrency = (value) => {
    const numberValue = parseFloat(value);
    return isNaN(numberValue) ? 'R$ 0,00' : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numberValue);
  };

  return (
    <table className={styles.vendasTable}>
      <thead>
        <tr>
          <th>Data</th>
          <th>ID</th>
          <th>Comprador</th>
          <th>ID do Item</th>
          <th>Título do Item</th>
          <th>Total Pago</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {vendas.map((venda) => {
          const hasNotPaid = venda.tags.includes("not_paid");
          const hasPaid = venda.tags.includes("paid") && !hasNotPaid;
          const isRefunded = venda.status === "refunded";
          const hasDelivered = venda.tags.includes("delivered") && !hasNotPaid;
          const hasCatalog = venda.tags.includes("catalog");

          return (
            <React.Fragment key={venda.id}>
              <tr onClick={() => toggleExpandVenda(venda.id)} className={`${styles.vendaRow} ${venda.status === "cancelled" ? styles.cancelledRow : ''}`}>
                <td>{new Date(venda.date_created).toLocaleDateString()}</td>
                <td>{venda.id}</td>
                <td>{venda.comprador_nickname}</td>
                <td>{venda.order_items[0]?.item.id || 'N/A'}</td>
                <td>{venda.order_items[0]?.item.title.slice(0, 60) || 'N/A'}...</td>
                <td>{venda.payments[0]?.total_paid_amount ? formatCurrency(venda.payments[0].total_paid_amount) : 'N/A'}</td>
                <td>
                  <Tag className={hasCatalog ? styles.catalogIcon : styles.iconInactive} />
                  {isRefunded ? (
                    <Cancel className={styles.refundedIcon} />
                  ) : hasPaid ? (
                    <CheckCircle className={styles.paidIcon} />
                  ) : (
                    <MoneyOff className={styles.notPaidIcon} />
                  )}
                  <LocalShippingOutlined className={hasDelivered ? styles.deliveredIcon : styles.iconInactive} />
                </td>
              </tr>
              {expandedVendaId === venda.id && (
                <tr className={styles.vendaDetails}>
                  <td colSpan="7">
                    <div className={styles.detailsContainer}>
                      <p><strong>Descrição:</strong> {venda.description || 'N/A'}</p>
                      <p><strong>Data de Expiração:</strong> {venda.expiration_date ? new Date(venda.expiration_date).toLocaleDateString() : 'N/A'}</p>
                      <p><strong>Itens:</strong></p>
                      <ul>
                        {venda.order_items.map((item, index) => (
                          <li key={index}>
                            {item.item.title} - Quantidade: {item.quantity} - Preço Unitário: {formatCurrency(item.unit_price)}
                          </li>
                        ))}
                      </ul>
                      <p><strong>Pagamentos:</strong></p>
                      <ul>
                        {venda.payments.map((payment, index) => (
                          <li key={index}>
                            {payment.reason} - Valor Pago: {formatCurrency(payment.total_paid_amount)} - Status: {payment.status}
                          </li>
                        ))}
                      </ul>
                      <p><strong>Tags:</strong> {venda.tags ? venda.tags.join(', ') : 'N/A'}</p>
                      <p><strong>Status Detalhado:</strong> {venda.status_detail || 'N/A'}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrdersList;
