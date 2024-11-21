import React, { useState } from 'react';
import SubscriptionModal from './SubscriptionModal'; // Importando o modal
import styles from './PlansList.module.css';

const PlansList = () => {
  const [duration, setDuration] = useState(1);
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

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
        "Recurso 1",
        "Recurso 2",
        "Recurso 3",
        "Recurso 4",
        "Recurso 5",
      ],
      limitations: [
        "1 Marketplace integrado",
        "10 tokens mensais",
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
        "Recurso 1",
        "Recurso 2",
        "Recurso 3",
        "Recurso 4",
        "Recurso 5",
      ],
      limitations: [
        "2 Marketplaces integrados",
        "20 tokens mensais",
      ],
    },
    {
      id: 3,
      name: 'Fundador',
      prices: { original: 9999, discounted: 4999 },
      resources: [
        "Recurso 1",
        "Recurso 2",
        "Recurso 3",
        "Recurso 4",
        "Recurso 5",
      ],
      limitations: [
        "5 Marketplaces integrados",
        "40 tokens mensais",
      ],
    },
  ];

  const handleDurationChange = (months) => {
    setDuration(months);
  };

  const toggleExpandPlan = (planId) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  const openModal = (plan) => {
    if (plan) {
      setSelectedPlan(plan);  // Definindo o plano selecionado
      setIsModalOpen(true);  // Abrindo o modal
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Filtro de Duração dos Planos */}
      <div className={styles.durationButtons}>
        <button
          onClick={() => handleDurationChange(1)}
          className={`${styles.durationButton} ${duration === 1 ? styles.active : ''}`}
        >
          1 Mês
        </button>
        <button
          onClick={() => handleDurationChange(3)}
          className={`${styles.durationButton} ${duration === 3 ? styles.active : ''}`}
        >
          3 Meses
        </button>
        <button
          onClick={() => handleDurationChange(6)}
          className={`${styles.durationButton} ${duration === 6 ? styles.active : ''}`}
        >
          6 Meses
        </button>
        <button
          onClick={() => handleDurationChange(12)}
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
              <button
                className={styles.subscribeButton}
                onClick={() => openModal(plan)}  // Passando o plano selecionado
              >
                Assinar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de Assinatura */}
      <SubscriptionModal 
        isOpen={isModalOpen} 
        closeModal={closeModal} 
        plan={selectedPlan}  // Passando o plano selecionado para o modal
        cycleOptions={cycleOptions} 
      />
    </div>
  );
};

export default PlansList;
