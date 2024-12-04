import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import SubscriptionModal from './SubscriptionModal'; // Importando o modal
import styles from './PlansList.module.css';
import { AuthContext } from '../../context/AuthContext'; // Importando o contexto de autenticação

const PlansList = () => {
  const { user } = useContext(AuthContext); // Obter informações do usuário
  const [duration, setDuration] = useState(1); // Armazenando a duração do plano selecionado
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // Plano selecionado
  const [selectedCycle, setSelectedCycle] = useState('MONTHLY'); // Ciclo de pagamento selecionado (mensal, trimestral, etc.)
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false); // Verificar se o usuário tem uma assinatura ativa
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const cycleOptions = [
    { value: 'MONTHLY', label: 'Mensal' },
    { value: 'QUARTERLY', label: 'Trimestral' },
    { value: 'SEMIANNUAL', label: 'Semestral' },
    { value: 'ANNUAL', label: 'Anual' },
  ];

  const plans = [
    {
      id: 1,
      name: 'Pro',
      basePrice: 129,
      prices: {
        1: 129,
        3: Math.round(129 * 3 * 0.95),
        6: Math.round(129 * 6 * 0.90),
        12: Math.round(129 * 12 * 0.80),
      },
      resources: [
        "• Dashboard e Métricas",
        "• Ferramentas",
        "ㅤ",
      ],
      limitations: [
        "• 1 Marketplace integrado",
        "• 5 tokens mensais",
      ],
    },
    {
      id: 2,
      name: 'Premium',
      basePrice: 169,
      prices: {
        1: 169,
        3: Math.round(169 * 3 * 0.95),
        6: Math.round(169 * 6 * 0.90),
        12: Math.round(169 * 12 * 0.80),
      },
      resources: [
        "• Dashboard e Métricas",
        "• Ferramentas",
        "• 5% desconto nos Tokens"
      ],
      limitations: [
        "• 2 Marketplaces integrados",
        "• 10 tokens mensais",
      ],
    },
    {
      id: 3,
      name: 'Fundador',
      prices: { original: 9999, discounted: 4999 },
      resources: [
        "• Dashboard e Métricas",
        "• Ferramentas",
        "• 15% desconto nos Tokens"
      ],
      limitations: [
        "• Marketplaces integrados Ilimitado",
        "• 15 tokens mensais",
      ],
    },
  ];

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        if (user?.uid) {
          const response = await axios.get(
            `https://guiaseller-backend.dlmi5z.easypanel.host/subscription/${user.uid}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Resposta completa da API:", response.data);

          // Verifica se há assinaturas ativas ou pagamentos pendentes
          if (response.data.data && response.data.data.length > 0) {
            const activeSubscription = response.data.data.find((sub) => {
              // Se o pagamento estiver PENDENTE, desabilitar o botão
              return sub.status === "PENDING"; // Verifica se o pagamento está pendente
            });

            setHasActiveSubscription(!!activeSubscription); // Se houver pagamento pendente, desabilita o botão
          } else {
            setHasActiveSubscription(false);
          }
        }
      } catch (error) {
        setError(error.response?.data?.error || "Erro ao verificar assinatura.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchSubscriptions();
    }
  }, [user?.uid]);

  const handleDurationChange = (months, cycle) => {
    setDuration(months);
    setSelectedCycle(cycle); // Atualiza o ciclo selecionado
  };

  const toggleExpandPlan = (planId) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  const openModal = (plan, cycle) => {
    const planWithCycleValue = {
      ...plan,
      cycle,  // Passa o ciclo selecionado
      value: plan.prices[duration],  // Passa o valor correto com base no ciclo
    };
    setSelectedPlan(planWithCycleValue); // Preenche as informações do plano selecionado
    setIsModalOpen(true); // Abre o modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Fecha o modal
  };

  return (
    <div>
      {/* Filtro de Duração dos Planos */}
      <div className={styles.durationButtons}>
        <button
          onClick={() => handleDurationChange(1, 'MONTHLY')}
          className={`${styles.durationButton} ${duration === 1 ? styles.active : ''}`}
        >
          1 Mês
        </button>
        <button
          onClick={() => handleDurationChange(3, 'QUARTERLY')}
          className={`${styles.durationButton} ${duration === 3 ? styles.active : ''}`}
        >
          3 Meses
        </button>
        <button
          onClick={() => handleDurationChange(6, 'SEMIANNUAL')}
          className={`${styles.durationButton} ${duration === 6 ? styles.active : ''}`}
        >
          6 Meses
        </button>
        <button
          onClick={() => handleDurationChange(12, 'ANNUAL')}
          className={`${styles.durationButton} ${duration === 12 ? styles.active : ''}`}
        >
          12 Meses
        </button>
      </div>

      <ul className={styles.plansList}>
        {plans.map((plan) => (
          <li
            key={plan.id}
            className={`${styles.planItem} ${expandedPlan === plan.id ? styles.expanded : ''}`}
            onClick={() => toggleExpandPlan(plan.id)}
          >
            <h2 className={styles.planName}>{plan.name}</h2>
            <p className={styles.planPrice}>
              {duration === 1 ? (
                <>R$ {plan.basePrice},00</>
              ) : (
                <>
                  <span className={styles.oldPrice}>R$ {plan.basePrice * duration},00</span>
                  <br />
                  R$ {plan.prices[duration]},00
                </>
              )}
            </p>
            <div className={`${expandedPlan === plan.id ? styles.expandedContent : ''} ${styles.planDetails}`}>
              <h3 className={styles.resourceTitle}>Recursos:</h3>
              <ul className={styles.resourceList}>
                {plan.resources.map((resource, idx) => (
                  <li key={idx}>{resource}</li>
                ))}
              </ul>
              <h3 className={styles.limitationTitle}>Limitações:</h3>
              <ul className={styles.limitationList}>
                {plan.limitations.map((limitation, idx) => (
                  <li key={idx}>{limitation}</li>
                ))}
              </ul>
              <div className={styles.buttonWrapper}>
                <button
                  className={`${styles.subscribeButton} ${hasActiveSubscription ? styles.disabledButton : ''}`}
                  onClick={() => openModal(plan, selectedCycle)}  // Passando o ciclo de pagamento selecionado
                  disabled={hasActiveSubscription} // Desabilita o botão se já tiver uma assinatura ativa ou pagamento pendente
                >
                  {hasActiveSubscription ? 'Assinatura Ativa' : 'Assinar'}
                </button>
                {hasActiveSubscription && <span className={styles.subscriptionMessage}>Já possui uma assinatura</span>}
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de Assinatura */}
      <SubscriptionModal 
        isOpen={isModalOpen} 
        closeModal={closeModal} 
        plan={selectedPlan}  // Passando o plano selecionado para o modal
        cycle={selectedCycle} // Passando o ciclo de pagamento para o modal
        cycleOptions={cycleOptions} 
      />
    </div>
  );
};

export default PlansList;
