import React, { useEffect } from 'react';
import axios from 'axios';

const Callback = () => {
  const getCodeParams = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const code = params.get('code');
    return code;
  };

  const handleIntegration = async () => {
    const access_token = "fakeAccessToken123"; 
    const user_marketplace_id = "marketplaceUser123";
    const userId = "X02jGDhoFoao7SfG6yiQMquN8cB2"; 
    const authorization_code = getCodeParams();
    const nickname = "SellerNickname";
    const power_seller_status = "gold";
    const level_id = "level1";
    const permalink = "https://marketplace.com/seller123";
    const total = 1500;

    const requestData = {
      access_token,
      user_marketplace_id,
      userId,
      authorization_code,
      nickname,
      power_seller_status,
      level_id,
      permalink,
      total
    };

    try {
      const response = await axios.post('/integrations', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Integração criada com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar integração:', error);
    }
  };

  useEffect(() => {
    handleIntegration(); 
  }, []);

  return (
    <div>
      <h1>Hello, I'm callback</h1>
      <button onClick={() => console.log(getCodeParams())}>Pegue esse code no log ai Richardão</button>
    </div>
  );
};

export default Callback;
