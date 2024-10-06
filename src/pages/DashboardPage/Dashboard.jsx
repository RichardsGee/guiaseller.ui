import React, { useContext } from 'react';
import Header from '../../components/Header/Header';  // Caminho corrigido
import Sidebar from '../../components/Sidebar/Sidebar';  // Caminho corrigido
import TopBar from '../../components/TopBar/TopBar';  // Caminho corrigido
import DashboardFilterSection from '../../components/DashboardFilterSection/DashboardFilterSection';  // Caminho corrigido
import ChartSection from '../../components/ChartSection/ChartSection';  // Caminho corrigido
import AdditionalInfo from '../../components/AdditionalInfo/AdditionalInfo';  // Caminho corrigido
import Footer from '../../components/Footer/Footer';  // Caminho corrigido
import MainContent from '../../components/MainContent/MainContent';  // Caminho corrigido
import { AuthContext } from '../../context/AuthContext';  // Caminho corrigido

function Dashboard() {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null; 
  const userEmail = user ? user.email : null;

  return (
    <MainContent> {/* Envolvendo o conteúdo com MainContent */}
      <Header username={username} logout={signOut}/>
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />
        <DashboardFilterSection /> {/* Usando o novo componente de filtro */}
        <ChartSection />
        <AdditionalInfo />
      </div>
      <Footer />
    </MainContent>
  );
}

export default Dashboard;
