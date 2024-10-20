import React, { useContext } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';
import DashboardFilterSection from '../../components/DashboardFilterSection/DashboardFilterSection';
import ChartSection from '../../components/ChartSection/ChartSection';
import AdditionalInfo from '../../components/AdditionalInfo/AdditionalInfo';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/styles.css'; // Importando o CSS global

function Dashboard() {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null; 
  const userEmail = user ? user.email : null;

  return (
    <MainContent> 
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />
        <div className="contentContainer">
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
