import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import styles from '../styles/integrations.module.css';
import MainContent from '../components/MainContent';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const IntegrationsPage = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  const [integrations, setIntegrations] = useState([
    { nome: 'Bling', logo: 'bling_logo_url', ativo: true, integrado: true, loja: 'Loja A' },
    { nome: 'Mercado Livre', logo: 'mercado_livre_logo_url', ativo: false, integrado: true, loja: 'Loja B' },
    { nome: 'Shopee', logo: 'shopee_logo_url', ativo: false, integrado: false, loja: '' },
    { nome: 'Amazon', logo: 'amazon_logo_url', ativo: true, integrado: false, loja: '' },
  ]);

  const toggleActiveStatus = (index) => {
    const updatedIntegrations = [...integrations];
    updatedIntegrations[index].ativo = !updatedIntegrations[index].ativo;
    setIntegrations(updatedIntegrations);
  };

  const toggleIntegrationStatus = (index) => {
    const updatedIntegrations = [...integrations];
    if (!updatedIntegrations[index].integrado) {
      // Se ainda não estiver integrado, ao clicar ele vai integrar
      updatedIntegrations[index].integrado = true;
      updatedIntegrations[index].ativo = true; // Assim que integrar, ele se torna ativo automaticamente
    }
    setIntegrations(updatedIntegrations);
  };

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />
        <div className={styles.integrationsContainer}>
          <h1 className={styles.title}>Integrações</h1>

          <ul className={styles.integrationsList}>
            {integrations.map((integration, index) => (
              <li key={index} className={styles.integrationItem}>
                <div className={styles.integrationInfo}>
                  <img src={integration.logo} alt={integration.nome} className={styles.integrationLogo} />
                  <div>
                    <h3 className={styles.integrationName}>{integration.nome}</h3>
                    {integration.integrado && (
                      <p className={styles.lojaInfo}>Loja Integrada: {integration.loja || "Nenhuma loja"}</p>
                    )}
                  </div>
                </div>

                <div className={styles.integrationControls}>
                  {/* Switch controlando o status ativo/inativo */}
                  {integration.integrado && (
                    <label className={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={integration.ativo} 
                        onChange={() => toggleActiveStatus(index)} 
                      />
                      <span className={`${styles.slider} ${styles.round}`}></span>
                    </label>
                  )}
                  
                  {/* Botão de Integrar/Ativar/Ativado */}
                  {!integration.integrado ? (
                    <button 
                      className={styles.integrateButton}
                      onClick={() => toggleIntegrationStatus(index)}
                    >
                      Integrar
                    </button>
                  ) : (
                    <button 
                      className={integration.ativo ? styles.activatedButton : styles.activateButton}
                      onClick={() => toggleActiveStatus(index)}
                    >
                      {integration.ativo ? 'Ativado' : 'Ativar'}
                    </button>
                  )}

                  {/* Bolinha verde/vermelha indicando status de integração */}
                  <span 
                    className={`${styles.integrationStatus} ${integration.integrado ? (integration.ativo ? styles.statusAtivado : styles.statusNaoAtivado) : styles.statusNaoIntegrado}`}
                  ></span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default IntegrationsPage;
