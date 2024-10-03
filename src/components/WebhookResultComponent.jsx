import React, { useState, useEffect } from 'react';
import styles from '../styles/webhookResultComponent.module.css'; // Certifique-se de ajustar o caminho

const WebhookResultComponent = ({ webhookUrl }) => {
  const [webhookResult, setWebhookResult] = useState('Nenhum resultado recebido ainda.');

  useEffect(() => {
    const fetchWebhookResult = async () => {
      try {
        const response = await fetch(webhookUrl);
        const data = await response.json();
        setWebhookResult(data.message || 'Nenhum resultado recebido ainda.');
      } catch (error) {
        console.error('Erro ao receber o resultado do webhook:', error);
        setWebhookResult('Erro ao receber o resultado do webhook.');
      }
    };

    const intervalId = setInterval(() => {
      fetchWebhookResult();
    }, 5000); // Consulta a cada 5 segundos

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente desmontar
  }, [webhookUrl]);

  return (
    <div className={styles.webhookContainer}>
      <h2 className={styles.webhookTitle}>Título Mercado Livre</h2>
      <div className={styles.textareaContainer}>
        <textarea
          value={webhookResult}
          readOnly
          className={styles.webhookText}
        />
      </div>
    </div>
  );
};

export default WebhookResultComponent;
