import React, { useEffect, useContext, useState } from 'react'; 
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'; 

const Callback = () => {
  const { user } = useContext(AuthContext);
  const [marketId, setMarketId] = useState(''); 
  const user_Id = user ? user.uid : null; 
  const [userIDML, setUserIDML] = useState('');
  const [nickname, setNickname] = useState('Steve'); 
  const [powerSellerStatus, setPowerSellerStatus] = useState(''); 
  const [levelId, setLevelId] = useState(''); 
  const [permalink, setPermalink] = useState(''); 
  const [total, setTotal] = useState(0); 
  const [refreshToken, setRefreshToken] = useState('');
  const [access_token, setAccessToken] = useState('');

  const getCodeParams = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get('code');
  };

  const handleIntegration = async (refresh_token) => {
    const requestData = {
      access_token,
      refresh_token,
      user_marketplace_id: marketId, 
      userId: user_Id, 
      authorization_code: getCodeParams(),
      nickname,
      power_seller_status: powerSellerStatus,
      level_id: levelId,
      permalink: "https://marketplace.com/seller123",
      total: 1500,
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

  const getAccessToken = async (authorization_code) => {
  try {
    const response = await axios.post(
      'https://guiaseller-backend.dlmi5z.easypanel.host/getAccessToken',
      { refreshToken: authorization_code },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Access Token obtido:', response.data); 
    setAccessToken(response.data.access_token);
    setRefreshToken(response.data.refresh_token);
    setUserIDML(response.data.user_id);
    return response.data; 
  } catch (error) {
    console.error('Erro ao obter access token:', error); 
    throw error; 
  }
};

  useEffect(() => {
    const authorization_code = getCodeParams();
    if (authorization_code) {
      getAccessToken(authorization_code)
        .then(() => fetchUserInfo(userIDML))
        .then(() => handleIntegration(refreshToken))
        .catch(error => console.error('Erro no fluxo de autenticação:', error));
    }
  }, [userIDML, access_token]);

  return (
    <div>
      <h1>Hello, I'm callback</h1>
      <button onClick={() => console.log(getCodeParams())}>Pegue esse code no log ai Richardão</button>
    </div>
  );
};

export default Callback;
