import React, { useState, useContext } from 'react';
import Header from '../../components/Header/Header';  
import Sidebar from '../../components/Sidebar/Sidebar';  
import Footer from '../../components/Footer/Footer';  
import MainContent from '../../components/MainContent/MainContent'; 
import { AuthContext } from '../../context/AuthContext';  
import styles from './integrations.module.css'; 
import '../../styles/styles.css'; // Importando o CSS global

const IntegrationsPage = () => {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;

  // Definindo o estado de integrações: Disponíveis e Em breve com logos específicas
  const [integrations, setIntegrations] = useState([
    { nome: 'Mercado Livre', loja: '', integrado: false, ativo: false, disponivel: true, logo: 'https://i.imgur.com/yRascr7.png' },
    { nome: 'Bling', loja: '', integrado: false, ativo: false, disponivel: false, logo: 'https://i.imgur.com/YXoGxGm.png' },
    { nome: 'Shopee', loja: '', integrado: false, ativo: false, disponivel: false, logo: 'https://i.imgur.com/h2d84rv.png' },
    { nome: 'Amazon', loja: '', integrado: false, ativo: false, disponivel: false, logo: 'https://i.imgur.com/IHDjUqS.png' },
  ]);

  // Função para alternar a integração
  const handleIntegrate = (index) => {
    const updatedIntegrations = [...integrations];
    updatedIntegrations[index].integrado = !updatedIntegrations[index].integrado;
    setIntegrations(updatedIntegrations);
  };

  // Função para ativar/desativar a integração
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
        
        <div className="contentContainer">
          <div className={styles.integrationsContainer}>
            <h1 className="title">Integrações</h1>

            {/* Seção de integrações disponíveis */}
            <h2 className={styles.subTitle}>Disponíveis</h2>
            <ul className={styles.integrationsList}>
              {integrations.filter(integration => integration.disponivel).map((integration, index) => (
                <li key={index} className={styles.integrationItem}>
                  <div className={styles.integrationInfo}>
                    <img
                      src={integration.logo} 
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
                      src={integration.logo} 
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
      </div>
      <Footer />
    </MainContent>
  );
};

export default IntegrationsPage;
