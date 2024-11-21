import React, { useState, useEffect } from 'react';
import styles from './SubscriptionModal.module.css'; // Estilos específicos para o modal

const SubscriptionModal = ({ isOpen, closeModal, plan, cycleOptions }) => {
  const [billingType, setBillingType] = useState('PIX');
  const [cycle, setCycle] = useState('MONTHLY');
  const [description, setDescription] = useState('');
  const [customer, setCustomer] = useState('');
  const [value, setValue] = useState(0);
  const [nextDueDate, setNextDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (plan) {
      setDescription(`${plan.name} Assinatura`);
      setValue(plan.prices[1]);  // Definindo o valor com base no ciclo mensal inicialmente
    }
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Ex: "2024-11-22"
    setNextDueDate(formattedDate);
  }, [plan]);

  useEffect(() => {
    // Ajusta o valor de acordo com o ciclo selecionado
    if (cycle === 'MONTHLY') {
      setValue(plan?.prices[1]);
    } else if (cycle === 'QUARTERLY') {
      setValue(plan?.prices[3]);
    } else if (cycle === 'SEMIANNUAL') {
      setValue(plan?.prices[6]);
    } else if (cycle === 'ANNUAL') {
      setValue(plan?.prices[12]);
    }
  }, [cycle, plan]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const subscriptionData = {
      billingType,
      cycle,
      description,
      customer,
      value,
      nextDueDate,
    };

    try {
      // Simula o envio dos dados para a API (substitua com a lógica real)
      console.log('Enviando dados de assinatura', subscriptionData);
      alert('Assinatura realizada com sucesso!');
      closeModal();
    } catch (error) {
      alert('Erro ao processar a assinatura. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !plan) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={closeModal}>X</button>
        <h2>Preencha seus dados para a assinatura</h2>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="billingType">Tipo de Faturamento</label>
            <select
              id="billingType"
              value={billingType}
              onChange={(e) => setBillingType(e.target.value)}
              required
            >
              <option value="PIX">PIX</option>
              <option value="BOLETO">Boleto</option>
              <option value="CREDIT_CARD">Cartão de Crédito</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="cycle">Ciclo de Assinatura</label>
            <select
              id="cycle"
              value={cycle}
              onChange={(e) => setCycle(e.target.value)}
              required
            >
              {cycleOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Descrição</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customer">ID do Cliente</label>
            <input
              id="customer"
              type="text"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="value">Valor</label>
            <input
              id="value"
              type="number"
              value={value}
              readOnly
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="nextDueDate">Data de Vencimento</label>
            <input
              id="nextDueDate"
              type="date"
              value={nextDueDate}
              onChange={(e) => setNextDueDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? 'Processando...' : 'Assinar Agora'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionModal;
