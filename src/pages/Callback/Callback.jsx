import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Callback = () => {
  const user_Id = "pvvtctrvNdg4bcnOogd839Z1ZqD3";
  const [marketId, setMarketId] = useState('');
  const [nickname, setNickname] = useState('');
  const [powerSellerStatus, setPowerSellerStatus] = useState('');
  const [levelId, setLevelId] = useState('');
  const [permalink, setPermalink] = useState('');
  const [total] = useState(1500);
  const [refreshToken, setRefreshToken] = useState('');
  const [userIDML, setUserIDML] = useState('');

  const hasFetchedAccessToken = useRef(false);
  const hasIntegrated = useRef(false);

  const getCodeParams = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get('code');
  };

  const getAccessToken = async (authorization_code) => {
    if (hasFetchedAccessToken.current) return null;
    hasFetchedAccessToken.current = true;

    try {
      const response = await axios.post(
        'https://guiaseller-backend.dlmi5z.easypanel.host/getAccessToken',
        { refreshToken: authorization_code.trim() },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Access Token obtido:', response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      setUserIDML(response.data.user_id);
      setMarketId(response.data.user_id);

      return response.data.access_token; 
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
        permalink: response.data.permalink,
      };
    } catch (error) {
      console.error('Erro ao obter informações do usuário:', error);
    }
  };

  const handleIntegration = async (access_token, refresh_token, userData) => {
    if (hasIntegrated.current) return;
    hasIntegrated.current = true;

    const requestData = {
      access_token,
      refresh_token,
      user_marketplace_id: marketId,
      userId: user_Id,
      authorization_code: getCodeParams(),
      nickname: userData.nickname,
      power_seller_status: userData.power_seller_status,
      level_id: userData.level_id,
      permalink: userData.permalink,
      total,
    };

    console.log("Dados para integração:", requestData);

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
        .then((access_token) => {
          if (access_token) {
            return fetchUserInfo(access_token, marketId); 
          } else {
            console.error('access_token não definido após obter o access token.');
          }
        })
        .then((userData) => {
          if (userData && user_Id && userData.nickname && userData.power_seller_status && userData.level_id) {
            handleIntegration(access_token, refreshToken, userData); 
          } else {
            console.error('Informações do usuário incompletas para integração.');
          }
        })
        .catch(error => console.error('Erro no fluxo de autenticação:', error));
    }
  }, []); 

  return (
    <div>
      <h1>Hello, I'm callback</h1>
      <button onClick={() => console.log(getCodeParams())}>Pegue esse code no log ai Richardão</button>
    </div>
  );
};

export default Callback;
