import React, { useState } from 'react';
import styles from './PlansList.module.css';

const PlansList = () => {
  const [duration, setDuration] = useState(1);
  const [expandedPlan, setExpandedPlan] = useState(null);

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
      subscribeLinks: {
        1: "https://sandbox.asaas.com/c/h40acs28hbykozw5",
        3: "https://sandbox.asaas.com/c/pro-3meses",
        6: "https://sandbox.asaas.com/c/pro-6meses",
        12: "https://sandbox.asaas.com/c/pro-12meses",
      },
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
      subscribeLinks: {
        1: "https://sandbox.asaas.com/c/premium-link",
        3: "https://sandbox.asaas.com/c/premium-3meses",
        6: "https://sandbox.asaas.com/c/premium-6meses",
        12: "https://sandbox.asaas.com/c/premium-12meses",
      },
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
      subscribeLinks: {
        1: "https://sandbox.asaas.com/c/founder-link",
        3: "https://sandbox.asaas.com/c/founder-3meses",
        6: "https://sandbox.asaas.com/c/founder-6meses",
        12: "https://sandbox.asaas.com/c/founder-12meses",
      },
    },
  ];

  const handleDurationChange = (months) => {
    setDuration(months);
  };

  const toggleExpandPlan = (planId) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
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
        {/* Pro Container */}
        <li
          key="pro"
          className={`${styles.planItem} ${expandedPlan === 1 ? styles.expanded : ''}`}
          onClick={() => toggleExpandPlan(1)}
        >
          <h2 className={styles.planName}>Pro</h2>
          <p className={styles.planPrice}>
            {duration === 1 ? (
              <>R$ {plans[0].basePrice},00</>
            ) : (
              <>
                <span className={styles.oldPrice}>R$ {plans[0].basePrice * duration},00</span>
                <br />
                R$ {plans[0].prices[duration]},00
              </>
            )}
          </p>
          <div className={`${expandedPlan === 1 ? styles.expandedContent : ''} ${styles.planDetails}`}>
            <h3 className={styles.resourceTitle}>Recursos:</h3>
            <ul className={styles.resourceList}>
              {plans[0].resources.map((resource, idx) => (
                <li key={idx}>{resource}</li>
              ))}
            </ul>
            <h3 className={styles.limitationTitle}>Limitações:</h3>
            <ul className={styles.limitationList}>
              {plans[0].limitations.map((limitation, idx) => (
                <li key={idx}>{limitation}</li>
              ))}
            </ul>
            <a href={plans[0].subscribeLinks[duration]} className={styles.subscribeButton} target="_blank" rel="noopener noreferrer">
              Assinar
            </a>
          </div>
        </li>

        {/* Premium Container */}
        <li
          key="premium"
          className={`${styles.planItem} ${styles.premiumContainer} ${expandedPlan === 2 ? styles.expanded : ''}`}
          onClick={() => toggleExpandPlan(2)}
        >
          <h2 className={styles.planName}>Premium</h2>
          <p className={styles.planPrice}>
            {duration === 1 ? (
              <>R$ {plans[1].basePrice},00</>
            ) : (
              <>
                <span className={styles.oldPrice}>R$ {plans[1].basePrice * duration},00</span>
                <br />
                R$ {plans[1].prices[duration]},00
              </>
            )}
          </p>
          <div className={`${expandedPlan === 2 ? styles.expandedContent : ''} ${styles.planDetails}`}>
            <h3 className={styles.resourceTitle}>Recursos:</h3>
            <ul className={styles.resourceList}>
              {plans[1].resources.map((resource, idx) => (
                <li key={idx}>{resource}</li>
              ))}
            </ul>
            <h3 className={styles.limitationTitle}>Limitações:</h3>
            <ul className={styles.limitationList}>
              {plans[1].limitations.map((limitation, idx) => (
                <li key={idx}>{limitation}</li>
              ))}
            </ul>
            <a href={plans[1].subscribeLinks[duration]} className={styles.subscribeButton} target="_blank" rel="noopener noreferrer">
              Assinar
            </a>
          </div>
          <span className={`${styles.planTag} ${styles.premiumTag}`}>Popular</span>
        </li>

        {/* Founder Container */}
        <li
          key="founder"
          className={`${styles.planItem} ${styles.founderContainer} ${expandedPlan === 3 ? styles.expanded : ''}`}
          onClick={() => toggleExpandPlan(3)}
        >
          <h2 className={styles.planName}>Fundador</h2>
          <p className={styles.planPrice}>
            <span className={styles.oldPrice}>R$ {plans[2].prices.original},00</span>
            <br />
            R$ {plans[2].prices.discounted},00
          </p>
          <div className={`${expandedPlan === 3 ? styles.expandedContent : ''} ${styles.planDetails}`}>
            <h3 className={styles.resourceTitle}>Recursos:</h3>
            <ul className={styles.resourceList}>
              {plans[2].resources.map((resource, idx) => (
                <li key={idx}>{resource}</li>
              ))}
            </ul>
            <h3 className={styles.limitationTitle}>Limitações:</h3>
            <ul className={styles.limitationList}>
              {plans[2].limitations.map((limitation, idx) => (
                <li key={idx}>{limitation}</li>
              ))}
            </ul>
            <a href={plans[2].subscribeLinks[duration]} className={styles.subscribeButton} target="_blank" rel="noopener noreferrer">
              Assinar
            </a>
          </div>
          <span className={`${styles.planTag} ${styles.founderTag}`}>Vitalício</span>
        </li>
      </ul>
    </div>
  );
};

export default PlansList;
