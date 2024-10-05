// /pages/SettingsPage.jsx
import React, { useState, useContext } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';
import Footer from '../../components/Footer/Footer';
import MainContent from '../../components/MainContent/MainContent';
import AccountSettings from '../../components/AccountSettings/AccountSettings';
import CompanySettings from '../../components/CompanySettings/CompanySettings';
import { AuthContext } from '../../context/AuthContext';
import styles from './settingsPage.module.css';

function SettingsPage() {
  const { user, signOut } = useContext(AuthContext);
  const username = user ? user.displayName || user.email : "No User Logged";
  const userPhoto = user ? user.photoURL : null;
  const userEmail = user ? user.email : null;
  const userLevel = "Admin"; // Exemplo de nível do usuário

  // Estados para os dados
  const [name, setName] = useState(username);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('Minha Empresa Ltda');
  const [cnpj, setCnpj] = useState('12.345.678/0001-90');
  const [fantasyName, setFantasyName] = useState('Empresa Fantasia');
  const [taxRate, setTaxRate] = useState('15%');

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

  const handleSave = () => {
    setIsEditingAccount(false);
    setIsEditingCompany(false);
    alert("Dados salvos com sucesso!"); // Feedback de exemplo
  };

  // Funções para verificar se um campo específico está vazio
  const isFieldEmpty = (field) => !field || field.trim() === '';

  return (
    <MainContent>
      <Header username={username} logout={signOut} />
      <Sidebar 
        userPhoto={userPhoto} 
        username={username} 
        userEmail={userEmail} 
        userLevel={userLevel}
        isComplete={!isFieldEmpty(name) && !isFieldEmpty(email) && !isFieldEmpty(phone) && !isFieldEmpty(companyName) && !isFieldEmpty(cnpj) && !isFieldEmpty(fantasyName) && !isFieldEmpty(taxRate)}
      />

      <div className="main-content">
        <TopBar userPhoto={userPhoto} />

        <div className={styles.configContent}>
          <h1 className={styles.mainTitle}>Configurações</h1>

          <div className={styles.settingsGrid}>
            {/* Componente de Configurações da Conta */}
            <AccountSettings 
              name={name} 
              setName={setName} 
              email={email} 
              setEmail={setEmail} 
              phone={phone} 
              setPhone={setPhone} 
              userLevel={userLevel}
              isEditing={isEditingAccount}
              handleEditClick={handleEditClickAccount}
              handleSave={handleSave}
              isFieldEmpty={isFieldEmpty} // Passando a função para verificar campos vazios
            />

            {/* Componente de Configurações da Empresa */}
            <CompanySettings 
              companyName={companyName} 
              setCompanyName={setCompanyName} 
              cnpj={cnpj} 
              setCnpj={setCnpj} 
              fantasyName={fantasyName} 
              setFantasyName={setFantasyName} 
              taxRate={taxRate} 
              setTaxRate={setTaxRate}
              isEditing={isEditingCompany}
              handleEditClick={handleEditClickCompany}
              handleSave={handleSave}
              isFieldEmpty={isFieldEmpty} // Passando a função para verificar campos vazios
            />
          </div>
        </div>
      </div>
      <Footer />
    </MainContent>
  );
}

export default SettingsPage;
