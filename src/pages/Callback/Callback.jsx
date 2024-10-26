import React, { useEffect, useContext, useState, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Callback = () => {
  const { user } = useContext(AuthContext);
  const user_Id = user ? user.uid : null;

  // Estados para informações do usuário
  const [marketId, setMarketId] = useState('');
  const [nickname, setNickname] = useState('');
  const [powerSellerStatus, setPowerSellerStatus] = useState('');
  const [levelId, setLevelId] = useState('');
  const [permalink, setPermalink] = useState('');
  
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
      return response.data; // Retorna o token e o refresh token
    } catch (error) {
      console.error('Erro ao obter access token:', error);
      throw error;
    }
  };

  const fetchUserInfo = async (access_token) => {
    try {
      const response = await axios.get(`https://api.mercadolibre.com/users/${marketId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      setNickname(response.data.nickname);
      setPowerSellerStatus(response.data.user_type);
      setLevelId(response.data.points);
      setPermalink(response.data.permalink);
      console.log('Informações do usuário obtidas:', response.data);
    } catch (error) {
      console.error('Erro ao obter informações do usuário:', error);
    }
  };

  const handleIntegration = async (access_token, refresh_token) => {
    if (hasIntegrated.current) return; // Previne chamadas duplicadas
    hasIntegrated.current = true; // Marca como já integrado

    const requestData = {
      access_token,
      refresh_token,
      user_marketplace_id: marketId,
      userId: user_Id,
      authorization_code: getCodeParams(),
      nickname,
      power_seller_status: powerSellerStatus,
      level_id: levelId,
      permalink,
      total: 1500,
    };

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
        .then((tokenData) => {
          if (tokenData) {
            // Extrai os tokens do tokenData e chama fetchUserInfo e handleIntegration
            const { access_token, refresh_token } = tokenData;
            fetchUserInfo(access_token)
              .then(() => handleIntegration(access_token, refresh_token));
          }
        })
        .catch(error => console.error('Erro no fluxo de autenticação:', error));
    }
  }, []); // Apenas na montagem do componente

  return (
    <div>
      <h1>Hello, I'm callback</h1>
      <button onClick={() => console.log(getCodeParams())}>Pegue esse code no log ai Richardão</button>
    </div>
  );
};

export default Callback;
