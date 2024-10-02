import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import FilterSection from '../components/FilterSection';
import ChartSection from '../components/ChartSection';
import AdditionalInfo from '../components/AdditionalInfo';
import Footer from '../components/Footer';
import MainContent from '../components/MainContent'; // Importando o MainContent
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

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
        <FilterSection />
        <ChartSection />
        <AdditionalInfo />
      </div>
      <Footer />
    </MainContent>
  );
}

export default Dashboard;
