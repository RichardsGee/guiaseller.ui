// src/pages/TokensBuyPage/TokensBuyPage.jsx
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import styles from './TokensBuyPage.module.css'; // Importando o CSS Module
import { AuthContext } from '../../context/AuthContext';

const TokensBuyPage = () => {
  const { user, signOut } = React.useContext(AuthContext);
  const username = user ? user.displayName || user.email : 'No User Logged';
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  // Estado para quantidade de tokens a serem comprados
  const [tokens, setTokens] = useState(100); // Valor inicial

  // Função para processar a compra (aqui simula a compra)
  const handleBuyTokens = () => {
    alert(`Você comprou ${tokens} tokens!`);
    // Aqui você pode integrar com sua lógica de compra
  };

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />
        <div className={styles.tokensBuyContainer}>
          <h1 className={styles.title}>Comprar Tokens</h1>

          <div className={styles.tokensBox}>
            <p className={styles.infoText}>Selecione a quantidade de tokens que deseja comprar:</p>

            <input
              type="number"
              className={styles.tokenInput}
              value={tokens}
              onChange={(e) => setTokens(e.target.value)}
              min="100"
              step="100"
            />

            <button className={styles.buyButton} onClick={handleBuyTokens}>
              Comprar {tokens} Tokens
            </button>
          </div>

          <div className={styles.pricingInfo}>
            <p>Preços:</p>
            <ul>
              <li>100 Tokens - R$ 10,00</li>
              <li>500 Tokens - R$ 45,00</li>
              <li>1000 Tokens - R$ 80,00</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default TokensBuyPage;
