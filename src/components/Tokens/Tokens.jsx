import React, { useState, useEffect } from 'react';
import styles from './Tokens.module.css'; // Importando o CSS Module para Tokens
import tokenIcon from '../../assets/tokens.png'; // Importando o arquivo PNG
import axios from 'axios'; // Importando o axios para fazer a requisição à API

const Tokens = ({ userId, setTokenCount }) => {
  const [tokens, setTokens] = useState(0); // Estado para armazenar o número de tokens
  const [isHovered, setIsHovered] = useState(false);

  // Função para alternar o estado de hover
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        if (userId) {
          // Atualize a URL para refletir o nome correto do campo (token)
          const response = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${userId}/token`);
          console.log("Resposta da API de Tokens:", response); // Log da resposta da API
          setTokens(response.data.token || 0); // Atualiza o estado de tokens com o valor retornado
          setTokenCount(response.data.token || 0); // Passando os tokens para o Header ou componente pai
        }
      } catch (error) {
        console.error("Erro ao buscar tokens:", error); // Log de erro se ocorrer algum problema na requisição
      }
    };

    if (userId) {
      fetchTokens(); // Chama a função de fetch quando o userId estiver disponível
    }
  }, [userId, setTokenCount]); // Executa o useEffect sempre que o userId mudar

  return (
    <div
      className={styles.tokensContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={tokenIcon} alt="Tokens" className={styles.tokenIcon} />
      <span className={styles.tokenText}>
        {isHovered ? 'Comprar Tokens' : `Tokens: ${tokens}`} {/* Exibindo tokens ou "Comprar Tokens" */}
      </span>
    </div>
  );
};

export default Tokens;
