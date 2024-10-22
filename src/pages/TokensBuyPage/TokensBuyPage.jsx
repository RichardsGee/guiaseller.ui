import React, { useContext, useState } from 'react';
import Header from '../../components/Header/Header';  
import Sidebar from '../../components/Sidebar/Sidebar';  
import Footer from '../../components/Footer/Footer';  
import MainContent from '../../components/MainContent/MainContent'; 
import TokensList from '../../components/TokensList/TokensList'; // Importando o TokensList
import { AuthContext } from '../../context/AuthContext'; 
import styles from './TokensBuyPage.module.css'; // Estilos locais

const TokensBuyPage = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;

  // Estado para o plano de pagamento selecionado
  const [selectedPlan, setSelectedPlan] = useState(1); // 1 mês como padrão

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} />
      <div className="main-content">
        <div className="contentContainer">
          <h1 className="title">Comprar Tokens</h1>
          
          {/* Opções de Parcelamento */}
          <div className={styles.paymentPlans}>
            <button 
              className={`${styles.paymentButton} ${selectedPlan === 1 ? styles.active : ''}`} 
              onClick={() => setSelectedPlan(1)}
            >
              1 Mês
            </button>
            <button 
              className={`${styles.paymentButton} ${selectedPlan === 2 ? styles.active : ''}`} 
              onClick={() => setSelectedPlan(2)}
            >
              3 Meses
            </button>
            <button 
              className={`${styles.paymentButton} ${selectedPlan === 3 ? styles.active : ''}`} 
              onClick={() => setSelectedPlan(3)}
            >
              6 Meses
            </button>
            <button 
              className={`${styles.paymentButton} ${selectedPlan === 4 ? styles.active : ''}`} 
              onClick={() => setSelectedPlan(4)}
            >
              12 Meses
            </button>
          </div>

          {/* Renderizando o TokensList, passando o plano selecionado como prop */}
          <TokensList selectedPlan={selectedPlan} />
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default TokensBuyPage;
