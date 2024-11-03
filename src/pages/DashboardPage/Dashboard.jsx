import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';
import ChartSection from '../../components/ChartSection/ChartSection';
import AdditionalInfo from '../../components/AdditionalInfo/AdditionalInfo';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/styles.css';
import topBarItems from '../../components/TopBar/TopBarItens';

function Dashboard() {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null; 
  const userEmail = user ? user.email : null;

  const [salesData, setSalesData] = useState([]); // Dados de vendas
  const [dateRange, setDateRange] = useState('30d'); // Intervalo de datas padrão

  useEffect(() => {
    fetchSalesData(); 
  }, [dateRange]); // Atualiza os dados sempre que o dateRange muda

  const fetchSalesData = async () => {
    const userId = 'pvvtctrvNdg4bcnOogd839Z1ZqD3'; // ID do usuário
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
      console.log('Dados de vendas:', data); // Logar os dados recebidos
      setSalesData(data); // Armazena os dados de vendas
    } catch (error) {
      console.error('Erro ao obter dados de vendas:', error);
    }
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range); // Atualiza o intervalo de datas com a seleção do usuário
  };

  return (
    <MainContent> 
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar items={topBarItems} />
        <div className="dashboardContainer">
          <ChartSection salesData={salesData} dateRange={dateRange} onDateRangeChange={handleDateRangeChange} /> {/* Passando dados para o gráfico */}
          <AdditionalInfo />
        </div>
      </div>
      <Footer />
    </MainContent>
  );
}

export default Dashboard;
