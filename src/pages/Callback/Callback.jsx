import React, { useEffect, useContext, useState, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Callback = () => {
  // Definir user_Id como valor fixo temporário
  const user_Id = "pvvtctrvNdg4bcnOogd839Z1ZqD3";

  // Estados para informações do usuário e tokens
  const [marketId, setMarketId] = useState('');
  const [nickname, setNickname] = useState('');
  const [powerSellerStatus, setPowerSellerStatus] = useState('');
  const [levelId, setLevelId] = useState('');
  const [permalink, setPermalink] = useState('');
  const [total] = useState(1500); // Valor de total fixo conforme o exemplo
  const [refreshToken, setRefreshToken] = useState('');
  const [access_token, setAccessToken] = useState('');
  const [userIDML, setUserIDML] = useState('');

  // Flags de controle
  const hasFetchedAccessToken = useRef(false);
  const hasIntegrated = useRef(false);

  const getCodeParams = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get('code');
  };

  const getAccessToken = async (authorization_code) => {
    if (hasFetchedAccessToken.current) return null; // Previne chamadas duplicadas
    hasFetchedAccessToken.current = true; // Marca como já buscado

    try {
      const response = await axios.post(
        'https://guiaseller-backend.dlmi5z.easypanel.host/getAccessToken',
        { refreshToken: authorization_code.trim() },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Access Token obtido:', response.data);
      setAccessToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      setUserIDML(response.data.user_id);
      setMarketId(response.data.user_id); // Define marketId como o user_id (81270097)

      return response.data.user_id; // Retorna user_id para garantir sequência
    } catch (error) {
      console.error('Erro ao obter access token:', error);
      throw error;
    }
  };

  const fetchUserInfo = async (access_token, user_id) => {
    try {
      if (!user_id) {
        console.error('user_id não definido. Não é possível buscar informações do usuário.');
        return;
      }

      const response = await axios.get(`https://api.mercadolibre.com/users/${user_id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      setNickname(response.data.nickname);
      setPowerSellerStatus(response.data.seller_reputation.power_seller_status || '');
      setLevelId(response.data.seller_reputation.level_id || '');
      setPermalink(response.data.permalink);
      console.log('Informações do usuário obtidas:', response.data);

      return {
        nickname: response.data.nickname,
        power_seller_status: response.data.seller_reputation.power_seller_status || '',
        level_id: response.data.seller_reputation.level_id || '',
        permalink: response.data.permalink
      }; // Retorna os dados para a próxima etapa
    } catch (error) {
      console.error('Erro ao obter informações do usuário:', error);
    }
  };

  const handleIntegration = async (access_token, refresh_token, userData) => {
    if (hasIntegrated.current) return; // Previne chamadas duplicadas
    hasIntegrated.current = true; // Marca como já integrado

    const requestData = {
      access_token, // Inclui o access_token no requestData para ser salvo
      refresh_token, // Inclui o refresh_token no requestData para ser salvo
      user_marketplace_id: marketId,
      userId: user_Id, // Usa o user_Id fixo
      authorization_code: getCodeParams(),
      nickname: userData.nickname,
      power_seller_status: userData.power_seller_status,
      level_id: userData.level_id,
      permalink: userData.permalink,
      total,
    };

    console.log("Dados para integração:", requestData); // Loga os dados antes de enviar

    try {
      const response = await axios.post(
        'https://guiaseller-backend.dlmi5z.easypanel.host/integrations',
        requestData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Integração criada com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar integração:', error);
    }
  };

  useEffect(() => {
    const authorization_code = getCodeParams();
    if (authorization_code && !hasFetchedAccessToken.current) {
      getAccessToken(authorization_code)
        .then((user_id) => {
          if (user_id) {
            return fetchUserInfo(access_token, user_id); // Chama fetchUserInfo com access_token e user_id
          } else {
            console.error('user_id não definido após obter o access token.');
          }
        })
        .then((userData) => {
          // Log dos dados do usuário para identificar campos ausentes
          console.log("Verificação de dados do usuário para integração:");
          console.log("user_Id:", user_Id);
          console.log("marketId:", marketId);
          console.log("nickname:", userData?.nickname);
          console.log("power_seller_status:", userData?.power_seller_status);
          console.log("level_id:", userData?.level_id);
          console.log("permalink:", userData?.permalink);

          // Verifica se todos os dados do usuário estão completos antes de chamar handleIntegration
          if (userData && user_Id && userData.nickname && userData.power_seller_status && userData.level_id) {
            handleIntegration(access_token, refreshToken, userData); // Chama handleIntegration com userData completo
          } else {
            console.error('Informações do usuário incompletas para integração.');
          }
        })
        .catch(error => console.error('Erro no fluxo de autenticação:', error));
    }
  }, []); // Executa apenas na montagem do componente

  return (
    <div>
      <h1>Hello, I'm callback</h1>
      <button onClick={() => console.log(getCodeParams())}>Pegue esse code no log ai Richardão</button>
    </div>
  );
};

export default Callback;
