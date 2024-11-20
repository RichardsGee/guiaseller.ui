import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./LogPage.module.css";

const LogPage = () => {
  const [logs, setLogs] = useState([]); // Estado para armazenar os logs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedLogs, setExpandedLogs] = useState({}); // Estado para controlar quais logs estão expandidos

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

  const toggleLogExpansion = (index) => {
    setExpandedLogs((prevExpandedLogs) => ({
      ...prevExpandedLogs,
      [index]: !prevExpandedLogs[index], // Alterna o estado expandido
    }));
  };

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
              <th>Informações</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
                <td>
                  <button
                    className={styles.toggleButton}
                    onClick={() => toggleLogExpansion(index)}
                  >
                    {expandedLogs[index] ? "Fechar" : "Expandir"}
                  </button>
                  {expandedLogs[index] && (
                    <pre className={styles.logDetails}>
                      {JSON.stringify(log.body, null, 2)}
                    </pre>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum log encontrado.</p>
      )}
    </div>
  );
};

export default LogPage;
