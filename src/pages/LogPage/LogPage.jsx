import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./LogPage.module.css";

const LogPage = () => {
  const [logs, setLogs] = useState([]); // Estado para armazenar os logs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("https://guiaseller-backend.dlmi5z.easypanel.host/log-data"); // Endpoint do backend
        setLogs(response.data);
      } catch (error) {
        console.error("Erro ao buscar logs:", error);
        setError("Não foi possível carregar os logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className={styles.logPageContainer}>
      <h1>Logs de Cobranças</h1>
      {error && <p className={styles.error}>{error}</p>}
      {loading ? (
        <p>Carregando logs...</p>
      ) : logs.length > 0 ? (
        <table className={styles.logsTable}>
          <thead>
            <tr>
              <th>Data</th>
              <th>ID</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Vencimento</th>
              <th>Nome do Pagador</th>
              <th>Email do Pagador</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => {
              const { id, amount, status, dueDate, payer } = log.body;
              return (
                <tr key={index}>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{id}</td>
                  <td>R$ {amount.toFixed(2)}</td>
                  <td>{status}</td>
                  <td>{new Date(dueDate).toLocaleDateString()}</td>
                  <td>{payer?.name || "N/A"}</td>
                  <td>{payer?.email || "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Nenhum log encontrado.</p>
      )}
    </div>
  );
};

export default LogPage;
