import React, { useState, useEffect } from 'react';
import styles from '../styles/webhookResultComponent.module.css'; // Ajuste o caminho conforme necessário

const WebhookResultComponent = ({ apiUrl, userId }) => {
  const [webhookResult, setWebhookResult] = useState('Nenhum resultado recebido ainda.');
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    const fetchWebhookResult = async () => {
      if (!userId) return; // Não buscar se o userId não estiver definido

      try {
        const response = await fetch(`${apiUrl}/webhook/${userId}`, {  // Busca com base no userId
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar os dados do webhook.');
        }

        const data = await response.json();

        // Exibir o título do webhook
        if (data && data.length > 0) {
          const latestWebhook = data[data.length - 1]; // Pega o último webhook recebido para o userId
          setWebhookResult(latestWebhook.word || 'Nenhum título disponível');
        } else {
          setWebhookResult('Nenhum título recebido.');
        }
      } catch (error) {
        console.error('Erro ao receber o resultado do webhook:', error);
        setWebhookResult('Erro ao receber o resultado do webhook.');
      }
    };

    fetchWebhookResult();

    const intervalId = setInterval(fetchWebhookResult, 5000); // Busca a cada 5 segundos
    return () => clearInterval(intervalId); // Limpar o intervalo ao desmontar
  }, [apiUrl, userId]); // userId como dependência

  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookResult)
      .then(() => setCopySuccess('Copiado!'))
      .catch(err => console.error('Erro ao copiar texto: ', err));

    setTimeout(() => setCopySuccess(''), 2000); // Limpar feedback após 2 segundos
  };

  return (
    <div className={styles.webhookContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.webhookTitle}>Título Mercado Livre</h2>
        <button onClick={copyToClipboard}>
          {copySuccess || 'Copiar'}
        </button>
      </div>
      <textarea value={webhookResult} readOnly rows={10} cols={50} />
    </div>
  );
};

export default WebhookResultComponent;
