import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext'; // Certifique-se de importar o AuthContext

const Callback = () => {
  const { user } = useContext(AuthContext);  // Acessando o contexto de autenticação
  const userId = user ? user.uid : null;  // Coletando o userId dinamicamente

  console.log('userId no AuthContext:', userId); // Log para verificar o valor do userId

  const [nickname, setNickname] = useState('');
  const [powerSellerStatus, setPowerSellerStatus] = useState('');  // Definindo valor fixo
  const [levelId, setLevelId] = useState('');  // Definindo valor fixo
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
    console.log('Authorization code:', authorization_code);
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
        power_seller_status: response.data.seller_reputation?.power_seller_status || 'Não disponível',  // Valor fixo
        level_id: response.data.seller_reputation?.level_id || 'Não disponível',  // Valor fixo
        permalink: response.data.permalink || '',
        total: response.data.seller_reputation?.transactions?.total || 0,
      };

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

    // Log para verificar o userId antes de fazer a integração
    console.log('userId utilizado para integração:', userId);

    const requestData = {
      access_token,
      refresh_token,
      user_marketplace_id: marketId.toString(),  // Convertendo para string
      userId,  // Usando o userId aqui
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
      toast.success('Integração criada com sucesso!');
    } catch (error) {
      console.error('Erro ao criar integração:', error);
      toast.error('Erro ao criar integração.');
    }
  };

  const fetchRefreshToken = async (authorization_code) => {
    try {
      const response = await fetch("https://api.mercadolibre.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: "6973021883530314",
          client_secret: "VwhQK2Q0z9COyksPLgAWcdXCJ9aswt7i", 
          code: authorization_code,
          redirect_uri: "https://guiaseller.com/integrations/callback",
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao obter refresh token");
      }

      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Erro ao buscar o refresh token:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const authorization_code = getCodeParams();
      if (authorization_code && !hasFetchedAccessToken.current) {
        try {
          const tokenData = await fetchRefreshToken(authorization_code);

          if (tokenData && tokenData.refresh_token) {
            const result = await getAccessToken(tokenData.refresh_token);

            if (result && result.access_token && result.marketId) {
              const userData = await fetchUserInfo(result.access_token, result.marketId);

              if (userData && userData.nickname && userData.power_seller_status && userData.level_id) {
                handleIntegration(
                  result.access_token,
                  tokenData.refresh_token,
                  authorization_code,
                  userData,
                  result.marketId
                );
              } else {
                console.error("Informações do usuário incompletas para integração.");
              }
            } else {
              console.error("access_token ou marketId não definidos após obter o access token.");
            }
          } else {
            console.error("Refresh token não encontrado na resposta.");
          }
        } catch (error) {
          console.error("Erro no fluxo de autenticação:", error);
        }
      }
    };

    fetchData();
  }, [userId]);  // Adicionando o userId ao useEffect

  return (
    <div>
      <h1>Integração completa!</h1>
      <button onClick={() => console.log(getCodeParams())}>Código da integração</button>
    </div>
  );
};

export default Callback;
