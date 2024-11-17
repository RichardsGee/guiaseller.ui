import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { AuthContext } from '../../context/AuthContext';
import styles from './stores.module.css'; // Atualizando para o novo CSS
import { Cancel, ReportProblem, LocalShipping } from '@mui/icons-material'; // Importando ícones
import '../../styles/styles.css'; // Importando o CSS global

const StoresPage = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  const [store, setStore] = useState(null); // Estado para armazenar as informações da loja

  // Carregar os dados do backend
  useEffect(() => {
    const fetchStoreDetailsFromBackend = async () => {
      try {
        const response = await fetch(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${user.uid}`); // Usando o ID do usuário logado (user.uid)
        const data = await response.json();

        console.log("Dados do Backend:", data);  // Logando os dados do backend

        // Verificar se os dados de integração existem
        if (data.Integrations && data.Integrations[0]) {
          const { access_token, nickname, power_seller_status, level_id, permalink, total, user_marketplace_id } = data.Integrations[0];

          // Armazenar os dados de integração
          setStore({
            nickname: nickname,
            powerSellerStatus: power_seller_status,
            levelId: level_id,
            permalink: permalink,
            totalSales: total,
            accessToken: access_token,  // Guardar o access_token para usar na requisição da API
            userMarketplaceId: user_marketplace_id, // Guardando o ID do Marketplace do usuário
          });

          // Agora que temos o access_token, vamos buscar os dados adicionais do Mercado Livre
          fetchStoreDetailsFromML(user_marketplace_id, access_token); // Passando o user_marketplace_id
        } else {
          console.error("Dados de integração não encontrados.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do backend:", error);
      }
    };

    fetchStoreDetailsFromBackend();
  }, [user.uid]);

  // Função para buscar dados do Mercado Livre
  const fetchStoreDetailsFromML = async (userMarketplaceId, accessToken) => {
    try {
      console.log("Fazendo requisição ao Mercado Livre com o accessToken:", accessToken);  // Logando o accessToken

      const response = await fetch(`https://api.mercadolibre.com/users/${userMarketplaceId}`, { // Usando o user_marketplace_id
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Utilizar o access_token na requisição
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Resposta da API do Mercado Livre:", data);  // Logando a resposta da API

        // Atualizando o estado da loja com todos os dados
        setStore((prevStore) => ({
          ...prevStore,
          seller: data,
          sellerReputation: data.seller_reputation,
        }));
      } else {
        console.error("Erro ao obter dados do Mercado Livre:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao fazer requisição ao Mercado Livre:", error);
    }
  };

  // Exibir o valor com a porcentagem
  const formatMetricWithValue = (rate, value) => {
    const percentage = (rate * 100).toFixed(2) + "%";
    return (
      <>
        <div>{value} vendas</div>
        <div>{percentage}</div>
      </>
    );
  };

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <div className="contentContainer">
          <div className={styles.storesContainer}>
            <div className={styles.storeContainerHeader}>
              {/* Nome da loja e total de vendas */}
              <h1 className={styles.storeTitle}>{store?.nickname || "N/A"}</h1>

              {/* Total de vendas */}
              <div className={styles.storeInfoContainer}>
                <div className={styles.totalSales}>{store?.totalSales || "N/A"} Vendas </div>
              </div>

              {/* Status Mercado Líder */}
              <div className={`${styles.storeStatus} ${styles[store?.powerSellerStatus || ""]}`}>
                <div className={styles.storeStatusText}>
                  {store?.powerSellerStatus === "gold" && (
                    <>
                      <img src="https://http2.mlstatic.com/frontend-assets/vpp-frontend/medal.svg" alt="Mercado Líder" />
                      Mercado Líder Gold
                    </>
                  )}
                  {store?.powerSellerStatus === "silver" && "Mercado Líder Silver"}
                  {store?.powerSellerStatus === "platinum" && "Mercado Líder Platinum"}
                </div>
              </div>

              {/* Termômetro de Nível */}
              <div className={styles.thermometerContainer}>
                <div className={`${styles.thermometerBlock} ${store?.levelId === "1" ? styles.active : styles.thermometerRank1}`} />
                <div className={`${styles.thermometerBlock} ${store?.levelId === "2" ? styles.active : styles.thermometerRank2}`} />
                <div className={`${styles.thermometerBlock} ${store?.levelId === "3" ? styles.active : styles.thermometerRank3}`} />
                <div className={`${styles.thermometerBlock} ${store?.levelId === "4" ? styles.active : styles.thermometerRank4}`} />
                <div className={`${styles.thermometerBlock} ${store?.levelId === "5" ? styles.active : styles.thermometerRank5}`} />
              </div>
            </div>

            {/* Vendas Completadas (60 dias) como título */}
            <h3 className={styles.metricTitle}>Vendas Completadas (60 dias)</h3>
            <h3><div>{store?.sellerReputation?.metrics?.sales?.completed || "N/A"} vendas</div></h3>

            {/* Outras métricas (Reclamações, Canceladas, Despacho com Atraso) */}
            <div className={styles.metricContainer}>
              <div className={styles.metric}>
                <p className={styles.metricLabel}>
                  <ReportProblem style={{ width: "20px", marginRight: "10px" }} />
                  Reclamações
                </p>
                <div className={styles.metricValue}>
                  {formatMetricWithValue(store?.sellerReputation?.metrics?.claims?.rate, store?.sellerReputation?.metrics?.claims?.value)}
                </div>
              </div>
              <div className={styles.metric}>
                <p className={styles.metricLabel}>
                  <Cancel style={{ width: "20px", marginRight: "10px" }} />
                  Canceladas por você
                </p>
                <div className={styles.metricValue}>
                  {formatMetricWithValue(store?.sellerReputation?.metrics?.cancellations?.rate, store?.sellerReputation?.metrics?.cancellations?.value)}
                </div>
              </div>
              <div className={styles.metric}>
                <p className={styles.metricLabel}>
                  <LocalShipping style={{ width: "20px", marginRight: "10px" }} />
                  Despacho com Atraso
                </p>
                <div className={styles.metricValue}>
                  {formatMetricWithValue(store?.sellerReputation?.metrics?.delayed_handling_time?.rate, store?.sellerReputation?.metrics?.delayed_handling_time?.value)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default StoresPage;
