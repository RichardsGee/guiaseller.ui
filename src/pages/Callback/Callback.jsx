import React, { useEffect, useContext, useState } from 'react'; 
import axios from 'axios';
import { AuthContext } from './AuthContext'; 

const Callback = () => {
  const { user, signOut } = useContext(AuthContext);
  const [marketId, setMarketId] = useState(''); 
  var user_Id = user ? user.uid : null;
  const [nickname, setNickname] = useState('Steve'); 
  const [powerSellerStatus, setPowerSellerStatus] = useState(''); 
  const [levelId, setLevelId] = useState(''); 
  const [permalink, setPermalink] = useState(''); 
  const [total, setTotal] = useState(0); 

  const getCodeParams = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get('code');
  };

  const handleAccessToken = async (authorization_code) => {
    try {
      const response = await axios.post('https://guiaseller-backend.dlmi5z.easypanel.host/getAccessToken', {
        refreshToken: authorization_code,
      });

      console.log('Access Token obtido:', response.data);
      setMarketId(response.data.user_id);
      return response.data.access_token;
    } catch (error) {
      console.error('Erro ao obter access token:', error);
      throw error;
    }
  };

  const handleIntegration = async (access_token) => {
    const user_marketplace_id = marketId; 
    const userId = user_Id; 
    const nickname = nickname;
    const power_seller_status = powerSellerStatus;
    const level_id = levelId;
    const permalink = "https://marketplace.com/seller123";
    const total = 1500;

    const requestData = {
      access_token,
      user_marketplace_id,
      userId,
      authorization_code: getCodeParams(),
      nickname,
      power_seller_status,
      level_id,
      permalink,
      total,
    };

    try {
      const response = await axios.post('https://guiaseller-backend.dlmi5z.easypanel.host/integrations', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Integração criada com sucesso:', response.data);
      return access_token; 
    } catch (error) {
      console.error('Erro ao criar integração:', error);
    }
  };

  const fetchUserInfo = async (access_token) => {
    try {
      const response = await axios.get(`https://api.mercadolibre.com/users/${marketId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      setNickname(response.data.nickname);
      setPowerSellerStatus(response.data.user_type);
      setLevelId(response.data.points);
      setPermalink(response.data.permalink);
    } catch (error) {
      console.error('Erro ao obter informações do usuário:', error);
    }
  };

  useEffect(() => {
    const authorization_code = getCodeParams();
    if (authorization_code) {
      handleAccessToken(authorization_code)
        .then(access_token => fetchUserInfo(access_token)) 
        .then(access_token => handleIntegration(access_token))
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
