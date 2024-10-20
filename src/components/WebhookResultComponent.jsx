import React, { useEffect } from 'react';

const WebhookResultComponent = ({ apiUrl, userId, onWebhookTitleUpdate }) => {

  useEffect(() => {
    const fetchWebhookResult = async () => {
      if (!userId) return; // Não buscar se o userId não estiver definido

      console.log(`Buscando webhook para o userId: ${userId}`);

      try {
        // Aguardar 5 segundos antes de fazer o GET
        await new Promise(resolve => setTimeout(resolve, 5000)); // Aguardar 5 segundos

        // Fazendo um GET para o endpoint do backend com o userId
        const response = await fetch(`${apiUrl}/webhook/${userId}`, {  
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar os dados do webhook.');
        }

        const data = await response.json();

        // Verificar se há resultados e enviar o título para o componente pai
        if (data && data.length > 0) {
          const latestWebhook = data[data.length - 1]; // Pega o último webhook recebido para o userId
          console.log(`Título recebido do Webhook: ${latestWebhook.word}`);
          onWebhookTitleUpdate(latestWebhook.word || '');
        }
      } catch (error) {
        console.error('Erro ao receber o resultado do webhook:', error);
      }
    };

    // Faz o fetch assim que o componente monta, mas com um atraso de 5 segundos
    fetchWebhookResult();
  }, [apiUrl, userId, onWebhookTitleUpdate]); 

  return null; // Não renderiza nada na UI
};

export default WebhookResultComponent;
