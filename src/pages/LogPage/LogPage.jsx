import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import MainContent from "../../components/MainContent/MainContent";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import LogFilter from "./LogFilter";
import styles from "./LogPage.module.css";
import filterStyles from "../../styles/filter.module.css";

const LogPage = () => {
  const { user, signOut } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          "https://guiaseller-backend.dlmi5z.easypanel.host/log-data"
        );
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

  const filteredLogs = logs.filter((log) =>
    JSON.stringify(log).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainContent>
      <Header
        username={user?.displayName || user?.email || "No User Logged"}
        logout={signOut}
      />
      <Sidebar
        userPhoto={user?.photoURL}
        username={user?.displayName || user?.email}
        userEmail={user?.email}
      />
      <div className="main-content">
        <div className="contentContainer">
          <div className={styles.logPageContainer}>
            <div className={styles.headerContainer}>
              <h1 className="title">Logs de Cobranças</h1>
            </div>
            <div>
              <input
                type="text"
                placeholder="Busque por termos nos logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={filterStyles.searchInput}
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            {loading ? (
              <p>Carregando logs...</p>
            ) : filteredLogs.length > 0 ? (
              <table className={styles.logsTable}>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Evento</th>
                    <th>Status</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, index) => (
                    <LogFilter key={index} log={log} />
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nenhum log encontrado.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default LogPage;
