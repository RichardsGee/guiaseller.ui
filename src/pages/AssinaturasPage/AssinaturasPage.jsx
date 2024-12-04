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
  const { user, signOut } = useContext(AuthContext);
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
          const response = await axios.get(
            `https://guiaseller-backend.dlmi5z.easypanel.host/subscription/${user.uid}`, // URL para obter assinaturas
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // Exibe toda a resposta no log
          console.log("Resposta completa da API:", response.data);

          // Verifica se há dados na chave 'data' e armazena as assinaturas
          if (response.data.data && response.data.data.length > 0) {
            setSubscriptions(response.data.data); // Armazenando os dados da chave 'data'
          } else {
            setError("Nenhuma assinatura encontrada.");
          }
        }
      } catch (error) {
        setError(error.response?.data?.error || "");
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchSubscriptions();
    }
  }, [user?.uid]);

  // Função de formatação de data para o formato "dia mês ano"
  const formatDate = (dateString) => {
    // Aqui usamos diretamente o valor da data como está no JSON
    const [year, month, day] = dateString.split('-');
    const months = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    const monthName = months[parseInt(month) - 1]; // Meses começam com 0 em JavaScript
    return `${day} ${monthName} ${year}`; // Retorna a data no formato "dia mês ano"
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
                      <th>Data de Criação</th>
                      <th>Vencimento</th>
                      <th>Fatura</th>
                      <th>Método de Pagamento</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.length > 0 ? (
                      subscriptions.map((subscription, index) => (
                        <tr key={index} className={styles.assinaturaRow}>
                          <td>{subscription.description || "Desconhecido"}</td>
                          <td>R$ {subscription.value.toFixed(2)}</td>
                          <td>{formatDate(subscription.dateCreated)}</td> {/* Exibe a data de criação */}
                          <td>{formatDate(subscription.dueDate)}</td> {/* Exibe a data de vencimento */}
                          <td>
                            {/* Exibe a fatura se o invoiceUrl estiver disponível */}
                            {subscription.invoiceUrl ? (
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
                          <td>
                            {/* Exibe o método de pagamento, se disponível */}
                            {subscription.billingType || "Desconhecido"}
                          </td>
                          <td
                            className={`${styles.status} ${
                              subscription.status === "PENDING"
                                ? styles.awaitingPayment
                                : subscription.status === "CANCELED"
                                ? styles.canceled
                                : subscription.status === "CONFIRMED"
                                ? styles.paid
                                : styles.unknown
                            }`}
                          >
                            {subscription.status === "PENDING"
                              ? "Aguardando Pagamento"
                              : subscription.status === "CANCELED"
                              ? "Cancelado"
                              : subscription.status === "CONFIRMED"
                              ? "Pago"
                              : "Desconhecido"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className={styles.emptyMessage}>
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
