import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Callback = () => {
  const user_Id = "pvvtctrvNdg4bcnOogd839Z1ZqD3";
  const [nickname, setNickname] = useState('');
  const [powerSellerStatus, setPowerSellerStatus] = useState('');
  const [levelId, setLevelId] = useState('');
  const [permalink, setPermalink] = useState('');
  const [total, setTotal] = useState(1500);
  const [refreshToken, setRefreshToken] = useState('');

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

      console.log('Access Token obtido:', response.data);
      const access_token = response.data.access_token;
      const marketId = response.data.user_id;
      const refresh_token = response.data.refresh_token;

      setRefreshToken(refresh_token);

      return { access_token, marketId, refresh_token };
    } catch (error) {
      console.error('Erro ao obter access token:', error);
      throw error;
    }
  };

  const fetchUserInfo = async (access_token, marketId) => {
    try {
      if (!marketId) {
        console.error('marketId (user_id) não definido. Não é possível buscar informações do usuário.');
        return null;
      }

      const response = await axios.get(`https://api.mercadolibre.com/users/${marketId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const userData = {
        nickname: response.data.nickname || '',
        power_seller_status: response.data.seller_reputation?.power_seller_status || '',
        level_id: response.data.seller_reputation?.level_id || '',
        permalink: response.data.permalink || '',
        total: response.data.seller_reputation?.transactions?.total || 0,
      };

      // Log para verificar cada dado do usuário
      console.log("Dados do usuário obtidos:");
      Object.keys(userData).forEach(key => {
        if (!userData[key]) {
          console.error(`Campo faltando em userData: ${key} está ${userData[key]}`);
        } else {
          console.log(`${key}: ${userData[key]}`);
        }
      });

      setNickname(userData.nickname);
      setPowerSellerStatus(userData.power_seller_status);
      setLevelId(userData.level_id);
      setPermalink(userData.permalink);
      setTotal(userData.total);

      return userData;
    } catch (error) {
      console.error('Erro ao obter informações do usuário:', error);
      return null;
    }
  };

  const handleIntegration = async (access_token, refresh_token, authorization_code, userData, marketId) => {
    if (hasIntegrated.current) return;
    hasIntegrated.current = true;

    const requestData = {
      access_token,
      refresh_token,
      user_marketplace_id: marketId.toString(),  // Convertendo para string
      userId: user_Id,
      authorization_code,
      nickname: userData.nickname,
      power_seller_status: userData.power_seller_status,
      level_id: userData.level_id,
      permalink: userData.permalink,
      total: userData.total,
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
        .then((result) => {
          if (result && result.access_token && result.marketId && result.refresh_token) {
            return fetchUserInfo(result.access_token, result.marketId).then((userData) => ({
              ...result,
              userData,
            }));
          } else {
            console.error('access_token, marketId ou refresh_token não definidos após obter o access token.');
            return null;
          }
        })
        .then((data) => {
          if (data && data.userData && data.userData.nickname && data.userData.power_seller_status && data.userData.level_id) {
            handleIntegration(data.access_token, data.refresh_token, authorization_code, data.userData, data.marketId);
          } else {
            console.error('Informações do usuário incompletas para integração.', data);
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
