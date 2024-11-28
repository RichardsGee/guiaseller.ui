import React, { useState } from 'react';
import styles from './OrdersList.module.css'; // Caminho correto para o CSS
import { LocalShippingOutlined, Tag, CheckCircle, Cancel, MoneyOff, FlashOn, TwoWheeler, AssignmentTurnedIn } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip'; // Importando Tooltip do Material UI
import OrdersDetails from './OrdersDetails'; // Importando o novo componente de detalhes

const OrdersList = ({ vendas }) => {
  const [expandedVendaId, setExpandedVendaId] = useState(null);

  const toggleExpandVenda = (id) => setExpandedVendaId(expandedVendaId === id ? null : id);

  const formatCurrency = (value) => {
    const numberValue = parseFloat(value);
    return isNaN(numberValue) ? 'R$ 0,00' : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numberValue);
  };

  // Função para retornar o ícone com base no tipo de logística
  const getLogisticIcon = (logisticType) => {
    if (logisticType === 'self_service') {
      return (
        <Tooltip title="Logística: Flex (Moto)" arrow>
          <TwoWheeler className={styles.flexIcon} />
        </Tooltip>
      );
    } else if (logisticType === 'fulfilment') {
      return (
        <Tooltip title="Logística: FULL (Armazém)" arrow>
          <AssignmentTurnedIn className={styles.fullIcon} />
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title="Logística: Padrão (Envio)" arrow>
          <LocalShippingOutlined className={styles.defaultIcon} />
        </Tooltip>
      );
    }
  };

  return (
    <table className={styles.vendasTable}>
      <thead>
        <tr>
          <th>Data</th>
          <th>Item ID</th>
          <th>Comprador</th>
          <th>ID do Item</th>
          <th>Título do Item</th>
          <th>Total Pago</th>
          <th>Status</th>
          <th>Logística</th> {/* Nova coluna para mostrar o tipo de logística */}
        </tr>
      </thead>
      <tbody>
        {vendas.map((venda) => {
          const hasNotPaid = venda.tags.includes("not_paid");
          const hasPaid = venda.tags.includes("paid") && !hasNotPaid;
          const isRefunded = venda.status === "refunded";
          const hasDelivered = venda.tags.includes("delivered") && !hasNotPaid;
          const hasCatalog = venda.tags.includes("catalog");
          const isFullfield = venda.fullfield;

          const orderId = venda.payments ? venda.payments.order_id : 'N/A';
          const item = venda.order_items?.item || {};

          const totalPago = venda.payments && venda.payments.total_paid_amount 
            ? formatCurrency(venda.payments?.total_paid_amount)
            : formatCurrency(venda.total_amount);

          const logisticIcon = getLogisticIcon(venda.Logistic);

          return (
            <React.Fragment key={venda.id}>
              <tr onClick={() => toggleExpandVenda(venda.id)} className={`${styles.vendaRow} ${venda.status === "cancelled" ? styles.cancelledRow : ''}`}>
                <td>{new Date(venda.date_created).toLocaleDateString()}</td>
                <td>{orderId}</td>
                <td>{venda.comprador_nickname || 'N/A'}</td>
                <td>{orderId}</td>
                <td>{item.title ? item.title.slice(0, 60) : 'N/A'}...</td>
                <td>{totalPago}</td>
                <td>
                  <div className={styles.statusIconsContainer}>
                    <Tooltip title="Item no Catálogo" arrow>
                      <Tag className={hasCatalog ? styles.catalogIcon : styles.iconInactive} />
                    </Tooltip>
                    {isRefunded ? (
                      <Tooltip title="Pedido Reembolsado" arrow>
                        <Cancel className={styles.refundedIcon} />
                      </Tooltip>
                    ) : hasPaid ? (
                      <Tooltip title="Pagamento Confirmado" arrow>
                        <CheckCircle className={styles.paidIcon} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Pagamento Pendente" arrow>
                        <MoneyOff className={styles.notPaidIcon} />
                      </Tooltip>
                    )}
                    <Tooltip title="Enviado" arrow>
                      <LocalShippingOutlined className={hasDelivered ? styles.deliveredIcon : styles.iconInactive} />
                    </Tooltip>
                    {isFullfield && (
                      <Tooltip title="Pedido Concluído" arrow>
                        <FlashOn className={styles.fullfieldIcon} />
                      </Tooltip>
                    )}
                  </div>
                </td>
                <td>{logisticIcon}</td>
              </tr>
              {expandedVendaId === venda.id && (
                <tr className={styles.vendaDetails}>
                  <td colSpan="8">
                    {/* Exibindo os detalhes da venda com o novo componente */}
                    <OrdersDetails venda={venda} />
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
