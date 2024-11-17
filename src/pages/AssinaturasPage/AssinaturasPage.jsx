import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import MainContent from "../../components/MainContent/MainContent";
import { AuthContext } from "../../context/AuthContext";
import styles from "./assinaturas.module.css";
import "../../styles/styles.css";

const AssinaturasPage = () => {
  const { user, userLevel } = useContext(AuthContext); // Acessando o userLevel diretamente do AuthContext
  const username = user ? user.displayName || user.email : "Usuário Desconhecido";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  const [assinaturas, setAssinaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulação de dados mockados (substitua por uma chamada à API no futuro)
    const mockData = [
      {
        nome_plano: "Plano Premium",
        valor: 49.90,
        data_assinado: "2024-11-01",
        data_expira: "2024-12-01",
        link_fatura: "https://example.com/fatura/123",
        status: "Paga",
      },
      {
        nome_plano: "Plano Básico",
        valor: 19.90,
        data_assinado: "2024-10-15",
        data_expira: "2024-11-15",
        link_fatura: "https://example.com/fatura/124",
        status: "Atrasada",
      },
      {
        nome_plano: "Plano Standard",
        valor: 29.90,
        data_assinado: "2024-09-01",
        data_expira: "2024-10-01",
        link_fatura: "https://example.com/fatura/125",
        status: "Cancelada",
      },
    ];

    // Simula o carregamento
    setTimeout(() => {
      setAssinaturas(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <MainContent>
      <Header username={username} />
      {/* Passa os dados do usuário para o Sidebar */}
      <Sidebar username={username} userPhoto={userPhoto} userEmail={userEmail} />
      <div className="main-content">
        <div className="contentContainer">
          <div className={styles.assinaturasContainer}>
            <h1 className="title">Minhas Assinaturas</h1>

            {/* Exibição de Erro */}
            {error && <p className={styles.error}>{error}</p>}

            {/* Carregando */}
            {loading ? (
              <p>Carregando assinaturas...</p>
            ) : (
              <>
                {/* Tabela de Assinaturas */}
                <table className={styles.assinaturasTable}>
                  <thead>
                    <tr>
                      <th>Nome do Plano</th>
                      <th>Valor</th>
                      <th>Pagamento</th>
                      <th>Vencimento</th>
                      <th>Fatura</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assinaturas.map((assinatura, index) => (
                      <tr key={index} className={styles.assinaturaRow}>
                        <td>{assinatura.nome_plano}</td>
                        <td>R$ {assinatura.valor.toFixed(2)}</td>
                        <td>{new Date(assinatura.data_assinado).toLocaleDateString()}</td>
                        <td>{new Date(assinatura.data_expira).toLocaleDateString()}</td>
                        <td>
                          <a
                            href={assinatura.link_fatura}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.detalhesLink}
                          >
                            Ver Fatura
                          </a>
                        </td>
                        <td
                          className={`${styles.status} ${
                            assinatura.status === "Paga"
                              ? styles.paga
                              : assinatura.status === "Atrasada"
                              ? styles.atrasada
                              : styles.cancelada
                          }`}
                        >
                          {assinatura.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default AssinaturasPage;
