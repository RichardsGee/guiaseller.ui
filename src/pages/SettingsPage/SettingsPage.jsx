import React, { useState, useContext, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import AccountSettings from '../../components/AccountSettings/AccountSettings';
import CompanySettings from '../../components/CompanySettings/CompanySettings';
import { AuthContext } from '../../context/AuthContext';
import styles from './settingsPage.module.css'; // Importando o CSS do módulo
import '../../styles/styles.css'; // Importando o CSS global onde está o contentContainer
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SettingsPage() {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;
  const userId = user ? user.uid : null;  

  // Estados para os dados
  const [first_name, setName] = useState(username);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [fantasyName, setFantasyName] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [additionalCost, setAdditionalCost] = useState('');
  const [userLevel, setUserLevel] = useState(''); // Estado para o nível do usuário

  // Estados para controlar se o usuário está no modo de edição
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);

  // Funções para controle de edição e salvamento
  const handleEditClickAccount = () => {
    setIsEditingAccount(!isEditingAccount);
  };

  const handleEditClickCompany = () => {
    setIsEditingCompany(!isEditingCompany);
  };

  const handleSave = async () => {
    await updateUserData();
    await updateCompanyData();
    setIsEditingAccount(false);
    setIsEditingCompany(false);
  };

  const isFieldEmpty = (field) => !field === '';

  // Função para buscar detalhes do usuário
  const getUserDetails = async () => {
    try {
      const response = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${userId}`);
      const userData = response.data;

      console.log("User Data:", userData); // Adicionando log para verificar os dados
      setName(userData.first_name || '');
      setPhone(userData.phone || ''); 
      setUserLevel(userData.user_level || ''); // Aqui você garante que o userLevel é obtido do banco de dados
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Função para buscar detalhes da empresa
  const getCompanyDetails = async () => {
    try {
      const responseUser = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${userId}`);
      const company_id = responseUser.data.companies[0].company_id;

      const response = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/company/${company_id}`);
      const companyData = response.data;

      setCompanyName(companyData.company_name || '');
      setCnpj(companyData.cnpj || '');
      setFantasyName(companyData.fantasy_name || '');
      setTaxRate(companyData.tax_rate || '');
      setAdditionalCost(companyData.additional_cost || '');
    } catch (error) {
      console.error("Error fetching company details:", error);
    }
  };

  // Função para atualizar dados do usuário
  const updateUserData = async () => {
    try {
      await axios.put(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${userId}`, {
        first_name,
        last_name: '',
        email,
        phone,
        user_level: userLevel, // Certificando-se de que o nível do usuário está atualizado
      });
      toast.success("Dados do usuário atualizados com sucesso!");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Função para atualizar dados da empresa
  const updateCompanyData = async () => {
    try {
      const responseUser = await axios.get(`https://guiaseller-backend.dlmi5z.easypanel.host/users/${userId}`);
      if (responseUser.data.companies.length === 0) {
        await axios.post(`https://guiaseller-backend.dlmi5z.easypanel.host/users/company`, {
          company_name: companyName,
          cnpj,
          fantasy_name: fantasyName,
          tax_rate: parseFloat(taxRate),
          userId: userId,
        });
      }
      const company_id = responseUser.data.companies[0].company_id;
      await axios.put(`https://guiaseller-backend.dlmi5z.easypanel.host/users/company/${company_id}`, {
        company_name: companyName,
        fantasy_name: fantasyName,
        cnpj,
        tax_rate: parseFloat(taxRate),
      });
      toast.success("Dados da empresa atualizados com sucesso!");
    } catch (error) {
      console.error("Error updating company data:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching user details..."); // Adicionando log para garantir que a função está sendo chamada
    if (userId) {
      getUserDetails();
      getCompanyDetails();
    }
  }, [userId]);

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar 
        userPhoto={userPhoto} 
        username={username} 
        userEmail={userEmail} 
        userId={userId} // Passando o userId para o Sidebar
        userLevel={userLevel} // Passando o userLevel para o Sidebar
        isComplete={!isFieldEmpty(first_name) && !isFieldEmpty(email) && !isFieldEmpty(phone) && !isFieldEmpty(companyName) && !isFieldEmpty(cnpj) && !isFieldEmpty(fantasyName) && !isFieldEmpty(taxRate)}
      />

      <div className="main-content">

        {/* Usando a classe contentContainer do styles.css */}
        <div className="contentContainer">
          <div className={styles.configContent}>
          <h1 className="title">Configurações</h1>

            <div className={styles.settingsGrid}>
              <AccountSettings 
                name={first_name} 
                setName={setName} 
                email={email} 
                setEmail={setEmail} 
                phone={phone} 
                setPhone={setPhone} 
                userLevel={userLevel} // Passando o userLevel para AccountSettings
                isEditing={isEditingAccount}
                handleEditClick={handleEditClickAccount}
                handleSave={handleSave}
                isFieldEmpty={isFieldEmpty} 
              />

              <CompanySettings 
                companyName={companyName} 
                setCompanyName={setCompanyName} 
                cnpj={cnpj} 
                setCnpj={setCnpj} 
                fantasyName={fantasyName} 
                setFantasyName={setFantasyName} 
                taxRate={taxRate} 
                setTaxRate={setTaxRate}
                additionalCost={additionalCost} 
                setAdditionalCost={setAdditionalCost} 
                isEditing={isEditingCompany}
                handleEditClick={handleEditClickCompany}
                handleSave={handleSave}
                isFieldEmpty={isFieldEmpty} 
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
}

export default SettingsPage;
