import React, { useState, useEffect } from 'react';
import styles from '../styles/webhookResultComponent.module.css'; // Certifique-se de ajustar o caminho

const WebhookResultComponent = ({ webhookUrl }) => {
  const [webhookResult, setWebhookResult] = useState('Nenhum resultado recebido ainda.');
  const [copySuccess, setCopySuccess] = useState(''); // Estado para o feedback de cópia

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookResult).then(() => {
      setCopySuccess('Copiado!');
      setTimeout(() => setCopySuccess(''), 2000); // Remove o feedback após 2 segundos
    }).catch(err => {
      console.error('Erro ao copiar texto: ', err);
    });
  };

  return (
    <div className={styles.webhookContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.webhookTitle}>Título Mercado Livre</h2>
        <button className={styles.copyButton} onClick={copyToClipboard}>
          {copySuccess ? copySuccess : 'Copiar'}
        </button>
      </div>
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
