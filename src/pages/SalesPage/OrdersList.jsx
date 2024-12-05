import React, { useState } from 'react';
import styles from './OrdersList.module.css'; // Caminho correto para o CSS
import { Tag } from '@mui/icons-material'; // Ícones do Material UI
import Tooltip from '@mui/material/Tooltip'; // Importando Tooltip corretamente
import OrdersDetails from './OrdersDetails'; // Componente OrdersDetails

const OrdersList = ({ vendas }) => {
  const [expandedVendaId, setExpandedVendaId] = useState(null);

  const toggleExpandVenda = (id) => setExpandedVendaId(expandedVendaId === id ? null : id);

  const formatCurrency = (value) => {
    const numberValue = parseFloat(value);
    return isNaN(numberValue) ? 'R$ 0,00' : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numberValue);
  };

  const getLogisticText = (logisticType) => {
    if (logisticType === 'self_service') {
      return (
        <Tooltip title="Logística: Flex (Moto)" arrow>
          <div className={styles.flexIcon}>FLEX</div>
        </Tooltip>
      );
    } else if (logisticType === 'drop_off') {
      return (
        <Tooltip title="Logística: Padrão" arrow>
          <div className={styles.defaultIcon}>PADRÃO</div>
        </Tooltip>
      );
    } else if (logisticType === 'fulfillment') {
      return (
        <Tooltip title="Logística: FULL (Armazém)" arrow>
          <div className={styles.fullLogistic}>FULL</div>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title="Logística: Caminhão (Envio Padrão)" arrow>
          <div className={styles.defaultIcon}>Envio Padrão</div>
        </Tooltip>
      );
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <table className={styles.vendasTable}>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Data</th>
          <th>Item ID</th>
          <th>Comprador</th>
          <th>ID do Item</th>
          <th>Título do Item</th>
          <th>Total Pago</th>
          <th>Status</th>
          <th>Detalhes do Status</th>
        </tr>
      </thead>
      <tbody>
        {vendas.map((venda) => {
          const hasNotPaid = venda.tags.includes("not_paid");
          const isRefunded = venda.status === "refunded";
          const isShipped = venda.status_detail === "out_for_delivery" || venda.status_detail === "shipment_paid";
          const isInWarehouse = venda.status_detail === "in_warehouse";
          const isPrinted = venda.status_detail === "printed";
          const hasCatalog = venda.tags.includes("catalog");
          const isFullfield = venda.fullfield;

          const orderId = venda.payments ? venda.payments.order_id : 'N/A';
          const item = venda.order_items?.item || {};

          const totalPago = formatCurrency(venda.total_amount);
          const itemId = item.id;

          const logisticText = getLogisticText(venda.Logistic);

          return (
            <React.Fragment key={venda.id}>
              <tr onClick={() => toggleExpandVenda(venda.id)} className={`${styles.vendaRow} ${venda.status === "cancelled" ? styles.cancelledRow : ''}`}>
                <td>
                  <img
                    src={item.image_url || 'https://via.placeholder.com/25'}
                    alt={item.title || 'Produto'}
                    width="25"
                    height="25"
                    className={item.image_url ? '' : styles.placeholder}
                  />
                </td>
                <td>{formatDateTime(venda.date_created)}</td>
                <td>{orderId}</td>
                <td>{venda.comprador_nickname || 'N/A'}</td>
                <td>{itemId}</td>
                <td>
  {/* Título do Produto com limite de 60 caracteres */}
  <span className={styles.productTitle}>
    {item.title?.length > 60 ? item.title.slice(0, 60) + '...' : item.title || 'N/A'}
  </span>
</td>
                <td>{totalPago}</td>
                <td>
                  <div className={styles.statusIconsContainer}>
                    <Tooltip title="Item no Catálogo" arrow>
                      <Tag className={hasCatalog ? styles.catalogIcon : styles.iconInactive} />
                    </Tooltip>
                    
                    <div className={styles.logisticsContainer}>
                      {logisticText}
                    </div>
                  </div>
                </td>

                <td className={styles.detailsColumn}>
  <div className={styles.detailsContainer}>
    {/* Exibindo "Impresso" quando o status_detail for "printed" */}
    {venda.status_detail === "printed" && <div className={styles.printedDetail}>Impresso</div>}

    {/* Exibindo "Em Armazém" quando o status_detail for "in_warehouse" */}
    {venda.status_detail === "in_warehouse" && <div className={styles.warehouseDetail}>Em Armazém</div>}

    {/* Exibindo "Entregue" quando o status_detail for "delivered" e não for reembolsado */}
    {venda.status_detail === "delivered" && !isRefunded && <div className={styles.deliveredDetail}>Entregue</div>}

    {/* Exibindo "Saiu para Entrega" quando o status_detail for "out_for_delivery" */}
    {venda.status_detail === "out_for_delivery" && <div className={styles.outForDeliveryDetail}>Saiu para Entrega</div>}

    {/* Exibindo "Pronto para Enviar" quando o status_detail for "ready_to_ship" */}
    {venda.status_detail === "ready_to_ship" && <div className={styles.readyToShipDetail}>Pronto para Enviar</div>}

    {/* Exibindo "Pronto para Imprimir" quando o status_detail for "ready_to_print" */}
    {venda.status_detail === "ready_to_print" && <div className={styles.readyToPrintDetail}>Pronto para Imprimir</div>}

    {/* Exibindo "Pagamento do Envio Confirmado" quando o status_detail for "shipment_paid" */}
    {venda.status_detail === "shipment_paid" && <div className={styles.shipmentPaidDetail}>Envio em Devolução</div>}
     
    {/* Exibindo "Entrega Imminente" quando o status_detail for "soon_deliver" */}
    {venda.status_detail === "soon_deliver" && <div className={styles.soonDeliverDetail}>Entrega Imminente</div>}

    {/* Exibindo "A Caminho" quando o status_detail for "creating_route" */}
    {venda.status_detail === "creating_route" && <div className={styles.creatingRouteDetail}>A Caminho</div>}
    
    
    {/* Exibindo "Reembolsado" caso o pedido tenha sido reembolsado */}
    {isRefunded && <div className={styles.refundedDetail}>Reembolsado</div>}

    {/* Exibindo "Comprador Ausente" quando o status_detail for "receiver_absent" */}
    {venda.status_detail === "receiver_absent" && <div className={styles.receiverAbsentDetail}>Comprador Ausente</div>}
  </div>
</td>


              </tr>
              {expandedVendaId === venda.id && (
                <tr className={styles.vendaDetails}>
                  <td colSpan="8">
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
