import React, { useState, useEffect, useContext } from 'react';
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

  const userId = "pvvtctrvNdg4bcnOogd839Z1ZqD3"; // ID do usuário

  const [integrations, setIntegrations] = useState([
    { nome: 'Mercado Livre', loja: '', integrado: false, disponivel: true, selected: false, logo: 'https://i.imgur.com/yRascr7.png', link: 'https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=6973021883530314&redirect_uri=https://guiaseller.com/integrations/callback' },
    { nome: 'Shopee', loja: '', integrado: false, disponivel: false, selected: false, logo: 'https://i.imgur.com/h2d84rv.png' },
    { nome: 'Amazon', loja: '', integrado: false, disponivel: false, selected: false, logo: 'https://i.imgur.com/IHDjUqS.png' },
    { nome: 'Kwai', loja: '', integrado: false, disponivel: false, selected: false, logo: 'https://i.imgur.com/N2sE2tx.png' },
    { nome: 'Shein', loja: '', integrado: false, disponivel: false, selected: false, logo: 'https://i.imgur.com/4V3qxzb.png' },
    { nome: 'Magalu', loja: '', integrado: false, disponivel: false, selected: false, logo: 'https://i.imgur.com/6w3S8R2.png' },
  ]);

  // Carregar integrações do backend
  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        const response = await fetch(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${userId}`);
        const data = await response.json();

        // Verifica se existe integração com Mercado Livre
        const mercadoLivreIntegration = data.Integrations.find(
          (integration) => integration.nickname === "PERERESHOP"
        );

        if (mercadoLivreIntegration) {
          setIntegrations((prev) =>
            prev.map((integration) =>
              integration.nome === "Mercado Livre"
                ? {
                    ...integration,
                    integrado: true,
                    loja: mercadoLivreIntegration.nickname,
                  }
                : integration
            )
          );
        }
      } catch (error) {
        console.error("Erro ao buscar integrações:", error);
      }
    };

    fetchIntegrations();
  }, [userId]);

  // Função para alternar a integração
  const handleIntegrate = (index) => {
    const integration = integrations[index];

    // Verifica se a integração é do Mercado Livre
    if (integration.nome === 'Mercado Livre') {
      window.location.href = integration.link; // Redireciona para o link do Mercado Livre
    } else {
      const updatedIntegrations = [...integrations];
      updatedIntegrations[index].integrado = !updatedIntegrations[index].integrado;
      setIntegrations(updatedIntegrations);
    }
  };

  // Função para remover integração
  const handleRemoveIntegration = (index) => {
    const integration = integrations[index];
    if (integration.integrado) {
      console.log(`Removendo integração para ${integration.nome}`);
      // Adicione aqui o comando de remoção com o post para o backend
    }
  };

  // Função para selecionar/desmarcar a integração
  const handleSelectIntegration = (index) => {
    const updatedIntegrations = [...integrations];
    updatedIntegrations[index].selected = !updatedIntegrations[index].selected;
    setIntegrations(updatedIntegrations);
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
                    <input
                      type="checkbox"
                      checked={integration.selected}
                      onChange={() => handleSelectIntegration(index)}
                      className={styles.checkbox}
                    />
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
                    {/* Botão de Integração */}
                    <button
                      className={integration.integrado ? styles.activatedButton : styles.integrateButton}
                      onClick={() => handleIntegrate(index)}
                    >
                      {integration.integrado ? 'Ativado' : 'Integrar'}
                    </button>

                    {/* Botão de Remoção (desabilitado se não selecionado) */}
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveIntegration(index)}
                      disabled={!integration.selected}
                    >
                      Remover
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
