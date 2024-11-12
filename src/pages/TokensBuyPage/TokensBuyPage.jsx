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

  // Estado para a quantidade de tokens selecionada
  const [selectedQuantity, setSelectedQuantity] = useState(10);

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} />
      <div className="main-content">
        <div className="contentContainer">
          <h1 className="title">Comprar Tokens</h1>
          
          {/* Opções de Quantidade de Tokens */}
          <div className={styles.paymentPlans}>
            <button 
              className={`${styles.paymentButton} ${selectedQuantity === 10 ? styles.active : ''}`} 
              onClick={() => setSelectedQuantity(10)}
            >
              10 Tokens
            </button>
            <button 
              className={`${styles.paymentButton} ${selectedQuantity === 25 ? styles.active : ''}`} 
              onClick={() => setSelectedQuantity(25)}
            >
              25 Tokens
            </button>
            <button 
              className={`${styles.paymentButton} ${selectedQuantity === 50 ? styles.active : ''}`} 
              onClick={() => setSelectedQuantity(50)}
            >
              50 Tokens
            </button>
            <button 
              className={`${styles.paymentButton} ${selectedQuantity === 100 ? styles.active : ''}`} 
              onClick={() => setSelectedQuantity(100)}
            >
              100 Tokens
            </button>
            <button 
              className={`${styles.paymentButton} ${selectedQuantity === 200 ? styles.active : ''}`} 
              onClick={() => setSelectedQuantity(200)}
            >
              200 Tokens
            </button>
          </div>

          {/* Renderizando o TokensList, passando a quantidade de tokens selecionada */}
          <TokensList selectedQuantity={selectedQuantity} />
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default TokensBuyPage;
