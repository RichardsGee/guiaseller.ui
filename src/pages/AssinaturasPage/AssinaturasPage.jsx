import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import MainContent from "../../components/MainContent/MainContent";
import { AuthContext } from "../../context/AuthContext";
import styles from "./assinaturas.module.css";
import "../../styles/styles.css";

const AssinaturasPage = () => {
  const { user, signOut } = useContext(AuthContext); // Acessando o usuário e o logout
  const username = user ? user.displayName || user.email : "Usuário Desconhecido";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  const [subscriptions, setSubscriptions] = useState([]); // Estado para armazenar assinaturas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        if (user?.uid) {
          console.log("userId enviado como parâmetro na URL:", user.uid); // Log para verificar o userId

          const response = await axios.get(
            "https://guiaseller-backend.dlmi5z.easypanel.host/subscription", // URL do endpoint
            {
              params: { userId: user.uid }, // Enviando userId como parâmetro
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Dados de assinaturas recebidos:", response.data);
          setSubscriptions(response.data);
        } else {
          console.log("Usuário não autenticado ou UID não disponível.");
        }
      } catch (error) {
        console.error(
          "Erro ao buscar assinaturas:",
          error.response ? error.response.data : error
        );
        setError(
          error.response?.data?.error || "Não foi possível carregar as assinaturas."
        );
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchSubscriptions();
    }
  }, [user?.uid]);

  const isToday = (date) => {
    const today = new Date();
    const targetDate = new Date(date);
    return (
      today.getDate() === targetDate.getDate() &&
      today.getMonth() === targetDate.getMonth() &&
      today.getFullYear() === targetDate.getFullYear()
    );
  };

  const isExpired = (date) => {
    const today = new Date();
    const targetDate = new Date(date);
    return targetDate < today;
  };

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar username={username} userPhoto={userPhoto} userEmail={userEmail} />
      <div className="main-content">
        <div className="contentContainer">
          <div className={styles.assinaturasContainer}>
            <h1 className="title">Minha Assinatura</h1>

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
                    {subscriptions.length > 0 ? (
                      subscriptions.map((subscription, index) => (
                        <tr key={index} className={styles.assinaturaRow}>
                          <td>{subscription.subscription}</td>
                          <td>R$ {subscription.value.toFixed(2)}</td>
                          <td>{new Date(subscription.createdAt).toLocaleDateString()}</td>
                          <td>
                            {new Date(subscription.updatedAt).toLocaleDateString()}
                            {isToday(subscription.updatedAt) && (
                              <span className={styles.todayTag}>Vence Hoje</span>
                            )}
                            {isExpired(subscription.updatedAt) && (
                              <span className={styles.expiredTag}>Vencido</span> // Exibe a tag de vencido
                            )}
                          </td>
                          <td>
                            {subscription.invoiceUrl && subscription.invoiceUrl !== "NADA" ? (
                              <a
                                href={subscription.invoiceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.invoiceLink}
                              >
                                Ver Fatura
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td
                            className={`${styles.status} ${
                              subscription.status === "ACTIVE"
                                ? styles.awaitingPayment
                                : subscription.status === "CANCELED"
                                ? styles.canceled
                                : styles.paid
                            }`}
                          >
                            {subscription.status === "ACTIVE"
                              ? "Aguardando Pagamento"
                              : subscription.status === "CANCELED"
                              ? "Cancelado"
                              : subscription.status === "RECEIVED"
                              ? "Pago"
                              : "Desconhecido"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className={styles.emptyMessage}>
                          Nenhuma assinatura encontrada.
                        </td>
                      </tr>
                    )}
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
