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

  // Definindo o estado de integrações: Disponíveis e Em breve
  const [integrations, setIntegrations] = useState([
    { nome: 'Mercado Livre', loja: '', integrado: false, ativo: false, disponivel: true },
    { nome: 'Bling', loja: '', integrado: false, ativo: false, disponivel: false },
    { nome: 'Shopee', loja: '', integrado: false, ativo: false, disponivel: false },
    { nome: 'Amazon', loja: '', integrado: false, ativo: false, disponivel: false },
  ]);

  const handleIntegrate = (index) => {
    const updatedIntegrations = [...integrations];
    updatedIntegrations[index].integrado = !updatedIntegrations[index].integrado;
    setIntegrations(updatedIntegrations);
  };

  const handleToggleActive = (index) => {
    const updatedIntegrations = [...integrations];
    if (updatedIntegrations[index].integrado) {
      updatedIntegrations[index].ativo = !updatedIntegrations[index].ativo;
      setIntegrations(updatedIntegrations);
    }
  };

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar userPhoto={userPhoto} username={username} userEmail={userEmail} />
      <div className="main-content">
        <TopBar userPhoto={userPhoto} />
        <div className={styles.integrationsContainer}>
          <h1 className={styles.title}>Integrações</h1>

          {/* Seção de integrações disponíveis */}
          <h2 className={styles.subTitle}>Disponíveis</h2>
          <ul className={styles.integrationsList}>
            {integrations.filter(integration => integration.disponivel).map((integration, index) => (
              <li key={index} className={styles.integrationItem}>
                <div className={styles.integrationInfo}>
                  <img
                    src="https://www.imagensempng.com.br/wp-content/uploads/2023/05/124-1.png" 
                    alt={`${integration.nome} logo`}
                    className={styles.integrationLogo}
                  />
                  <div>
                    <p className={styles.integrationName}>{integration.nome}</p>
                    <p className={styles.lojaInfo}>
                      {integration.integrado ? `Loja: ${integration.loja || 'Minha Loja'}` : 'Nenhuma loja integrada'}
                    </p>
                  </div>
                </div>
                <div className={styles.integrationControls}>
                  {/* Switch para Ativar/Desativar */}
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={integration.ativo}
                      onChange={() => handleToggleActive(index)}
                      disabled={!integration.integrado} /* Desativa se não estiver integrado */
                    />
                    <span className={styles.slider}></span>
                  </label>

                  {/* Status de integração */}
                  <div className={`${styles.integrationStatus} ${integration.integrado ? (integration.ativo ? styles.statusAtivado : styles.statusNaoAtivado) : styles.statusNaoIntegrado}`} />

                  {/* Botão de Integração */}
                  <button
                    className={integration.integrado ? (integration.ativo ? styles.activatedButton : styles.activateButton) : styles.integrateButton}
                    onClick={() => handleIntegrate(index)}
                  >
                    {integration.integrado ? (integration.ativo ? 'Ativado' : 'Ativar') : 'Integrar'}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Seção de integrações em breve */}
          <h2 className={styles.subTitle}>Em Breve</h2>
          <ul className={styles.integrationsList}>
            {integrations.filter(integration => !integration.disponivel).map((integration, index) => (
              <li key={index} className={`${styles.integrationItem} ${styles.inactive}`}>
                <div className={styles.integrationInfo}>
                  <img
                    src={`/${integration.nome.toLowerCase().replace(' ', '_')}.png`} 
                    alt={`${integration.nome} logo`}
                    className={styles.integrationLogo}
                  />
                  <div>
                    <p className={styles.integrationName}>{integration.nome}</p>
                    <p className={styles.lojaInfo}>Em breve</p>
                  </div>
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
