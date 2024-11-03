import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';
import DashboardFilterSection from '../../components/DashboardFilterSection/DashboardFilterSection';
import ChartSection from '../../components/ChartSection/ChartSection'; // Usando ChartSection
import AdditionalInfo from '../../components/AdditionalInfo/AdditionalInfo';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/styles.css'; // Importando o CSS global
import axios from 'axios';
import topBarItems from '../../components/TopBar/TopBarItens';

function Dashboard() {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null; 
  const userEmail = user ? user.email : null;

  const [accessToken, setAccessToken] = useState('');
  const [salesData, setSalesData] = useState([]); // Dados de vendas
  const [from, setFrom] = useState('2024-08-01T00:00:00Z'); // Intervalo de datas
  const [to, setTo] = useState('2024-08-31T00:00:00Z'); // Intervalo de datas
  const [totalSales, setTotalSales] = useState(0);
  const [quantidadeVendasMesAtual, setQuantidadeVendasMesAtual] = useState(0);

  // Hook para pegar o Access Token
  useEffect(() => {
    const fetchData = async () => {
      await getAccessToken(); 
    };
    fetchData();
  }, []);

  // Hook para buscar dados de vendas após obter o Access Token
  useEffect(() => {
    if (accessToken) {
      getSalesData(from, to, accessToken); 
    }
  }, [accessToken, from, to]);

  // Função para obter o Access Token
  async function getAccessToken() {
    const refreshToken = 'TG AQUI'; // Insira seu refresh token aqui

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

  // Função para buscar dados de vendas
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
      setSalesData(response.data); // Armazena os dados de vendas
      setTotalSales(response.data.paging.total); // Total de vendas monetárias

      const totalQuantidadeVendas = response.data.vendas.length; // Ajuste conforme a estrutura de dados
      setQuantidadeVendasMesAtual(totalQuantidadeVendas); // Atualiza o estado com a quantidade

    } catch (error) {
      console.error('Erro ao obter dados de vendas:', error);
      if (error.response) {
        console.error('Dados do erro:', error.response.data); // Exibe detalhes do erro
      }
    }
  }

  return (
    <MainContent> 
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar items={topBarItems} />
        <div className="dashboardContainer">
          <DashboardFilterSection />
          <ChartSection salesData={salesData} /> {/* Passando dados para o gráfico */}
          <AdditionalInfo />
        </div>
      </div>
      <Footer />
    </MainContent>
  );
}

export default Dashboard;
