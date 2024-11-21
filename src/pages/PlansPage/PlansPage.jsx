import React, { useContext, useState } from 'react';
import Header from '../../components/Header/Header';  
import Sidebar from '../../components/Sidebar/Sidebar';  
import Footer from '../../components/Footer/Footer';  
import MainContent from '../../components/MainContent/MainContent'; 
import PlansList from '../../components/PlansList/PlansList'; // Importando o PlansList

import '../../styles/styles.css'; // Importando o CSS global
import { AuthContext } from '../../context/AuthContext'; 

const PlansPage = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} />
      <div className="main-content">
        <div className="contentContainer">
          <h1 className="title">Escolha Seu Plano</h1>


          {/* Aqui renderizamos o PlansList */}
          <PlansList />
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default PlansPage;
