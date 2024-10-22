import axios from 'axios';
import { toast } from 'react-toastify';

// Função para buscar dados do usuário
export const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${userId}`);
    return response.data;
  } catch (error) {
    toast.error('Erro ao buscar os dados do usuário!');
    throw error;
  }
};

// Função para atualizar dados do usuário
export const updateUserData = async (userId, userData) => {
  try {
    await axios.put(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${userId}`, userData);
    toast.success('Perfil atualizado com sucesso!');
  } catch (error) {
    toast.error('Erro ao atualizar o perfil!');
    throw error;
  }
};

// Função para buscar dados da empresa
export const getCompanyDetails = async (userId) => {
  try {
    const response = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${userId}`);
    const company_id = response.data.companies[0].company_id;
    const companyResponse = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/company/${company_id}`);
    return companyResponse.data;
  } catch (error) {
    toast.error('Erro ao buscar os dados da empresa!');
    throw error;
  }
};

// Função para atualizar dados da empresa
export const updateCompanyData = async (companyId, companyData) => {
  try {
    await axios.put(`https://guiaseller-backend.dlmi5z.easypanel.host/users/company/${companyId}`, companyData);
    toast.success('Dados da empresa atualizados com sucesso!');
  } catch (error) {
    toast.error('Erro ao atualizar os dados da empresa!');
    throw error;
  }
};
