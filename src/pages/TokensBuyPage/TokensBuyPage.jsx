import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import styles from './TokensBuyPage.module.css'; // Importando o CSS Module
import '../../styles/styles.css'; // Importando o CSS global onde está a classe contentContainer
import { AuthContext } from '../../context/AuthContext';

const TokensBuyPage = () => {
  const { user, signOut } = React.useContext(AuthContext);
  const username = user ? user.displayName || user.email : 'No User Logged';
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  // Estado para quantidade de tokens a serem comprados
  const [tokens, setTokens] = useState(10); // Valor inicial é 10 tokens
  const [priceDetails, setPriceDetails] = useState({ originalPrice: '0.00', discount: '0.00', finalPrice: '0.00' });
  const [discountPercentage, setDiscountPercentage] = useState(0); // Estado para porcentagem de desconto

  // Função para calcular o preço com desconto progressivo
  const calculatePrice = (tokenCount) => {
    const basePrice = 4.99; // R$ 4,99 por token
    let discount = 0;
    let discountPerc = 0;
    let originalPrice = tokenCount * basePrice;

    if (tokenCount >= 365) {
      discountPerc = 30; // 30% de desconto (1 ano)
    } else if (tokenCount >= 180) {
      discountPerc = 15; // 15% de desconto (6 meses)
    } else if (tokenCount >= 90) {
      discountPerc = 10; // 10% de desconto (3 meses)
    } else if (tokenCount >= 30) {
      discountPerc = 5; // 5% de desconto (1 mês)
    }

    discount = originalPrice * (discountPerc / 100);
    const finalPrice = originalPrice - discount;

    return {
      originalPrice: originalPrice.toFixed(2),
      discount: discount.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
      discountPerc
    };
  };

  // useEffect para atualizar o cálculo de preço quando o número de tokens mudar
  useEffect(() => {
    const newPriceDetails = calculatePrice(tokens);
    setPriceDetails(newPriceDetails);
    setDiscountPercentage(newPriceDetails.discountPerc);
  }, [tokens]);

  // Função para processar a compra (simulação da compra)
  const handleBuyTokens = () => {
    alert(`Você comprou ${tokens} tokens por R$ ${priceDetails.finalPrice} com ${discountPercentage}% de desconto!`);
  };

  // Função para selecionar tokens com base nas quantidades arredondadas
  const handleSelectTokens = (tokenCount) => {
    setTokens(tokenCount);
  };

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />
        {/* Usando a classe contentContainer do styles.css */}
        <div className="contentContainer"> 
          <div className={styles.tokensContainer}>
            <div className={styles.tokensBuyContainer}>
              {/* Conteúdo de compra de tokens à esquerda */}
              <div className={styles.leftContent}>
                <h1 className={styles.title}>Comprar Tokens</h1>
                <p className={styles.infoText}>Selecione a quantidade de tokens:</p>

                <div className={styles.selectButtons}>
                  <button onClick={() => handleSelectTokens(10)}>10 Tokens</button>
                  <button onClick={() => handleSelectTokens(30)}>30 Tokens</button>
                  <button onClick={() => handleSelectTokens(90)}>90 Tokens</button>
                  <button onClick={() => handleSelectTokens(180)}>180 Tokens</button>
                  <button onClick={() => handleSelectTokens(365)}>365 Tokens</button>
                </div>

                <input
                  type="number"
                  className={styles.tokenInput}
                  value={tokens}
                  onChange={(e) => setTokens(Math.max(10, e.target.value))} // Impede valores menores que 10
                  min="10"
                  step="10"
                />

                <button className={styles.buyButton} onClick={handleBuyTokens}>
                  Comprar {tokens < 10 ? 10 : tokens} Tokens
                </button>

                {/* Exibição de preço */}
                <div className={styles.priceDetails}>
                  {discountPercentage > 0 && (
                    <div className={styles.discountPercentage}>
                      {discountPercentage}%
                    </div>
                  )}
                  {discountPercentage > 0 ? (
                    <>
                      <p className={styles.strikethrough}>Preço original: R$ {priceDetails.originalPrice}</p>
                      <p className={styles.priceFinal}>Preço com desconto: R$ {priceDetails.finalPrice}</p>
                    </>
                  ) : (
                    <p>Preço: R$ {priceDetails.originalPrice}</p>
                  )}
                </div>
              </div>

              {/* Tokens Info à direita */}
              <div className={styles.rightContent}>
                <div className={styles.tokensInfoItem}>
                  <h3>1. Acesso às Ferramentas</h3>
                  <p>Cada token permite que você utilize uma ferramenta de IA específica na plataforma.</p>
                </div>
                <div className={styles.tokensInfoItem}>
                  <h3>2. Ativação do Booster</h3>
                  <p>Duração: Ao ativar um booster, você terá acesso à ferramenta escolhida por um período de 24 horas.</p>
                </div>
                <div className={styles.tokensInfoItem}>
                  <h3>3. Consumo</h3>
                  <p>Cada utilização da ferramenta consome um "booster" de token, garantindo acesso contínuo.</p>
                </div>
                <div className={styles.tokensInfoItem}>
                  <h3>4. Flexibilidade</h3>
                  <p>Os tokens oferecem a liberdade de escolher quando utilizar as ferramentas, adaptando-se às suas necessidades e horários.</p>
                </div>
                <div className={styles.tokensInfoItem}>
                  <h3>5. Uso Eficiente</h3>
                  <p>Com a ativação do booster, você maximiza o uso das ferramentas, aproveitando ao máximo cada dia de acesso.</p>
                </div>
                <div className={styles.tokensInfoItem}>
                  <h3>Experimente a Flexibilidade</h3>
                  <p>Experimente a flexibilidade e o poder das nossas ferramentas de IA com os tokens e transforme sua experiência na plataforma!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default TokensBuyPage;
