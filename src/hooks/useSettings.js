// hooks/useSettings.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useSettings = (userId) => {
  const [profileData, setProfileData] = useState({});
  const [companyData, setCompanyData] = useState({});

  useEffect(() => {
    if (userId) {
      fetchProfileData();
      fetchCompanyData();
    }
  }, [userId]);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`/users/${userId}`);
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(`/users/${userId}/company`);
      setCompanyData(response.data);
    } catch (error) {
      console.error('Error fetching company:', error);
    }
  };

  const saveProfile = async () => {
    try {
      await axios.put(`/users/${userId}`, profileData);
      toast.success('Perfil atualizado!');
    } catch (error) {
      toast.error('Erro ao atualizar perfil!');
    }
  };

  const saveCompany = async () => {
    try {
      await axios.put(`/users/${userId}/company`, companyData);
      toast.success('Empresa atualizada!');
    } catch (error) {
      toast.error('Erro ao atualizar empresa!');
    }
  };

  return { profileData, setProfileData, companyData, setCompanyData, saveProfile, saveCompany };
};
