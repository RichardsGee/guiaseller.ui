import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import { 
  BarChart, 
  ShoppingCart, 
  MessageSquare, 
  TrendingUp, 
  Settings, 
  Medal 
} from 'lucide-react';  
import axios from 'axios';  // Importando o axios para fazer a requisição
import styles from './stores.module.css'; // Atualizando para o novo CSS
import '../../styles/styles.css'; // Importando o CSS global
import { AuthContext } from '../../context/AuthContext'; // Contexto de autenticação
import MetricasContent from './MetricasContent'; // Importando o componente de Métricas
import ReputacaoContent from './Reputacao'; // Componente de Reputação
import VendasContent from './Vendas'; // Componente de Vendas
import QuestionsContent from './Questions'; // Componente de Perguntas
import PerformanceContent from './Performance'; // Componente de Performance
import ConfiguracoesContent from './Configuracoes'; // Componente de Configurações

const StorePage = () => {
  const { user, signOut } = useContext(AuthContext); // Obtendo o usuário autenticado do contexto
  const [storeName, setStoreName] = useState(''); // Estado para armazenar o nome da loja
  const [storeDetails, setStoreDetails] = useState({}); // Armazenar outros dados da loja
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento dos dados da loja
  const [reputationData, setReputationData] = useState({ // Adicionando o estado para reputação
    cancellations: 0,
    mediation: 0,
    delays: 0,
    cancellationsRate: 0,
    mediationRate: 0,
    delaysRate: 0,
    salesCompleted: 0,
  }); 
  const [activeSubmenu, setActiveSubmenu] = useState('Métricas'); // Estado para o submenu ativo
  
  // Verificação para garantir que o user existe
  const userId = user ? user.uid : null; // Atribuindo o user.uid ou null, se o usuário não estiver autenticado

  // Carregar os dados do backend
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return; // Se o usuário não estiver autenticado, não executa o código de requisição
    }

    const fetchStoreDetailsFromBackend = async () => {
      try {
        const response = await fetch(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${userId}`); // Usando o user.uid do Firebase
        const data = await response.json();
        console.log("Resposta do backend:", data); // Log para ver os dados retornados

        // Verificando se há dados de integração
        if (data.Integrations && data.Integrations[0]) {
          const { access_token, user_marketplace_id } = data.Integrations[0];

          // Agora que temos o access_token, vamos buscar os dados do Mercado Livre
          fetchStoreDetailsFromML(user_marketplace_id, access_token); // Passando o user_marketplace_id
        } else {
          console.error("Dados de integração não encontrados.");
          setLoading(false); // Marcar como carregado mesmo em caso de erro
        }
      } catch (error) {
        console.error("Erro ao buscar dados do backend:", error);
        setLoading(false); // Marcar como carregado mesmo em caso de erro
      }
    };

    fetchStoreDetailsFromBackend();
  }, [userId]); // O hook useEffect depende de userId

  // Função para buscar dados do Mercado Livre
  const fetchStoreDetailsFromML = async (userMarketplaceId, accessToken) => {
    try {
      const response = await fetch(`https://api.mercadolibre.com/users/${userMarketplaceId}`, { // Usando o user_marketplace_id
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Utilizar o access_token na requisição
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Resposta da API do Mercado Livre:", data);

        // Atualizando o estado da loja com todos os dados
        setStoreName(data.nickname); // Nome da loja
        setStoreDetails({
          totalSales: data.seller_reputation.transactions.total, // Total de vendas
          powerSellerStatus: data.seller_reputation.power_seller_status, // Status Mercado Líder
          levelId: data.seller_reputation.level_id, // Nível
          sellerReputation: data.seller_reputation, // Dados de reputação do vendedor
        });

        // Reputação adicional de cancelamentos, mediações, atrasos e taxas
        setReputationData({
          cancellations: data.seller_reputation.metrics?.cancellations?.value || 0,
          mediation: data.seller_reputation.metrics?.mediation?.value || 0,
          delays: data.seller_reputation.metrics?.delayed_handling_time?.value || 0,
          cancellationsRate: data.seller_reputation.metrics?.cancellations?.rate || 0,
          mediationRate: data.seller_reputation.metrics?.mediation?.rate || 0,
          delaysRate: data.seller_reputation.metrics?.delayed_handling_time?.rate || 0,
          salesCompleted: data.seller_reputation.metrics?.sales?.completed || 0,
        });

        setLoading(false); // Atualiza o estado para indicar que a requisição foi concluída
      } else {
        console.error("Erro ao obter dados do Mercado Livre:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao fazer requisição ao Mercado Livre:", error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Definindo os submenus aqui, dentro do escopo do componente
  const submenus = [
    { 
      icon: <BarChart />, 
      label: 'Métricas', 
      component: MetricasContent 
    },
    { 
      icon: <Medal />, 
      label: 'Reputação', 
      component: ReputacaoContent // Componente de Reputação
    },
    { 
      icon: <ShoppingCart />, 
      label: 'Vendas', 
      component: VendasContent // Componente de Vendas
    },
    { 
      icon: <MessageSquare />, 
      label: 'Perguntas', 
      component: QuestionsContent // Componente de Perguntas
    },
    { 
      icon: <TrendingUp />, 
      label: 'Performance', 
      component: PerformanceContent // Componente de Performance
    },
    { 
      icon: <Settings />, 
      label: 'Configurações', 
      component: ConfiguracoesContent // Componente de Configurações
    }
  ];

  // Encontrar o componente do submenu ativo
  const ActiveComponent = submenus.find(menu => menu.label === activeSubmenu)?.component || MetricasContent;

  return (
    <MainContent>
      <Header />
      <div className="contentContainer">
        <Sidebar />
        <div className={styles.storePage}>
          {/* Cabeçalho da Loja */}
          <div className={styles.storeHeader}>
            <h1>{storeName || "Loja Mercado Livre"}</h1> {/* Usando o nome da loja aqui */}
            <div className={styles.storeInfo}>
              <span>ID: ML12345</span>
              <span>Status: Ativa</span>
            </div>
          </div>

          {/* Submenus */}
          <div className={styles.storeSubmenus}>
            {submenus.map((submenu) => (
              <div 
                key={submenu.label}
                className={`${styles.submenuItem} ${activeSubmenu === submenu.label ? styles.active : ''}`}
                onClick={() => setActiveSubmenu(submenu.label)}
              >
                {submenu.icon}
                <span>{submenu.label}</span>
              </div>
            ))}
          </div>

          {/* Conteúdo Dinâmico */}
          <div className={styles.storeContent}>
            <ActiveComponent storeDetails={storeDetails} reputationData={reputationData} />
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
};

export default StorePage;
