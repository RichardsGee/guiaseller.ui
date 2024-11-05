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
import '../../styles/styles.css';
import topBarItems from '../../components/TopBar/TopBarItens';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Dashboard() {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  const [salesData, setSalesData] = useState([]);
  const [dateRange, setDateRange] = useState('30d');
  const [blurAll, setBlurAll] = useState(false);
  const [blurChart, setBlurChart] = useState(false);
  const [blurAdditional, setBlurAdditional] = useState(false);

  useEffect(() => {
    fetchSalesData();
  }, [dateRange]);

  const fetchSalesData = async () => {
    const userId = 'pvvtctrvNdg4bcnOogd839Z1ZqD3';
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

  // Função para alternar o desfoque de todos os itens
  const toggleBlurAll = () => {
    const newBlurAllState = !blurAll;
    setBlurAll(newBlurAllState);
    if (newBlurAllState) {
      setBlurChart(true);
      setBlurAdditional(true);
    } else {
      setBlurChart(false);
      setBlurAdditional(false);
    }
  };

  return (
    <MainContent> 
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar items={topBarItems} salesData={salesData} dateRange={dateRange} />
        <div className="dashboardContainer">
          {/* Controles de Desfoque */}
          <div className="visibility-toggle">
            {/* Botão principal de borrar todos */}
            <div onClick={toggleBlurAll}>
              {blurAll ? <VisibilityOffIcon /> : <VisibilityIcon />}
              <span>Borrar Todos</span>
            </div>
            {/* Botões individuais para cada seção */}
            <div onClick={() => setBlurChart(!blurChart)}>
              {blurChart ? <VisibilityOffIcon /> : <VisibilityIcon />}
              <span>Borrar Gráficos</span>
            </div>
            <div onClick={() => setBlurAdditional(!blurAdditional)}>
              {blurAdditional ? <VisibilityOffIcon /> : <VisibilityIcon />}
              <span>Borrar Mais Vendidos</span>
            </div>
          </div>
          {/* Seções com desfoque controlado */}
          <ChartSection
            salesData={salesData}
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
            blurChart={blurAll || blurChart} // Borrar tudo se blurAll estiver ativo
          />
          <AdditionalInfo vendas={salesData} blurAdditional={blurAll || blurAdditional} /> {/* Borrar tudo se blurAll estiver ativo */}
        </div>
      </div>
      <Footer />
    </MainContent>
  );
}

export default Dashboard;
