import axios from 'axios';

const api = axios.create({
  baseURL: 'https://guiaseller-backend.dlmi5z.easypanel.host',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const checkUserAlphaStatus = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data.isAlpha; 
  } catch (error) {
    console.error('Erro ao buscar o status de acesso alpha:', error);
    return false;
  }
};