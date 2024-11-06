// ./pages/AdCampaignsPage/AdCampaignsPage.jsx

import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';  
import Sidebar from '../../components/Sidebar/Sidebar';  
import Footer from '../../components/Footer/Footer';  
import MainContent from '../../components/MainContent/MainContent';  
import { AuthContext } from '../../context/AuthContext';  
import styles from './adCampaigns.module.css'; 
import '../../styles/styles.css'; 

const AdCampaignsPage = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/campaigns'); // Use a URL completa do backend

        if (!response.ok) {
          throw new Error('Erro ao buscar campanhas');
        }

        const data = await response.json();
        console.log(data); // Log para verificar a estrutura dos dados
        setCampaigns(data.results || []); // Defina as campanhas com os dados retornados
      } catch (error) {
        console.error('Erro ao buscar campanhas:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []); // Dependências do useEffect

  if (loading) {
    return <div className={styles.loading}>Carregando campanhas...</div>;
  }

  if (error) {
    return <div className={styles.error}>Erro: {error}</div>;
  }

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <div className="contentContainer"> {/* Utiliza o container global */}
          <h1 className={styles.title}>Campanhas de Publicidade</h1>
          <div className={styles.campaignContainer}>
            {campaigns.length > 0 ? (
              campaigns.map(campaign => (
                <div key={campaign.id} className={styles.campaignCard}>
                  <h2 className={styles.campaignName}>{campaign.name}</h2>
                  <table className={styles.campaignTable}>
                    <tbody>
                      <tr>
                        <td><strong>Status:</strong></td>
                        <td>{campaign.status}</td>
                      </tr>
                      <tr>
                        <td><strong>Data de Criação:</strong></td>
                        <td>{new Date(campaign.date_created).toLocaleDateString()}</td>
                      </tr>
                      <tr>
                        <td><strong>Orçamento Diário:</strong></td>
                        <td>R$ {campaign.daily_budget.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <h3 className={styles.metricsTitle}>Métricas:</h3>
                  <table className={styles.metricsTable}>
                    <tbody>
                      <tr>
                        <td><strong>Cliques:</strong></td>
                        <td>{campaign.metrics.clicks}</td>
                      </tr>
                      <tr>
                        <td><strong>Impressões:</strong></td>
                        <td>{campaign.metrics.prints}</td>
                      </tr>
                      <tr>
                        <td><strong>Custo Total:</strong></td>
                        <td>R$ {campaign.metrics.total_amount.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td><strong>ACOS:</strong></td>
                        <td>{campaign.metrics.acos.toFixed(2)}%</td>
                      </tr>
                      <tr>
                        <td><strong>CTR:</strong></td>
                        <td>{campaign.metrics.ctr.toFixed(2)}%</td>
                      </tr>
                      <tr>
                        <td><strong>CPC:</strong></td>
                        <td>R$ {campaign.metrics.cpc.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <p>Nenhuma campanha encontrada.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default AdCampaignsPage;
