import React, { useState } from "react";
import styles from "./LogFilter.module.css";

const LogFilter = ({ log }) => {
  const [expanded, setExpanded] = useState(false); // Controla o estado de expansão

  if (!log || !log.body) {
    return <p className={styles.logError}>Dados do log ausentes ou inválidos.</p>;
  }

  const { event, payment } = log.body;

  return (
    <>
      <tr onClick={() => setExpanded(!expanded)} className={styles.logRow}>
        <td>{new Date(log.timestamp).toLocaleString()}</td>
        <td>{event || "Não especificado"}</td>
        <td>{payment?.status || "N/A"}</td>
        <td>{payment?.value ? `R$ ${payment.value.toFixed(2)}` : "N/A"}</td>
      </tr>
      {expanded && (
        <tr className={styles.logDetailsRow}>
          <td colSpan="4">
            <ul className={styles.logDetails}>
              <li>
                <strong>Cliente:</strong> {payment?.customer || "N/A"}
              </li>
              <li>
                <strong>Assinatura:</strong> {payment?.subscription || "N/A"}
              </li>
              <li>
                <strong>Data de Vencimento:</strong>{" "}
                {payment?.dueDate
                  ? new Date(payment.dueDate).toLocaleDateString("pt-BR")
                  : "N/A"}
              </li>
              <li>
                <strong>Fatura:</strong>{" "}
                {payment?.invoiceUrl ? (
                  <a
                    href={payment.invoiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visualizar Fatura
                  </a>
                ) : (
                  "N/A"
                )}
              </li>
            </ul>
          </td>
        </tr>
      )}
    </>
  );
};

export default LogFilter;
