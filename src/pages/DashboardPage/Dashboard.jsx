// src/pages/Dashboard/Dashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';
import ChartSection from '../../components/ChartSection/ChartSection';
import AdditionalInfo from '../../components/AdditionalInfo/AdditionalInfo';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { AuthContext } from '../../context/AuthContext';
import Blured from '../../components/Blured/Blured'; // Importa o componente Blured
import topBarItems from '../../components/TopBar/TopBarItens'; // Importa os itens do TopBar
import '../../styles/styles.css';

function Dashboard() {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;
  const userId = user ? user.uid : null; // Coletando o userId

  const [salesData, setSalesData] = useState([]);
  const [dateRange, setDateRange] = useState('1d');
  const [blurChart, setBlurChart] = useState(false);
  const [blurAdditional, setBlurAdditional] = useState(false);
  const [blurTopBar, setBlurTopBar] = useState(false); // Estado para desfoque do TopBar

  useEffect(() => {
    if (userId) {
      fetchSalesData(userId); // Passando o userId para a função
    }
  }, [userId, dateRange]);

  const fetchSalesData = async (userId) => {
    const today = new Date();
    let from;

    switch (dateRange) {
      case '1d':
        from = new Date(today.setDate(today.getDate() - 1)).toISOString();
        break;
      case '7d':
        from = new Date(today.setDate(today.getDate() - 7)).toISOString();
        break;
      case '15d':
        from = new Date(today.setDate(today.getDate() - 15)).toISOString();
        break;
      case '30d':
      default:
        from = new Date(today.setDate(today.getDate() - 30)).toISOString();
        break;
    }

    try {
      const response = await fetch(`https://guiaseller-backend.dlmi5z.easypanel.host/vendas/${userId}?from=${from}&to=${new Date().toISOString()}`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const data = await response.json();
      console.log('Dados de vendas:', data);
      setSalesData(data);
    } catch (error) {
      console.error('Erro ao obter dados de vendas:', error);
    }
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  return (
    <MainContent> 
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        {/* Aplica desfoque ao TopBar com base no estado */}
        <TopBar items={topBarItems} salesData={salesData} dateRange={dateRange} blurTopBar={blurTopBar} />
        
        <div className="dashboardContainer">
          {/* Controles de Desfoque */}
          <Blured setBlurChart={setBlurChart} setBlurAdditional={setBlurAdditional} setBlurTopBar={setBlurTopBar} />
          
          {/* Seções com desfoque controlado */}
          <ChartSection
            salesData={salesData}
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
            blurChart={blurChart}
          />
          <AdditionalInfo vendas={salesData} blurAdditional={blurAdditional} />
        </div>
      </div>
      <Footer />
    </MainContent>
  );
}

export default Dashboard;
