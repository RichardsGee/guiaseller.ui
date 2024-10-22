import React, { useContext, useState } from 'react';
import Header from '../../components/Header/Header';  
import Sidebar from '../../components/Sidebar/Sidebar';  
import Footer from '../../components/Footer/Footer';  
import MainContent from '../../components/MainContent/MainContent'; 
import styles from './PlansPage.module.css'; 
import '../../styles/styles.css'; // Importando o CSS global
import { AuthContext } from '../../context/AuthContext'; 

const PlansPage = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;

  const [duration, setDuration] = useState(1); // Estado para a duração do plano

  // Preços para cada plano e duração
  const plans = [
    { 
      id: 1, 
      name: 'Pro', 
      basePrice: 129, 
      discountedPrice: 99, 
      prices: { 
        1: 99, 
        3: Math.round(129 * 3 * 0.95), 
        6: Math.round(129 * 6 * 0.90), 
        12: Math.round(129 * 12 * 0.80) 
      } 
    },
    { 
      id: 2, 
      name: 'Premium', 
      basePrice: 169, 
      discountedPrice: 149, 
      prices: { 
        1: 149, 
        3: Math.round(169 * 3 * 0.95), 
        6: Math.round(169 * 6 * 0.90), 
        12: Math.round(169 * 12 * 0.80) 
      } 
    },
    { 
      id: 3, 
      name: 'Fundador', 
      prices: { original: 9999, discounted: 4999 } // Vitalício 
    },
  ];

  const handleDurationChange = (months) => {
    setDuration(months);
  };

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} />
      <div className="main-content">
        
        <div className="contentContainer"> {/* Usando o contentContainer */}
          <h1 className={styles.title}>Escolha Seu Plano</h1>

          {/* Filtro de Duração dos Planos */}
          <div className={styles.durationButtons}>
            <button onClick={() => handleDurationChange(1)} className={`${styles.durationButton} ${duration === 1 ? styles.active : ''}`}>
              1 Mês
            </button>
            <button onClick={() => handleDurationChange(3)} className={`${styles.durationButton} ${duration === 3 ? styles.active : ''}`}>
              3 Meses
            </button>
            <button onClick={() => handleDurationChange(6)} className={`${styles.durationButton} ${duration === 6 ? styles.active : ''}`}>
              6 Meses
            </button>
            <button onClick={() => handleDurationChange(12)} className={`${styles.durationButton} ${duration === 12 ? styles.active : ''}`}>
              12 Meses
            </button>
          </div>

          <ul className={styles.plansList}>
            {plans.map(plan => (
              <li key={plan.id} className={styles.planItem}>
                <h2 className={styles.planName}>{plan.name}</h2>
                {plan.name === 'Fundador' ? (
                  <div style={{ position: 'relative' }}>
                    <p className={styles.vitalicioText}>Vitalício</p> {/* Texto "Vitalício" no canto superior direito */}
                    <p className={styles.planPrice}>
                      <span className={styles.oldPrice}>R$ {plan.prices.original},00</span> {/* Preço original */}
                      <br />
                      R$ {plan.prices.discounted},00 {/* Preço com desconto */}
                    </p>
                  </div>
                ) : (
                  <p className={styles.planPrice}>
                    <span className={styles.oldPrice}>R$ {plan.basePrice * duration},00</span> {/* Preço original multiplicado pela duração */}
                    <br />
                    R$ {plan.prices[duration]},00 {/* Preço com desconto conforme a duração */}
                  </p>
                )}
                <p className={styles.planDescription}>Acesso a funcionalidades exclusivas e suporte dedicado.</p>
                <button className={styles.subscribeButton}>
                  Assinar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default PlansPage;
