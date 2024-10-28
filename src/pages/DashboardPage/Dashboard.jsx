import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';
import DashboardFilterSection from '../../components/DashboardFilterSection/DashboardFilterSection';
import ChartSection from '../../components/ChartSection/ChartSection';
import AdditionalInfo from '../../components/AdditionalInfo/AdditionalInfo';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/styles.css'; // Importando o CSS global onde está o dashboardContainer
import axios from 'axios';

function Dashboard() {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null; 
  const userEmail = user ? user.email : null;

  const [accessToken, setAccessToken] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [from, setFrom] = useState('2024-08-01T00:00:00Z');
  const [to, setTo] = useState('2024-08-31T00:00:00Z');
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    async function fetchData() {
      await getAccessToken(); 
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (accessToken) {
      getSalesData(from, to, accessToken); 
    }
  }, [accessToken, from, to]);

  async function getAccessToken() {
    const refreshToken = 'TG-671dc1f01e414a0001b2713d-81270097'; // Insira seu refresh token aqui

    try {
      const response = await axios.post('https://guiaseller-backend.dlmi5z.easypanel.host/getAccessToken', {
        refreshToken: refreshToken, // Enviando o refresh token
      });
      if (response.data.access_token) {
        setAccessToken(response.data.access_token); // Armazenar o Access Token
      } else {
        console.error('Access token não recebido da resposta:', response.data);
      }
    } catch (error) {
      console.error('Erro ao obter Access Token:', error);
      if (error.response) {
        console.error('Dados do erro:', error.response.data); // Exibe detalhes do erro
      }
    }
  }

  async function getSalesData(from, to, accessToken) {
    try {
      const response = await axios.get('https://guiaseller-backend.dlmi5z.easypanel.host/vendas', {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Usar o Access Token
        },
        params: {
          from,
          to,
        },
      });
      console.log('Dados de vendas:', response.data);
      setSalesData(response.data);
      setTotalSales(response.data.paging.total);
    } catch (error) {
      console.error('Erro ao obter dados de vendas:', error);
      if (error.response) {
        console.error('Dados do erro:', error.response.data); // Exibe detalhes do erro
      }
    }
  }

  console.log('Total de vendas:', totalSales);
  console.log("TOKEN", accessToken);

  return (
    <MainContent> 
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} totalSales={totalSales} />
        <div className="dashboardContainer"> {/* Alterado de contentContainer para dashboardContainer */}
          <DashboardFilterSection />
          <ChartSection />
          <AdditionalInfo />
        </div>
      </div>
      <Footer />
    </MainContent>
  );
}

export default Dashboard;
